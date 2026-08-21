"use client"

import { useState } from "react"
import { ProProvider } from "./pro-context"
import { TopNav } from "./top-nav"
import { HeroHeader } from "./hero-header"
import { GenerationPanel, DURATIONS } from "./generation-panel"
import { AudioSuite } from "./audio-suite"
import { AdvancedSettings } from "./advanced-settings"
import { VideoStudio } from "./video-studio"
import { Storyboard } from "./storyboard"
import { QualityDownload } from "./quality-download"
import { Pricing } from "./pricing"

export function AppShell() {
  const [autoPilot, setAutoPilot] = useState(true)
  const [mode, setMode] = useState<"image" | "video">("video")
  const [aspect, setAspect] = useState("16:9")
  const [style, setStyle] = useState("cyberpunk")
  const [duration, setDuration] = useState("3")

  const totalScenes = DURATIONS.find((d) => d.id === duration)?.scenes ?? 18

  return (
    <ProProvider>
      <TopNav credits={55} />
      <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <HeroHeader autoPilot={autoPilot} onAutoPilotChange={setAutoPilot} />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <GenerationPanel
              mode={mode}
              onModeChange={setMode}
              aspect={aspect}
              onAspectChange={setAspect}
              style={style}
              onStyleChange={setStyle}
              duration={duration}
              onDurationChange={setDuration}
            />
            <AudioSuite />
            <AdvancedSettings />
          </div>

          <div className="flex flex-col gap-6">
            <VideoStudio totalScenes={totalScenes} aspect={aspect} />
            <QualityDownload />
          </div>
        </div>

        <div className="mt-6">
          <Storyboard />
        </div>
      </main>

      <Pricing />

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        CineFlow AI · Direct your next film from a single idea.
      </footer>
    </ProProvider>
  )
}
