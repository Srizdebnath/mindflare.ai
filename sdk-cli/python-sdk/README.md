# mindflare-py (Python SDK) 🐍

The official Python client for the **Mindflare AI** platform. Built for deep integration into your backend microservices and automated agent pipelines.

---

## 🚀 Installation

```bash
pip install mindflare-py
```

## ⚡ Quick Start

### Chat with RAG (API Key Auth)

```python
from mindflare import Mindflare

mf = Mindflare(
    apiKey="mf_secret_your_api_key",
    baseUrl="https://mindflare-api.onrender.com",
)

# Single answer with context
answer = mf.ask("How does neural orchestration work?")
print(answer)

# Full chat lifecycle
response = mf.chat(messages=[
    {"role": "user", "content": "What is in my knowledge base?"}
])
```

### Admin Operations (JWT Auth)

Manage apps and KBs programmatically:

```python
from mindflare import MindflareAdmin

admin = MindflareAdmin(baseUrl="https://mindflare-api.onrender.com")

# Start session
admin.auth.login(email="you@example.com", password="password123")

# Create a knowledge base from a PDF
new_kb = admin.knowledge_bases.create(
    kb_name="Manual v1.0",
    source_type="file",
    source_path="~/docs/manual.pdf"
)
```

## 🤝 Community
Discord: `srizdebnath` | Website: [mindflareai.vercel.app](https://mindflareai.vercel.app)
