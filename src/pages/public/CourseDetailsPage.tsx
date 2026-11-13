import { useState } from 'react'
import { BookOpen, ChevronLeft, PlayCircle, Tag } from 'lucide-react'
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
      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="space-y-5">
          <div className="aspect-video rounded-2xl bg-slate-200" />
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="h-7 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-5/6 rounded bg-slate-100" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 rounded-2xl bg-slate-200" />
            <div className="h-20 rounded-2xl bg-slate-200" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="h-56 rounded-2xl bg-slate-100" />
        </div>
      </div>
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

  const lectureLabel = lectures.length === 1 ? 'lecture' : 'lectures'

  return (
    <section className="mx-auto w-full max-w-6xl pt-10 pb-10 xl:pb-section">
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-primary-200 hover:text-primary-700"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to courses
      </Link>

      <div className="mt-5 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
        {/* LEFT: image on top, tiles below */}
        <div className="space-y-5 lg:sticky lg:top-6">
          <div className="aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            {imageFailed ? (
              <div className="flex h-full items-center justify-center bg-linear-to-br from-primary-100 to-secondary-100 text-primary-700">
                <BookOpen className="size-12" aria-hidden="true" />
              </div>
            ) : (
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            )}
          </div>

          <div className=" sm:p-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {course.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {course.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50 p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-sm">
                <Tag className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Price
                </p>
                <p className="truncate text-xl font-bold text-primary-700">
                  {formatPrice(course.price)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-secondary-100 bg-secondary-50 p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-secondary-700 shadow-sm">
                <PlayCircle className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Lectures
                </p>
                <p className="truncate text-xl font-bold text-secondary-700">
                  {lectures.length} {lectureLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: course content */}
        <div className="min-w-0">
          <div className="mb-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Course content
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {lectures.length} {lectureLabel} in this course.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <LectureList courseId={course._id} lectures={lectures} />
          </div>
        </div>
      </div>
    </section>
  )
}