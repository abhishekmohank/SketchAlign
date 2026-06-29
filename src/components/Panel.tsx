import type { ReactNode } from 'react'

type PanelProps = {
  title: string
  description?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function Panel({ title, description, icon, children, className = '' }: PanelProps) {
  return (
    <section
      className={`rounded-[28px] border-4 border-slate-900 bg-gradient-to-br from-yellow-50 to-pink-50 dark:from-slate-900 dark:to-slate-800/90 p-5 shadow-[4px_4px_0px_0px_#1e293b] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] text-slate-800 dark:text-slate-100 ${className}`}
    >
      <header className="mb-5 flex items-start gap-3">
        {icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-slate-900 bg-gradient-to-br from-blue-200 to-purple-300 dark:from-blue-900 dark:to-purple-900 text-slate-900 dark:text-slate-100 shadow-sm shrink-0">
            {icon}
          </div>
        ) : null}
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">{description}</p>
          ) : null}
        </div>
      </header>
      {children}
    </section>
  )
}