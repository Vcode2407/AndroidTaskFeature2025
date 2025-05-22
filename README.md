
# React Task Manager Pro

A user-friendly task management application built with React, TypeScript, and Tailwind CSS. Users can add, edit, delete, and view tasks. Task data is persisted in the browser's local storage. It also includes features like search, filtering by status (all, active, completed), and a dark mode toggle.

## Features

-   **Create Tasks**: Add new tasks with a title (required), description (optional), and due date (optional).
-   **View Tasks**: Display tasks in a responsive card layout.
-   **Edit Tasks**: Modify existing task details.
-   **Delete Tasks**: Remove tasks with a confirmation prompt.
-   **Complete Tasks**: Mark tasks as completed or active. Completed tasks are visually distinct.
-   **Persistent Storage**: Tasks are saved in `localStorage`, so they persist across browser sessions.
-   **Search**: Filter tasks by title.
-   **Filter**: Filter tasks by status (All, Active, Completed).
-   **Dark Mode**: Toggle between light and dark themes. Theme preference is saved in `localStorage`.
-   **Responsive Design**: Adapts to various screen sizes.
-   **Input Validation**: Ensures task titles are not empty.
-   **User-Friendly Interface**: Clean and intuitive UI/UX.

## Tech Stack

-   **React 18+**: For building the user interface.
-   **TypeScript**: For static typing and improved code quality.
-   **Tailwind CSS**: For utility-first CSS styling.
-   **Vite**: (Recommended) For a fast development build tool. Or Create React App.

## Project Structure

```
/
├── public/
│   └── vite.svg (or other public assets)
├── components/
│   ├── icons.tsx         # SVG Icon components
│   ├── Modal.tsx         # Generic Modal component
│   ├── TaskForm.tsx      # Form for adding/editing tasks
│   └── TaskItem.tsx      # Component to display a single task
├── App.tsx               # Main application component
├── index.html            # Main HTML entry point
├── index.tsx             # React application entry (renders App)
├── types.ts              # TypeScript type definitions
├── metadata.json         # App metadata (not used at runtime by React directly)
├── README.md             # This file
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Setup and Installation

To run this project locally, you'll need Node.js and npm (or yarn) installed.

1.  **Clone the repository (or create files locally):**
    If this were a Git repository:
    ```bash
    git clone <repository-url>
    cd react-task-manager-pro
    ```
    Otherwise, create the files as provided in your project directory.

2.  **Install dependencies:**
    Navigate to the project's root directory in your terminal and run:
    ```bash
    npm install
    ```
    or if you prefer yarn:
    ```bash
    yarn install
    ```
    You'll need to install `react`, `react-dom`. For development with TypeScript, also install `typescript`, `@types/react`, `@types/react-dom`. If using Vite, install `vite`, `@vitejs/plugin-react`.

    Example `package.json` dependencies:
    ```json
    {
      "name": "react-task-manager",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite", // if using Vite
        "build": "tsc && vite build", // if using Vite
        "preview": "vite preview" // if using Vite
        // Or for Create React App:
        // "start": "react-scripts start",
        // "build": "react-scripts build",
      },
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      },
      "devDependencies": {
        "@types/react": "^18.2.15",
        "@types/react-dom": "^18.2.7",
        "typescript": "^5.0.2",
        "vite": "^4.4.5", // Example if using Vite
        "@vitejs/plugin-react": "^4.0.3" // Example if using Vite
        // "tailwindcss": "^3.3.0" // Tailwind is loaded via CDN in index.html for this example
      }
    }
    ```

3.  **Configure Tailwind CSS (if not using CDN):**
    The provided `index.html` uses the Tailwind CSS CDN. If you want a local Tailwind setup (recommended for production builds and customization):
    -   Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
    -   Initialize Tailwind: `npx tailwindcss init -p`
    -   Configure `tailwind.config.js` (content paths, theme extensions).
    -   Create a CSS file (e.g., `src/index.css`) and add Tailwind directives:
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```
    -   Import this CSS file in your `index.tsx` or `App.tsx`.
    -   Remove the Tailwind CDN script from `index.html`.

4.  **Environment Variables:**
    This application does not require any environment variables (like API keys) for its core functionality.

5.  **Run the development server:**
    ```bash
    npm run dev 
    ```
    or (if using Vite)
    ```bash
    yarn dev
    ```
    This will typically start the app on `http://localhost:5173` (Vite) or `http://localhost:3000` (Create React App). Open this URL in your browser.

## How to Use

1.  **Adding a Task**: Click the "Add Task" or "New Task" button. A modal will appear. Fill in the title (required), and optionally a description and due date. Click "Add Task" in the modal.
2.  **Viewing Tasks**: Tasks are displayed as cards on the main screen.
3.  **Editing a Task**: Click the "Edit" button on a task card. The modal will appear pre-filled with the task's details. Make your changes and click "Save Changes".
4.  **Deleting a Task**: Click the "Delete" button on a task card. A confirmation prompt will appear. Confirm to delete the task.
5.  **Completing a Task**: Click the circle icon (or checkmark icon if already completed) on a task card to toggle its completion status.
6.  **Searching**: Type in the search bar to filter tasks by their title in real-time.
7.  **Filtering**: Use the dropdown menu to filter tasks by "All", "Active", or "Completed" status.
8.  **Dark Mode**: Click the sun/moon icon in the header to toggle dark mode. Your preference is saved.

## Future Enhancements (Suggestions)

-   Task prioritization (e.g., low, medium, high).
-   Sub-tasks.
-   Drag-and-drop reordering of tasks.
-   User authentication and cloud synchronization (e.g., using Firebase or a custom backend).
-   Notifications/reminders for due dates.
-   More advanced filtering and sorting options.
-   Unit and integration tests.

## GitHub Preparation

-   **Repository Name Suggestion**: `react-task-manager-app`
-   **Repository Description Suggestion**: "A simple and responsive task management application built with React, TypeScript, and Tailwind CSS, featuring local storage persistence, search, filtering, and dark mode."
-   **`.gitignore` file**: A standard `.gitignore` for Node.js/React projects should be used. See example below.

### Example `.gitignore`

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarnclean

# dotenv environment variables file
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache files
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build output
.nuxt
dist

# Docusaurus build output
.docusaurus

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp files
.temp

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# Vite
dist
dist-ssr
```
This README provides a comprehensive overview of the React Task Manager application, setup instructions, and usage guidelines.
