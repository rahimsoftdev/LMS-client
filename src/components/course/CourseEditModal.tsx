
import { useState } from 'react'
import { X } from 'lucide-react'

import type { Course } from '@/types/course'

interface CourseEditModalProps {
  course: Course
  onClose: () => void
  onUpdated: () => void
}

const API_URL = import.meta.env.VITE_API_URL

export default function CourseEditModal({
  course,
  onClose,
  onUpdated,
}: CourseEditModalProps) {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    price: String(course.price),
    thumbnailUrl: course.thumbnailUrl,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `${API_URL}/admin/courses/${course._id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
          }),
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update course')
      }

      onUpdated()
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-course-title"
        className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 id="edit-course-title" className="text-lg font-bold text-slate-900">
              Edit Course
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update your course information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="edit-title" className="mb-1.5 block text-sm font-medium text-slate-700">
              Course Title
            </label>
            <input
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="edit-description" className="mb-1.5 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              minLength={10}
              rows={4}
              className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="edit-price" className="mb-1.5 block text-sm font-medium text-slate-700">
              Price
            </label>
            <input
              id="edit-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="edit-thumbnail" className="mb-1.5 block text-sm font-medium text-slate-700">
              Thumbnail URL
            </label>
            <input
              id="edit-thumbnail"
              name="thumbnailUrl"
              type="url"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
