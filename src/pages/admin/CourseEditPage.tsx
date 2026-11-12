import { useParams } from 'react-router-dom'
import PageHeading from '@/components/ui/PageHeading'

export default function CourseEditPage() {
  const { courseId } = useParams()

  return (
    <section>
      <PageHeading
        title="Edit Course"
        description={`Debug placeholder. Course ID: ${courseId ?? 'unknown'}`}
      />
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        Course edit form will be rendered here.
      </div>
    </section>
  )
}
