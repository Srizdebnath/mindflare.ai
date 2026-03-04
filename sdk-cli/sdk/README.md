# mindflare-sdk (TS/JS) 🌌

Official TypeScript/JavaScript SDK for the **Mindflare AI** platform. Build AI-powered chatbots with RAG (Retrieval Augmented Generation) in minutes.

## 🚀 Installation

```bash
npm install mindflare-sdk
```

---

## ⚡ Quick Start

### Chat Integration (API Key Auth)

Use the `Mindflare` client to interact with your AI applications using RAG.

```typescript
import { Mindflare } from "mindflare-sdk";

const mf = new Mindflare({
  apiKey: "mf_secret_your_api_key",
  baseUrl: "https://mindflare-api.onrender.com", 
});

// Single-shot answer
const answer = await mf.ask("How does RAG work?");
console.log(answer);

// Full conversational chat
const response = await mf.chat({
  messages: [
    { role: "user", content: "What's in my knowledge base?" },
  ],
});
```

### Admin Management (JWT Auth)

```typescript
import { MindflareAdmin } from "mindflare-sdk";

const admin = new MindflareAdmin({
  baseUrl: "https://mindflare-api.onrender.com",
});

// Authenticate
await admin.auth.login({ email: "you@example.com", password: "password123" });

// Create a knowledge base from a PDF or Website
const kb = await admin.knowledgeBases.create({
  kb_name: "Manual v1",
  source_type: "website",
  source_url: "https://docs.example.com",
});
```

---

## 📄 API Reference

### `Mindflare` (Client)
- `.chat(options)`: Multi-turn chat with history.
- `.ask(question)`: Quick single-shot response.
- `.mountChat(selector)`: Inject a ready-to-use chat widget into your DOM.

### `MindflareAdmin` (Infrastructure)
- `admin.auth`: `login()`, `register()`, `me()`
- `admin.apps`: `list()`, `create()`, `delete()`, `updateConfig()`
- `admin.knowledgeBases`: `list()`, `create()`, `delete()`, `waitForReady()`

## 🤝 Support
Contact **@srizdebnath** on Discord or visit [mindflareai.vercel.app](https://mindflareai.vercel.app).

---

Developed by **Sriz Debnath**.
