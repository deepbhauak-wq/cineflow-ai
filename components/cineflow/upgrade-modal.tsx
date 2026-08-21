"use client"

import { useEffect } from "react"
import { Check, Crown, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const PERKS = [
  "4K UHD export at 60 FPS",
  "Character Lock for consistent casts",
  "Full timeline editor & priority render queue",
  "Custom voice cloning + auto-dubbing",
  "Camera paths, relighting & 3-track mixer",
]

export function UpgradeModal({
  open,
  feature,
  onClose,
}: {
  open: boolean
  feature?: string
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-title"
    >
      <button
        type="button"
        aria-label="Close upgrade dialog"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <div className="glass-strong glow-purple relative w-full max-w-md overflow-hidden rounded-3xl p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/30 blur-3xl"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          <Crown className="h-3.5 w-3.5" />
          CineFlow Pro
        </span>

        <h2 id="upgrade-title" className="mt-4 text-balance text-2xl font-bold leading-tight">
          Unlock {feature ? <span className="text-accent text-glow-purple">{feature}</span> : "every Pro power"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Upgrade to direct full-length films in 4K with the complete AI studio and no watermarks.
        </p>

        <ul className="mt-5 space-y-2.5">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-foreground/90">{perk}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between rounded-2xl border border-border bg-secondary/40 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Billed monthly</p>
            <p className="text-2xl font-bold">
              $29.99<span className="text-sm font-normal text-muted-foreground">/mo</span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">Cancel anytime</p>
        </div>

        <Button
          className="glow-purple mt-5 h-12 w-full bg-accent text-base font-semibold text-accent-foreground hover:bg-accent/90"
          onClick={onClose}
        >
          <Zap className="mr-1 h-4 w-4" />
          Upgrade to Pro — $29.99/mo
        </Button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
