import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <p className="text-sm font-semibold text-primary-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to courses
      </Link>
    </div>
  )
}
