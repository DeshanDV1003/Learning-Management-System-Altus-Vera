import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

interface CourseCardProps {
  id: number
  name: string
  code: string
  semester: string
  progress: number
  color?: string
  thumbnail?: string
}

// Colour palette cycling for course thumbnails (matching NLearn's teal/blue/green style)
const THUMB_COLORS = [
  'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)',
  'linear-gradient(135deg, #00897B 0%, #004D40 100%)',
  'linear-gradient(135deg, #5E35B1 0%, #311B92 100%)',
  'linear-gradient(135deg, #E53935 0%, #B71C1C 100%)',
  'linear-gradient(135deg, #00ACC1 0%, #006064 100%)',
  'linear-gradient(135deg, #43A047 0%, #1B5E20 100%)',
]

export function CourseCard({ id, name, code, semester, progress, color }: CourseCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const thumbColor = color ?? THUMB_COLORS[id % THUMB_COLORS.length]

  return (
    <div
      className="card"
      style={{
        border: '1px solid var(--color-border-card)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px var(--color-shadow)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = 'none')}
    >
      {/* Three-dot menu */}
      <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10 }}>
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v) }}
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          <MoreHorizontal size={15} />
        </button>
        {menuOpen && (
          <div
            className="dropdown-menu"
            style={{ position: 'absolute', right: 0, top: '100%', zIndex: 20, minWidth: '140px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dropdown-item">Mark as complete</div>
            <div className="dropdown-item">Remove from view</div>
            <div className="dropdown-item">Hide</div>
            <div className="dropdown-item" style={{ color: '#dc3545' }}>Unstar</div>
          </div>
        )}
      </div>

      {/* Thumbnail */}
      <Link to={`/courses/${id}`} style={{ textDecoration: 'none' }}>
        <div
          style={{
            height: '100px',
            background: thumbColor,
            backgroundColor: 'var(--color-bg-thumb)',
          }}
        />

        {/* Card body */}
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            {semester}
          </div>
          <div
            style={{
              fontSize: '13px',
              color: 'var(--color-heading)',
              fontWeight: 500,
              lineHeight: 1.4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {name}
          </div>

          {/* Progress bar */}
          <div className="progress-bar-container" style={{ marginTop: '10px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {progress}% complete
          </div>
        </div>
      </Link>
    </div>
  )
}
