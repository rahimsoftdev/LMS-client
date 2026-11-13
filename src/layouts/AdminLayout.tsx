import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GraduationCap, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { authClient } from '@/lib/auth-client'
import type { User } from '@/types/user.type'

type AuthSession = {
  user: User
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data, isPending } = authClient.useSession()

  const session = data as unknown as AuthSession | null

  // Mobile drawer open thakle: body scroll lock + Esc diye close + desktop size-e gele close
  useEffect(() => {
    if (!sidebarOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [sidebarOpen])

  if (isPending) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-sm text-slate-500">
          Checking authentication...
        </p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (session?.user?.role !== 'admin') {
    return <Navigate to="/courses" replace />
  }

  return (
    <div className="min-h-svh bg-slate-100 text-slate-900">
      {/* Desktop sidebar: fixed, page scroll-er sathe move kore na */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <AdminSidebar />
      </aside>

      {/* Mobile / tablet drawer */}
      <div
        className={`fixed inset-0 z-50 transition-[visibility] lg:hidden ${
          sidebarOpen ? 'visible' : 'invisible delay-300'
        }`}
        aria-hidden={!sidebarOpen}
      >
        <button
          type="button"
          tabIndex={sidebarOpen ? 0 : -1}
          className={`absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />

        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <AdminSidebar
            onNavigate={() => setSidebarOpen(false)}
            onClose={() => setSidebarOpen(false)}
          />
        </aside>
      </div>

      {/* Main area (desktop-e sidebar-er jonno left padding) */}
      <div className="flex min-h-svh min-w-0 flex-col lg:pl-64">
        {/* Mobile top bar with menu button */}
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>

          <Link to="/admin" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-bold tracking-tight text-slate-900">
              DataPollex <span className="text-primary-600">LMS</span>
            </span>
          </Link>
        </header>

        <main className="min-w-0 flex-1 p-4 md:p-6 xl:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}