import { BrainCircuit, ScanFace, SlidersHorizontal, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { useSketchAlignStore } from '../../store/useSketchAlignStore'
import { buildMockInsights, futureAlignmentWorkflow } from '../../utils/alignment'

export function AlignmentAssistant() {
  const reference = useSketchAlignStore((state) => state.reference)
  const insights = buildMockInsights(reference)

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {insights.map((insight) => (
          <article
            key={insight.title}
            className={`rounded-[22px] border-3 border-slate-900 p-4 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] ${insight.accent}`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                {insight.title}
              </h3>
              <span className="rounded-full bg-white/60 px-2.5 py-1 text-xs font-semibold text-slate-900 dark:bg-white/10 dark:text-white">
                {insight.score}%
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{insight.description}</p>
          </article>
        ))}
      </div>

      <div className="rounded-[24px] border-3 border-slate-900 bg-slate-50 dark:bg-slate-900/40 p-4 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
          <Sparkles className="h-4 w-4 text-cyan-500 animate-pulse" />
          AI assistant roadmap
        </div>
        <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {futureAlignmentWorkflow.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <FeatureCard
          icon={<ScanFace className="h-4 w-4" />}
          title="Landmarks"
          description="Facial and object anchor detection coming next."
        />
        <FeatureCard
          icon={<BrainCircuit className="h-4 w-4" />}
          title="Suggestions"
          description="Automatic corrections for scale, angle, and spacing."
        />
        <FeatureCard
          icon={<SlidersHorizontal className="h-4 w-4" />}
          title="Compare"
          description="Side-by-side proportion deltas over the live overlay."
        />
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-[20px] border-3 border-slate-900 bg-white dark:bg-slate-900/60 p-3 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] flex flex-col justify-between">
      <div>
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl border-2 border-slate-900 bg-slate-950 text-white dark:bg-slate-800 dark:text-slate-100">
          {icon}
        </div>
        <h3 className="mt-3 text-sm font-black text-slate-950 dark:text-white leading-tight">{title}</h3>
      </div>
      <p className="mt-1 text-xs font-bold text-slate-600 dark:text-slate-400 leading-normal">{description}</p>
    </div>
  )
}