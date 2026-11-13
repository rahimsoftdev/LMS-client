import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CourseGrid from '@/components/course/CourseGrid'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import LoadingState from '@/components/ui/LoadingState'
import { useCourses } from '@/hooks/useCourses'
import Banner from '@/components/public/Banner'

// type Feature = {
//   icon: typeof BookOpen
//   title: string
//   description: string
// }

// const features: Feature[] = [
//   {
//     icon: BookOpen,
//     title: 'Browse courses',
//     description:
//       'Explore every course published by the admin team, with details and pricing.',
//   },
//   {
//     icon: PlayCircle,
//     title: 'Watch lectures',
//     description:
//       'Open a course, pick a lecture, and stream its embedded video lesson.',
//   },
//   {
//     icon: ShieldCheck,
//     title: 'Admin managed',
//     description:
//       'Courses and lectures are created and maintained from the admin dashboard.',
//   },
// ]


export default function HomePage() {
  const { courses, loading, error, reload } = useCourses()

  return (
    <div>
      <Banner/>

      <section className="mt-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Featured courses
            </h2>
            <p className="mt-2 text-slate-600">
              Live courses published by the admin team.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            View all courses
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-4">
          {loading && <LoadingState />}

          {!loading && error && (
            <ErrorState message={error} onRetry={() => void reload()} />
          )}

          {!loading && !error && courses.length === 0 && (
            <EmptyState
              title="No courses yet"
              description="Check back soon — new courses will appear here."
            />
          )}

          {!loading && !error && courses.length > 0 && (
            <CourseGrid courses={courses.slice(0, 3)} />
          )}
        </div>
      </section>

    
    </div>
  )
}
