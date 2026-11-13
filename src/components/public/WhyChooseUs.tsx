import {
  Clock,
  Layers,
  MonitorSmartphone,
  MousePointerClick,
  PlayCircle,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Feature = {
  title: string
  description: string
  icon: LucideIcon
  tone: 'primary' | 'secondary'
}

const features: Feature[] = [
  {
    title: 'Video-based Lectures',
    description:
      'Watch every lecture directly on the platform with a smooth embedded video player.',
    icon: PlayCircle,
    tone: 'primary',
  },
  {
    title: 'Well-structured Courses',
    description:
      'Each course comes with a clear lecture list, so you always know what to learn next.',
    icon: Layers,
    tone: 'secondary',
  },
  {
    title: 'Learn at Your Own Pace',
    description:
      'Pause, replay and revisit any lecture whenever you want, with no fixed schedule.',
    icon: Clock,
    tone: 'primary',
  },
  {
    title: 'Works on Every Device',
    description:
      'A fully responsive experience on mobile, tablet, laptop and desktop screens.',
    icon: MonitorSmartphone,
    tone: 'secondary',
  },
  {
    title: 'Simple & Easy to Use',
    description:
      'Browse courses, open details and start watching in just a few clicks.',
    icon: MousePointerClick,
    tone: 'primary',
  },
  {
    title: 'Fresh Content',
    description:
      'New courses and lectures are added regularly by our admin team.',
    icon: Sparkles,
    tone: 'secondary',
  },
]

const toneStyles = {
  primary: {
    iconWrap: 'bg-primary-50 text-primary-600 group-hover:bg-primary-600',
    border: 'hover:border-primary-200',
  },
  secondary: {
    iconWrap:
      'bg-secondary-50 text-secondary-600 group-hover:bg-secondary-600',
    border: 'hover:border-secondary-200',
  },
} as const

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-title"
      className="bg-slate-50 pb-10 md:pb-12 xl:pb-section"
    >
      <div className="container">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            Why choose us
          </span>

          <h2
            id="why-choose-us-title"
            className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
          >
            Everything you need to{' '}
            <span className="text-primary-600">learn better</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            DataPollex LMS keeps learning simple, so you can focus on the
            lessons instead of the platform.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {features.map(({ title, description, icon: Icon, tone }) => {
            const styles = toneStyles[tone]

            return (
              <article
                key={title}
                className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${styles.border}`}
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white ${styles.iconWrap}`}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900 sm:text-lg">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}