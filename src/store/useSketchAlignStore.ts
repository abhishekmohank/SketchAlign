import { create } from 'zustand'
import type {
  CanvasTransform,
  LayerVisibility,
  ReferenceTransform,
  SketchAlignSnapshot,
  ThemeMode,
} from '../types/sketchAlign'

type SketchAlignState = {
  theme: ThemeMode
  sketchDataUrl: string | null
  referenceDataUrl: string | null
  layers: LayerVisibility
  reference: ReferenceTransform
  canvas: CanvasTransform
  gridSize: number
  historyPast: SketchAlignSnapshot[]
  historyFuture: SketchAlignSnapshot[]
  toggleTheme: () => void
  setSketchDataUrl: (dataUrl: string | null) => void
  setReferenceFromUpload: (
    dataUrl: string,
    width: number,
    height: number,
  ) => void
  removeReferenceImage: () => void
  setLayerVisibility: (key: keyof LayerVisibility, value: boolean) => void
  setGridSize: (gridSize: number) => void
  setReferencePatch: (patch: Partial<ReferenceTransform>) => void
  setCanvasPatch: (patch: Partial<CanvasTransform>) => void
  resetAlignment: () => void
  undo: () => void
  redo: () => void
}

const defaultLayers: LayerVisibility = {
  sketch: true,
  reference: true,
  grid: true,
}

const defaultReference: ReferenceTransform = {
  x: 176,
  y: 132,
  width: 320,
  height: 220,
  rotation: 0,
  opacity: 0.72,
  flipX: false,
  flipY: false,
}

const defaultCanvas: CanvasTransform = {
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
}

function createSnapshot(state: SketchAlignState): SketchAlignSnapshot {
  return {
    sketchDataUrl: state.sketchDataUrl,
    referenceDataUrl: state.referenceDataUrl,
    layers: { ...state.layers },
    reference: { ...state.reference },
    canvas: { ...state.canvas },
    gridSize: state.gridSize,
  }
}

function restoreSnapshot(snapshot: SketchAlignSnapshot) {
  return {
    sketchDataUrl: snapshot.sketchDataUrl,
    referenceDataUrl: snapshot.referenceDataUrl,
    layers: { ...snapshot.layers },
    reference: { ...snapshot.reference },
    canvas: { ...snapshot.canvas },
    gridSize: snapshot.gridSize,
  }
}

function pushHistory(state: SketchAlignState) {
  return [...state.historyPast, createSnapshot(state)].slice(-30)
}

export const useSketchAlignStore = create<SketchAlignState>((set) => ({
  theme: 'dark',
  sketchDataUrl: null,
  referenceDataUrl: null,
  layers: defaultLayers,
  reference: defaultReference,
  canvas: defaultCanvas,
  gridSize: 48,
  historyPast: [],
  historyFuture: [],
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setSketchDataUrl: (dataUrl) =>
    set((state) => ({
      ...state,
      historyPast: pushHistory(state),
      historyFuture: [],
      sketchDataUrl: dataUrl,
    })),
  setReferenceFromUpload: (dataUrl, width, height) =>
    set((state) => {
      const maxWidth = 360
      const maxHeight = 280
      const scale = Math.min(maxWidth / width, maxHeight / height, 1)

      return {
        ...state,
        historyPast: pushHistory(state),
        historyFuture: [],
        referenceDataUrl: dataUrl,
        reference: {
          ...state.reference,
          x: 150,
          y: 120,
          width: Math.max(180, Math.round(width * scale)),
          height: Math.max(120, Math.round(height * scale)),
          rotation: 0,
          opacity: 0.72,
          flipX: false,
          flipY: false,
        },
      }
    }),
  removeReferenceImage: () =>
    set((state) => ({
      ...state,
      historyPast: pushHistory(state),
      historyFuture: [],
      referenceDataUrl: null,
    })),
  setLayerVisibility: (key, value) =>
    set((state) => ({
      ...state,
      historyPast: pushHistory(state),
      historyFuture: [],
      layers: { ...state.layers, [key]: value },
    })),
  setGridSize: (gridSize) =>
    set((state) => ({
      ...state,
      historyPast: pushHistory(state),
      historyFuture: [],
      gridSize,
    })),
  setReferencePatch: (patch) =>
    set((state) => ({
      ...state,
      historyPast: pushHistory(state),
      historyFuture: [],
      reference: { ...state.reference, ...patch },
    })),
  setCanvasPatch: (patch) =>
    set((state) => ({
      ...state,
      historyPast: pushHistory(state),
      historyFuture: [],
      canvas: { ...state.canvas, ...patch },
    })),
  resetAlignment: () =>
    set((state) => ({
      ...state,
      historyPast: pushHistory(state),
      historyFuture: [],
      reference: { ...defaultReference },
      canvas: { ...defaultCanvas },
      layers: { ...defaultLayers },
      gridSize: 48,
    })),
  undo: () =>
    set((state) => {
      if (state.historyPast.length === 0) {
        return state
      }

      const previous = state.historyPast[state.historyPast.length - 1]
      const current = createSnapshot(state)

      return {
        ...state,
        ...restoreSnapshot(previous),
        historyPast: state.historyPast.slice(0, -1),
        historyFuture: [current, ...state.historyFuture].slice(0, 30),
      }
    }),
  redo: () =>
    set((state) => {
      if (state.historyFuture.length === 0) {
        return state
      }

      const next = state.historyFuture[0]
      const current = createSnapshot(state)

      return {
        ...state,
        ...restoreSnapshot(next),
        historyPast: [...state.historyPast, current].slice(-30),
        historyFuture: state.historyFuture.slice(1),
      }
    }),
}))

export { defaultCanvas, defaultLayers, defaultReference }