import { useEffect, useState } from 'react'

export function useHtmlImage(dataUrl: string | null) {
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!dataUrl) {
      setImage(null)
      return
    }

    let cancelled = false
    const next = new Image()
    next.onload = () => {
      if (!cancelled) {
        setImage(next)
      }
    }
    next.src = dataUrl

    return () => {
      cancelled = true
    }
  }, [dataUrl])

  return image
}