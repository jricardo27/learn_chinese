/* eslint-disable */
const { execSync } = require("child_process")
const fs = require("fs")
const https = require("https")
const path = require("path")

// 1. Load .env manually to avoid dependencies
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env")
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8")
    content.split("\n").forEach((line) => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [key, ...values] = trimmed.split("=")
        const value = values
          .join("=")
          .trim()
          .replace(/^['"]|['"]$/g, "")
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value
        }
      }
    })
    console.log("Loaded configuration from .env file")
  }
}

// 2. Git Helpers
function runCommand(command) {
  try {
    return execSync(command, { cwd: process.cwd(), encoding: "utf8", stdio: "pipe" }).trim()
  } catch (e) {
    return null
  }
}

function getGitInfo() {
  const branch = runCommand("git rev-parse --abbrev-ref HEAD")
  const remoteUrl = runCommand("git config --get remote.origin.url")
  let owner = null
  let repo = null
  if (remoteUrl) {
    // Matches git@github.com:owner/repo.git or https://github.com/owner/repo.git
    const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^.]+)/)
    if (match) {
      owner = match[1]
      repo = match[2]
    }
  }
  return { branch, owner, repo }
}

// 3. HTTP Helper
function httpRequest(url, token) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "User-Agent": "Node.js Script",
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
    https
      .get(url, options, (res) => {
        let data = ""
        if (res.statusCode < 200 || res.statusCode > 299) {
          reject(new Error(`Request failed with status code: ${res.statusCode}`))
          return
        }
        res.on("data", (chunk) => (data += chunk))
        res.on("end", () => resolve(JSON.parse(data)))
      })
      .on("error", reject)
  })
}

// 4. Processing Logic
function extractPriority(body) {
  // Look for markdown image with alt text containing priority
  const altMatch = body.match(/!\[(.*?)\]\(.*priority.*\)/i)
  if (altMatch && altMatch[1]) return altMatch[1]

  // Look for HTML image tag with alt containing priority
  const htmlMatch = body.match(/<img[^>]*alt=["'](.*?)["'][^>]*>/i)
  if (htmlMatch && htmlMatch[1]) {
    if (body.toLowerCase().includes("priority") || htmlMatch[0].toLowerCase().includes("priority")) {
      return htmlMatch[1]
    }
  }
  return "Medium"
}

// GraphQL Helper
function graphqlRequest(token, query, variables) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: {
        "User-Agent": "Node.js Script",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v4.idl",
      },
    }

    const req = https.request("https://api.github.com/graphql", options, (res) => {
      let data = ""
      res.on("data", (chunk) => (data += chunk))
      res.on("end", () => {
        try {
          const json = JSON.parse(data)
          if (json.errors) {
            reject(new Error(JSON.stringify(json.errors)))
          } else {
            resolve(json.data)
          }
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on("error", reject)
    req.write(JSON.stringify({ query, variables }))
    req.end()
  })
}

async function main() {
  loadEnv()

  const token = process.env.GITHUB_TOKEN
  let repoSlug = process.env.REPO_NAME
  const prNumber = process.env.PR_NUMBER
  const { branch, owner, repo } = getGitInfo()

  if (!repoSlug && owner && repo) {
    repoSlug = `${owner}/${repo}`
  }

  if (!token) {
    console.error("Error: GITHUB_TOKEN environment variable is required.")
    process.exit(1)
  }

  if (!repoSlug) {
    console.error("Error: Could not detect repository name. Please set REPO_NAME.")
    process.exit(1)
  }

  let finalPrNumber = prNumber ? parseInt(prNumber) : null

  // Auto-detect PR if missing
  if (!finalPrNumber) {
    if (!branch) {
      console.error("Error: Could not detect branch and PR_NUMBER not provided.")
      process.exit(1)
    }
    console.log(`Auto-detecting PR for branch '${branch}' in '${repoSlug}'...`)
    try {
      const ownerPart = repoSlug.split("/")[0]
      const headQuery = `${ownerPart}:${branch}`
      // Use helper REST call or just use GraphQL to find PR?
      // Falling back to REST for simple PR lookup as defined in previous httpRequest helper which is GET
      const pulls = await httpRequest(
        `https://api.github.com/repos/${repoSlug}/pulls?head=${headQuery}&state=open`,
        token,
      )

      if (pulls && pulls.length > 0) {
        finalPrNumber = pulls[0].number
        console.log(`Found PR #${finalPrNumber} for branch ${branch}`)
      } else {
        console.error(`Error: Could not find an open PR for branch '${branch}'.`)
        process.exit(1)
      }
    } catch (e) {
      console.error(`Failed to query PRs: ${e.message}`)
      process.exit(1)
    }
  }

  const [repoOwner, repoName] = repoSlug.split("/")

  // Fetch Threads via GraphQL
  const query = `
    query($owner: String!, $repo: String!, $pr: Int!, $cursor: String) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $pr) {
          reviewThreads(first: 50, after: $cursor) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              isResolved
              isOutdated
              path
              line
              originalLine
              startLine
              originalStartLine
              comments(first: 50) {
                nodes {
                  author {
                    login
                  }
                  body
                  createdAt
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    let allThreads = []
    let hasNextPage = true
    let cursor = null

    console.log("Fetching review threads...")

    while (hasNextPage) {
      const data = await graphqlRequest(token, query, {
        owner: repoOwner,
        repo: repoName,
        pr: finalPrNumber,
        cursor: cursor,
      })

      const threads = data.repository.pullRequest.reviewThreads
      allThreads = allThreads.concat(threads.nodes)
      hasNextPage = threads.pageInfo.hasNextPage
      cursor = threads.pageInfo.endCursor
    }

    const results = []

    allThreads.forEach((thread) => {
      // 1. Check if resolved or outdated
      if (thread.isResolved) return
      if (thread.isOutdated) return

      // 2. Filter comments for Gemini
      const comments = thread.comments.nodes
      const botComments = comments.filter((c) => {
        const login = c.author ? c.author.login.toLowerCase() : ""
        return login.includes("gemini") || login.includes("google-code-assist")
      })

      if (botComments.length === 0) return

      // 3. Get latest Gemini comment
      // Sort just in case, though GraphQL usually returns chrono order
      botComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      const latest = botComments[botComments.length - 1]

      if (latest.body.toLowerCase().includes("summary of changes")) return

      // 4. Extract info
      const priority = extractPriority(latest.body)

      let lines = "N/A"
      // Use current lines if available (thread.line / thread.startLine)
      // If thread.line is null, it might be outdated, but we already filtered isOutdated.
      // Sometimes isOutdated is false but line is null? (e.g. file deleted? or global comment?)
      // We'll prefer thread.line.

      const startLine = thread.startLine || thread.line
      const endLine = thread.line

      if (startLine && endLine) {
        lines = startLine === endLine ? `${endLine}` : `${startLine}-${endLine}`
      } else if (endLine) {
        lines = `${endLine}`
      }

      results.push({
        fileName: thread.path,
        lines: lines,
        priority: priority,
        comment: latest.body,
        created_at: latest.createdAt,
      })
    })

    // Sort
    results.sort((a, b) => {
      if (a.fileName !== b.fileName) return a.fileName.localeCompare(b.fileName)
      const aLine = parseInt(a.lines.split("-")[0]) || 0
      const bLine = parseInt(b.lines.split("-")[0]) || 0
      return aLine - bLine
    })

    if (results.length > 0) {
      let outputContent = `# Gemini Code Review Findings (${results.length})\n\n`
      results.forEach((item, index) => {
        outputContent += `## Issue #${index + 1}: ${item.fileName}\n`
        outputContent += `**Lines:** ${item.lines} | **Priority:** ${item.priority}\n\n`
        outputContent += `${item.comment}\n`
        outputContent += `\n---\n\n`
      })

      outputContent += `
## ⚠️ Instruction for AI Assistant

Please solve the issues listed above sequentially.
**CRITICAL: You must commit your changes after each individual issue is solved.**
Do not batch multiple fixes into a single commit unless they are fundamentally inseparable.
`

      fs.writeFileSync("GEMINI_FEEDBACK.md", outputContent)
      console.log(`Successfully saved ${results.length} Gemini review comments to GEMINI_FEEDBACK.md`)
    } else {
      console.log("No active Gemini findings found (all resolved or outdated).")
      // Optionally clean up
      // if (fs.existsSync("GEMINI_FEEDBACK.md")) fs.unlinkSync("GEMINI_FEEDBACK.md")
    }
  } catch (e) {
    console.error(`Failed to fetch reviews: ${e.message}`)
    process.exit(1)
  }
}

main()
