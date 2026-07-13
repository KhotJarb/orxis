<div align="center">

<h1>Orxis</h1>

<p><strong>Orchestrate AI with Strict Boundaries.</strong></p>

<p>
  Orxis is a premium, client-side instruction generator for developers and creators who need precise, structured control over AI behaviour. Build a complete system prompt in minutes — with role definition, a cognitive loop, output constraints, and more — then paste it into any LLM. No account. No backend. No compromise.
</p>

<p>
  <a href="https://buymeacoffee.com/khotjarb">☕ Support the Project</a> &nbsp;·&nbsp;
  <a href="/changelog">Changelog</a> &nbsp;·&nbsp;
  <a href="/docs">Documentation</a>
</p>

</div>

---

## ✦ Features

- **100% Client-Side Processing** — Instruction generation runs entirely in the browser. No input is transmitted to a server, stored in a database, or processed by a third party. Your prompts stay on your device.
- **Six-Section Instruction Architecture** — Role & Identity, Mission, Cognitive Loop, Context & Input, Boundaries & Execution Rules, and Output Formatting. Each section is independently configurable and produces a structured, paste-ready system prompt.
- **Progressive Web App** — Installable directly from the browser on desktop and mobile via the Web Manifest, custom favicon set, and Apple Touch Icon.
- **Premium Dark UI** — Glassmorphism surfaces, a neon accent system (Periwinkle-to-Violet), and a CSS custom property-based design token architecture for consistent, zero-drift styling.
- **Zero-Latency Navigation** — Documentation tabs and settings panels switch instantaneously in React state. No page transitions, no network round-trips.
- **Multi-Model Integration Guides** — Per-model documentation for ChatGPT, Claude, and Gemini, covering recommended injection methods and platform-specific behaviours relevant to structured prompting.
- **Prompt Gallery** — Browse and reference community-contributed instruction templates at `/gallery`.

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) — App Router, static prerendering |
| Language | [TypeScript](https://www.typescriptlang.org/) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + CSS Custom Properties |
| Animation | [Framer Motion](https://www.framer.com/motion/) 12 |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Clone and run locally

```bash
git clone https://github.com/khotjarb/orxis.git
cd orxis
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

All content pages (`/docs`, `/changelog`, `/gallery`, `/about`, `/pricing`, legal pages) are statically prerendered at build time with no additional configuration required.

---

## 🏗 Architecture

Orxis is designed to be lightweight and serverless at its core.

- **Instruction generation** is handled entirely in React state in the browser. No API call is made when you build, preview, or copy an instruction.
- **Content pages** (documentation, changelog, legal) are statically prerendered at build time and served from the CDN edge with no runtime compute.
- **Community features** (Prompt Gallery submission) use minimal serverless API routes that are isolated from the core generation pipeline.

This architecture ensures maximum speed, zero backend maintenance burden for the core product, and a clear privacy guarantee: the instructions you write never leave your device.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router — pages and route layouts
│   ├── (legal)/            # Privacy Policy, Terms of Service, License
│   ├── changelog/          # Release history
│   ├── docs/               # Documentation (client-rendered, layout sets metadata)
│   ├── gallery/            # Prompt Gallery
│   ├── generate/           # Core instruction generator
│   ├── settings/           # User preferences
│   └── layout.tsx          # Root layout — global metadata and dark mode
├── components/             # Shared UI components
│   └── docs/               # Documentation sub-components and per-model guides
└── globals.css             # Design token system — CSS custom properties
```

---

## ☁️ Deploying to Vercel

Orxis is optimised for zero-configuration deployment on Vercel. Choose either method below.

### Method A — Vercel CLI

```bash
# 1. Install the Vercel CLI globally (skip if already installed)
npm install -g vercel

# 2. From the project root, run the deployment command
npx vercel

# 3. Follow the interactive prompts:
#    - Link to an existing project or create a new one
#    - Accept the auto-detected framework preset (Next.js)
#    - Confirm the build command: next build
#    - Confirm the output directory: .next

# 4. For a production deployment (not a preview):
npx vercel --prod
```

### Method B — GitHub + Vercel Dashboard

1. Push your repository to GitHub (or any Git provider Vercel supports).
2. Go to [vercel.com/new](https://vercel.com/new) and sign in.
3. Click **"Add New Project"** and import your repository.
4. Vercel will automatically detect the **Next.js** framework and pre-fill the settings.
5. Confirm the following settings before deploying:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` *(or `npm run build` — both resolve identically)*
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
6. Click **Deploy**. Vercel will build and publish the project. All subsequent pushes to your default branch will trigger automatic re-deployments.

> **Note:** Verify that your `package.json` `build` script is set to `next build` before deploying. If you have customised the script, ensure it still calls `next build` as its final step, as Vercel requires it to produce the `.next` output directory correctly.

---

## 🤝 Contributing

Issues and pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is **not open-source for commercial use**. It is released under a custom **Proprietary Non-Commercial License** — you may clone and run it locally for personal or educational purposes, but commercial deployment, white-labeling, and redistribution are strictly prohibited. See the [`LICENSE`](./LICENSE) file for full details.

---

<div align="center">

Built with care &nbsp;·&nbsp; [orxis.app@gmail.com](mailto:orxis.app@gmail.com)

</div>