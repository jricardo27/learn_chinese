# Deployment Instructions

This project includes a script to automatically deploy your application to **GitHub Pages**.

## Prerequisites

1. **Git Repository**: Your project must be initialized as a git repository (`git init`).
2. **Remote Origin**: You must have a remote repository (e.g., on GitHub) configured as `origin`.
    * Check with: `git remote -v`
3. **GitHub Settings**:
    * Go to your repository settings on GitHub.
    * Navigate to **Pages**.
    * Under **Source**, ensure it is set to deploy from the `gh-pages` branch. (This branch will be created automatically by the script).

## How to Deploy

1. Open your terminal in the project directory.
2. Run the deployment script:

    ```bash
    ./deploy.sh
    ```

## What the Script Does

1. Creates a temporary deployment folder.
2. Copies all necessary source files (`.html`, `.js`, `.css`, `audio/`, `images/`).
3. Ensures `index.html` is used as the entry point for GitHub Pages.
4. Pushes the contents of this folder to the `gh-pages` branch of your remote repository.

Once finished, your site will be live at:
`https://<your-username>.github.io/<repository-name>/`
