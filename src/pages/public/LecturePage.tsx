import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import RelatedLectures from '@/components/lecture/RelatedLectures'
import VideoEmbed from '@/components/lecture/VideoEmbed'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import { useLectureDetails } from '@/hooks/useLectureDetails'
import { formatPrice } from '@/utils/format'

function LectureSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-40 rounded bg-slate-200" />
      <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <div className="aspect-video rounded-xl bg-slate-200" />
          <div className="mt-6 h-7 w-2/3 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full rounded bg-slate-100" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
        </div>
        <div className="space-y-4">
          <div className="h-64 rounded-xl bg-slate-100" />
          <div className="h-48 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  )
}

export default function LecturePage() {
  const { courseId, lectureId } = useParams()
  const { course, lecture, lectures, loading, error, notFound, reload } =
    useLectureDetails(courseId, lectureId)

  if (loading) {
    return <LectureSkeleton />
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => void reload()} />
  }

  if (notFound || !course || !lecture) {
    return (
      <section>
        <EmptyState
          title="Lecture not found"
          description="This lecture does not exist or is not part of this course."
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
        to={`/courses/${course._id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to {course.title}
      </Link>

      <div className="mt-4 grid items-start gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <VideoEmbed videoUrl={lecture.videoUrl} title={lecture.title} />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {lecture.title}
          </h1>
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            {lecture.description}
          </p>
        </div>

        <aside className="space-y-4">
          <RelatedLectures
            courseId={course._id}
            lectures={lectures}
            activeLectureId={lecture._id}
          />

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Course
            </h2>
            <Link
              to={`/courses/${course._id}`}
              className="mt-2 block text-base font-semibold text-slate-900 hover:text-primary-700"
            >
              {course.title}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {course.description}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-sm font-medium text-slate-500">Price</span>
              <span className="text-lg font-bold text-primary-700">
                {formatPrice(course.price)}
              </span>
            </div>

            <Link
              to={`/courses/${course._id}`}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              View course
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
