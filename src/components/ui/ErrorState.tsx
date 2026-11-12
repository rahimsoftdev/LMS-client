import { TriangleAlert } from 'lucide-react'

type ErrorStateProps = {
  message: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <TriangleAlert
        className="mx-auto size-8 text-red-500"
        aria-hidden="true"
      />
      <h2 className="mt-3 text-base font-semibold text-red-800">
        Could not load courses
      </h2>
      <p className="mt-1 text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  )
}
