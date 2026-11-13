import { authClient } from '@/lib/auth-client'
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  LogOut,
  PlusCircle,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import type { User } from '@/types/user.type'

type AdminSidebarProps = {
  onNavigate?: () => void
  onClose?: () => void
}

type AuthSession = {
  user: User
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

export default function AdminSidebar({
  onNavigate,
  onClose,
}: AdminSidebarProps) {
  const navigate = useNavigate()
  const { data } = authClient.useSession()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const session = data as unknown as AuthSession | null

  const userName = session?.user?.name || 'Admin'
  const userEmail = session?.user?.email || ''
  const userRole = session?.user?.role || 'admin'
  const initials =
    userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'A'

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      const { error } = await authClient.signOut({})

      if (error) {
        console.error('Logout failed:', error)
        return
      }

      onNavigate?.()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header: fixed thake, scroll hoy na */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
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

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Close sidebar"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Sudhu ei nav part scroll hobe; scroll sidebar-er bhitorei thakbe */}
      <nav
        className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain p-3"
        aria-label="Admin navigation"
      >
        {adminLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer: profile + View Site + Logout, always niche fixed */}
      <div className="shrink-0 space-y-2 border-t border-slate-200 p-3">
        {/* Profile card */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white"
            aria-hidden="true"
          >
            {initials}
          </span>

          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-semibold text-slate-900"
              title={userName}
            >
              {userName}
            </p>
            {userEmail && (
              <p
                className="truncate text-xs text-slate-500"
                title={userEmail}
              >
                {userEmail}
              </p>
            )}
            <span className="mt-1 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700">
              {userRole}
            </span>
          </div>
        </div>

        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          View Site
        </Link>

        <button
          type="button"
          onClick={() => void handleLogout()}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoggingOut ? (
            <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
          ) : (
            <LogOut className="size-4 shrink-0" aria-hidden="true" />
          )}
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  )
}