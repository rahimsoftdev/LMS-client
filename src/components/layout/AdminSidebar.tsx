
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  PlusCircle,
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

type AdminSidebarProps = {
  onNavigate?: () => void
}

const adminLinks = [
  {
    to: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/admin/courses',
    label: 'Courses',
    icon: BookOpen,
    end: true,
  },
  {
    to: '/admin/courses/new',
    label: 'New Course',
    icon: PlusCircle,
    end: true,
  },
]

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-slate-200 px-5">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>

          <span className="text-sm font-bold tracking-tight text-slate-900">
            DataPollex <span className="text-primary-600">LMS</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Admin navigation">
        {adminLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          View Site
        </Link>
      </div>
    </div>
  )
}
