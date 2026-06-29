import type { AlignmentInsight, ReferenceTransform } from '../types/sketchAlign'

export function buildMockInsights(reference: ReferenceTransform): AlignmentInsight[] {
  const opacityScore = Math.round(reference.opacity * 100)
  const angleScore = Math.max(48, 100 - Math.abs(reference.rotation) * 1.8)
  const sizeScore = Math.max(54, 86 - Math.abs(reference.width - reference.height) * 0.02)

  return [
    {
      title: 'Landmark scan',
      description: 'Future face and object landmark detection will anchor this pass.',
      score: 88,
      accent: 'bg-cyan-100 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 border-cyan-400',
    },
    {
      title: 'Opacity check',
      description: `Reference opacity is set to ${opacityScore}% for comfortable tracing.`,
      score: opacityScore,
      accent: 'bg-fuchsia-100 dark:bg-fuchsia-950/40 text-fuchsia-900 dark:text-fuchsia-200 border-fuchsia-400',
    },
    {
      title: 'Proportion delta',
      description: 'Mock analysis flags rotation and scale changes for the future AI assistant.',
      score: Math.round((angleScore + sizeScore) / 2),
      accent: 'bg-amber-100 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 border-amber-400',
    },
  ]
}

export const futureAlignmentWorkflow = [
  'Detect face landmarks and object boundaries',
  'Estimate silhouette symmetry and proportion ratios',
  'Suggest micro-adjustments to rotation, scale, and placement',
  'Highlight mismatched segments directly on the canvas',
]