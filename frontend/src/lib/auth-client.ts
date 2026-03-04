import Cookies from 'js-cookie';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AUTH_COOKIE_NAME = 'mf_token';

export async function login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    if (data.token) {
        // Set cookie for middleware/server-side (expires in 7 days)
        Cookies.set(AUTH_COOKIE_NAME, data.token, { expires: 7, secure: process.env.NODE_ENV === 'production' });
        localStorage.setItem('token', data.token);
    }

    return data;
}

export async function signup(name: string, email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');

    return data;
}

export function logout() {
    Cookies.remove(AUTH_COOKIE_NAME);
    localStorage.removeItem('token');
    window.location.href = '/login';
}

export async function getProfile(token: string) {
    const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch profile');

    return data;
}
