import { useMemo, useState } from 'react'
import { Check, CloudUpload, FileImage, LoaderCircle, Sparkles, X } from 'lucide-react'
import type { UploadedImage } from '../../types/sketchAlign'
import { fileToUploadedImage } from '../../utils/image'

type ImageUploadCardProps = {
  title: string
  description: string
  onApply: (image: UploadedImage) => void
  appliedFileName?: string | null
  accentClassName: string
}

export function ImageUploadCard({
  title,
  description,
  onApply,
  appliedFileName,
  accentClassName,
}: ImageUploadCardProps) {
  const [preview, setPreview] = useState<UploadedImage | null>(null)
  const [dragging, setDragging] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const statusText = useMemo(() => {
    if (appliedFileName) {
      return appliedFileName
    }

    if (preview) {
      return 'Preview ready'
    }

    return 'JPG, PNG, WEBP supported'
  }, [appliedFileName, preview])

  async function handleFile(file: File | null) {
    if (!file) {
      return
    }

    setBusy(true)
    setError(null)

    try {
      const uploaded = await fileToUploadedImage(file)
      setPreview(uploaded)
    } catch (error_) {
      setError(error_ instanceof Error ? error_.message : 'Unable to read file')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDrop={async (event) => {
        event.preventDefault()
        setDragging(false)
        await handleFile(event.dataTransfer.files[0] ?? null)
      }}
      className={`rounded-[24px] border-3 p-4 transition-all duration-200 ${
        dragging
          ? 'border-cyan-500 bg-cyan-500/15'
          : 'border-slate-900 bg-white/80 dark:bg-slate-900/50 shadow-[2px_2px_0px_0px_#1e293b] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.05)]'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-base font-black text-slate-950 dark:text-white">
            <Sparkles className={`h-4 w-4 ${accentClassName}`} />
            {title}
          </div>
          <p className="mt-1 text-xs font-bold text-slate-600 dark:text-slate-350">{description}</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-slate-900 bg-amber-300 hover:bg-amber-200 text-slate-900 px-3 py-2 text-xs font-black shadow-[2px_2px_0px_0px_#1e293b] transition active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#1e293b] shrink-0">
          <CloudUpload className="h-4 w-4" />
          <span>Browse</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={async (event) => {
              await handleFile(event.target.files?.[0] ?? null)
            }}
          />
        </label>
      </div>

      <div className="mt-4 overflow-hidden rounded-[20px] border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 p-3 dark:bg-slate-950/20">
        {preview ? (
          <div className="grid gap-3 sm:grid-cols-[130px_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-[18px] bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-slate-800">
              <img
                src={preview.dataUrl}
                alt={`${title} preview`}
                className="h-32 w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-between gap-3">
              <div>
                <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
                  {preview.name}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {preview.width} × {preview.height}px
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onApply(preview)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-emerald-300 hover:bg-emerald-200 text-slate-900 px-3 py-2 text-xs font-black shadow-[2px_2px_0px_0px_#1e293b] transition active:translate-y-0.5"
                >
                  <Check className="h-4 w-4" />
                  Load into canvas
                </button>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-red-300 hover:bg-red-200 text-slate-900 px-3 py-2 text-xs font-black shadow-[2px_2px_0px_0px_#1e293b] transition active:translate-y-0.5"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
            {busy ? (
              <LoaderCircle className="h-6 w-6 animate-spin text-slate-500 dark:text-slate-400" />
            ) : (
              <FileImage className="h-7 w-7 text-slate-500 dark:text-slate-400" />
            )}
            <p className="mt-3 text-sm font-medium text-slate-950 dark:text-white">
              Drop an image here
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{statusText}</p>
          </div>
        )}
      </div>

      {error ? <p className="mt-3 text-sm text-rose-500">{error}</p> : null}
    </div>
  )
}