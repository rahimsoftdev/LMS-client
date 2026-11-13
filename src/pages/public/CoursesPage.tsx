import CourseGrid from '@/components/course/CourseGrid'
import EmptyState from '@/components/ui/EmptyState'
import ErrorState from '@/components/ui/ErrorState'
import LoadingState from '@/components/ui/LoadingState'
import PageHeading from '@/components/ui/PageHeading'
import { useCourses } from '@/hooks/useCourses'

export default function CoursesPage() {
  const { courses, loading, error, reload } = useCourses()

  return (
    <div className='pt-10 pb-10 xl:pb-section container'>
      <PageHeading
        title="Courses"
        description="Explore every course published by the admin team."
      />

      {loading && <LoadingState />}

      {!loading && error && (
        <ErrorState message={error} onRetry={() => void reload()} />
      )}

      {!loading && !error && courses.length === 0 && (
        <EmptyState
          title="No courses yet"
          description="Check back soon — new courses will appear here."
        />
      )}

      {!loading && !error && courses.length > 0 && (
        <CourseGrid courses={courses} />
      )}
    </div>
  )
}
