"use client"

import { Clapperboard, Sparkles, User } from "lucide-react"

export function TopNav({ credits }: { credits: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="glow-cyan relative flex h-9 w-9 items-center justify-center rounded-xl border border-primary/50 bg-primary/15 text-primary">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Cine<span className="text-primary text-glow-cyan">Flow</span>{" "}
            <span className="text-accent text-glow-purple">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono">{credits}</span>
            <span className="hidden text-muted-foreground sm:inline">Credits</span>
          </span>
          <button
            type="button"
            aria-label="User profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <User className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  )
}
