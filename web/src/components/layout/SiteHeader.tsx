import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Events', to: '/events' },
  {
    label: 'My Courses',
    to: '/courses',
    children: [
      { label: 'All Courses', to: '/courses' },
      { label: 'In Progress', to: '/courses?filter=inprogress' },
      { label: 'Completed', to: '/courses?filter=completed' },
    ],
  },
  { label: 'Online Reference Materials', to: '/materials' },
  { label: 'Student Guidelines', to: '/guidelines' },
  { label: 'Feedback & Complaints', to: '/feedback' },
]

function NavItem({ item }: { item: (typeof navItems)[number] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/')

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  if ('children' in item && item.children) {
    return (
      <div ref={ref} style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '13px',
            color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
            fontWeight: isActive ? 600 : 400,
            padding: '8px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          {item.label}
          <ChevronDown size={12} />
        </button>
        {open && (
          <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 200 }}>
            {item.children.map((child) => (
              <Link
                key={child.to}
                to={child.to}
                className="dropdown-item"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      to={item.to}
      style={{
        fontSize: '13px',
        color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
        fontWeight: isActive ? 600 : 400,
        padding: '8px 10px',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        display: 'block',
      }}
    >
      {item.label}
    </Link>
  )
}

export function SiteHeader() {
  return (
    <>
      {/* Site logo + name bar */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-header)',
          borderBottom: '1px solid var(--color-border)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="60,8 108,95 12,95" fill="#1E40AF" opacity="0.9" />
            <polygon points="60,8 84,55 36,55" fill="#3B82F6" />
            <polygon points="36,55 60,95 12,95" fill="#1D4ED8" opacity="0.8" />
            <polygon points="84,55 108,95 60,95" fill="#2563EB" opacity="0.85" />
            <polygon points="60,55 84,95 36,95" fill="#60A5FA" opacity="0.6" />
          </svg>
          <div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--color-primary-dark)', lineHeight: 1.2 }}>
              ALTUS VERA
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
              LEARNING PLATFORM
            </div>
          </div>
        </Link>
      </div>

      {/* Horizontal navigation bar */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-header)',
          borderBottom: '2px solid var(--color-accent)',
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          flexShrink: 0,
        }}
      >
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} />
        ))}
      </div>
    </>
  )
}
