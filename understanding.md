# Mindflare AI Codebase Understanding

This document serves as a comprehensive guide for AI agents and developers to quickly understand the structure, architecture, and features of the **Mindflare AI** platform. Read this document before taking actions on the codebase to avoid repetitive analysis steps.

## Overview

Mindflare AI is a platform for building AI-powered chatbots with built-in Retrieval-Augmented Generation (RAG). Providers and users can manage AI Assistant "Applications", ingest structured data (Websites, PDFs, GitHub Repos) into "Knowledge Bases", and chat with their structured data using OpenRouter/Groq language models.

The project is structured as a monorepo containing a full-stack web application (Frontend + Backend) along with corresponding SDKs and a CLI tool.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion, `@auth0/nextjs-auth0`.
- **Backend**: Python, Flask, FAISS (Vector Database / Embeddings), MongoDB (Main Database).
- **SDK & CLI**: TypeScript, Node.js (`tsup` for bundling).
- **Core AI Integration**: OpenRouter, local embedded models, and FAISS for RAG.

## Project Structure

```text
/home/ansh/projects/mindflare.ai
├── frontend/             # Next.js web application (Dashboard & Landing)
├── backend/              # Python Flask API
├── sdk-cli/              # Monorepo for public API tools
│   ├── sdk/              # JS/TS SDK (mindflare-sdk)
│   ├── cli/              # Command Line Interface (mindflare-cli)
│   └── python-sdk/       # Python SDK equivalent
└── package.json          # Monorepo root package containing NPM workspaces
```

### 1. `backend/` (The Core API Engine)
The Flask backend acts as the central engine for authentication, data ingestion, database management, and AI chatting.

**Key Files & Blueprints:**
- `app.py`: Entry point for the Flask server. Wires up CORS, registers routing blueprints, and configures error handling.
- `applications.py`: Routes for managing App resources (`/api/applications`). Handles secure API key creation (API keys are one-way hashed for authentication, and symmetrically encrypted for viewing within the dashboard). Contains logic for updating app config (models, system prompts) and linking Knowledge Bases.
- `knowledge_base.py` & `ingestion.py`: Manage Knowledge Base creation and ingestion. Supports parsing Websites (via crawling/scraping), GitHub repositories, and PDFs. Embeddings are stored in the `/backend/faiss_indices/` folder.
- `chat.py`: Exposes routing for the AI generation flow (`/api/chat`).
  - Production chat: Uses custom Application API keys for authorization.
  - Playground chat: Uses Auth0 JWTs.
  - Implements `_retrieve_context()` to query FAISS indices and augment the LLM prompt with retrieved Knowledge Base chunks.
- `database.py`: MongoDB connection handling and collection definitions (Users, Applications, KBs, Analytics, etc.).
- `auth.py` / `auth_routes.py`: Middleware handling Auth0 webhooks and JWT-based request verification `requires_auth`.

### 2. `frontend/` (The Web Dashboard)
A modern Next.js 14+ application designed for users to configure and manage their Mindflare setups.

**Key Directories:**
- `src/app/`: Uses the Next.js App Router for all routes.
  - `/dashboard`: Main user hub.
  - `/applications`: Create & configure chatbots. Connect them to Knowledge Bases.
  - `/knowledge-base`: Interface to upload PDFs, attach Github Repos, and scrape URLs.
  - `/analytics`: Usage statistics.
  - `/api/auth/[...auth0]/`: Auth0 API handlers.
  - `/widget`: A chat widget meant to be embedded on user websites to expose Mindflare apps to the public.

### 3. `sdk-cli/` (Developer Tooling)
Mindflare enables developers to integrate the AI capabilities directly into codebases or terminals. It separates concerns between "Client" and "Admin" flows.

- **`sdk/` (TypeScript SDK)**: Provides the `Mindflare` class for End-User chat endpoints (using an App API Key), and the `MindflareAdmin` class for managing Apps and Data programmatically via JWT Auth.
- **`cli/` (Node.js CLI Tool)**: Provides the `mindflare` command. Features interactive chat (`mindflare chat`), declarative UI data ingestion (`mindflare kb create`), and app administration.

## Core Workflows & Logic Maps

### 1. Authentication Dual-Layer Architecture
Backend route authorization is split strictly into two domains:
- **Admin/Dashboard Layer**: Verified via Auth0 JWTs. Routes in the dashboard, configuring settings, and using the dashboard playground utilize this.
- **Agent/Execution Layer**: Verified via Mindflare App API Keys. When consuming the SDK or calling external production chats, the `api_key_hash` is matched directly in the MongoDB to execute interactions.

### 2. Knowledge Base Ingestion Flow
1. User requests a new Knowledge base (Website, PDF, or Github repo) in the dashboard or via CLI.
2. `knowledge_base.py/create_knowledge_base` is invoked.
3. Relevant scrapers/parsers (`ingestion.py`) are spun up. Text is chunked, cleaned, and vectorized using text-embedding models.
4. Embedded vectors go to the `faiss_indices/` folder, and metadata goes to MongoDB.

### 3. Retrieval Augmented Generation (RAG) Flow
1. User queries `/api/chat` using their given SDK/Widget.
2. `chat.py` receives the query, and extracts the target Application ID from the provided API key.
3. The engine grabs all Knowledge Base IDs tied to the Application config.
4. `_retrieve_context()` embeds the user query, does a FAISS similarity search across indexed vectors, and fetches top-$K$ metadata chunks.
5. The matching chunk strings are appended to the system prompt of the LLM context wrapper.
6. The chat is forwarded to OpenRouter / custom LLM to return the completion to the user.

## Running the Project Locally
The monorepo uses `npm` workspaces. To run various parts:
- **Frontend Server**: `npm run dev:frontend`
- **Backend Server**: `npm run dev:backend` (requires starting a python `venv` and installing `requirements.txt`)
- **Build SDK/CLI**: `npm run build:sdk` or `npm run build:cli`

*Ensure `.env` values for Auth0, MongoDB URI, OpenRouter API Keys, etc. are properly mapped.*
