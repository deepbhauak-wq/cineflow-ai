"use client"

import { useEffect, useRef, useState } from "react"
import { Film, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProBadge } from "./ui"
import { useUpgrade } from "./pro-context"
import { cn } from "@/lib/utils"

export function VideoStudio({ totalScenes, aspect }: { totalScenes: number; aspect: string }) {
  const { openUpgrade } = useUpgrade()
  const [fps, setFps] = useState<30 | 60>(30)
  const [rendering, setRendering] = useState(false)
  const [done, setDone] = useState(false)
  const [scene, setScene] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // reset when scene count changes
    setScene(0)
    setDone(false)
    setRendering(false)
    if (timer.current) clearInterval(timer.current)
  }, [totalScenes])

  useEffect(() => () => { if (timer.current) clearInterval(timer.current) }, [])

  function autoEdit() {
    if (rendering) return
    setRendering(true)
    setDone(false)
    setScene(0)
    const step = Math.max(1, Math.round(totalScenes / 40))
    timer.current = setInterval(() => {
      setScene((s) => {
        const next = s + step
        if (next >= totalScenes) {
          if (timer.current) clearInterval(timer.current)
          setRendering(false)
          setDone(true)
          return totalScenes
        }
        return next
      })
    }, 90)
  }

  const pct = totalScenes ? Math.round((scene / totalScenes) * 100) : 0

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Film className="h-5 w-5 text-primary" /> Video studio
        </h2>
        <div className="flex items-center rounded-lg border border-border bg-secondary/50 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setFps(30)}
            className={cn("rounded-md px-2.5 py-1 transition-colors", fps === 30 ? "bg-primary/20 text-primary" : "text-muted-foreground")}
          >
            30 FPS
          </button>
          <button
            type="button"
            onClick={() => openUpgrade("60 FPS rendering")}
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-muted-foreground transition-colors hover:text-accent"
          >
            60 FPS <ProBadge className="px-1 py-0" />
          </button>
        </div>
      </div>

      {/* Player */}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-primary/20 bg-black",
          aspect === "9:16" ? "mx-auto aspect-[9/16] max-w-[280px]" : "aspect-video",
        )}
      >
        <img
          src="/cf/player-poster.png"
          alt="Rendered cinematic scene preview of a neon cyberpunk city"
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* scanning overlay while rendering */}
        {rendering ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            <p className="font-mono text-sm text-primary text-glow-cyan">Rendering scene {scene} / {totalScenes}</p>
          </div>
        ) : null}

        {/* center play */}
        {!rendering ? (
          <button
            type="button"
            aria-label="Play preview"
            className="glow-cyan absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-primary/20 text-primary backdrop-blur-sm transition-transform hover:scale-105"
          >
            {done ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
          </button>
        ) : null}

        {/* bottom bar */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-mono text-primary">{done ? "Render complete" : `${pct}%`}</span>
            <span className="font-mono text-muted-foreground">
              {scene} / {totalScenes} scenes
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-150"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <Button
        onClick={autoEdit}
        disabled={rendering}
        className="glow-cyan mt-5 h-14 w-full bg-gradient-to-r from-primary to-accent text-base font-bold text-primary-foreground hover:opacity-90 disabled:opacity-70"
      >
        {rendering ? "Merging scenes…" : done ? "Re-run Auto-Edit & Merge" : "Auto-Edit & Merge Full Video (1-Click)"}
      </Button>
    </section>
  )
}
