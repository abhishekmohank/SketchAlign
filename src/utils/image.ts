import type { UploadedImage } from '../types/sketchAlign'

export async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Unable to read file'))
    reader.readAsDataURL(file)
  })
}

export async function loadImageAsset(dataUrl: string): Promise<HTMLImageElement> {
  return await new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Unable to load image'))
    image.src = dataUrl
  })
}

export async function fileToUploadedImage(file: File): Promise<UploadedImage> {
  const dataUrl = await fileToDataUrl(file)
  const image = await loadImageAsset(dataUrl)

  return {
    dataUrl,
    width: image.naturalWidth,
    height: image.naturalHeight,
    name: file.name,
  }
}

export function downloadDataUrl(dataUrl: string, fileName: string): void {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = fileName
  link.click()
}

export function containRect(
  sourceWidth: number,
  sourceHeight: number,
  maxWidth: number,
  maxHeight: number,
) {
  if (sourceWidth === 0 || sourceHeight === 0) {
    return { x: 0, y: 0, width: maxWidth, height: maxHeight }
  }

  const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight)
  const width = sourceWidth * scale
  const height = sourceHeight * scale

  return {
    x: (maxWidth - width) / 2,
    y: (maxHeight - height) / 2,
    width,
    height,
  }
}

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value))
}