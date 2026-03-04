# Mindflare Frontend 🌌

The premium, high-performance UI for the MindflareAI platform. Built with Next.js 15, Framer Motion, and Tailwind CSS.

## ✨ Highlights

- **Retro Aesthetic**: Unique pixel-art design with immersive CRT-style terminals and smooth animations.
- **Native Authentication**: Custom-built login/signup flow integrated directly with MongoDB and JWT sessions.
- **Asset Preloader**: Immersive loading screen that pre-fetches critical backgrounds and logos to ensure flicker-free UI.
- **Dynamic Dashboard**: Responsive real-time data visualizations for RAG performance and KB status.
- **KB Knowledge Base**: Tree-based visualizations for browsing ingested data nodes.

---

## 🚀 Development

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Setup:
   Create a `.env.local` file with the following variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   APP_BASE_URL=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠️ Tech Stack

| Tool | Usage |
|------|-------|
| **Next.js** | React framework for SSR and routing. |
| **Framer Motion** | High-fidelity animations. |
| **Tailwind CSS** | Utility-first styling with custom retro variables. |
| **Lucide React** | Modern iconography. |
| **React Hot Toast** | Status notifications. |

---

## 📁 Structure

```bash
src/
├── app/            # Next.js App Router pages
├── components/     # Reusable UI components (Navbar, Preloader, CustomCursor, etc.)
├── hooks/          # Custom React hooks (useAuth)
├── lib/            # Utilities and API clients (auth-client, api, utils)
└── styles/         # Global CSS and Tailwind configs
```

---

## 📄 Deployment

The frontend is deployed on **Vercel** with a production base URL: `https://mindflareai.vercel.app`.

 Engineering excellence in UI design.
