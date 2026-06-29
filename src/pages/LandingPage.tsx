import { useState, useEffect } from 'react'
import { ArrowRight, Camera, Move, Sparkles, Star, Smile, RefreshCw } from 'lucide-react'
import type { ReactNode } from 'react'

type LandingPageProps = {
  onStartDrawing: () => void
  onToggleTheme: () => void
  theme: 'light' | 'dark'
}

type Mascot = {
  id: string
  emoji: string
  name: string
  color: string
  greeting: string
}

const MASCOTS: Mascot[] = [
  {
    id: 'fox',
    emoji: '🦊',
    name: 'Pip the Fox',
    color: 'bg-orange-400 border-orange-500 text-orange-950',
    greeting: "Hiya, little artist! Let's draw some super-duper shapes today! 🦊✨",
  },
  {
    id: 'unicorn',
    emoji: '🦄',
    name: 'Sparky',
    color: 'bg-pink-400 border-pink-500 text-pink-950',
    greeting: 'Everything is magical when we paint and dream together! 🦄💖',
  },
  {
    id: 'dino',
    emoji: '🦖',
    name: 'Dino-Rawr',
    color: 'bg-green-400 border-green-500 text-green-950',
    greeting: "ROAR! Let's stomp some lines and draw a giant masterpiece! 🦖🔥",
  },
  {
    id: 'bear',
    emoji: '🧸',
    name: 'Barnaby Bear',
    color: 'bg-amber-500 border-amber-600 text-amber-950',
    greeting: 'Hello friend! Snuggle up and let\'s trace something sweet! 🧸🍯',
  },
]

const animationStyles = `
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-8deg) scale(1.1); }
    75% { transform: rotate(8deg) scale(1.1); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(6deg); }
  }
  @keyframes float-medium {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(-4deg); }
  }
  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  .animate-wiggle {
    animation: wiggle 0.4s ease-in-out;
  }
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  .animate-float-medium {
    animation: float-medium 4.2s ease-in-out infinite;
  }
  .animate-bounce-gentle {
    animation: bounce-gentle 3s ease-in-out infinite;
  }
  .neobrutalist-card {
    border: 4px solid #1e293b;
    border-radius: 28px;
    box-shadow: 6px 6px 0px 0px #1e293b;
  }
  .neobrutalist-button {
    border: 4px solid #1e293b;
    box-shadow: 4px 4px 0px 0px #1e293b;
    transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .neobrutalist-button:hover {
    transform: translateY(-3px);
    box-shadow: 6px 6px 0px 0px #1e293b;
  }
  .neobrutalist-button:active {
    transform: translateY(2px);
    box-shadow: 2px 2px 0px 0px #1e293b;
  }
`

export function LandingPage({ onStartDrawing, onToggleTheme, theme }: LandingPageProps) {
  const [selectedMascot, setSelectedMascot] = useState<Mascot>(MASCOTS[0]!)
  const [wiggleTrigger, setWiggleTrigger] = useState(false)

  // Interactive Mockup State
  const [mockOpacity, setMockOpacity] = useState(70)
  const [mockRotation, setMockRotation] = useState(-10)
  const [mockZoom, setMockZoom] = useState(110)
  const [mockFlipX, setMockFlipX] = useState(false)

  useEffect(() => {
    if (wiggleTrigger) {
      const timer = setTimeout(() => setWiggleTrigger(false), 400)
      return () => clearTimeout(timer)
    }
  }, [wiggleTrigger])

  const handleMascotSelect = (mascot: Mascot) => {
    setSelectedMascot(mascot)
    setWiggleTrigger(true)
  }

  const handleResetMockup = () => {
    setMockOpacity(70)
    setMockRotation(-10)
    setMockZoom(110)
    setMockFlipX(false)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,182,193,0.5),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(144,202,249,0.45),_transparent_40%),linear-gradient(180deg,#fff5f7_0%,#f0f8ff_50%,#fffacd_100%)] text-slate-800 pb-16">
      <style>{animationStyles}</style>

      {/* Decorative Floating Cartoon Assets */}
      <div className="absolute top-[15%] left-[5%] text-6xl select-none pointer-events-none animate-float-slow hidden md:block">
        🎨
      </div>
      <div className="absolute top-[45%] left-[8%] text-5xl select-none pointer-events-none animate-float-medium hidden md:block">
        🦄
      </div>
      <div className="absolute top-[75%] left-[3%] text-6xl select-none pointer-events-none animate-bounce-gentle hidden md:block">
        🌈
      </div>
      <div className="absolute top-[12%] right-[8%] text-5xl select-none pointer-events-none animate-bounce-gentle hidden md:block">
        ⭐
      </div>
      <div className="absolute top-[55%] right-[5%] text-6xl select-none pointer-events-none animate-float-slow hidden md:block">
        🚀
      </div>
      <div className="absolute top-[80%] right-[10%] text-5xl select-none pointer-events-none animate-float-medium hidden md:block">
        🦖
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pt-5 sm:px-8 lg:px-10">
        
        {/* Navigation Bar */}
        <header className="flex items-center justify-between rounded-[30px] border-4 border-slate-900 bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 px-6 py-4 shadow-[6px_6px_0px_0px_rgba(30,41,59,1)]">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce-gentle">✨</span>
            <div>
              <p className="text-2xl font-black uppercase tracking-wider text-slate-900 leading-none">
                SketchAlign
              </p>
              <p className="text-xs font-bold text-slate-700 tracking-wide mt-1">
                🎨 Your Magical Drawing Buddy! 🚀
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="neobrutalist-button rounded-full bg-gradient-to-r from-green-300 to-emerald-300 px-5 py-2 text-sm font-black text-slate-900"
          >
            {theme === 'dark' ? '☀️ Bright Mode' : '🌙 Night Mode'}
          </button>
        </header>

        {/* Hero Section */}
        <section className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            
            {/* Playful Tagline */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-[25px] border-3 border-slate-900 bg-amber-300 px-6 py-2.5 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)]">
              <Star className="h-5 w-5 fill-amber-500 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
              Super Fun Tracing & Drawing Game!
            </div>
            
            <h1 className="bg-gradient-to-r from-red-500 via-purple-600 to-pink-500 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl leading-tight">
              Draw Like Magic!
            </h1>
            <h2 className="mt-1 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
              Trace, Align, Have Fun! 🚀
            </h2>
            
            <p className="mt-6 text-lg font-bold leading-relaxed text-slate-700">
              Welcome to the coolest drawing workshop on the web! 🎨 Load your sketches, overlay funny reference animals, and slide the magical glass to match contours perfectly. It's like having high-tech X-Ray glasses for tracing! 🔮✨
            </p>

            {/* Playful Mascot Interactive Talk Area */}
            <div className={`mt-8 neobrutalist-card bg-white p-5 flex flex-col sm:flex-row gap-4 items-center transition-all ${wiggleTrigger ? 'animate-wiggle' : ''}`}>
              <div className="text-6xl select-none animate-bounce-gentle shrink-0">
                {selectedMascot.emoji}
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-block rounded-full bg-slate-900 px-3 py-0.5 text-xs font-black text-white">
                  {selectedMascot.name}
                </div>
                <div className="relative bg-slate-100 rounded-2xl p-3 border-2 border-slate-900 text-sm font-bold text-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {selectedMascot.greeting}
                </div>
              </div>
            </div>

            {/* Mascot Buddy Pickers */}
            <div className="mt-6">
              <p className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
                👇 Tap to choose your drawing buddy:
              </p>
              <div className="flex flex-wrap gap-3">
                {MASCOTS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMascotSelect(m)}
                    className={`neobrutalist-button flex items-center gap-2 rounded-2xl px-4 py-2.5 font-black text-sm ${
                      selectedMascot.id === m.id
                        ? `${m.color} ring-4 ring-offset-2 ring-slate-950 scale-105`
                        : 'bg-white border-slate-900 text-slate-800'
                    }`}
                  >
                    <span className="text-xl">{m.emoji}</span>
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <button
                type="button"
                onClick={onStartDrawing}
                className="neobrutalist-button inline-flex items-center gap-3 rounded-[30px] bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 px-10 py-5 text-2xl font-black text-slate-900 cursor-pointer"
              >
                🎨 Enter Drawing Studio!
                <ArrowRight className="h-7 w-7 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Interactive Mockup Drawing Box */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 opacity-60 blur-xl animate-pulse-gentle" />
            <div className="relative neobrutalist-card bg-gradient-to-br from-yellow-100 to-pink-100 p-6">
              
              <div className="flex items-center justify-between gap-4 rounded-2xl border-4 border-slate-900 bg-white/90 px-4 py-2 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(30,41,59,1)]">
                <span className="flex items-center gap-2">
                  <Smile className="h-4 w-4 text-pink-500 fill-pink-300" />
                  Try The Magic Glass!
                </span>
                <span className="rounded-full bg-cyan-300 px-3 py-0.5 text-xs font-black">
                  Interactive Preview
                </span>
              </div>

              {/* The Mockup Drawing Board */}
              <div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                
                {/* Board Viewport */}
                <div className="relative h-56 rounded-[28px] border-4 border-slate-900 bg-slate-900 overflow-hidden shadow-inner flex items-center justify-center">
                  
                  {/* Grid Lines mockup */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Static Paper Sketch Layer (E.g. Outline of a Cat) */}
                  <div className="absolute select-none pointer-events-none opacity-60">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      {/* Cat head outline */}
                      <path d="M15,40 L10,15 L30,28 L70,28 L90,15 L85,40 C90,55 90,70 80,82 C70,92 30,92 20,82 C10,70 10,55 15,40 Z" />
                      {/* Cat eyes outline */}
                      <circle cx="35" cy="50" r="5" />
                      <circle cx="65" cy="50" r="5" />
                      {/* Cat nose outline */}
                      <polygon points="50,60 45,55 55,55" />
                      {/* Whiskers */}
                      <line x1="25" y1="62" x2="5" y2="60" />
                      <line x1="25" y1="67" x2="8" y2="70" />
                      <line x1="75" y1="62" x2="95" y2="60" />
                      <line x1="75" y1="67" x2="92" y2="70" />
                    </svg>
                    <div className="text-[10px] text-blue-400 font-bold text-center mt-1 uppercase">My Scribble</div>
                  </div>

                  {/* Dynamic Tracing Reference Layer (E.g. Filled Cute Cat) */}
                  <div
                    className="absolute transition-transform duration-75 select-none pointer-events-none"
                    style={{
                      opacity: mockOpacity / 100,
                      transform: `rotate(${mockRotation}deg) scale(${mockZoom / 100}) ${mockFlipX ? 'scaleX(-1)' : ''}`,
                    }}
                  >
                    <svg width="115" height="115" viewBox="0 0 100 100" fill="#f472b6" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      {/* Cat head filled */}
                      <path d="M15,40 L10,15 L30,28 L70,28 L90,15 L85,40 C90,55 90,70 80,82 C70,92 30,92 20,82 C10,70 10,55 15,40 Z" />
                      {/* Inside ears */}
                      <path d="M15,30 L13,18 L24,24 Z" fill="#fbcfe8" />
                      <path d="M85,30 L87,18 L76,24 Z" fill="#fbcfe8" />
                      {/* Cat eyes filled */}
                      <circle cx="35" cy="50" r="7" fill="#fff" />
                      <circle cx="35" cy="50" r="3" fill="#000" />
                      <circle cx="65" cy="50" r="7" fill="#fff" />
                      <circle cx="65" cy="50" r="3" fill="#000" />
                      {/* Nose */}
                      <polygon points="50,60 45,55 55,55" fill="#f43f5e" />
                      {/* Whiskers */}
                      <line x1="25" y1="62" x2="8" y2="60" stroke="#1e293b" />
                      <line x1="25" y1="67" x2="10" y2="70" stroke="#1e293b" />
                      <line x1="75" y1="62" x2="92" y2="60" stroke="#1e293b" />
                      <line x1="75" y1="67" x2="90" y2="70" stroke="#1e293b" />
                      {/* Smiling mouth */}
                      <path d="M44,65 Q50,70 56,65" stroke="#1e293b" fill="none" />
                    </svg>
                    <div className="text-[10px] text-pink-500 font-bold text-center mt-1 uppercase">Reference</div>
                  </div>

                </div>

                {/* Simulated Sliders */}
                <div className="space-y-3 rounded-2xl bg-white/70 border-3 border-slate-900 p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-black text-slate-800">
                      <span>🔍 Tracing Glass</span>
                      <span className="text-pink-600">{mockOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={mockOpacity}
                      onChange={(e) => setMockOpacity(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-pink-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-black text-slate-800">
                      <span>🔄 Rotation</span>
                      <span className="text-blue-600">{mockRotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="-90"
                      max="90"
                      value={mockRotation}
                      onChange={(e) => setMockRotation(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-black text-slate-800">
                      <span>📐 Size</span>
                      <span className="text-purple-600">{mockZoom}%</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="150"
                      value={mockZoom}
                      onChange={(e) => setMockZoom(Number(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-purple-500"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setMockFlipX(!mockFlipX)}
                      className={`flex-1 neobrutalist-button rounded-xl py-1 text-xs font-black ${
                        mockFlipX ? 'bg-amber-400' : 'bg-white'
                      }`}
                    >
                      🔁 Flip
                    </button>
                    <button
                      type="button"
                      onClick={handleResetMockup}
                      className="neobrutalist-button rounded-xl bg-red-400 p-1 px-3 text-xs font-black text-white"
                      title="Reset parameters"
                    >
                      <RefreshCw className="h-3 w-3" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Feature Cards Showcase */}
        <section className="grid gap-6 mt-6 sm:grid-cols-3">
          <FeaturePill
            emoji="📤"
            icon={<Camera className="h-5 w-5 text-slate-900" />}
            title="Upload Doodles"
            text="Load your paper sketches or coloring book templates with ease!"
            bgGradient="from-yellow-200 to-amber-300"
          />
          <FeaturePill
            emoji="✨"
            icon={<Move className="h-5 w-5 text-slate-900" />}
            title="Align Instantly"
            text="Fade, spin, move, and shrink overlay images to trace like a champion."
            bgGradient="from-pink-200 to-purple-300"
          />
          <FeaturePill
            emoji="🎉"
            icon={<Sparkles className="h-5 w-5 text-slate-900" />}
            title="Export Artwork"
            text="Save and print your final aligned masterpieces to share with family!"
            bgGradient="from-green-200 to-emerald-300"
          />
        </section>

      </div>
    </main>
  )
}

function FeaturePill({
  emoji,
  icon,
  title,
  text,
  bgGradient,
}: {
  emoji: string
  icon: ReactNode
  title: string
  text: string
  bgGradient: string
}) {
  return (
    <article className={`neobrutalist-card bg-gradient-to-br ${bgGradient} p-5 hover:scale-105 transition-transform duration-200`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-3 border-slate-900 bg-white text-2xl font-bold shadow-[2px_2px_0px_0px_#1e293b]">
        {emoji}
      </div>
      <h3 className="mt-4 text-xl font-black text-slate-900 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <p className="mt-2 text-sm font-bold text-slate-800 leading-relaxed">
        {text}
      </p>
    </article>
  )
}