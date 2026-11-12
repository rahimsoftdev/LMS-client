import { VideoOff } from 'lucide-react'
import { getEmbedUrl } from '@/utils/video'

type VideoEmbedProps = {
  videoUrl: string
  title: string
}

export default function VideoEmbed({ videoUrl, title }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(videoUrl)

  if (!embedUrl) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-6 text-center">
        <VideoOff className="size-9 text-slate-400" aria-hidden="true" />
        <p className="text-sm font-medium text-slate-600">
          This video cannot be embedded.
        </p>
        <a
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          Open video in a new tab
        </a>
      </div>
    )
  }

  return (
    <div className="aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
      <iframe
        src={embedUrl}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
