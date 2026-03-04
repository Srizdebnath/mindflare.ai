// Central API base URL — reads from environment variable.
// In production (Vercel), set NEXT_PUBLIC_API_URL=https://mindflare-api.onrender.com/api
// In development, it defaults to http://localhost:5000/api
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default API_BASE;
