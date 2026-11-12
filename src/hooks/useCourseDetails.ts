import { useEffect, useState } from 'react'
import { getCourseById } from '@/services/course.service'
import { getLecturesByCourse } from '@/services/lecture.service'
import type { Course } from '@/types/course'
import type { Lecture } from '@/types/lecture'
import { getErrorMessage, isNotFoundError } from '@/utils/errors'

export function useCourseDetails(courseId: string | undefined) {
  const [course, setCourse] = useState<Course | null>(null)
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [loading, setLoading] = useState(Boolean(courseId))
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(!courseId)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const id = courseId
    if (!id) return

    let active = true

    async function load() {
      try {
        const [courseData, lectureList] = await Promise.all([
          getCourseById(id),
          getLecturesByCourse(id),
        ])

        if (!active) return

        setCourse(courseData)
        setLectures(lectureList)
        setNotFound(false)
        setError(null)
      } catch (err) {
        if (!active) return

        if (isNotFoundError(err)) {
          setCourse(null)
          setLectures([])
          setNotFound(true)
          setError(null)
          return
        }

        setError(getErrorMessage(err, 'Unable to load course details.'))
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [courseId, reloadKey])

  const reload = () => {
    setLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }

  return { course, lectures, loading, error, notFound, reload }
}
