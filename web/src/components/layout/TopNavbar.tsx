import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, MessageSquare, Menu, Sun, Moon, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'

export function TopNavbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <>
      {/* Teal accent bar */}
      <div style={{ height: '4px', backgroundColor: 'var(--color-accent)', flexShrink: 0 }} />

      {/* Main top bar */}
      <nav
        style={{
          backgroundColor: 'var(--color-bg-top-bar)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          height: '50px',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          gap: '4px',
        }}
      >
        {/* Hamburger */}
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px',
          }}
          title="Toggle navigation"
        >
          <Menu size={22} />
        </button>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Search icon / inline search */}
        {searchOpen ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false) }}
              placeholder="Search courses..."
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
                color: '#fff',
                padding: '4px 10px',
                fontSize: '13px',
                outline: 'none',
                width: '200px',
              }}
            />
            <button
              onClick={() => setSearchOpen(false)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '16px' }}
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}
            title="Search"
          >
            <Search size={18} />
          </button>
        )}

        {/* Notifications */}
        <button
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', position: 'relative' }}
          title="Notifications"
        >
          <Bell size={18} />
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              backgroundColor: 'red',
              borderRadius: '50%',
              fontSize: '0',
            }}
          />
        </button>

        {/* Messages */}
        <button
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}
          title="Messages"
        >
          <MessageSquare size={18} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
        </button>

        {/* User menu */}
        <div ref={menuRef} style={{ position: 'relative', marginLeft: '4px' }}>
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#fff',
              padding: '4px 6px',
              borderRadius: '4px',
            }}
          >
            {/* Avatar circle */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#00B3A1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <ChevronDown size={14} />
          </button>

          {userMenuOpen && (
            <div
              className="dropdown-menu"
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 4px)',
                minWidth: '200px',
              }}
            >
              {/* User info header */}
              <div
                style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--color-border)',
                  fontSize: '13px',
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--color-heading)' }}>{user?.fullName}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>{user?.email}</div>
                <div
                  style={{
                    display: 'inline-block',
                    marginTop: '4px',
                    padding: '1px 8px',
                    backgroundColor: 'var(--color-badge-blue)',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '11px',
                  }}
                >
                  {user?.role}
                </div>
              </div>
              <Link
                to="/profile"
                className="dropdown-item"
                onClick={() => setUserMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/grades"
                className="dropdown-item"
                onClick={() => setUserMenuOpen(false)}
              >
                Grades
              </Link>
              <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '4px', paddingTop: '4px' }}>
                <button
                  onClick={handleLogout}
                  className="dropdown-item"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#dc3545',
                    fontFamily: 'inherit',
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
