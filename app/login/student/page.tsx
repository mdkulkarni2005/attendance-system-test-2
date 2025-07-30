"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'STUDENT' }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/');
    } else {
      try {
        const err = await res.json();
        setError(err.error || 'Login failed');
      } catch {
        setError('Login failed');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500">
      <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-2">Student Login</h2>
        <p className="text-center text-gray-500 mb-4">Access your attendance, sessions, and profile</p>
        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {error && <div className="text-red-500 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-2">
          <span className="text-gray-500">Not registered? </span>
          <a href="/register" className="text-blue-700 hover:underline font-semibold">Register as Student</a>
        </div>
        <div className="text-center mt-2">
          <a href="/" className="text-gray-400 hover:underline text-sm">Back to Home</a>
        </div>
      </form>
    </div>
  );
}
