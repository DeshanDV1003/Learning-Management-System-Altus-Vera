import { useAuthStore } from '../../../store/authStore'
import { BookOpen, Clock, CheckSquare, Users } from 'lucide-react'

const statCards = [
  { label: 'Enrolled Courses', value: '—', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Upcoming Deadlines', value: '—', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { label: 'Completed Tasks', value: '—', icon: CheckSquare, color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Course Mates', value: '—', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
]

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.fullName?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Here's what's happening in your learning today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recently accessed */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-4">Recently Accessed Courses</h2>
        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
          <BookOpen size={36} className="mb-3 opacity-30" />
          <p className="text-sm">No courses yet. Enrol in a course to get started.</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-4">Upcoming Activities</h2>
        <div className="flex flex-col items-center justify-center py-8 text-slate-500">
          <Clock size={32} className="mb-3 opacity-30" />
          <p className="text-sm">No upcoming activities due.</p>
        </div>
      </div>
    </div>
  )
}
