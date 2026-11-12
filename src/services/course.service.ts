import axios from 'axios'
import type { Course } from '@/types/course'

const COURSES_URL = `${import.meta.env.BASE_URL}course.json`

export async function getCourses(): Promise<Course[]> {
  const { data } = await axios.get<Course[]>(COURSES_URL)
  return data
}

export async function getCourseById(
  courseId: string,
): Promise<Course | undefined> {
  const courses = await getCourses()
  return courses.find((course) => course._id === courseId)
}
