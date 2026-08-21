"use client"

import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroHeader({
  autoPilot,
  onAutoPilotChange,
}: {
  autoPilot: boolean
  onAutoPilotChange: (v: boolean) => void
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-4 pt-10 text-center sm:pt-16">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
        AI Film Studio · v2.0
      </p>
      <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
        Turn a single idea into a{" "}
        <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          cinematic video
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
        Describe a scene and CineFlow AI directs the shots, dubs the dialogue, scores the music, and edits the full film
        — automatically.
      </p>

      <button
        type="button"
        role="switch"
        aria-checked={autoPilot}
        onClick={() => onAutoPilotChange(!autoPilot)}
        className={cn(
          "mx-auto mt-8 flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
          autoPilot
            ? "border-primary/60 bg-primary/15 text-primary glow-cyan"
            : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/40",
        )}
      >
        <Zap className={cn("h-4 w-4", autoPilot && "animate-pulse-glow")} />
        Auto-Pilot Mode
        <span className="text-xs font-normal opacity-80">(Full AI Direction)</span>
        <span
          className={cn(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
            autoPilot ? "bg-primary/40" : "bg-secondary",
          )}
        >
          <span
            className={cn(
              "inline-block h-3.5 w-3.5 transform rounded-full transition-transform",
              autoPilot ? "translate-x-4 bg-primary" : "translate-x-1 bg-muted-foreground",
            )}
          />
        </span>
      </button>
    </section>
  )
}
