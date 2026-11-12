
import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

import type { Course } from '@/types/course'

interface CourseDeleteModalProps {
  course: Course
  onClose: () => void
  onDeleted: () => void
}

const API_URL = import.meta.env.VITE_API_URL

export default function CourseDeleteModal({
  course,
  onClose,
  onDeleted,
}: CourseDeleteModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `${API_URL}/admin/courses/${course._id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete course')
      }

      onDeleted()
      onClose()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-course-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle className="size-6" />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <h2 id="delete-course-title" className="mt-5 text-lg font-bold text-slate-900">
          Delete Course?
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-slate-800">
            {course.title}
          </span>
          ? This action will also delete all lectures belonging to this course.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Course'}
          </button>
        </div>
      </div>
    </div>
  )
}
