import { api } from '@/lib/api'
import type { ApiResponse } from '@/types/api'
import type { Course, CourseWithLectureCount } from '@/types/course'

export async function getCourses(): Promise<CourseWithLectureCount[]> {
  const { data } = await api.get<ApiResponse<CourseWithLectureCount[]>>(
    '/courses',
  )

  return data.data
}

export async function getCourseById(courseId: string): Promise<Course> {
  const { data } = await api.get<ApiResponse<Course>>(`/courses/${courseId}`)

  return data.data
}
