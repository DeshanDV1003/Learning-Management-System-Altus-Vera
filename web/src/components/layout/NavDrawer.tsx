import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, ChevronDown, LayoutDashboard, BookOpen, Home, Layers } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

interface TreeNode {
  label: string
  to?: string
  icon?: React.ReactNode
  children?: TreeNode[]
}

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth === 0)
  const location = useLocation()
  const isActive = node.to && location.pathname === node.to

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          paddingLeft: `${8 + depth * 14}px`,
          paddingRight: '8px',
          paddingTop: '5px',
          paddingBottom: '5px',
          cursor: node.children ? 'pointer' : 'default',
          backgroundColor: isActive ? 'rgba(81,102,108,0.12)' : 'transparent',
          borderLeft: isActive ? '3px solid var(--color-accent)' : '3px solid transparent',
        }}
        onClick={() => node.children && setExpanded((v) => !v)}
      >
        {node.children ? (
          <span style={{ color: 'var(--color-text-muted)', display: 'flex' }}>
            {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </span>
        ) : (
          <span style={{ width: '13px', display: 'inline-block' }} />
        )}
        {node.icon && (
          <span style={{ color: 'var(--color-primary)', display: 'flex' }}>{node.icon}</span>
        )}
        {node.to ? (
          <Link
            to={node.to}
            style={{
              fontSize: '13px',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
              fontWeight: isActive ? 600 : 400,
              textDecoration: 'none',
              lineHeight: 1.4,
            }}
          >
            {node.label}
          </Link>
        ) : (
          <span style={{ fontSize: '13px', color: 'var(--color-heading)', fontWeight: 600 }}>
            {node.label}
          </span>
        )}
      </div>
      {node.children && expanded && (
        <div>
          {node.children.map((child, i) => (
            <TreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function NavDrawer({ open }: { open: boolean }) {
  const user = useAuthStore((s) => s.user)

  const navTree: TreeNode[] = [
    { label: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={14} /> },
    { label: 'Site home', to: '/', icon: <Home size={14} /> },
    {
      label: 'Site pages',
      children: [
        { label: 'Calendar', to: '/calendar' },
        { label: 'All Courses', to: '/courses/all' },
      ],
    },
    {
      label: 'My courses',
      children: [
        {
          label: 'Faculty of Computing',
          children: [
            { label: 'Year 1 — Semester 1', to: '/courses/y1s1' },
            { label: 'Year 1 — Semester 2', to: '/courses/y1s2' },
          ],
        },
        {
          label: 'Faculty of Business',
          children: [
            { label: 'Year 1 — Semester 1', to: '/courses/b1s1' },
          ],
        },
        { label: 'More...', to: '/courses' },
      ],
    },
  ]

  if (!open) return null

  return (
    <div
      style={{
        width: '260px',
        flexShrink: 0,
        backgroundColor: 'var(--color-bg-nav-drawer)',
        borderRight: '1px solid var(--color-border)',
        overflowY: 'auto',
        padding: '8px 0',
      }}
    >
      {navTree.map((node, i) => (
        <TreeItem key={i} node={node} />
      ))}
    </div>
  )
}
