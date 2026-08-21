"use client"

import { useState } from "react"
import { ChevronDown, Pencil, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const SCENES = [
  { n: 1, img: "/cf/scene-1.png", caption: "Hero surveys the neon skyline at dawn — slow crane up." },
  { n: 2, img: "/cf/scene-2.png", caption: "Cockpit close-up, HUD reflections, determined gaze." },
  { n: 3, img: "/cf/scene-3.png", caption: "Hovercar chase through a light-streaked tunnel." },
  { n: 4, img: "/cf/scene-4.png", caption: "Data-center corridor, lone figure walking away." },
  { n: 5, img: "/cf/scene-5.png", caption: "Rain-soaked night market, glowing umbrellas." },
  { n: 6, img: "/cf/scene-6.png", caption: "A portal tears open the sky over the city." },
]

export function Storyboard() {
  const [expanded, setExpanded] = useState(true)
  const [busy, setBusy] = useState<number | null>(null)

  function regenerate(n: number) {
    setBusy(n)
    setTimeout(() => setBusy(null), 1200)
  }

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="mb-1 flex w-full items-center justify-between gap-4 text-left"
      >
        <div>
          <h2 className="text-lg font-semibold">Scene storyboard &amp; timeline</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{SCENES.length} generated scenes · drag to reorder</p>
        </div>
        <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")} />
      </button>

      {expanded ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCENES.map((s) => (
            <article
              key={s.n}
              className="group overflow-hidden rounded-xl border border-border bg-secondary/40 transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={s.img || "/placeholder.svg"}
                  alt={`Scene ${s.n}: ${s.caption}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
                <span className="absolute left-2 top-2 rounded-md border border-primary/40 bg-background/70 px-2 py-0.5 font-mono text-xs text-primary backdrop-blur-sm">
                  Scene {s.n}
                </span>
                {busy === s.n ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
                    <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : null}
              </div>
              <div className="p-3">
                <p className="mb-3 text-sm leading-relaxed text-foreground/85">{s.caption}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => regenerate(s.n)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background/50 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                  </button>
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background/50 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
