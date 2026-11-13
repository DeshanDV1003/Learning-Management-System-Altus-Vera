import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useLogin } from '../hooks/useLogin'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const login = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) login.mutate({ email, password })
  }

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left branding panel */}
      <div
        className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D1B2E 0%, #152339 55%, #1D4ED8 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 800 600" className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="600" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="60,8 108,95 12,95" fill="#1E40AF" opacity="0.9" />
            <polygon points="60,8 84,55 36,55" fill="#3B82F6" />
            <polygon points="36,55 60,95 12,95" fill="#1D4ED8" opacity="0.8" />
            <polygon points="84,55 108,95 60,95" fill="#2563EB" opacity="0.85" />
            <polygon points="60,55 84,95 36,95" fill="#60A5FA" opacity="0.6" />
          </svg>
          <div>
            <div className="font-bold text-xl tracking-wide text-white">ALTUS VERA</div>
            <div className="text-xs tracking-widest uppercase text-blue-300">Learning Management System</div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold leading-tight mb-4 text-white">
            Empower Your<br />
            <span className="text-blue-300">Learning Journey</span>
          </h1>
          <p className="text-base max-w-sm leading-relaxed text-blue-100">
            One platform for students and lecturers — access course materials, submit assignments, and track your progress.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Courses', 'Assignments', 'Grades', 'Announcements', 'Resources', 'Calendar'].map((m) => (
              <span
                key={m}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs backdrop-blur-sm text-white"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-blue-400">
          &copy; {new Date().getFullYear()} Altus Vera. Learning Management System.
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-950">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <svg width="32" height="32" viewBox="0 0 120 120" fill="none">
              <polygon points="60,8 108,95 12,95" fill="#1E40AF" opacity="0.9" />
              <polygon points="60,8 84,55 36,55" fill="#3B82F6" />
            </svg>
            <div>
              <div className="font-bold text-lg text-white">ALTUS VERA</div>
              <div className="text-xs text-blue-300">LMS Platform</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-sm text-slate-400 mb-8">Sign in to your account to continue</p>

          {login.isError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {(login.error as any)?.response?.data?.error ?? 'Invalid credentials. Please try again.'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@altusvera.lms"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 pr-10 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={login.isPending}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              {login.isPending && <Loader2 size={16} className="animate-spin" />}
              {login.isPending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Altus Vera. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
