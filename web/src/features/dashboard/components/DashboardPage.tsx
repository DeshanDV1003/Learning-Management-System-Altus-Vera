import { useState, useRef } from 'react'
import { AlignJustify, ChevronLeft, ChevronRight, ChevronDown, LayoutGrid, List, Clock, Users, Folder, Maximize2, Minimize2 } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'
import { CourseCard } from './CourseCard'
import { Link } from 'react-router-dom'

// ─── Sample data (will be replaced by API calls) ──────────────────────────────
const RECENT_COURSES = [
  { id: 1, name: 'CS404.3-Parallel and Distributed Computing', code: 'CS404', semester: 'Year 4 — Semester 2', progress: 45 },
  { id: 2, name: 'Special Award Project', code: 'SAP', semester: 'Year 4 — Semester 1', progress: 60 },
]

const ALL_COURSES = [
  { id: 3, name: 'BS401.3-Business Policy and Strategy', code: 'BS401', semester: 'Year 4 — Semester 1', progress: 70 },
  { id: 4, name: 'BS402.3-Entrepreneurship', code: 'BS402', semester: 'Year 4 — Semester 2', progress: 28 },
  { id: 5, name: 'Computer Networks', code: 'CN301', semester: 'Year 2 — Semester 1', progress: 13 },
  { id: 6, name: 'CS101.3 Introduction to Computer Science', code: 'CS101', semester: 'Year 1 — Semester 1', progress: 80 },
]

const ONLINE_USERS = ['DVD Silva', 'GPAD Nilwala', 'KWKS Wijerathna', 'TDJ Pathirana', 'HN Kanakarathne']

type Filter = 'inprogress' | 'all' | 'completed' | 'starred'
type SortBy = 'coursename' | 'lastaccessed'
type ViewType = 'card' | 'list'

// ─── Block header (section title with collapse button) ─────────────────────────
function BlockHeader({
  icon,
  title,
  collapsed,
  onToggle,
}: {
  icon?: React.ReactNode
  title: string
  collapsed: boolean
  onToggle: () => void
}) {
  return (
    <div className="block-section">
      <div className="block-section-header">
        <h3 className="block-section-title">
          {icon && <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>}
          {title}
        </h3>
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            display: 'flex',
            padding: '2px',
          }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
        </button>
      </div>
    </div>
  )
}

// ─── Dropdown button (like NLearn's In progress / Course name / Card buttons) ──
function DropdownBtn({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string
  icon?: React.ReactNode
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn btn-secondary"
        style={{ gap: '6px', fontSize: '13px', padding: '5px 12px' }}
      >
        {icon && <span style={{ display: 'flex' }}>{icon}</span>}
        {options.find((o) => o.value === value)?.label ?? label}
        <ChevronDown size={13} />
      </button>
      {open && (
        <div
          className="dropdown-menu"
          style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 100 }}
        >
          {options.map((o) => (
            <div
              key={o.value}
              className="dropdown-item"
              style={{ fontWeight: o.value === value ? 600 : 400 }}
              onClick={() => { onChange(o.value); setOpen(false) }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Navigation block (right sidebar) ─────────────────────────────────────────
function NavigationBlock() {
  const [collapsed, setCollapsed] = useState(false)
  const [myCoursesOpen, setMyCoursesOpen] = useState(true)

  return (
    <div style={{ marginBottom: '16px' }}>
      <BlockHeader
        icon={<Users size={16} />}
        title="Navigation"
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      {!collapsed && (
        <div style={{ fontSize: '13px', paddingLeft: '4px' }}>
          <TreeLink label="Dashboard" to="/dashboard" />
          <TreeLink label="Site home" to="/" />
          <TreeExpand label="Site pages">
            <TreeLink label="Calendar" to="/calendar" indent />
          </TreeExpand>
          <div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '3px 0' }}
              onClick={() => setMyCoursesOpen((v) => !v)}
            >
              <span style={{ color: 'var(--color-text-muted)' }}>
                {myCoursesOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </span>
              <span style={{ color: 'var(--color-text)', fontSize: '13px' }}>My courses</span>
            </div>
            {myCoursesOpen && (
              <div style={{ paddingLeft: '14px' }}>
                <TreeExpand label="Faculty of Computing">
                  <TreeLink label="Year 4 — Semester 2" to="/courses/4" indent />
                </TreeExpand>
                <TreeExpand label="Faculty of Business">
                  <TreeLink label="Year 4 — Semester 1" to="/courses/3" indent />
                </TreeExpand>
                <Link to="/courses" style={{ display: 'block', padding: '3px 0 3px 14px', color: 'var(--color-link)', fontSize: '13px' }}>
                  More...
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function TreeLink({ label, to, indent }: { label: string; to: string; indent?: boolean }) {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        padding: `3px 0 3px ${indent ? '14px' : '14px'}`,
        color: 'var(--color-link)',
        fontSize: '13px',
        textDecoration: 'none',
      }}
    >
      {label}
    </Link>
  )
}

function TreeExpand({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '3px 0 3px 14px' }}
        onClick={() => setOpen((v) => !v)}
      >
        <span style={{ color: 'var(--color-text-muted)' }}>
          {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </span>
        <span style={{ color: 'var(--color-text)', fontSize: '13px' }}>{label}</span>
      </div>
      {open && <div style={{ paddingLeft: '14px' }}>{children}</div>}
    </div>
  )
}

// ─── Timeline block ────────────────────────────────────────────────────────────
function TimelineBlock() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ marginBottom: '16px' }}>
      <BlockHeader
        icon={<Clock size={16} />}
        title="Timeline"
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      {!collapsed && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            <DropdownBtn
              label="Sort"
              options={[{ label: 'Sort by dates', value: 'dates' }, { label: 'Sort by courses', value: 'courses' }]}
              value="dates"
              onChange={() => {}}
            />
            <DropdownBtn
              label="All"
              options={[{ label: 'All', value: 'all' }, { label: 'Overdue', value: 'overdue' }, { label: 'This week', value: 'week' }]}
              value="all"
              onChange={() => {}}
            />
          </div>
          <div
            style={{
              textAlign: 'center',
              padding: '24px 0',
              color: 'var(--color-text-muted)',
              fontSize: '13px',
            }}
          >
            No upcoming activities due
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Private files block ───────────────────────────────────────────────────────
function PrivateFilesBlock() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div style={{ marginBottom: '16px' }}>
      <BlockHeader
        icon={<Folder size={16} />}
        title="Private files"
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      {!collapsed && (
        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
          No files available
          <div style={{ marginTop: '6px' }}>
            <Link to="/files" style={{ color: 'var(--color-link)', fontSize: '13px' }}>Manage private files...</Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Online users block ───────────────────────────────────────────────────────
function OnlineUsersBlock() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div style={{ marginBottom: '16px' }}>
      <BlockHeader
        icon={<Users size={16} />}
        title="Online users"
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      {!collapsed && (
        <div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
            {ONLINE_USERS.length} online users (last 5 minutes)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {ONLINE_USERS.map((name) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-green)',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '13px', color: 'var(--color-text)' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  // Recently accessed
  const [recentCollapsed, setRecentCollapsed] = useState(false)
  const [recentIdx, setRecentIdx] = useState(0)

  // Course overview
  const [overviewCollapsed, setOverviewCollapsed] = useState(false)
  const [filter, setFilter] = useState<Filter>('inprogress')
  const [sortBy, setSortBy] = useState<SortBy>('coursename')
  const [viewType, setViewType] = useState<ViewType>('card')

  const filteredCourses = ALL_COURSES.filter((c) => {
    if (filter === 'inprogress') return c.progress > 0 && c.progress < 100
    if (filter === 'completed') return c.progress === 100
    return true
  }).sort((a, b) =>
    sortBy === 'coursename' ? a.name.localeCompare(b.name) : b.id - a.id
  )

  return (
    <div
      style={{
        padding: '16px',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
      }}
    >
      {/* ── Left main column ─────────────────────────── */}
      <div style={{ flex: '1 1 0', minWidth: 0 }}>

        {/* ── Recently accessed courses ──────────────── */}
        <BlockHeader
          icon={<AlignJustify size={16} />}
          title="Recently accessed courses"
          collapsed={recentCollapsed}
          onToggle={() => setRecentCollapsed((v) => !v)}
        />
        {!recentCollapsed && (
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            {/* Carousel */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '12px',
              }}
            >
              {RECENT_COURSES.map((c) => (
                <CourseCard key={c.id} {...c} />
              ))}
            </div>
            {/* Prev/next arrows */}
            <button
              onClick={() => setRecentIdx((v) => Math.max(0, v - 1))}
              style={{
                position: 'absolute',
                right: '36px',
                top: '-32px',
                background: 'none',
                border: '1px solid var(--color-border)',
                borderRadius: '3px',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text)',
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setRecentIdx((v) => v + 1)}
              style={{
                position: 'absolute',
                right: '8px',
                top: '-32px',
                background: 'none',
                border: '1px solid var(--color-border)',
                borderRadius: '3px',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text)',
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* ── Course overview ────────────────────────── */}
        <BlockHeader
          icon={<AlignJustify size={16} />}
          title="Course overview"
          collapsed={overviewCollapsed}
          onToggle={() => setOverviewCollapsed((v) => !v)}
        />
        {!overviewCollapsed && (
          <>
            {/* Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              <DropdownBtn
                label="In progress"
                icon={<span style={{ fontSize: '12px' }}>▼</span>}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'In progress', value: 'inprogress' },
                  { label: 'Completed', value: 'completed' },
                  { label: 'Starred', value: 'starred' },
                ]}
                value={filter}
                onChange={(v) => setFilter(v as Filter)}
              />
              <div style={{ flex: 1 }} />
              <DropdownBtn
                label="Course name"
                icon={<List size={13} />}
                options={[
                  { label: 'Course name', value: 'coursename' },
                  { label: 'Last accessed', value: 'lastaccessed' },
                ]}
                value={sortBy}
                onChange={(v) => setSortBy(v as SortBy)}
              />
              <DropdownBtn
                label="Card"
                icon={<LayoutGrid size={13} />}
                options={[
                  { label: 'Card', value: 'card' },
                  { label: 'List', value: 'list' },
                ]}
                value={viewType}
                onChange={(v) => setViewType(v as ViewType)}
              />
            </div>

            {/* Course grid / list */}
            {filteredCourses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--color-text-muted)', fontSize: '14px' }}>
                No courses match the selected filter.
              </div>
            ) : viewType === 'card' ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '14px',
                  marginBottom: '24px',
                }}
              >
                {filteredCourses.map((c) => (
                  <CourseCard key={c.id} {...c} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    className="card"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      border: '1px solid var(--color-border-card)',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '4px',
                        background: `linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)`,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{c.semester}</div>
                      <div style={{ fontSize: '14px', color: 'var(--color-heading)', fontWeight: 500 }}>{c.name}</div>
                      <div className="progress-bar-container" style={{ marginTop: '6px', maxWidth: '200px' }}>
                        <div className="progress-bar-fill" style={{ width: `${c.progress}%` }} />
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        {c.progress}% complete
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Right sidebar ─────────────────────────────── */}
      <div style={{ width: '220px', flexShrink: 0 }}>
        <NavigationBlock />
        <TimelineBlock />
        <PrivateFilesBlock />
        <OnlineUsersBlock />
      </div>
    </div>
  )
}
