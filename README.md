# MindflareAI 🌌

Enterprise-grade AI SaaS platform for building, deploying, and scaling intelligent neural networks, RAG pipelines, and automated AI agents.

## 🚀 Overview

MindflareAI is a comprehensive "Orchestration-as-a-Service" platform designed for developers who want to integrate grounded AI into their applications without managing complex infrastructure. It provides a seamless bridge between your data and LLMs using advanced Retrieval Augmented Generation (RAG).

### Key Features
- **Neural Orchestration**: Manage multiple AI agents and pipelines from a single dashboard.
- **Auto-RAG Knowledge Bases**: Instantly ingest PDFs, websites, and GitHub repos into vector space.
- **Enterprise Security**: Multilayer authentication with native MongoDB sessions, standard JWTs, and secure CLI keys.
- **Developer First**: Robust CLI tool, TypeScript SDK, and Python SDK for deep integration.
- **WhatsApp Integration**: Deploy your knowledge bases directly to WhatsApp with one command.

---

## 🏗️ Architecture

MindflareAI follows a modern, distributed architecture:

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | [Next.js](frontend/) | Retro-styled, high-performance dashboard with Framer Motion animations. |
| **Backend** | [Flask](backend/) | Scalable Python API handling RAG logic, user management, and AI orchestration. |
| **Database** | MongoDB Atlas | Global document store for users, applications, and knowledge metadata. |
| **SDK / CLI** | [Node.js / TS](sdk-cli/) | Developer tools for programmatic access and terminal-based management. |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- MongoDB Atlas account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Srizdebnath/mindflare.ai.git
   cd mindflare.ai
   ```

2. **Setup Backend**:
   Refer to the [Backend README](backend/README.md) for environment configuration and dependencies.

3. **Setup Frontend**:
   Refer to the [Frontend README](frontend/README.md) for local development setup.

4. **Install CLI Tool**:
   ```bash
   npm install -g mindflare-cli
   ```

---

## 📄 Documentation

Detailed documentation is available in the [Docs Page](https://mindflareai.vercel.app/docs) once the application is running.

## 🤝 Community & Support

- **Discord**: Connect with `srizdebnath`
- **GitHub**: [Open an issue](https://github.com/Srizdebnath/mindflare.ai/issues)
- **Website**: [mindflareai.vercel.app](https://mindflareai.vercel.app)

---

Developed with ❤️ Engineering excellence in AI orchestration.
