import PageHeading from '@/components/ui/PageHeading'

export default function CoursesPage() {
  return (
    <section>
      <PageHeading
        title="Courses"
        description="Debug placeholder for the public course listing page."
      />
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        Course cards will be rendered here.
      </div>
    </section>
  )
}
