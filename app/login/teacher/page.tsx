"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'TEACHER' }),
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-green-300">
      <form onSubmit={handleSubmit} className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-2">Teacher Login</h2>
        <p className="text-center text-gray-500 mb-4">Manage sessions, mark attendance, and view your profile</p>
        <input
          type="email"
          placeholder="Teacher Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        {error && <div className="text-red-500 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-2">
          <span className="text-gray-500">Not registered? </span>
          <a href="/register-teacher" className="text-green-700 hover:underline font-semibold">Register as Teacher</a>
        </div>
        <div className="text-center mt-2">
          <a href="/" className="text-gray-400 hover:underline text-sm">Back to Home</a>
        </div>
      </form>
    </div>
  );
}
