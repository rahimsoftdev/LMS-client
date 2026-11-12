
import { useState } from 'react'
import { ArrowLeft, BookOpen, ImagePlus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import PageHeading from '@/components/ui/PageHeading'

const API_URL = import.meta.env.VITE_API_URL

export default function CourseCreatePage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnailUrl: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')
      setSuccess(false)

      const response = await fetch(`${API_URL}/admin/courses`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create course')
      }

      setSuccess(true)

      navigate('/admin/courses', {
        replace: true,
        state: { message: 'Course created successfully' },
      })
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <Link
        to="/admin/courses"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600"
      >
        <ArrowLeft className="size-4" />
        Back to courses
      </Link>

      <PageHeading
        title="Create Course"
        description="Add a new course to your learning platform."
      />

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
            <BookOpen className="size-6" />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Course Information
            </h2>
            <p className="text-sm text-slate-500">
              Fill in the details below.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              Course created successfully.
            </div>
          )}

          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Course Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Full Stack Web Development"
              value={formData.title}
              onChange={handleChange}
              minLength={3}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Course Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              minLength={10}
              placeholder="Write a description about this course..."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Course Price
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter course price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label
              htmlFor="thumbnailUrl"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <ImagePlus className="size-4" />
              Thumbnail Image URL
            </label>

            <input
              id="thumbnailUrl"
              name="thumbnailUrl"
              type="url"
              placeholder="https://example.com/course-image.jpg"
              value={formData.thumbnailUrl}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />

            {formData.thumbnailUrl && (
              <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                <img
                  src={formData.thumbnailUrl}
                  alt="Course thumbnail preview"
                  className="aspect-video w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <Link
              to="/admin/courses"
              className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Creating Course...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
