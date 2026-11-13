import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { LogOut, BookOpen, LayoutDashboard, Calendar, Bell, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'My Courses', icon: BookOpen, to: '/courses' },
  { label: 'Calendar', icon: Calendar, to: '/calendar' },
]

export function AppShell() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated()) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
          <svg width="32" height="32" viewBox="0 0 120 120" fill="none">
            <polygon points="60,8 108,95 12,95" fill="#1E40AF" opacity="0.9" />
            <polygon points="60,8 84,55 36,55" fill="#3B82F6" />
            <polygon points="36,55 60,95 12,95" fill="#1D4ED8" opacity="0.8" />
            <polygon points="84,55 108,95 60,95" fill="#2563EB" opacity="0.85" />
            <polygon points="60,55 84,95 36,95" fill="#60A5FA" opacity="0.6" />
          </svg>
          <div>
            <div className="font-bold text-sm text-white">ALTUS VERA</div>
            <div className="text-[10px] text-blue-400 tracking-widest uppercase">LMS Platform</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(({ label, icon: Icon, to }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition',
                location.pathname === to
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
              {user?.fullName?.charAt(0) ?? 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.fullName}</p>
              <p className="text-xs text-slate-400 truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition w-full px-2 py-1.5 rounded-md hover:bg-slate-800"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6 lg:hidden">
          <div className="font-bold text-white">ALTUS VERA LMS</div>
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-slate-400" />
            <User size={18} className="text-slate-400" />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
