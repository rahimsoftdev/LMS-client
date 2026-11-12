import { api } from '@/lib/api'
import type { ApiResponse } from '@/types/api'
import type { Lecture } from '@/types/lecture'

export async function getLecturesByCourse(
  courseId: string,
): Promise<Lecture[]> {
  const { data } = await api.get<ApiResponse<Lecture[]>>(
    `/courses/${courseId}/lectures`,
  )

  return data.data
}

export async function getLectureById(lectureId: string): Promise<Lecture> {
  const { data } = await api.get<ApiResponse<Lecture>>(
    `/lectures/${lectureId}`,
  )

  return data.data
}
