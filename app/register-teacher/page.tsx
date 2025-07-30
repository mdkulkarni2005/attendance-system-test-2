"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const departments = ["Mechanical", "Computer", "Electrical", "Civil", "Electronics"];

export default function RegisterTeacherPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    yearsOfExp: '',
    subjects: '', // comma separated
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/register-teacher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, yearsOfExp: Number(form.yearsOfExp) }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/login');
    } else {
      try {
        const err = await res.json();
        setError(err.error || 'Registration failed');
      } catch {
        setError('Registration failed');
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">Teacher Registration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <select name="department" value={form.department} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="">Select</option>
              {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Years of Experience</label>
            <input name="yearsOfExp" type="number" min="0" value={form.yearsOfExp} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Subjects (comma separated)</label>
            <input name="subjects" value={form.subjects} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
        </div>
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded mt-6 transition duration-200 disabled:opacity-60" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-yellow-700 hover:underline font-medium">Login here</a>
        </div>
      </form>
    </div>
  );
}
