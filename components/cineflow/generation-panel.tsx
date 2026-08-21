"use client"

import { useState } from "react"
import { Aperture, Clapperboard, Image as ImageIcon, Sparkles, Video, Wand2 } from "lucide-react"
import { Panel, ProBadge, SelectCard } from "./ui"
import { useUpgrade } from "./pro-context"
import { cn } from "@/lib/utils"

const DEFAULT_PROMPT =
  "A lone astronaut drifts through the neon-lit ruins of a floating city at dusk, searching for a signal. Wide establishing shots, volumetric fog, warm rim light against deep cyan shadows, slow dolly moves."

const ASPECTS = [
  { id: "16:9", label: "16:9", sub: "Landscape", box: "h-5 w-9" },
  { id: "9:16", label: "9:16", sub: "Shorts / Reels", box: "h-9 w-5" },
] as const

const STYLES = [
  { id: "realism", label: "Cinematic Realism", tag: "8K" },
  { id: "3d", label: "3D Animation", tag: "PIXAR" },
  { id: "cyberpunk", label: "Dark Cyberpunk", tag: "NEON" },
  { id: "anime", label: "Anime", tag: "2D" },
]

export type Duration = { id: string; label: string; scenes: number; pro: boolean }
export const DURATIONS: Duration[] = [
  { id: "3", label: "3 min", scenes: 18, pro: false },
  { id: "15", label: "15 min", scenes: 90, pro: false },
  { id: "30", label: "30 min", scenes: 180, pro: true },
  { id: "60", label: "60 min", scenes: 360, pro: true },
]

export function GenerationPanel({
  mode,
  onModeChange,
  aspect,
  onAspectChange,
  style,
  onStyleChange,
  duration,
  onDurationChange,
}: {
  mode: "image" | "video"
  onModeChange: (m: "image" | "video") => void
  aspect: string
  onAspectChange: (a: string) => void
  style: string
  onStyleChange: (s: string) => void
  duration: string
  onDurationChange: (d: string) => void
}) {
  const { openUpgrade } = useUpgrade()
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT)
  const [enhancing, setEnhancing] = useState(false)

  function enhance() {
    setEnhancing(true)
    setTimeout(() => {
      setPrompt(
        (p) =>
          p.trim() +
          " Enhanced: anamorphic 2.39:1 framing, film grain, motivated practical lighting, shallow depth of field, subtle handheld energy, color-graded teal-and-amber.",
      )
      setEnhancing(false)
    }, 1100)
  }

  return (
    <Panel
      title="Describe your scene"
      desc="Write one idea — the AI expands it into a full script and shot list."
      icon={<Sparkles className="h-5 w-5" />}
    >
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          aria-label="Scene prompt"
          className="w-full resize-none rounded-xl border border-input bg-background/60 p-4 pr-4 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
          placeholder="Describe your cinematic scene..."
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">{prompt.length} characters</span>
          <button
            type="button"
            onClick={enhance}
            disabled={enhancing}
            className="glow-purple flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/15 px-3.5 py-2 text-sm font-semibold text-accent transition-all hover:bg-accent/25 disabled:opacity-70"
          >
            <Wand2 className={cn("h-4 w-4", enhancing && "animate-spin")} />
            {enhancing ? "Enhancing…" : "AI Magic Enhance"}
          </button>
        </div>
      </div>

      {/* Mode selector */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Output mode</p>
        <div className="grid grid-cols-2 gap-3">
          <SelectCard active={mode === "image"} onClick={() => onModeChange("image")}>
            <div className="flex items-center gap-2 font-semibold">
              <ImageIcon className="h-4 w-4 text-primary" />
              Image
            </div>
            <span className="text-xs text-muted-foreground">0 Credits</span>
          </SelectCard>
          <SelectCard active={mode === "video"} onClick={() => onModeChange("video")}>
            <div className="flex items-center gap-2 font-semibold">
              <Video className="h-4 w-4 text-primary" />
              Video
            </div>
            <span className="text-xs text-muted-foreground">Paid / Auto</span>
          </SelectCard>
        </div>
      </div>

      {/* Aspect ratio */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Aspect ratio</p>
        <div className="grid grid-cols-2 gap-3">
          {ASPECTS.map((a) => (
            <SelectCard key={a.id} active={aspect === a.id} onClick={() => onAspectChange(a.id)}>
              <div className="flex w-full items-center gap-3">
                <span
                  className={cn(
                    "shrink-0 rounded border-2",
                    aspect === a.id ? "border-primary" : "border-muted-foreground",
                    a.box,
                  )}
                />
                <div>
                  <div className="font-semibold">{a.label}</div>
                  <span className="text-xs text-muted-foreground">{a.sub}</span>
                </div>
              </div>
            </SelectCard>
          ))}
        </div>
      </div>

      {/* Art style */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Visual art style</p>
        <div className="grid grid-cols-2 gap-3">
          {STYLES.map((s) => (
            <SelectCard key={s.id} active={style === s.id} onClick={() => onStyleChange(s.id)}>
              <div className="flex items-center gap-2 font-semibold">
                <Aperture className="h-4 w-4 text-primary" />
                {s.label}
              </div>
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {s.tag}
              </span>
            </SelectCard>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Video duration</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {DURATIONS.map((d) => (
            <SelectCard
              key={d.id}
              active={duration === d.id}
              onClick={() => (d.pro ? openUpgrade(`${d.label} films`) : onDurationChange(d.id))}
            >
              <div className="flex w-full items-center justify-between gap-1">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clapperboard className="h-4 w-4 text-primary" />
                  {d.label}
                </span>
                {d.pro ? <ProBadge /> : null}
              </div>
              <span className="text-xs text-muted-foreground">{d.scenes} scenes</span>
            </SelectCard>
          ))}
        </div>
      </div>
    </Panel>
  )
}
