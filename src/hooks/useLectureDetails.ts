import { useEffect, useState } from 'react'
import { getCourseById } from '@/services/course.service'
import {
  getLectureById,
  getLecturesByCourse,
} from '@/services/lecture.service'
import type { Course } from '@/types/course'
import type { Lecture } from '@/types/lecture'
import { getErrorMessage, isNotFoundError } from '@/utils/errors'

export function useLectureDetails(
  courseId: string | undefined,
  lectureId: string | undefined,
) {
  const [course, setCourse] = useState<Course | null>(null)
  const [lecture, setLecture] = useState<Lecture | null>(null)
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [loading, setLoading] = useState(Boolean(courseId && lectureId))
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(!(courseId && lectureId))
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const currentCourseId = courseId
    const currentLectureId = lectureId
    if (!currentCourseId || !currentLectureId) return

    let active = true

    async function load() {
      try {
        const [courseData, lectureData, courseLectures] = await Promise.all([
          getCourseById(currentCourseId),
          getLectureById(currentLectureId),
          getLecturesByCourse(currentCourseId),
        ])

        if (!active) return

        if (lectureData.courseId !== currentCourseId) {
          setCourse(null)
          setLecture(null)
          setLectures([])
          setNotFound(true)
          setError(null)
          return
        }

        setCourse(courseData)
        setLecture(lectureData)
        setLectures(courseLectures)
        setNotFound(false)
        setError(null)
      } catch (err) {
        if (!active) return

        if (isNotFoundError(err)) {
          setCourse(null)
          setLecture(null)
          setLectures([])
          setNotFound(true)
          setError(null)
          return
        }

        setError(getErrorMessage(err, 'Unable to load this lecture.'))
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [courseId, lectureId, reloadKey])

  const reload = () => {
    setLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }

  return { course, lecture, lectures, loading, error, notFound, reload }
}
