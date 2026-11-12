export function getEmbedUrl(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = url.pathname.replace('/', '')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (url.pathname.startsWith('/embed/')) {
        return videoUrl
      }

      const id = url.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      if (host === 'player.vimeo.com') {
        return videoUrl
      }

      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `https://player.vimeo.com/video/${id}` : null
    }

    return null
  } catch {
    return null
  }
}
