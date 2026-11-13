import { ArrowRight, BookOpen, PlayCircle, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: BookOpen,
    title: 'Browse courses',
    description: 'Explore every course published by the admin team.',
  },
  {
    icon: PlayCircle,
    title: 'Watch lectures',
    description: 'Pick a lecture and stream its video lesson.',
  },
  {
    icon: ShieldCheck,
    title: 'Admin managed',
    description: 'Content is maintained from the admin dashboard.',
  },
]

const Banner = () => {
  return (
    <section className="relative flex max-h-screen w-full items-center overflow-hidden  border border-slate-200 bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-5 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      {/* Soft background glow */}
      <div className="container">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-secondary-200/60 blur-3xl" />

      <div className="relative grid w-full items-center gap-10 lg:grid-cols-2">
        {/* Text */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center rounded-full border border-primary-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-700">
            DataPollex LMS
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Learn from structured courses,{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              at your own pace.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 lg:mx-0">
            Browse courses created by our admin team, open a course to see its
            lectures, and watch video lessons directly in your browser.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/courses"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-200 transition hover:bg-primary-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
            >
              Browse courses
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/admin"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200"
            >
              Admin dashboard
            </Link>
          </div>
        </div>

        {/* Simple feature card (desktop only) */}
        <div className="hidden rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-primary-900/5 backdrop-blur lg:block">
          <div className="space-y-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 text-primary-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Banner