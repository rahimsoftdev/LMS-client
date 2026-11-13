import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
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
          <main className="flex-1 p-4 md:p-6 xl:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}