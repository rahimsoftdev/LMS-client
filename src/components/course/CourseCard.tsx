import { useState } from 'react'
import { BookOpen, PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CourseWithLectureCount } from '@/types/course'
import { formatPrice } from '@/utils/format'

type CourseCardProps = {
  course: CourseWithLectureCount
}

export default function CourseCard({ course }: CourseCardProps) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {imageFailed ? (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-primary-100 to-secondary-100 text-primary-700">
            <BookOpen className="size-10" aria-hidden="true" />
          </div>
        ) : (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
          <PlayCircle className="size-3.5" aria-hidden="true" />
          {course.lectureCount}{' '}
          {course.lectureCount === 1 ? 'lecture' : 'lectures'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-2 text-base font-semibold text-slate-900">
          {course.title}
        </h2>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
          {course.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-primary-700">
            {formatPrice(course.price)}
          </span>
          <Link
            to={`/courses/${course._id}`}
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            View course
          </Link>
        </div>
      </div>
    </article>
  )
}
