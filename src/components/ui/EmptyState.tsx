import { BookOpen } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description: string
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <BookOpen
        className="mx-auto size-8 text-slate-400"
        aria-hidden="true"
      />
      <h2 className="mt-3 text-base font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  )
}
