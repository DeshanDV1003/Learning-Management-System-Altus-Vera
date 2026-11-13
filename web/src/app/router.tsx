import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AppShell } from '../components/layout/AppShell'

const LoginPage     = lazy(() => import('../features/auth/components/LoginPage'))
const DashboardPage = lazy(() => import('../features/dashboard/components/DashboardPage'))
const CoursePage    = lazy(() => import('../features/courses/components/CoursePage').then(m => ({ default: m.CoursePage })))

function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--color-border)',
          borderTopColor: 'var(--color-accent)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    element: <AppShell />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: '/courses/:courseId',
        element: (
          <Suspense fallback={<Loading />}>
            <CoursePage />
          </Suspense>
        ),
      },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
])
