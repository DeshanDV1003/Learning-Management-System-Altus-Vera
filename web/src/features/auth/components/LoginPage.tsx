import { useState } from 'react'
import { Eye, EyeOff, Loader2, HelpCircle } from 'lucide-react'
import { useLogin } from '../hooks/useLogin'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const login = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) login.mutate({ email, password })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-page)', fontFamily: "'Open Sans', sans-serif" }}>
      {/* Top accent bar */}
      <div style={{ height: '4px', backgroundColor: 'var(--color-accent)', width: '100%' }} />

      {/* Header bar — dark blue */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-top-bar)',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '50px',
        }}
      >
        {/* Hamburger menu placeholder */}
        <button
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Site header card — logo + welcome text */}
      <div
        style={{
          backgroundColor: 'var(--color-bg-header)',
          borderBottom: '1px solid var(--color-border)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '16px',
        }}
      >
        {/* Altus Vera Logo SVG */}
        <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="60,8 108,95 12,95" fill="#1E40AF" opacity="0.9" />
          <polygon points="60,8 84,55 36,55" fill="#3B82F6" />
          <polygon points="36,55 60,95 12,95" fill="#1D4ED8" opacity="0.8" />
          <polygon points="84,55 108,95 60,95" fill="#2563EB" opacity="0.85" />
          <polygon points="60,55 84,95 36,95" fill="#60A5FA" opacity="0.6" />
        </svg>
        <div>
          <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--color-heading)' }}>
            Welcome to Altus Vera LMS
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            Learning Management Platform
          </div>
        </div>
      </div>

      {/* Page content */}
      <div style={{ padding: '24px 16px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>

          {/* Login Card — left column */}
          <div style={{ flex: '1 1 320px', maxWidth: '460px' }}>
            <div
              className="card"
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                border: '1px solid var(--color-border-card)',
                borderRadius: '0',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '20px 24px' }}>
                {/* Error message */}
                {login.isError && (
                  <div
                    style={{
                      backgroundColor: '#f8d7da',
                      border: '1px solid #f5c6cb',
                      color: '#721c24',
                      padding: '10px 14px',
                      marginBottom: '16px',
                      borderRadius: '0',
                      fontSize: '14px',
                    }}
                  >
                    Invalid login, please try again
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Username/Email */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      required
                      className="form-control"
                      style={{ width: '100%' }}
                    />
                  </div>

                  {/* Password */}
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      className="form-control"
                      style={{ width: '100%', paddingRight: '36px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-muted)',
                        padding: '0',
                        display: 'flex',
                      }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Remember username checkbox */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      id="rememberme"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                    />
                    <label
                      htmlFor="rememberme"
                      style={{ fontSize: '14px', color: 'var(--color-text)', cursor: 'pointer', margin: 0 }}
                    >
                      Remember username
                    </label>
                  </div>

                  {/* Log in button */}
                  <button
                    type="submit"
                    disabled={login.isPending}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: '14px',
                      fontWeight: 400,
                      borderRadius: 'var(--radius-btn)',
                      opacity: login.isPending ? 0.75 : 1,
                    }}
                  >
                    {login.isPending && <Loader2 size={14} className="animate-spin" />}
                    {login.isPending ? 'Logging in...' : 'Log in'}
                  </button>
                </form>

                {/* Cookies notice */}
                <div
                  style={{
                    marginTop: '14px',
                    fontSize: '13px',
                    color: 'var(--color-text)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Cookies must be enabled in your browser</span>
                  <HelpCircle size={14} style={{ color: 'var(--color-link)', cursor: 'pointer' }} />
                </div>

                {/* Forgotten password */}
                <div style={{ marginTop: '12px', fontSize: '13px' }}>
                  <a href="#" style={{ color: 'var(--color-link)' }}>
                    Forgotten your username or password?
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Login instructions — right column */}
          <div style={{ flex: '1 1 260px' }}>
            <div
              className="card"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-card)',
                borderRadius: '0',
              }}
            >
              <div style={{ padding: '20px 24px' }}>
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--color-heading)',
                    marginBottom: '12px',
                    marginTop: 0,
                  }}
                >
                  Your Login instructions as follows
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6', margin: 0 }}>
                  For the username please use your <strong>email address</strong> registered in the system.
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6', marginTop: '10px', marginBottom: 0 }}>
                  For further queries, please contact the system administrator via{' '}
                  <a href="mailto:support@altusvera.lms" style={{ color: 'var(--color-link)' }}>
                    support@altusvera.lms
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-bg-top-bar)',
          color: '#ccc',
          textAlign: 'center',
          fontSize: '12px',
          padding: '8px',
        }}
      >
        &copy; {new Date().getFullYear()} Altus Vera Learning Management System
      </div>
    </div>
  )
}
