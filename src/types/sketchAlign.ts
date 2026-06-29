export type ThemeMode = 'light' | 'dark'

export type LayerVisibility = {
  sketch: boolean
  reference: boolean
  grid: boolean
}

export type ReferenceTransform = {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  flipX: boolean
  flipY: boolean
}

export type CanvasTransform = {
  zoom: number
  offsetX: number
  offsetY: number
}

export type SketchAlignSnapshot = {
  sketchDataUrl: string | null
  referenceDataUrl: string | null
  layers: LayerVisibility
  reference: ReferenceTransform
  canvas: CanvasTransform
  gridSize: number
}

export type UploadedImage = {
  dataUrl: string
  width: number
  height: number
  name: string
}

export type AlignmentInsight = {
  title: string
  description: string
  score: number
  accent: string
}