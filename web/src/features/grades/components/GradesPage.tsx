import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Folder, ClipboardList } from 'lucide-react'

type ReportTab = 'overview' | 'user'

interface GradeRow {
  id: number
  name: string
  calculatedWeight: string
  grade: string
  range: string
  percentage: string
  feedback: string
  contribution: string
  isCategory?: boolean
}

const mockGrades: GradeRow[] = [
  { id: 0, name: 'BS401.3-Business Policy and Strategy', calculatedWeight: '', grade: '', range: '', percentage: '', feedback: '', contribution: '', isCategory: true },
  { id: 1, name: 'Tutorial 01', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 2, name: 'Tutorial 02', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 3, name: 'Tutorial 03', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 4, name: 'Tutorial 04', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 5, name: 'Tutorial 05', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 6, name: 'Tutorial 06', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 7, name: 'Tutorial 07', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 8, name: 'Tutorial 08', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 9, name: 'Tutorial 09', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 10, name: 'Tutorial 10', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 11, name: 'Assignment Presentation slides', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 12, name: 'Assignment final Report submission', calculatedWeight: '0.00 %\n( Empty )', grade: '-', range: '0–100', percentage: '-', feedback: '-', contribution: '0.00 %' },
  { id: 99, name: 'Course total', calculatedWeight: '-', grade: '0.00', range: '0–100', percentage: '0.00 %', feedback: '-', contribution: '-', isCategory: false },
]

export function GradesPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [tab, setTab] = useState<ReportTab>('user')

  const courseName = courseId ? 'BS401.3-Business Policy and Strategy' : 'All courses'

  const thStyle: React.CSSProperties = {
    padding: '8px 10px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-heading)',
    borderBottom: '2px solid var(--color-border)',
    whiteSpace: 'nowrap',
  }

  const tdStyle: React.CSSProperties = {
    padding: '8px 10px',
    fontSize: '13px',
    color: 'var(--color-text)',
    borderBottom: '1px solid var(--color-border)',
    verticalAlign: 'top',
  }

  return (
    <div style={{ padding: '16px 20px' }}>
      <h2 style={{ fontSize: '18px', color: 'var(--color-heading)', marginBottom: 16, fontWeight: 600 }}>
        User report - <span style={{ fontWeight: 400 }}>DVD Silva</span>
      </h2>

      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: 20, border: '1px solid var(--color-border)', borderRadius: 4, overflow: 'hidden' }}>
        <button
          onClick={() => setTab('overview')}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            backgroundColor: tab === 'overview' ? '#51666C' : 'var(--color-bg-page)',
            color: tab === 'overview' ? '#fff' : 'var(--color-text)',
            fontWeight: tab === 'overview' ? 600 : 400,
          }}
        >
          Overview report
        </button>
        <button
          onClick={() => setTab('user')}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            borderLeft: '1px solid var(--color-border)',
            cursor: 'pointer',
            fontSize: '14px',
            backgroundColor: tab === 'user' ? '#51666C' : 'var(--color-bg-page)',
            color: tab === 'user' ? '#fff' : 'var(--color-text)',
            fontWeight: tab === 'user' ? 600 : 400,
          }}
        >
          User report
        </button>
      </div>

      {tab === 'user' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--color-bg-page)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-nav-drawer)' }}>
                <th style={thStyle}>Grade item</th>
                <th style={thStyle}>Calculated weight</th>
                <th style={thStyle}>Grade</th>
                <th style={thStyle}>Range</th>
                <th style={thStyle}>Percentage</th>
                <th style={thStyle}>Feedback</th>
                <th style={{ ...thStyle, fontSize: '12px' }}>Contribution to total</th>
              </tr>
            </thead>
            <tbody>
              {mockGrades.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor: row.isCategory ? 'var(--color-bg-nav-drawer)' : row.name === 'Course total' ? 'var(--color-bg-nav-drawer)' : 'var(--color-bg-page)',
                  }}
                >
                  <td style={{ ...tdStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {row.isCategory ? (
                      <>
                        <Folder size={16} color="#666" />
                        <span style={{ fontWeight: 600, color: 'var(--color-heading)' }}>{row.name}</span>
                      </>
                    ) : row.name === 'Course total' ? (
                      <span style={{ fontWeight: 600 }}>{row.name}</span>
                    ) : (
                      <>
                        <ClipboardList size={16} color="#1565c0" style={{ flexShrink: 0 }} />
                        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#1565c0', textDecoration: 'none', fontSize: '13px' }}>
                          {row.name}
                        </a>
                      </>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {row.calculatedWeight.split('\n').map((line, i) => (
                      <div key={i} style={{ color: i === 1 ? '#888' : 'var(--color-text)', fontSize: i === 1 ? '12px' : '13px' }}>{line}</div>
                    ))}
                  </td>
                  <td style={tdStyle}>{row.grade}</td>
                  <td style={tdStyle}>{row.range}</td>
                  <td style={tdStyle}>{row.percentage}</td>
                  <td style={tdStyle}>{row.feedback}</td>
                  <td style={tdStyle}>{row.contribution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'overview' && (
        <div style={{ padding: 20, color: 'var(--color-text-muted)', textAlign: 'center' }}>
          Overview report for {courseName}
        </div>
      )}
    </div>
  )
}
