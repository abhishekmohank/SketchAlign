import { useEffect, useMemo, useRef, type RefObject } from 'react'
import Konva from 'konva'
import { Image as KonvaImage, Layer, Rect, Stage, Transformer } from 'react-konva'
import { useElementSize } from '../../hooks/useElementSize'
import { useHtmlImage } from '../../hooks/useHtmlImage'
import { clamp, containRect } from '../../utils/image'
import { useSketchAlignStore } from '../../store/useSketchAlignStore'
import { GridOverlay } from './GridOverlay'

type SketchCanvasProps = {
  stageRef: RefObject<Konva.Stage | null>
}

export function SketchCanvas({ stageRef }: SketchCanvasProps) {
  const transformerRef = useRef<Konva.Transformer | null>(null)
  const referenceImageRef = useRef<Konva.Image | null>(null)
  const { ref: setCanvasArea, size } = useElementSize<HTMLDivElement>()

  const sketchDataUrl = useSketchAlignStore((state) => state.sketchDataUrl)
  const referenceDataUrl = useSketchAlignStore((state) => state.referenceDataUrl)
  const reference = useSketchAlignStore((state) => state.reference)
  const layers = useSketchAlignStore((state) => state.layers)
  const gridSize = useSketchAlignStore((state) => state.gridSize)
  const canvas = useSketchAlignStore((state) => state.canvas)
  const setCanvasPatch = useSketchAlignStore((state) => state.setCanvasPatch)
  const setReferencePatch = useSketchAlignStore((state) => state.setReferencePatch)

  const sketchImage = useHtmlImage(sketchDataUrl)
  const referenceImage = useHtmlImage(referenceDataUrl)

  const sketchBounds = useMemo(
    () =>
      containRect(
        sketchImage?.naturalWidth ?? 1600,
        sketchImage?.naturalHeight ?? 1200,
        size.width,
        size.height,
      ),
    [size.height, size.width, sketchImage],
  )

  useEffect(() => {
    const transformer = transformerRef.current
    const imageNode = referenceImageRef.current

    if (!transformer || !imageNode || !referenceDataUrl) {
      transformer?.nodes([])
      transformer?.getLayer()?.batchDraw()
      return
    }

    transformer.nodes([imageNode])
    transformer.getLayer()?.batchDraw()
  }, [reference, referenceDataUrl])

  function zoomAtPointer(nextScale: number, pointer: { x: number; y: number }) {
    const mousePointTo = {
      x: (pointer.x - canvas.offsetX) / canvas.zoom,
      y: (pointer.y - canvas.offsetY) / canvas.zoom,
    }

    setCanvasPatch({
      zoom: nextScale,
      offsetX: pointer.x - mousePointTo.x * nextScale,
      offsetY: pointer.y - mousePointTo.y * nextScale,
    })
  }

  return (
    <div
      ref={setCanvasArea}
      className="relative h-full min-h-[660px] overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 shadow-[0_30px_120px_rgba(2,6,23,0.45)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_24%)]" />
      <div className="absolute inset-4 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-[1px]" />

      {size.width > 0 && size.height > 0 ? (
        <Stage
  ref={stageRef}
  width={size.width}
  height={size.height}
  scaleX={canvas.zoom}
  scaleY={canvas.zoom}
  x={canvas.offsetX}
  y={canvas.offsetY}
  draggable
  className="relative z-10 cursor-grab active:cursor-grabbing"
  onDragStart={(event) => {
    // Only change cursor when dragging the stage itself
    if (event.target === event.target.getStage()) {
      event.target.getStage()?.container().style.setProperty("cursor", "grabbing")
    }
  }}

onDragEnd={(event) => {
  setCanvasPatch({
    offsetX: event.target.x(),
    offsetY: event.target.y(),
  })

  event.target.getStage()?.container().style.setProperty("cursor", "grab")
}}
          
          onWheel={(event) => {
            event.evt.preventDefault()

            const stage = event.target.getStage()
            const pointer = stage?.getPointerPosition()
            if (!pointer) {
              return
            }

            const nextScale = clamp(
              canvas.zoom + (event.evt.deltaY > 0 ? -0.08 : 0.08),
              0.35,
              2.5,
            )
            zoomAtPointer(nextScale, pointer)
          }}
        >
          <Layer>
            <Rect x={0} y={0} width={size.width} height={size.height} fill="#0a1020" />

            {layers.grid ? (
              <GridOverlay width={size.width} height={size.height} size={Math.max(24, gridSize)} />
            ) : null}

            {sketchImage && layers.sketch ? (
              <KonvaImage
                image={sketchImage}
                x={sketchBounds.x}
                y={sketchBounds.y}
                width={sketchBounds.width}
                height={sketchBounds.height}
                listening={false}
                opacity={1}
              />
            ) : null}

            {referenceImage && layers.reference ? (
              <KonvaImage
                ref={referenceImageRef}
                image={referenceImage}
                x={reference.x}
                y={reference.y}
                width={reference.width}
                height={reference.height}
                rotation={reference.rotation}
                scaleX={reference.flipX ? -1 : 1}
                scaleY={reference.flipY ? -1 : 1}
                opacity={reference.opacity}
                draggable
                onDragEnd={(event) => {
                  setReferencePatch({ x: event.target.x(), y: event.target.y() })
                }}
                onTransformEnd={() => {
                  const node = referenceImageRef.current
                  if (!node) {
                    return
                  }

                  const scaleX = node.scaleX()
                  const scaleY = node.scaleY()

                  setReferencePatch({
                    x: node.x(),
                    y: node.y(),
                    rotation: node.rotation(),
                    width: Math.max(40, Math.abs(node.width() * scaleX)),
                    height: Math.max(40, Math.abs(node.height() * scaleY)),
                    flipX: scaleX < 0,
                    flipY: scaleY < 0,
                  })

                  node.scaleX(1)
                  node.scaleY(1)
                }}
              />
            ) : null}

            <Transformer
              ref={transformerRef}
              rotateEnabled
              keepRatio={false}
              flipEnabled
              enabledAnchors={[
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                'middle-left',
                'middle-right',
                'top-center',
                'bottom-center',
              ]}
              anchorStroke="#7dd3fc"
              anchorFill="#e0f2fe"
              borderStroke="#22d3ee"
              rotationSnaps={[0, 15, 30, 45, 60, 90, 180]}
              boundBoxFunc={(previousBox, nextBox) => {
                if (Math.abs(nextBox.width) < 40 || Math.abs(nextBox.height) < 40) {
                  return previousBox
                }

                return nextBox
              }}
            />
          </Layer>
        </Stage>
      ) : (
        <div className="relative z-10 flex h-full min-h-[660px] items-center justify-center p-6 text-center">
          <div className="max-w-md rounded-[28px] border border-white/10 bg-white/6 p-8 backdrop-blur-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Canvas ready
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Upload a sketch to start aligning.
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              The workspace includes zoom, pan, grid overlays, keyboard shortcuts, and PNG export.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}