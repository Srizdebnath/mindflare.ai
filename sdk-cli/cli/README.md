# mindflare-cli 🚀

The official command-line interface for the **Mindflare AI** platform. Manage apps, ingest knowledge bases, and deploy bots directly from your terminal.

---

## 💻 Installation

```bash
npm install -g mindflare-cli
```
*Or run directly via npx:*
```bash
npx mindflare-cli --help
```

## ⚡ Main Usage

### 🔐 Authentication
```bash
# Register or Login
mindflare login
```

### 🧠 Knowledge Base Management
```bash
# Ingest from a website
mindflare kb create -n "My Docs" -t website -u https://example.com/docs --wait

# Ingest from a GitHub Repo
mindflare kb create -n "Repo Engine" -t github -u https://github.com/user/repo --wait
```

### 📱 Deployment
```bash
# Connect to WhatsApp in one command
mindflare whatsapp
```

### 💬 Neural Chat
```bash
# Start an interactive RAG session
mindflare chat --api-key mf_app_secret_abc123
```

---

## 🛠️ Configuration

Configure the CLI to hit your production or local server:

```bash
# Point to your custom API deployment
mindflare config --set-url https://mindflare-api.onrender.com
```

Stored configuration is available at `~/.config/mindflare/config.json`.

## 🤝 Community
Engineering excellence by **Sriz Debnath**. 
Discord: `srizdebnath` | Website: [mindflareai.vercel.app](https://mindflareai.vercel.app)
