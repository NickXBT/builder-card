# ⚡ Builder Card — Developer Portfolio & GitHub Visualizer

> **"Your GitHub journey, beautifully visualized."**  
> A modern developer portfolio dashboard built with **React**, **Vite**, **Tailwind CSS**, and the **GitHub REST API**. Inspect profile metrics, top starred repositories, primary languages, and live contribution activity for any GitHub user.

---

## 📸 Preview & UI Highlights

- **Dark-mode aesthetic** inspired by Linear, GitHub, and Vercel.
- **Glassmorphism cards** with subtle border glows and backdrop filters.
- **Segmented multi-color language breakdown bar** calculating true repository distribution.
- **Interactive contribution timeline** translating raw GitHub event payloads into readable updates.
- **Instant sample buttons** to test with famous developers (`gaearon`, `torvalds`, `shadcn`, `yyx990803`).

---

## ✨ Features

1. **GitHub Profile Search**:
   - Clean search bar with instant submit on Enter or click.
   - Quick one-click sample pills for instant demonstration during interviews.
   - Graceful error states (handles invalid usernames with a 404 alert and handles rate limit notifications).

2. **Developer Profile Card**:
   - Avatar with glowing gradient ring.
   - Full name, `@username`, bio, and direct profile link.
   - Key stats: public repository count, followers, following.
   - Metadata badges: location, company, personal website / portfolio, and account creation date.

3. **Top 5 Starred Repositories**:
   - Dynamically sorts all fetched public repositories by stargazers count (`stargazers_count`).
   - Displays repository name, description, primary language badge with authentic GitHub language colors, and fork count.

4. **Programming Language Analytics**:
   - Analyzes all public repositories belonging to the developer.
   - Renders a multi-color segmented progress bar and detailed percentage breakdown.
   - Documents the calculation methodology: primary codebase language distribution across public repositories.

5. **Recent Activity Timeline**:
   - Connects to the GitHub Events API (`/users/{username}/events/public`).
   - Formats the 5 most recent activities (commits pushed, repos/branches created, PRs opened, issues, starred repos).
   - Shows relative timestamps (e.g., *"2 hours ago"*).

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI component architecture and reactive state management (`useState`, `useEffect`) |
| **Vite** | Blazing-fast development server and optimized production bundler |
| **JavaScript (ES6+)** | Clean, readable async/await logic, modern array transformations (`map`, `filter`, `sort`, `reduce`) |
| **Tailwind CSS** | Utility-first responsive styling and custom dark glassmorphism design |
| **Lucide React** | Lightweight, clean developer icons |
| **GitHub REST API v3** | Real-time unauthenticated public endpoints |
| **Vercel** | Edge deployment and hosting |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/builder-card.git
   cd builder-card
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Visit `http://localhost:5173` to test the application!

---

## 📦 Project File Structure

```text
builder-card/
├── index.html                 # Main HTML root with Inter & JetBrains Mono fonts
├── package.json               # Project dependencies and scripts
├── postcss.config.js          # PostCSS configuration for Tailwind
├── tailwind.config.js         # Tailwind styling tokens and custom colors
├── vercel.json                # Vercel deployment and routing rules
├── vite.config.js             # Vite configuration with React plugin
└── src/
    ├── App.jsx                # Main application coordinator and data pipeline
    ├── main.jsx               # React entry point mounting to DOM root
    ├── index.css              # Global styles, Tailwind directives & custom scrollbars
    ├── services/
    │   └── githubApi.js       # Centralized GitHub REST API calls and analytics helpers
    └── components/
        ├── SearchBar.jsx       # Input field, clear button, and sample quick-pills
        ├── ProfileCard.jsx     # Developer bio, metrics, avatar, and social links
        ├── RepositoryCard.jsx  # Individual repository display with stars and forks
        ├── LanguageStats.jsx   # Top 5 languages, progress bar, and percentage list
        ├── ActivityTimeline.jsx# 5 most recent public GitHub events with time ago
        ├── Loading.jsx         # Skeleton placeholders during asynchronous fetches
        └── ErrorMessage.jsx    # User-friendly alert banner with retry functionality
```

---

## 🌐 Deploying to Vercel (100% Free)

Deploying Builder Card takes less than 2 minutes using Vercel:

### Method 1: Push to GitHub & Import (Recommended)
1. Initialize git and push this folder to your GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial builder card commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/builder-card.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New...** -> **Project**.
4. Select your `builder-card` repository.
5. Vercel automatically detects **Vite** and sets:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**. Your site will be live at `https://builder-card-xxx.vercel.app`!

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 📝 License
MIT License. Built for learning, personal developer portfolios, and technical interviews.
