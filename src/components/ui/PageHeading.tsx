type PageHeadingProps = {
  title: string
  description?: string
}

export default function PageHeading({ title, description }: PageHeadingProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </div>
  )
}
