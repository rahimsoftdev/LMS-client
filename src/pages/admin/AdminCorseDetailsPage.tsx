
import { useState, type FormEvent } from 'react'
import {
  BookOpen,
  ChevronLeft,
  PlayCircle,
  Plus,
  X,
  Loader2,
  Trash2,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import { useCourseDetails } from '@/hooks/useCourseDetails'
import { formatPrice } from '@/utils/format'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

// Course Details Skeleton
function CourseDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 rounded bg-slate-200" />

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="h-8 w-3/4 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
          <div className="h-8 w-28 rounded bg-slate-200" />
        </div>

        <div className="aspect-video rounded-xl bg-slate-200" />
      </div>

      <div className="mt-10 h-6 w-40 rounded bg-slate-200" />
      <div className="mt-4 h-44 rounded-xl bg-slate-100" />
    </div>
  )
}

// Add Lecture Modal
type AddLectureModalProps = {
  courseId: string
  onClose: () => void
  onSuccess: () => Promise<void>
}

function AddLectureModal({
  courseId,
  onClose,
  onSuccess,
}: AddLectureModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/admin/courses/${courseId}/lectures`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            videoUrl,
          }),
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create lecture')
      }

      await onSuccess()
      onClose()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => !loading && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-lecture-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2
              id="add-lecture-title"
              className="text-xl font-bold text-slate-900"
            >
              Add New Lecture
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new lecture to this course.
            </p>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="lecture-title"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Lecture Title
            </label>

            <input
              id="lecture-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Introduction to React"
              minLength={3}
              required
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label
              htmlFor="lecture-description"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="lecture-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write a short description..."
              minLength={10}
              rows={4}
              required
              disabled={loading}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          <div>
            <label
              htmlFor="lecture-video"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Video URL
            </label>

            <input
              id="lecture-video"
              type="url"
              value={videoUrl}
              onChange={(event) => setVideoUrl(event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Add Lecture
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Delete Confirmation Modal
type DeleteLectureModalProps = {
  lectureTitle: string
  loading: boolean
  error: string
  onClose: () => void
  onConfirm: () => void
}

function DeleteLectureModal({
  lectureTitle,
  loading,
  error,
  onClose,
  onConfirm,
}: DeleteLectureModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => !loading && onClose()}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-lecture-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle className="size-5" />
          </div>

          <div>
            <h2
              id="delete-lecture-title"
              className="text-lg font-bold text-slate-900"
            >
              Delete Lecture?
            </h2>

            <p className="text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-600">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-slate-900">
            "{lectureTitle}"
          </span>
          ?
        </p>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Confirm Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Page
export default function AdminCourseDetailsPage() {
  const { courseId } = useParams()

  const {
    course,
    lectures,
    loading,
    error,
    notFound,
    reload,
  } = useCourseDetails(courseId)

  const [imageFailed, setImageFailed] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const [selectedLecture, setSelectedLecture] = useState<{
    id: string
    title: string
  } | null>(null)

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const handleLectureSuccess = async () => {
    await reload()
  }

  // Open Delete Confirmation
  const handleDeleteClick = (lectureId: string, title: string) => {
    setDeleteError('')
    setSelectedLecture({
      id: lectureId,
      title,
    })
  }

  // Delete Lecture API
  const handleDeleteLecture = async () => {
    if (!courseId || !selectedLecture) return

    setDeleteLoading(true)
    setDeleteError('')

    try {
      const response = await fetch(
        `${API_URL}/admin/courses/${courseId}/lectures/${selectedLecture.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete lecture')
      }

      await reload()
      setSelectedLecture(null)
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : 'Something went wrong',
      )
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return <CourseDetailsSkeleton />
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => void reload()}
      />
    )
  }

  if (notFound || !course) {
    return (
      <section>
        <EmptyState
          title="Course not found"
          description="The course you are looking for does not exist or has been removed."
        />

        <div className="mt-6 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back to courses
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section>
      {/* Back Navigation */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-600"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to courses
      </Link>

      {/* Course Information */}
      <div className="mt-4 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {course.title}
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-bold text-primary-700">
              {formatPrice(course.price)}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-50 px-3 py-1 text-sm font-semibold text-secondary-700">
              <PlayCircle className="size-4" aria-hidden="true" />

              {lectures.length}{' '}
              {lectures.length === 1 ? 'lecture' : 'lectures'}
            </span>
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className="aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {imageFailed ? (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-primary-100 to-secondary-100 text-primary-700">
              <BookOpen className="size-12" aria-hidden="true" />
            </div>
          ) : (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Course content
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {lectures.length}{' '}
              {lectures.length === 1 ? 'lecture' : 'lectures'} in this course.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add Lecture
          </button>
        </div>

        {/* Lecture List */}
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {lectures.length === 0 ? (
            <div className="py-8">
              <EmptyState
                title="No lectures yet"
                description="Start adding lectures to this course."
              />
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {lectures.map((lecture) => (
                <div
                  key={String(lecture._id)}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                      <PlayCircle className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">
                        {lecture.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {lecture.description}
                      </p>

                      <a
                        href={lecture.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-800"
                      >
                        View Video
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteClick(
                        String(lecture._id),
                        lecture.title,
                      )
                    }
                    className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:self-center"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Lecture Modal */}
      {showAddModal && (
        <AddLectureModal
          courseId={course._id}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleLectureSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {selectedLecture && (
        <DeleteLectureModal
          lectureTitle={selectedLecture.title}
          loading={deleteLoading}
          error={deleteError}
          onClose={() => setSelectedLecture(null)}
          onConfirm={() => void handleDeleteLecture()}
        />
      )}
    </section>
  )
}
