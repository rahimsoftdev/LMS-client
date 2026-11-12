import { useEffect, useState } from 'react'
import { getCourses } from '@/services/course.service'
import type { CourseWithLectureCount } from '@/types/course'
import { getErrorMessage } from '@/utils/errors'

export function useCourses() {
  const [courses, setCourses] = useState<CourseWithLectureCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const data = await getCourses()

        if (!active) return

        setCourses(data)
        setError(null)
      } catch (err) {
        if (!active) return

        setError(getErrorMessage(err, 'Unable to load courses.'))
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [reloadKey])

  const reload = () => {
    setLoading(true)
    setReloadKey((key) => key + 1)
  }

  return { courses, loading, error, reload }
}
