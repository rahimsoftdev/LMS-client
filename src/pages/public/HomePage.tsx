import { ArrowRight, BookOpen, PlayCircle, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: BookOpen,
    title: 'Browse courses',
    description:
      'Explore every course published by the admin team, with details and pricing.',
  },
  {
    icon: PlayCircle,
    title: 'Watch lectures',
    description:
      'Open a course, pick a lecture, and stream its embedded video lesson.',
  },
  {
    icon: ShieldCheck,
    title: 'Admin managed',
    description:
      'Courses and lectures are created and maintained from the admin dashboard.',
  },
]

export default function HomePage() {
  return (
    <div>
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            DataPollex LMS
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Learn from structured courses, at your own pace.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Browse courses created by our admin team, open a course to see its
            lectures, and watch video lessons directly in your browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Browse courses
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Admin dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-secondary-100 text-secondary-700">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Simplified LMS
              </p>
              <p className="text-xs text-slate-500">Two panels, one platform</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-section grid gap-4 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-base font-semibold text-slate-900">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              {description}
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}
