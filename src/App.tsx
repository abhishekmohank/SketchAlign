import { useEffect, useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { WorkspacePage } from './pages/WorkspacePage.tsx'
import { useSketchAlignStore } from './store/useSketchAlignStore'

function App() {
  const [view, setView] = useState<'landing' | 'workspace'>('landing')
  const theme = useSketchAlignStore((state) => state.theme)
  const toggleTheme = useSketchAlignStore((state) => state.toggleTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return view === 'workspace' ? (
    <WorkspacePage onToggleTheme={toggleTheme} theme={theme} />
  ) : (
    <LandingPage
      onToggleTheme={toggleTheme}
      theme={theme}
      onStartDrawing={() => setView('workspace')}
    />
  )
}

export default App