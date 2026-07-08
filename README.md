# Dinesh S | AI & Generative AI Engineer Portfolio

A premium, interactive personal portfolio website showcasing engineering projects, certifications, and live development stats. Built using **Next.js (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and **TypeScript**.

## 🚀 Key Features

### 1. Dynamic Three-Color Responsive Theme
Equipped with a custom double-theme configuration in [globals.css](file:///c:/portfolio/src/app/globals.css) mapping CSS custom properties dynamically:
*   **Light Theme ("Clean Slate Breeze")**: Uses a crisp cool Slate-50 background (`#f8fafc`) with solid white elements to prevent card washout, high-contrast Slate-900 typography, and azure blue, fresh teal, and pastel pink accents.
*   **Dark Theme ("Obsidian Cyber")**: Uses an obsidian-black background (`#09090b`) with cyber cyan, electric violet, and hot pink accents, creating a high-tech glowing feel.
*   **Dynamic Glow Effects**: Responsive radial glows adapt in real-time when toggling light and dark mode.

### 2. Precise Visual Layouts
*   **Profile Integration**: Displays portrait image: [dinesh_profile.jpg](file:///c:/portfolio/public/assets/dinesh_profile.jpg) centered with scale hover micro-interactions.
*   **Overlap Resolutions**: Repositioned floating badge elements (`Sparkles` and `Code`) as 3D layered glassmorphism components relative to the profile picture frame. This ensures zero overlap with text and buttons across all viewport widths.

### 3. Server-Side Stats Integration
Rather than fetching statistics client-side (which triggers CORS blocks and hits strict IP rate-limiting), the portfolio uses a Next.js API Route Handler:
*   **Unified Endpoint**: Fetches profile data and repositories directly from GitHub and problem counts from the official **LeetCode GraphQL API** server-side.
*   **Self-Healing Caching**: Automatically saves statistics to local cache and falls back dynamically to high-fidelity static constants if the network fails or is rate-limited.
*   **Secure Config**: Supports server-side environment variables to bypass public limits.

---

## 🛠️ Getting Started

### Prerequisites
*   Node.js 18+
*   npm or pnpm

### Installation
1.  Clone the repository and navigate to the folder:
    ```bash
    git clone https://github.com/Dinesh2k06/Portfolio.git
    cd Portfolio
    ```
2.  Install all packages:
    ```bash
    npm install
    ```
3.  *(Optional)* Create a `.env` file at the root based on [.env.example](file:///c:/portfolio/.env.example):
    ```bash
    GITHUB_TOKEN=your_personal_access_token
    ```

### Development Server
Run the local dev environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the assigned port if 3000 is occupied) to view your site.

### Build & Lint
Verify typescript compilation, eslint rules, and production bundling:
```bash
npm run lint
npm run build
```

---

## 🌐 Deployment to Vercel

1.  Connect your GitHub account to [Vercel](https://vercel.com).
2.  Import this repository and click **Deploy**.
3.  Add `GITHUB_TOKEN` to the **Environment Variables** in the Vercel Project Settings to ensure server-side statistics update live without rate-limiting constraints.
