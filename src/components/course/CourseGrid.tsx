import type { CourseWithLectureCount } from '@/types/course'
import CourseCard from './CourseCard'

type CourseGridProps = {
  courses: CourseWithLectureCount[]
}

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  )
}
