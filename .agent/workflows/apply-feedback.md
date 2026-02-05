---
description: Apply feedback from Gemini Code Assist
---

1. Run the fetch script to get the latest reviews.
   _NOTE: ensure GITHUB_TOKEN is set in your .env or terminal._
   ```bash
   if [ -f scripts/fetch_gemini_reviews.py ]; then
       python3 scripts/fetch_gemini_reviews.py
   elif [ -f scripts/fetch_gemini_reviews.cjs ]; then
       node scripts/fetch_gemini_reviews.cjs
   else
       echo "No fetch script found!"
       exit 1
   fi
   ```
2. The script will:
   - Auto-detect the repository and pull request.
   - Fetch latest reviews from Gemini Code Assist.
   - Save the results to `GEMINI_FEEDBACK.md`.
3. Read the feedback file.
   `cat GEMINI_FEEDBACK.md`
4. Fix the issues mentioned in the feedback file.
   (I will inspect the code and apply fixes based on the content of GEMINI_FEEDBACK.md)
5. Commit changes.
   _After resolving each issue, commit the changes. Do NOT use `--no-verify`. Ensure all git hooks pass._
   `git commit -m "Fix: [Describe the fix applied]"`
