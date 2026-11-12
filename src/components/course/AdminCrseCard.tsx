
import { useState } from 'react'
import { BookOpen, Eye, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { Course } from '@/types/course'
import { formatPrice } from '@/utils/format'

interface CourseCardProps {
  course: Course
  onEdit: (course: Course) => void
  onDelete: (course: Course) => void
}

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-video overflow-hidden bg-slate-100">
        {imageFailed || !course.thumbnailUrl ? (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-primary-100 to-secondary-100 text-primary-700">
            <BookOpen className="size-12" />
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

      <div className="p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-slate-500">
          {course.description}
        </p>

        <p className="mt-4 text-lg font-bold text-primary-700">
          {formatPrice(course.price)}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
          <Link
            to={`/admin/courses/${course._id}`}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-slate-100 px-2 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            <Eye className="size-4" />
            Details
          </Link>

          <button
            type="button"
            onClick={() => onEdit(course)}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-blue-50 px-2 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            <Pencil className="size-4" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(course)}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-red-50 px-2 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
          >
            <Trash2 className="size-4" />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
