
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import PageHeading from '@/components/ui/PageHeading'
import LoadingState from '@/components/ui/LoadingState'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'

// import CourseCard from '@/components/course/CourseCard'
import CourseEditModal from '@/components/course/CourseEditModal'
import CourseDeleteModal from '@/components/course/CourseDeleteModal'

import { useCourses } from '@/hooks/useCourses'
import type { Course } from '@/types/course'
import CourseCard from '@/components/course/AdminCrseCard'

export default function CoursesPage() {
  const { courses, loading, error, reload } = useCourses()

  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null)

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeading
          title="Manage Courses"
          description="Create, update, and manage all your courses."
        />

        <Link
          to="/admin/courses/new"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          <Plus className="size-5" />
          Add New Course
        </Link>
      </div>

      {loading && <LoadingState />}

      {!loading && error && (
        <ErrorState
          message={error}
          onRetry={() => void reload()}
        />
      )}

      {!loading && !error && courses.length === 0 && (
        <EmptyState
          title="No courses found"
          description="Start by creating your first course."
        />
      )}

      {!loading && !error && courses.length > 0 && (
        <>
          <div className="mb-5 mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onEdit={setEditingCourse}
                onDelete={setDeletingCourse}
              />
            ))}
          </div>
        </>
      )}

      {editingCourse && (
        <CourseEditModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onUpdated={() => void reload()}
        />
      )}

      {deletingCourse && (
        <CourseDeleteModal
          course={deletingCourse}
          onClose={() => setDeletingCourse(null)}
          onDeleted={() => void reload()}
        />
      )}
    </section>
  )
}
