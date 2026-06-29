import type { ReactNode } from 'react'

type ToggleChipProps = {
  active: boolean
  onClick: () => void
  label: string
  icon: ReactNode
}

export function ToggleChip({ active, onClick, label, icon }: ToggleChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-10 items-center gap-2 rounded-2xl border-3 border-slate-900 px-4 text-sm font-black transition-all duration-150 active:translate-y-0.5 ${
        active
          ? 'bg-amber-300 text-slate-900 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]'
          : 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}