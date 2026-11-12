import { useState } from 'react'
import { BookOpen, ChevronLeft, PlayCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import LectureList from '@/components/lecture/LectureList'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import { useCourseDetails } from '@/hooks/useCourseDetails'
import { formatPrice } from '@/utils/format'

function CourseDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 rounded bg-slate-200" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="h-8 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
          <div className="h-8 w-28 rounded bg-slate-200" />
        </div>
        <div className="aspect-video rounded-xl bg-slate-200" />
      </div>
      <div className="mt-10 h-6 w-40 rounded bg-slate-200" />
      <div className="mt-4 h-44 rounded-xl bg-slate-100" />
    </div>
  )
}

export default function CourseDetailsPage() {
  const { courseId } = useParams()
  const { course, lectures, loading, error, notFound, reload } =
    useCourseDetails(courseId)
  const [imageFailed, setImageFailed] = useState(false)

  if (loading) {
    return <CourseDetailsSkeleton />
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => void reload()} />
  }

  if (notFound || !course) {
    return (
      <section>
        <EmptyState
          title="Course not found"
          description="The course you are looking for does not exist or has been removed."
        />
        <div className="mt-6 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back to courses
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section>
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to courses
      </Link>

      <div className="mt-4 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-bold text-primary-700">
              {formatPrice(course.price)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1 text-sm font-semibold text-secondary-700">
              <PlayCircle className="size-4" aria-hidden="true" />
              {lectures.length}{' '}
              {lectures.length === 1 ? 'lecture' : 'lectures'}
            </span>
          </div>
        </div>

        <div className="aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {imageFailed ? (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-primary-100 to-secondary-100 text-primary-700">
              <BookOpen className="size-12" aria-hidden="true" />
            </div>
          ) : (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          Course content
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {lectures.length} {lectures.length === 1 ? 'lecture' : 'lectures'} in
          this course.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <LectureList courseId={course._id} lectures={lectures} />
        </div>
      </div>
    </section>
  )
}
