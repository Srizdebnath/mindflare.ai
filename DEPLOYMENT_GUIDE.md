# Mindflare AI Deployment Guide

Currently, Mindflare AI runs fully on your local machine using localhost for the frontend, backend, MongoDB, and Redis. To deploy this to the internet so others can use it, you need to move each component to a cloud provider. 

Here is the recommended stack for easiest deployment (mostly free-tier friendly):
1. **Database**: MongoDB Atlas
2. **Cache / Task Broker**: Redis Labs or Upstash
3. **Backend API**: Render (already configured via `render.yaml`)
4. **Frontend App**: Vercel

Follow these steps exactly to migrate from `localhost` to production.

---

## Step 1: Deploy MongoDB to MongoDB Atlas
Your `/backend/.env` uses `MONGO_URI=mongodb://localhost:27017/mindflare`. We need a cloud database.
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new **Free Cluster (M0)**.
3. In the left sidebar, scroll down to the **SECURITY** section and click on **Database & Network Access**.
4. In the Database Users tab, create a new user and password (save this password).
5. In the Network Access tab, add `0.0.0.0/0` (Allow access from anywhere) so your cloud backend can connect to it.
   *(Alternatively, you can just click the **Connect** button under your cluster or the **Get connection string** button. It will open a wizard that prompts you to create a user and whitelist IPs before showing the connection string.)*
6. Click **Connect -> Connect your application** (or choose Driver/Application) and copy the URI string. It will look like this:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/mindflare?retryWrites=true&w=majority`
7. Replace `<username>` and `<password>` with your newly created database user credentials. Save this string; this is your new production `MONGO_URI`.

---

## Step 2: Deploy Redis to Upstash or Redis Cloud
Your backend uses `REDIS_URL=redis://localhost:6379/0` (likely for Celery/background tasks or caching).
1. Go to [Upstash](https://upstash.com/) and sign up.
2. Click **Create Database** and give it a name like `mindflare-redis`.
3. In your database dashboard, look for the grey box near the top. You want the part starting with `rediss://`. For example: `rediss://default:YOUR_PASSWORD@warm-gibbon-40117.upstash.io:6379`
   *(Note: Make sure your UPSTASH password does not have special characters that break URLs. You can also find this format by scrolling down to the **Connect** section, choosing the **Language** as Python, and clicking the **redis-py** tab.)*
4. Save this string; this is your new production `REDIS_URL`.

---

## Step 3: Deploy the Backend to Render
You already have a `render.yaml` file in `/backend`, which means your codebase is ready for Render.
1. Push all your code to a GitHub repository.
2. Go to [Render](https://render.com/) and create an account.
3. Click **New +** -> **Blueprint** and connect your GitHub repostiory.
4. Render will automatically read your `render.yaml` and try to deploy the `mindflare-api` service.
5. During setup (or in the Render dashboard under your Web Service -> Environment), you must add your production Environment Variables. 
   **Copy all values from `/backend/.env` but replace these:**
   - `MONGO_URI` = *(Your new MongoDB Atlas URL)*
   - `REDIS_URL` = *(Your new Upstash Redis URL)*
   - `FRONTEND_URL` = *(Leave blank for now, you will update this in Step 5)* 
6. Let the deployment finish. Once done, Render will give you a public URL (e.g., `https://mindflare-api.onrender.com`).
7. Save this URL; this is your production API link.

---

## Step 4: Deploy the Frontend to Vercel
1. Go to [Vercel](https://vercel.com/) and log in with GitHub.
2. Click **Add New Project** and import your Mindflare GitHub repository.
3. **Important**: In the Framework Preset, it should detect **Next.js**. Set the **Root Directory** to `frontend`.
4. Open the **Environment Variables** section and copy everything from your `frontend/.env.local`. 
   **You must update these values:**
   - `APP_BASE_URL` = *(You won't know this until Vercel generates a URL, so deploy first and add it later, or configure a custom domain ahead of time)*
   - `NEXT_PUBLIC_API_URL` = `https://mindflare-api.onrender.com/api` *(Your Render URL from Step 3)*
5. Click **Deploy**. Vercel will build the frontend and give you a public domain (e.g., `https://mindflare.vercel.app`).

---

## Step 5: Final Hookups and Security
Now that your backend and frontend are in the cloud, they need to know each other's production URLs.

1. **Update Frontend URL in Backend:**
   - Go back to Render Dashboard -> Web Service -> Environment.
   - Set `FRONTEND_URL` to your new Vercel domain (e.g., `https://mindflare.vercel.app`).
   - Render will trigger a new deployment automatically.

2. **Update Auth0 Settings:**
   Your Auth0 configuration in `frontend/.env.local` points to `localhost:3000`. You MUST update this in Auth0.
   - Log into your [Auth0 Dashboard](https://manage.auth0.com/).
   - Go to **Applications** and select your Next.js application.
   - Under **Allowed Callback URLs**, add your Vercel domain: 
   - Under **Allowed Logout URLs**, add: `https://mindflare.vercel.app`
   - Under **Allowed Web Origins**, add: `https://mindflare.vercel.app`
   - Save changes.
   - Now in Vercel, go to your project **Settings -> Environment Variables**, and ensure `APP_BASE_URL` is exactly `https://mindflare.vercel.app`. Redeploy if you changed it.

3. **Update GitHub OAuth App (If you have Github integration):**
   - Go to GitHub -> Settings -> Developer settings -> OAuth Apps.
   - Select your Mindflare app.
   - Change the **Homepage URL** to your Vercel URL.
   - Change the **Authorization callback URL** to your Render API URL (e.g., `https://mindflare-api.onrender.com/api/github/callback` or whatever your callback route is).

---

## Checklist to insure everything is working:
- [ ] Visit your Vercel URL and check that the site loads.
- [ ] Try logging in (Auth0 should redirect successfully back to your vercel domain).
- [ ] Try creating an app (It should hit your Render backend and save to MongoDB Atlas).
- [ ] Check if knowledge base ingestion completes (This relies on Celery and Upstash Redis).
