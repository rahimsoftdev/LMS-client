
import { Link, Outlet, Navigate } from 'react-router-dom'
import { ExternalLink, Menu } from 'lucide-react'
import { useState } from 'react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import { authClient } from '@/lib/auth-client'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: session, isPending } = authClient.useSession()

  // Session loading হলে অপেক্ষা করবে
  if (isPending) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-sm text-slate-500">Checking authentication...</p>
      </div>
    )
  }

  // Login না থাকলে login page-এ পাঠাবে
  if (!session) {
    return <Navigate to="/login" replace />
  }

  // Admin না হলে courses page-এ পাঠাবে
  if (session.user.role !== 'admin') {
    return <Navigate to="/courses" replace />
  }

  return (
    <div className="min-h-svh bg-slate-100 text-slate-900">
      <div className="flex min-h-svh">
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
          <AdminSidebar />
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/50"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            />

            <aside className="relative z-10 h-full w-64 border-r border-slate-200 bg-white">
              <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
            </aside>
          </div>
        )}

        <div className="flex min-h-svh min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 md:px-6">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>

            <span className="text-sm font-semibold text-slate-700">
              Admin Panel
            </span>

            <Link
              to="/"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600"
            >
              View Site
              <ExternalLink className="size-4" aria-hidden="true" />
            </Link>
          </header>

          <main className="flex-1 p-4 md:p-6 xl:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
