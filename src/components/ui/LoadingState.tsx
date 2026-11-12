export default function LoadingState() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      role="status"
      aria-label="Loading courses"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <div className="aspect-video animate-pulse bg-slate-200" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
            <div className="flex items-center justify-between pt-2">
              <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-9 w-28 animate-pulse rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
