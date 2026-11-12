import PageHeading from '@/components/ui/PageHeading'

const stats = [
  { label: 'Courses', value: '—' },
  { label: 'Lectures', value: '—' },
  { label: 'Admin Access', value: 'Not configured' },
]

export default function DashboardPage() {
  return (
    <section>
      <PageHeading
        title="Admin Dashboard"
        description="Debug placeholder. Course and lecture management will live here."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        The admin course table will be rendered here.
      </div>
    </section>
  )
}
