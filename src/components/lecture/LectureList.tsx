import { BookOpen } from 'lucide-react'
import type { Lecture } from '@/types/lecture'
import LectureItem from './LectureItem'

type LectureListProps = {
  courseId: string
  lectures: Lecture[]
}

export default function LectureList({ courseId, lectures }: LectureListProps) {
  if (lectures.length === 0) {
    return (
      <div className="p-8 text-center">
        <BookOpen
          className="mx-auto size-7 text-slate-400"
          aria-hidden="true"
        />
        <p className="mt-2 text-sm text-slate-500">
          No lectures have been added to this course yet.
        </p>
      </div>
    )
  }

  return (
    <ol className="divide-y divide-slate-200">
      {lectures.map((lecture, index) => (
        <li key={lecture._id}>
          <LectureItem courseId={courseId} lecture={lecture} index={index} />
        </li>
      ))}
    </ol>
  )
}
