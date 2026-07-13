<div align="center">

<h1>Orxis</h1>

<p><strong>Orchestrate AI with Precision and Purpose.</strong></p>

<p>
  Orxis is a structured AI instruction generator for developers, writers, and professionals who need clear, consistent control over how AI models behave. Answer four questions, and Orxis builds a complete six-section system prompt — covering role definition, mission, a cognitive loop, context, boundaries, and output formatting — ready to paste into ChatGPT, Claude, Gemini, or any other LLM. No account required.
</p>

<br />

<a href="https://orxis.vercel.app">
  <img src="https://img.shields.io/badge/▶%20Open%20Orxis-Try%20it%20free-7c5ff8?style=for-the-badge&logoColor=white" alt="Open Orxis" />
</a>
&nbsp;&nbsp;
<a href="https://buymeacoffee.com/khotjarb">
  <img src="https://img.shields.io/badge/☕%20Support-Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logoColor=black" alt="Support the project" />
</a>

</div>

---

## 🌐 Use Orxis Now

**No installation. No sign-up. Just open and build.**

> **[→ orxis.vercel.app](https://orxis.vercel.app)**

1. Click **Get Started** on the landing page
2. Answer four guided questions about your persona, task, tone, and rules
3. Orxis generates a complete, structured Custom Instruction
4. Copy it and paste it directly into ChatGPT, Claude, Gemini, or any other AI assistant

That's the entire workflow. No account, no subscription, nothing to install.

---

## ✦ Features

- **AI-Powered Instruction Generation** — Your wizard selections are processed by Google Gemini server-side, producing a structured, expert-level six-section Custom Instruction tailored to your inputs.
- **Six-Section Instruction Architecture** — Role & Identity, Mission, Cognitive Loop, Context & Input, Boundaries & Execution Rules, and Output Formatting. Each section is independently guided by your choices and produces a paste-ready system prompt.
- **Multi-Model Integration Guides** — Documentation for ChatGPT, Claude, and Gemini covering recommended injection methods and platform-specific behaviours for structured prompting.
- **Prompt Gallery** — Browse community-contributed instruction templates at `/gallery`. Submit your own to share with other users.
- **Output Studio** — After generating, refine your instruction with one-click tweaks: condense it, elevate the formality, or expand the formatting rules — all AI-assisted.
- **Progressive Web App** — Installable directly from the browser on desktop and mobile.
- **Premium Dark UI** — Glassmorphism surfaces, a cohesive neon accent palette, and smooth micro-animations throughout.

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) — App Router, static prerendering |
| Language | [TypeScript](https://www.typescriptlang.org/) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + CSS Custom Properties |
| Animation | [Framer Motion](https://www.framer.com/motion/) 12 |
| Icons | [Lucide React](https://lucide.dev/) |
| AI | [Google Gemini API](https://ai.google.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Running Locally

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A [Google Gemini API key](https://aistudio.google.com/apikey) (free tier available)

### Setup

```bash
git clone https://github.com/khotjarb/orxis.git
cd orxis
npm install
```

Create a `.env.local` file in the project root:

```env
# Required — powers the AI instruction generator
GEMINI_API_KEY=your_gemini_api_key_here
```

Then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Without a Gemini API key**, the generator will still work using a local template fallback. The output will be more basic than the AI-generated version, but fully functional.

### Production build

```bash
npm run build
npm run start
```

---

## 🏗 Architecture

- **Instruction generation** is handled by a server-side API that sends your wizard selections to Google Gemini and returns a complete six-section Custom Instruction. A local fallback generates a baseline instruction if the AI service is temporarily unavailable.
- **Output Studio tweaks** use a dedicated AI call to precisely modify an existing instruction while preserving its overall structure.
- **Content pages** (documentation, changelog, legal) are statically prerendered at build time and served from the CDN edge — no runtime compute required.
- **Community Gallery submissions** use an isolated serverless route, fully separate from the generation pipeline.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router — pages and route layouts
│   ├── api/                # Server-side API routes
│   │   ├── generate/       # AI instruction generation
│   │   ├── tweak/          # AI instruction refinement
│   │   ├── gallery/        # Fetch community prompts
│   │   └── submit/         # Submit community prompts
│   ├── (legal)/            # Privacy Policy, Terms of Service, License
│   ├── changelog/          # Release history
│   ├── docs/               # Documentation (client-rendered)
│   ├── gallery/            # Prompt Gallery
│   ├── generate/           # Core instruction generator wizard
│   └── layout.tsx          # Root layout — global metadata
├── components/             # Shared UI components
│   └── docs/               # Documentation sub-components and per-model guides
└── globals.css             # Design token system — CSS custom properties
```

---

## 🤝 Contributing

Issues and pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is **not open-source for commercial use**. It is released under a custom **Proprietary Non-Commercial License** — you may clone and run it locally for personal or educational purposes, but commercial deployment, white-labeling, and redistribution are strictly prohibited. See the [`LICENSE`](./LICENSE) file for full details.

---

<div align="center">

Built with care &nbsp;·&nbsp; **Orxis Team**

</div>