import { useState } from 'react'
import { GraduationCap, Menu, X, LogOut } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authClient } from '../../lib/auth-client'
import type { User } from '@/types/user.type'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/courses', label: 'Courses', end: false },
]

type AuthSession = {
  user: User
}

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
    ? 'bg-primary-50 text-primary-700'
    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigate = useNavigate()

  const { data, isPending } = authClient.useSession()
  console.log(data, 'etai loign data')

  const session = data as unknown as AuthSession | null
  const isLoggedIn = Boolean(session)
  const isAdmin = session?.user?.role === 'admin'

  const closeMenu = () => setOpen(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      const { error } = await authClient.signOut({})

      if (error) {
        console.error('Logout failed:', error)
        return
      }

      closeMenu()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav
        className="container flex h-16 items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>

          <span className="text-lg font-bold tracking-tight text-slate-900">
            DataPollex <span className="text-primary-600">LMS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={desktopLinkClass}
            >
              {link.label}
            </NavLink>
          ))}

          {!isPending && isAdmin && (
            <NavLink to="/admin" end className={desktopLinkClass}>
              Admin Dashboard
            </NavLink>
          )}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {!isPending && (
            <>
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut size={16} />
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white lg:hidden"
        >
          <div className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={closeMenu}
                className={desktopLinkClass}
              >
                {link.label}
              </NavLink>
            ))}

            {!isPending && isAdmin && (
              <NavLink
                to="/admin"
                end
                onClick={closeMenu}
                className={desktopLinkClass}
              >
                Admin Dashboard
              </NavLink>
            )}

            {!isPending && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="col-span-2 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <LogOut size={16} />
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}