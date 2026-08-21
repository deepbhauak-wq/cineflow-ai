"use client"

import { Check, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUpgrade } from "./pro-context"
import { cn } from "@/lib/utils"

const PLANS = [
  {
    name: "Free Trial",
    price: "$0",
    period: "",
    highlight: false,
    features: ["15 credits", "720p export", "Watermarked", "3 min videos"],
    cta: "Start free",
  },
  {
    name: "Basic",
    price: "$9.99",
    period: "/mo",
    highlight: false,
    features: ["300 credits", "1080p export", "No watermark", "Up to 15 min videos"],
    cta: "Choose Basic",
  },
  {
    name: "Pro",
    price: "$29.99",
    period: "/mo",
    highlight: true,
    features: [
      "1200 credits",
      "4K export at 60 FPS",
      "Character Lock",
      "Full timeline editor",
      "Priority render queue",
    ],
    cta: "Upgrade to Pro",
  },
]

export function Pricing() {
  const { openUpgrade } = useUpgrade()

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-bold sm:text-4xl">Plans that scale with your studio</h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Start free, upgrade when your ideas outgrow the credits.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-2xl p-6",
              plan.highlight ? "glass-strong glow-purple border-accent/50" : "glass",
            )}
          >
            {plan.highlight ? (
              <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-accent/60 bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                <Crown className="h-3.5 w-3.5" /> Most popular
              </span>
            ) : null}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-3 flex items-baseline gap-1">
              <span className={cn("text-4xl font-bold", plan.highlight && "text-accent text-glow-purple")}>
                {plan.price}
              </span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={plan.highlight ? () => openUpgrade("CineFlow Pro") : undefined}
              className={cn(
                "mt-6 h-11 font-semibold",
                plan.highlight
                  ? "glow-purple bg-accent text-accent-foreground hover:bg-accent/90"
                  : "bg-secondary text-foreground hover:bg-secondary/70",
              )}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
