"use client"

import { useState } from "react"
import { Globe, Mic, Music, Upload } from "lucide-react"
import { Panel, ProBadge, Toggle } from "./ui"
import { useUpgrade } from "./pro-context"
import { cn } from "@/lib/utils"

const EMOTIONS = ["Dramatic", "Energetic", "Motivational", "Calm", "Suspenseful"]
const LANGUAGES = ["English (US)", "Hindi", "Bilingual (EN + HI)", "Spanish", "Japanese"]

function Dropdown({
  value,
  onChange,
  options,
  label,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  label: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-muted-foreground">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary/60"
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-card text-foreground">
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">▾</span>
      </div>
    </label>
  )
}

export function AudioSuite() {
  const { openUpgrade } = useUpgrade()
  const [autoSync, setAutoSync] = useState(true)
  const [autoDub, setAutoDub] = useState(true)
  const [emotion, setEmotion] = useState(EMOTIONS[0])
  const [language, setLanguage] = useState(LANGUAGES[0])

  return (
    <Panel
      title="Audio suite & auto-dubbing"
      desc="Score, narrate, and localize your film automatically."
      icon={<Music className="h-5 w-5" />}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-3.5">
          <div className="flex items-center gap-3">
            <Music className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Music &amp; SFX auto-sync</p>
              <p className="text-xs text-muted-foreground">Beat-matched score and sound effects</p>
            </div>
          </div>
          <Toggle checked={autoSync} onChange={setAutoSync} label="Music and SFX auto-sync" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Dropdown value={emotion} onChange={setEmotion} options={EMOTIONS} label="Voice emotion" />
          <div>
            <span className="mb-1.5 block text-sm text-muted-foreground">Custom voice</span>
            <button
              type="button"
              onClick={() => openUpgrade("Custom voice cloning")}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-accent/40 bg-accent/5 px-3.5 py-2.5 text-sm font-medium text-accent transition-all hover:border-accent/70 hover:bg-accent/15"
            >
              <span className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Voice
              </span>
              <ProBadge />
            </button>
          </div>
        </div>

        <div className={cn("rounded-xl border p-3.5 transition-colors", autoDub ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/40")}>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Auto-dubbing</p>
                <p className="text-xs text-muted-foreground">Lip-synced translation into any language</p>
              </div>
            </div>
            <Toggle checked={autoDub} onChange={setAutoDub} label="Auto-dubbing" />
          </div>
          {autoDub ? <Dropdown value={language} onChange={setLanguage} options={LANGUAGES} label="Language" /> : null}
        </div>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mic className="h-3.5 w-3.5" />
          Narration recorded in a {emotion.toLowerCase()} tone.
        </p>
      </div>
    </Panel>
  )
}
