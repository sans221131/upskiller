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

    // Simple auth check (in production, this should be an API call)
    if (email === 'admin@upskillers.com' && password === 'admin123') {
      // Store auth token (simplified)
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', email);
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">U</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Login</h1>
          <p className="text-slate-600">Sign in to access the Upskillers admin dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-red-700 text-sm">
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
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
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
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="bg-slate-50 rounded-xl p-4 text-sm">
              <div className="font-semibold text-slate-700 mb-2">Demo Credentials:</div>
              <div className="text-slate-600 space-y-1">
                <div>Email: <code className="bg-slate-200 px-2 py-0.5 rounded">admin@upskillers.com</code></div>
                <div>Password: <code className="bg-slate-200 px-2 py-0.5 rounded">admin123</code></div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="text-teal-600 hover:text-teal-700 font-medium">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
