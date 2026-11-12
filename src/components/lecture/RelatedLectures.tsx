import { PlayCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Lecture } from '@/types/lecture'

type RelatedLecturesProps = {
  courseId: string
  lectures: Lecture[]
  activeLectureId: string
}

export default function RelatedLectures({
  courseId,
  lectures,
  activeLectureId,
}: RelatedLecturesProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Course lectures
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">
          {lectures.length} {lectures.length === 1 ? 'lecture' : 'lectures'} in
          this course
        </p>
      </div>

      <ol className="divide-y divide-slate-100">
        {lectures.map((lecture, index) => {
          const isActive = lecture._id === activeLectureId

          return (
            <li key={lecture._id}>
              <Link
                to={`/courses/${courseId}/lectures/${lecture._id}`}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive ? 'bg-primary-50' : 'hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`line-clamp-2 flex-1 text-sm font-medium ${
                    isActive ? 'text-primary-700' : 'text-slate-700'
                  }`}
                >
                  {lecture.title}
                </span>
                {isActive && (
                  <PlayCircle
                    className="size-4 shrink-0 text-primary-600"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
