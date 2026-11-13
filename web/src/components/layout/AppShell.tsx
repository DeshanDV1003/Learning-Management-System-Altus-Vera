import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { TopNavbar } from './TopNavbar'
import { SiteHeader } from './SiteHeader'
import { NavDrawer } from './NavDrawer'

export function AppShell() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (!isAuthenticated()) return <Navigate to="/login" replace />

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-page)',
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      {/* Top navbar (dark blue bar + teal line) */}
      <TopNavbar onToggleSidebar={() => setDrawerOpen((v) => !v)} />

      {/* Site header (logo bar + horizontal nav) */}
      <SiteHeader />

      {/* Body: optional drawer + main content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <NavDrawer open={drawerOpen} />

        {/* Page content */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
