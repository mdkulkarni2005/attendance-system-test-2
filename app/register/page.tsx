"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const departments = ["Mechanical", "Computer", "Electrical", "Civil", "Electronics"];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    rollNo: '',
    sapId: '',
    department: '',
    year: '',
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
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, year: Number(form.year) }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/login');
    } else {
      const err = await res.json();
      setError(err.error || 'Registration failed');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Student Registration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Roll No</label>
            <input name="rollNo" value={form.rollNo} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">SAP ID</label>
            <input name="sapId" value={form.sapId} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <select name="department" value={form.department} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400">
              <option value="">Select</option>
              {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input name="year" type="number" min="1" max="4" value={form.year} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
        </div>
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mt-6 transition duration-200 disabled:opacity-60" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-green-700 hover:underline font-medium">Login here</a>
        </div>
      </form>
    </div>
  );
}
