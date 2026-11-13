import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FileText, BookOpen, ClipboardList, Info, CheckSquare, Square, ChevronRight, ChevronDown } from 'lucide-react'

interface CourseItem {
  id: number
  title: string
  type: 'pdf' | 'assignment' | 'forum' | 'resource'
  submitted?: boolean
  submittedDate?: string
  dueDate?: string
  completed?: boolean
}

interface CourseSection {
  id: number
  title: string
  items: CourseItem[]
  collapsed?: boolean
}

const mockSections: CourseSection[] = [
  {
    id: 1,
    title: 'Announcements',
    items: [
      { id: 1, title: 'Announcements', type: 'forum', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Lecture Notes',
    items: [
      { id: 10, title: 'Lecture Note 01', type: 'pdf', completed: true },
      { id: 11, title: 'Lecture Note 02', type: 'pdf', completed: true },
      { id: 12, title: 'Lecture Note 03', type: 'pdf', completed: true },
      { id: 13, title: 'Lecture Note 04', type: 'pdf', completed: true },
      { id: 14, title: 'Lecture Note 05', type: 'pdf', completed: true },
      { id: 15, title: 'Lecture Note 06', type: 'pdf', completed: false },
      { id: 16, title: 'Lecture Note 07', type: 'pdf', completed: false },
      { id: 17, title: 'Lecture Note 08', type: 'pdf', completed: false },
      { id: 18, title: 'Lecture Note 09', type: 'pdf', completed: false },
      { id: 19, title: 'Lecture Note 10', type: 'pdf', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Tutorials',
    items: [
      { id: 20, title: 'Tutorial 01', type: 'assignment', submitted: true, submittedDate: '7 February 2026', completed: true },
      { id: 21, title: 'Tutorial 02', type: 'assignment', submitted: true, submittedDate: '7 February 2026', completed: true },
      { id: 22, title: 'Tutorial 03', type: 'assignment', submitted: true, submittedDate: '14 February 2026', completed: true },
      { id: 23, title: 'Tutorial 04', type: 'assignment', submitted: true, submittedDate: '14 February 2026', completed: true },
      { id: 24, title: 'Tutorial 05', type: 'assignment', submitted: true, submittedDate: '21 February 2026', completed: true },
      { id: 25, title: 'Tutorial 06', type: 'assignment', submitted: true, submittedDate: '21 February 2026', completed: true },
      { id: 26, title: 'Tutorial 07', type: 'assignment', submitted: false, dueDate: '10 February 2026', completed: false },
      { id: 27, title: 'Tutorial 08', type: 'assignment', submitted: false, dueDate: '10 February 2026', completed: false },
      { id: 28, title: 'Tutorial 09', type: 'assignment', submitted: false, dueDate: '21 February 2026', completed: false },
      { id: 29, title: 'Tutorial 10', type: 'assignment', submitted: false, dueDate: '21 February 2026', completed: false },
    ],
  },
  {
    id: 4,
    title: 'Assignment Description',
    items: [
      { id: 30, title: 'Assignment Description', type: 'pdf', completed: false },
      { id: 31, title: 'BPS Assignment Group Enrollment', type: 'resource', completed: false },
      { id: 32, title: 'Assignment Presentation slides', type: 'assignment', submitted: true, submittedDate: '28 February 2026', completed: true },
      { id: 33, title: 'Assignment final Report submission', type: 'assignment', submitted: false, dueDate: '8 March 2026', completed: false },
    ],
  },
]

function ItemIcon({ type }: { type: CourseItem['type'] }) {
  const base: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }
  if (type === 'pdf') {
    return (
      <span style={{ ...base, backgroundColor: '#e53935' }}>
        <FileText size={16} color="#fff" />
      </span>
    )
  }
  if (type === 'assignment') {
    return (
      <span style={{ ...base, backgroundColor: '#1565c0' }}>
        <ClipboardList size={16} color="#fff" />
      </span>
    )
  }
  if (type === 'forum') {
    return (
      <span style={{ ...base, backgroundColor: '#7b1fa2' }}>
        <BookOpen size={16} color="#fff" />
      </span>
    )
  }
  return (
    <span style={{ ...base, backgroundColor: '#00897b' }}>
      <FileText size={16} color="#fff" />
    </span>
  )
}

function CourseItemRow({ item, onToggle }: { item: CourseItem; onToggle: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '10px 12px',
        borderBottom: '1px dashed var(--color-border)',
        gap: 10,
      }}
    >
      <ItemIcon type={item.type} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{ color: '#1565c0', fontSize: '14px', textDecoration: 'none', fontWeight: 400 }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = 'underline')}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.textDecoration = 'none')}
        >
          {item.title}
        </a>
        {item.type === 'assignment' && (
          <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {item.submitted ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 500,
                  padding: '2px 10px',
                  borderRadius: '3px',
                  width: 'fit-content',
                }}
              >
                ✓ Submitted {item.submittedDate}
              </span>
            ) : (
              <>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    color: 'var(--color-text-muted)',
                    fontSize: '12px',
                  }}
                >
                  <Info size={13} /> Not Submitted
                </span>
                {item.dueDate && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      backgroundColor: '#e53935',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '2px 10px',
                      borderRadius: '3px',
                      width: 'fit-content',
                    }}
                  >
                    ! Due {item.dueDate}
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <button
        onClick={onToggle}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
        title={item.completed ? 'Mark as not complete' : 'Mark as complete'}
      >
        {item.completed ? (
          <CheckSquare size={18} color="#1565c0" />
        ) : (
          <Square size={18} color="#999" />
        )}
      </button>
    </div>
  )
}

function CourseSectionBlock({ section }: { section: CourseSection }) {
  const [collapsed, setCollapsed] = useState(section.collapsed ?? false)
  const [items, setItems] = useState(section.items)

  const toggleItem = (id: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, completed: !it.completed } : it)))
  }

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderLeft: section.id === 1 ? '4px solid #7b1fa2' : '1px solid var(--color-border)',
        marginBottom: 2,
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          cursor: 'pointer',
          backgroundColor: 'var(--color-bg-page)',
        }}
        onClick={() => setCollapsed((v) => !v)}
      >
        <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-heading)' }}>
          {section.title}
        </span>
        {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
      </div>
      {!collapsed && (
        <div>
          {items.map((item) => (
            <CourseItemRow key={item.id} item={item} onToggle={() => toggleItem(item.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()

  const courseName = courseId === '13195' ? 'BS401.3-Business Policy and Strategy' : `Course ${courseId}`

  return (
    <div style={{ padding: '16px 20px', maxWidth: '900px' }}>
      <h2 style={{ fontSize: '18px', color: 'var(--color-heading)', marginBottom: 16, fontWeight: 600 }}>
        {courseName}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {mockSections.map((section) => (
          <CourseSectionBlock key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}
