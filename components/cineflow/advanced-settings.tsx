"use client"

import { useState } from "react"
import { Camera, ChevronDown, Sliders, Sun } from "lucide-react"
import { ProBadge, Toggle, NeonSlider, SelectCard } from "./ui"
import { cn } from "@/lib/utils"

const CAMERA_PATHS = ["Drone Shot", "Orbit 360", "Dolly Zoom", "Crane Up", "Handheld"]
const LIGHTING = ["Golden Hour", "Cyberpunk Neon", "Studio Light", "Moonlight", "Backlit"]

export function AdvancedSettings() {
  const [open, setOpen] = useState(false)
  const [camera, setCamera] = useState(CAMERA_PATHS[0])
  const [lighting, setLighting] = useState(LIGHTING[1])
  const [vo, setVo] = useState(80)
  const [music, setMusic] = useState(45)
  const [sfx, setSfx] = useState(60)
  const [ducking, setDucking] = useState(true)

  return (
    <section className="glass rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
            <Sliders className="h-5 w-5" />
          </span>
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              Advanced Pro Settings <ProBadge />
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">Camera, lighting &amp; the 3-track mixer</p>
          </div>
        </div>
        <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="space-y-6 border-t border-border/60 p-5 sm:p-6">
          {/* Camera paths */}
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Camera className="h-4 w-4" /> Camera path
            </p>
            <div className="flex flex-wrap gap-2">
              {CAMERA_PATHS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCamera(c)}
                  aria-pressed={camera === c}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-sm transition-all",
                    camera === c
                      ? "border-primary/60 bg-primary/15 text-primary glow-cyan"
                      : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Lighting presets */}
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sun className="h-4 w-4" /> Lighting &amp; relighting preset
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {LIGHTING.map((l) => (
                <SelectCard key={l} active={lighting === l} onClick={() => setLighting(l)} className="items-center">
                  <span className="text-sm font-medium">{l}</span>
                </SelectCard>
              ))}
            </div>
          </div>

          {/* 3-track mixer */}
          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">3-Track audio mixer</p>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Auto-ducking
                <Toggle checked={ducking} onChange={setDucking} label="Auto-ducking" />
              </label>
            </div>
            <div className="space-y-4">
              <NeonSlider value={vo} onChange={setVo} label="Voiceover" color="cyan" />
              <NeonSlider value={music} onChange={setMusic} label="Music" color="purple" />
              <NeonSlider value={sfx} onChange={setSfx} label="SFX" color="cyan" />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
