import { useState } from 'react'
import { GraduationCap, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/courses', label: 'Courses', end: false },
  { to: '/admin', label: 'Admin Dashboard', end: true },
  { to: '/admin/login', label: 'Admin Login', end: true },
]

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary-50 text-primary-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

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
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            Login
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            Register
          </button>
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
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Login
              </button>
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
