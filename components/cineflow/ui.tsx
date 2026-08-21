"use client"

import { Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUpgrade } from "./pro-context"

/* Small "PRO" tag */
export function ProBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent",
        className,
      )}
    >
      <Crown className="h-3 w-3" aria-hidden="true" />
      Pro
    </span>
  )
}

/* Section wrapper with glass styling and heading */
export function Panel({
  title,
  icon,
  desc,
  children,
  className,
  action,
}: {
  title: string
  icon?: React.ReactNode
  desc?: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}) {
  return (
    <section className={cn("glass rounded-2xl p-5 sm:p-6", className)}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon ? (
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              {icon}
            </span>
          ) : null}
          <div>
            <h2 className="text-balance text-lg font-semibold leading-tight">{title}</h2>
            {desc ? <p className="mt-1 text-sm text-muted-foreground">{desc}</p> : null}
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

/* Neon toggle switch */
export function Toggle({
  checked,
  onChange,
  label,
  id,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  id?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      id={id}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors",
        checked ? "border-primary/60 bg-primary/30 glow-cyan" : "border-border bg-secondary",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full transition-transform",
          checked ? "translate-x-6 bg-primary" : "translate-x-1 bg-muted-foreground",
        )}
      />
    </button>
  )
}

/* Selectable card used across mode/aspect/style/duration selectors */
export function SelectCard({
  active,
  onClick,
  children,
  className,
  disabled,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "group relative flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all",
        active
          ? "border-primary/70 bg-primary/10 glow-cyan"
          : "border-border bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {children}
    </button>
  )
}

/* Neon range slider */
export function NeonSlider({
  value,
  onChange,
  label,
  color = "cyan",
}: {
  value: number
  onChange: (v: number) => void
  label: string
  color?: "cyan" | "purple"
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("font-mono", color === "cyan" ? "text-primary" : "text-accent")}>{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary",
          "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
          "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full",
          color === "cyan"
            ? "accent-primary [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:bg-primary"
            : "accent-accent [&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:bg-accent",
        )}
        style={{
          background: `linear-gradient(to right, ${
            color === "cyan" ? "oklch(0.82 0.14 195)" : "oklch(0.62 0.22 305)"
          } ${value}%, oklch(0.26 0.04 275) ${value}%)`,
        }}
      />
    </div>
  )
}

/* A control that, when clicked, opens the upgrade modal instead of acting */
export function ProLock({
  feature,
  children,
  className,
}: {
  feature: string
  children: React.ReactNode
  className?: string
}) {
  const { openUpgrade } = useUpgrade()
  return (
    <button
      type="button"
      onClick={() => openUpgrade(feature)}
      className={cn(
        "group relative flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/5 px-3 py-2 text-left transition-all hover:border-accent/70 hover:bg-accent/15",
        className,
      )}
    >
      {children}
    </button>
  )
}
