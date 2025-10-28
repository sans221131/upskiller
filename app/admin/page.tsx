'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? 'Unable to sign in');
      }

      const payload = (await response.json()) as {
        token?: string;
        admin?: { email?: string };
      };
      const authToken = payload.token ?? '';

      if (authToken) {
        localStorage.setItem('adminAuthToken', authToken);
      } else {
        localStorage.removeItem('adminAuthToken');
      }
      localStorage.setItem('adminEmail', payload.admin?.email ?? email);

      router.replace('/admin/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to sign in';
      setError(message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src="/logo.jpg" alt="Upskillers" className="w-16 h-16 rounded-2xl shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Login</h1>
          <p className="text-slate-600">Sign in to access the Upskillers admin dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:outline-none transition-all focus:border-[var(--brand)] text-slate-900"
                placeholder="admin@upskillers.com"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:outline-none transition-all focus:border-[var(--brand)] text-slate-900"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl font-semibold transition-all disabled:opacity-50 shadow-lg text-white"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Demo credentials removed as requested */}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="font-medium transition-all" style={{ color: 'var(--brand)' }}>
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
