import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import Konva from 'konva'
import {
  Eye,
  FlipHorizontal,
  FlipVertical,
  Grid2x2,
  Layers3,
  Moon,
  RotateCw,
  SlidersHorizontal,
  Sparkles,
  Square,
  SunMedium,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { AlignmentAssistant } from '../features/alignment/AlignmentAssistant'
import { SketchCanvas } from '../features/canvas/SketchCanvas'
import { ImageUploadCard } from '../features/upload/ImageUploadCard'
import { ToggleChip } from '../components/ToggleChip'
import { Panel } from '../components/Panel'
import { downloadDataUrl } from '../utils/image'
import { useSketchAlignStore } from '../store/useSketchAlignStore'

type WorkspacePageProps = {
  onToggleTheme: () => void
  theme: 'light' | 'dark'
}

export function WorkspacePage({ onToggleTheme, theme }: WorkspacePageProps) {
  const stageRef = useRef<Konva.Stage | null>(null)

  const sketchDataUrl = useSketchAlignStore((state) => state.sketchDataUrl)
  const referenceDataUrl = useSketchAlignStore((state) => state.referenceDataUrl)
  const layers = useSketchAlignStore((state) => state.layers)
  const reference = useSketchAlignStore((state) => state.reference)
  const canvas = useSketchAlignStore((state) => state.canvas)
  const gridSize = useSketchAlignStore((state) => state.gridSize)
  const historyPast = useSketchAlignStore((state) => state.historyPast)
  const historyFuture = useSketchAlignStore((state) => state.historyFuture)
  const setLayerVisibility = useSketchAlignStore((state) => state.setLayerVisibility)
  const setGridSize = useSketchAlignStore((state) => state.setGridSize)
  const setReferencePatch = useSketchAlignStore((state) => state.setReferencePatch)
  const setCanvasPatch = useSketchAlignStore((state) => state.setCanvasPatch)
  const setReferenceFromUpload = useSketchAlignStore((state) => state.setReferenceFromUpload)
  const setSketchDataUrl = useSketchAlignStore((state) => state.setSketchDataUrl)
  const removeReferenceImage = useSketchAlignStore((state) => state.removeReferenceImage)
  const resetAlignment = useSketchAlignStore((state) => state.resetAlignment)
  const undo = useSketchAlignStore((state) => state.undo)
  const redo = useSketchAlignStore((state) => state.redo)

  const canUndo = historyPast.length > 0
  const canRedo = historyFuture.length > 0

  const zoomLabel = useMemo(() => `${Math.round(canvas.zoom * 100)}%`, [canvas.zoom])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable

      if (isTyping) {
        return
      }

      if (event.key === 'Delete') {
        event.preventDefault()
        removeReferenceImage()
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        if (event.shiftKey) {
          redo()
        } else {
          undo()
        }
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
        event.preventDefault()
        redo()
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault()
        setCanvasPatch({ zoom: Math.min(2.5, canvas.zoom + 0.08) })
      }

      if (event.key === '-') {
        event.preventDefault()
        setCanvasPatch({ zoom: Math.max(0.35, canvas.zoom - 0.08) })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canvas.zoom, redo, removeReferenceImage, setCanvasPatch, undo])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,182,193,0.4),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(144,202,249,0.35),_transparent_35%),linear-gradient(180deg,#fff5f7_0%,#f0f8ff_50%,#fffacd_100%)] px-4 py-4 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1720px] flex-col gap-4">
        <header
  className="
    sticky top-4 z-50
    flex flex-col gap-3
    rounded-[30px]
    border-4 border-purple-300
    bg-gradient-to-r from-yellow-200/95 via-pink-200/95 to-blue-200/95
    backdrop-blur-md
    px-5 py-4
    shadow-[0_8px_24px_rgba(234,179,8,0.2)]
    lg:flex-row lg:items-center lg:justify-between
  "
>
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-purple-700">
              🎨 SketchAlign Workspace 🎨
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-800">
              Your Drawing Studio! ✨
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ToggleChip
              active={theme === 'dark'}
              onClick={onToggleTheme}
              label={theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
              icon={theme === 'dark' ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
            />
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border-2 border-blue-400 bg-gradient-to-r from-blue-200 to-cyan-200 px-4 text-sm font-bold text-slate-800 transition hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
            >
              ↶ Undo
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border-2 border-green-400 bg-gradient-to-r from-green-200 to-teal-200 px-4 text-sm font-bold text-slate-800 transition hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
            >
              ↷ Redo
            </button>
            <button
              type="button"
              onClick={resetAlignment}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border-2 border-red-400 bg-gradient-to-r from-red-200 to-orange-200 px-4 text-sm font-bold text-slate-800 transition hover:shadow-lg hover:-translate-y-0.5"
            >
              ↻ Reset
            </button>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)_340px]">
          <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
            <Panel
              title="Uploads and controls"
              description="Load both images, adjust the overlay, and export the result."
              icon={<Layers3 className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <ImageUploadCard
                  title="Upload sketch"
                  description="Add a paper sketch or scribble photo as the locked base layer."
                  accentClassName="text-cyan-400"
                  appliedFileName={sketchDataUrl ? 'Sketch loaded' : null}
                  onApply={(image) => {
                    setSketchDataUrl(image.dataUrl)
                  }}
                />

                <ImageUploadCard
                  title="Upload reference"
                  description="Add the person, pet, or object reference you want to align."
                  accentClassName="text-fuchsia-400"
                  appliedFileName={referenceDataUrl ? 'Reference loaded' : null}
                  onApply={(image) => {
                    setReferenceFromUpload(image.dataUrl, image.width, image.height)
                  }}
                />

                <ControlGroup title="Overlay controls">
                  <RangeControl
                    label={`Opacity ${Math.round(reference.opacity * 100)}%`}
                    value={Math.round(reference.opacity * 100)}
                    min={0}
                    max={100}
                    onChange={(value) => setReferencePatch({ opacity: value / 100 })}
                  />
                  <RangeControl
                    label={`Rotate ${Math.round(reference.rotation)}°`}
                    value={Math.round(reference.rotation)}
                    min={-180}
                    max={180}
                    onChange={(value) => setReferencePatch({ rotation: value })}
                  />
                  <RangeControl
                    label={`Grid size ${gridSize}px`}
                    value={gridSize}
                    min={16}
                    max={96}
                    onChange={(value) => setGridSize(value)}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <ToggleAction
                      label="Flip horizontal"
                      icon={<FlipHorizontal className="h-4 w-4" />}
                      active={reference.flipX}
                      onToggle={() => setReferencePatch({ flipX: !reference.flipX })}
                    />
                    <ToggleAction
                      label="Flip vertical"
                      icon={<FlipVertical className="h-4 w-4" />}
                      active={reference.flipY}
                      onToggle={() => setReferencePatch({ flipY: !reference.flipY })}
                    />
                    <ToggleAction
                      label="Sketch layer"
                      icon={<Eye className="h-4 w-4" />}
                      active={layers.sketch}
                      onToggle={() => setLayerVisibility('sketch', !layers.sketch)}
                    />
                    <ToggleAction
                      label="Reference layer"
                      icon={<Square className="h-4 w-4" />}
                      active={layers.reference}
                      onToggle={() => setLayerVisibility('reference', !layers.reference)}
                    />
                    <ToggleAction
                      label="Grid overlay"
                      icon={<Grid2x2 className="h-4 w-4" />}
                      active={layers.grid}
                      onToggle={() => setLayerVisibility('grid', !layers.grid)}
                    />
                    <ToggleAction
                      label="Center view"
                      icon={<RotateCw className="h-4 w-4" />}
                      active={false}
                      onToggle={() => setCanvasPatch({ zoom: 1, offsetX: 0, offsetY: 0 })}
                    />
                  </div>
                </ControlGroup>

                <button
                  type="button"
                  onClick={() => {
                    const stage = stageRef.current
                    if (!stage) {
                      return
                    }

                    const dataUrl = stage.toDataURL({ pixelRatio: 3, mimeType: 'image/png' })
                    downloadDataUrl(dataUrl, 'sketchalign-export.png')
                  }}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border-3 border-green-400 bg-gradient-to-r from-green-300 to-lime-300 px-4 py-3 text-base font-bold text-slate-800 shadow-lg transition hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  🎉 Export PNG
                </button>
              </div>
            </Panel>
          </aside>

          <div className="min-h-0">
            <SketchCanvas stageRef={stageRef} />
          </div>

          <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
            <Panel
              title="Canvas tools"
              description="Tune the workspace, inspect layers, and review alignment hints."
              icon={<SlidersHorizontal className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <ControlGroup title="Zoom controls">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <div>
                      <p className="text-sm font-semibold text-slate-950 dark:text-white">
                        Current zoom
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Use the buttons, scroll wheel, or +/- keys.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-950 dark:text-white">
                        {zoomLabel}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCanvasPatch({ zoom: Math.max(0.35, canvas.zoom - 0.08) })}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 dark:bg-white/6 dark:text-slate-200"
                    >
                      <ZoomOut className="h-4 w-4" /> Zoom out
                    </button>
                    <button
                      type="button"
                      onClick={() => setCanvasPatch({ zoom: Math.min(2.5, canvas.zoom + 0.08) })}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
                    >
                      <ZoomIn className="h-4 w-4" /> Zoom in
                    </button>
                  </div>
                </ControlGroup>

                <ControlGroup title="Image properties">
                  <PropertyRow label="Position" value={`${Math.round(reference.x)}, ${Math.round(reference.y)}`} />
                  <PropertyRow label="Size" value={`${Math.round(reference.width)} × ${Math.round(reference.height)} px`} />
                  <PropertyRow label="Rotation" value={`${Math.round(reference.rotation)}°`} />
                  <PropertyRow label="Opacity" value={`${Math.round(reference.opacity * 100)}%`} />
                  <PropertyRow label="Flip" value={`${reference.flipX ? 'H' : '—'} / ${reference.flipY ? 'V' : '—'}`} />
                </ControlGroup>

                <ControlGroup title="Alignment tips">
                  <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li className="rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      Lower opacity while matching the largest contours first.
                    </li>
                    <li className="rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      Rotate before scaling if the silhouette feels skewed.
                    </li>
                    <li className="rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      Try flipping the reference if the pose direction is reversed.
                    </li>
                  </ul>
                </ControlGroup>
              </div>
            </Panel>

            <Panel
              title="AI alignment assistant"
              description="Placeholder architecture for future model integration."
              icon={<Sparkles className="h-5 w-5" />}
            >
              <AlignmentAssistant />
            </Panel>
          </aside>
        </section>
      </div>
    </main>
  )
}

function ControlGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white/65 p-4 dark:border-white/10 dark:bg-white/5">
      <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  )
}

function RangeControl({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-cyan-400 dark:bg-white/10"
      />
    </label>
  )
}

function ToggleAction({
  label,
  icon,
  active,
  onToggle,
}: {
  label: string
  icon: ReactNode
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-medium transition ${
        active
          ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/6 dark:text-slate-200 dark:hover:bg-white/10'
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  )
}

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
      <span className="text-slate-600 dark:text-slate-400">{label}</span>
      <span className="font-semibold text-slate-950 dark:text-white">{value}</span>
    </div>
  )
}