import type { ReactElement } from 'react'
import { Line } from 'react-konva'

type GridOverlayProps = {
  width: number
  height: number
  size: number
}

export function GridOverlay({ width, height, size }: GridOverlayProps) {
  const lines: ReactElement[] = []

  for (let x = 0; x <= width; x += size) {
    lines.push(
      <Line
        key={`x-${x}`}
        points={[x, 0, x, height]}
        stroke="rgba(148,163,184,0.18)"
        strokeWidth={1}
        listening={false}
      />,
    )
  }

  for (let y = 0; y <= height; y += size) {
    lines.push(
      <Line
        key={`y-${y}`}
        points={[0, y, width, y]}
        stroke="rgba(148,163,184,0.18)"
        strokeWidth={1}
        listening={false}
      />,
    )
  }

  return <>{lines}</>
}