import { Link, Outlet } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-100 px-4 py-10 text-slate-900">
      <Link to="/" className="mb-6 flex items-center gap-2">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-600 text-white">
          <GraduationCap className="size-5" aria-hidden="true" />
        </span>
        <span className="text-lg font-bold tracking-tight">
          DataPollex <span className="text-primary-600">LMS</span>
        </span>
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Outlet />
      </div>

      <Link
        to="/"
        className="mt-6 text-sm font-medium text-slate-500 hover:text-primary-600"
      >
        &larr; Back to courses
      </Link>
    </div>
  )
}
