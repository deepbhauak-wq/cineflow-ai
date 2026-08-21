"use client"

import { useState } from "react"
import { Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProBadge } from "./ui"
import { useUpgrade } from "./pro-context"
import { cn } from "@/lib/utils"

const CHECKS = ["Scene transitions", "Lip-sync", "Audio ducking", "4K color grade"]

export function QualityDownload() {
  const { openUpgrade } = useUpgrade()
  const [checked, setChecked] = useState<Record<string, boolean>>({
    "Scene transitions": true,
    "Lip-sync": true,
    "Audio ducking": true,
    "4K color grade": false,
  })

  function toggle(item: string) {
    setChecked((c) => ({ ...c, [item]: !c[item] }))
  }

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Final quality check</h2>
      <p className="mt-0.5 text-sm text-muted-foreground">Confirm everything looks perfect before export.</p>

      <ul className="mt-4 space-y-2">
        {CHECKS.map((item) => {
          const on = checked[item]
          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => toggle(item)}
                aria-pressed={on}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm font-medium transition-all",
                  on ? "border-primary/50 bg-primary/10 text-foreground" : "border-border bg-secondary/40 text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    on ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
                  )}
                >
                  {on ? <Check className="h-3.5 w-3.5" /> : null}
                </span>
                {item}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Button className="glow-cyan h-12 bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
          <Download className="mr-1 h-4 w-4" /> Download MP4 · 1080p
        </Button>
        <Button
          variant="outline"
          onClick={() => openUpgrade("4K UHD export")}
          className="h-12 border-accent/50 bg-accent/5 font-semibold text-accent hover:bg-accent/15"
        >
          <Download className="mr-1 h-4 w-4" /> 4K UHD <ProBadge className="ml-1" />
        </Button>
      </div>
    </section>
  )
}
