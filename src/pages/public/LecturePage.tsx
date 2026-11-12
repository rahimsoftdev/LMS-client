import { useParams } from 'react-router-dom'
import PageHeading from '@/components/ui/PageHeading'

export default function LecturePage() {
  const { courseId, lectureId } = useParams()

  return (
    <section>
      <PageHeading
        title="Lecture"
        description={`Debug placeholder. Course ID: ${
          courseId ?? 'unknown'
        }, Lecture ID: ${lectureId ?? 'unknown'}`}
      />
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        The embedded lecture video will be rendered here.
      </div>
    </section>
  )
}
