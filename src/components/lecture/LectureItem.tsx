import { PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Lecture } from '@/types/lecture'

type LectureItemProps = {
  courseId: string
  lecture: Lecture
  index: number
}

export default function LectureItem({
  courseId,
  lecture,
  index,
}: LectureItemProps) {
  return (
    <Link
      to={`/courses/${courseId}/lectures/${lecture._id}`}
      className="group flex items-center gap-4 p-4 transition-colors hover:bg-slate-50"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-sm font-semibold text-primary-700">
        {index + 1}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-900 group-hover:text-primary-700">
          {lecture.title}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
          {lecture.description}
        </p>
      </div>

      <PlayCircle
        className="size-5 shrink-0 text-slate-400 group-hover:text-primary-600"
        aria-hidden="true"
      />
    </Link>
  )
}
