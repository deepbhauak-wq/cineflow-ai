"use client";

import React, { useState } from "react";
import { 
  Clapperboard, Camera, UserCheck, Music, Sparkles, 
  Layers, Clock, Settings, Play, ShieldAlert, Cpu 
} from "lucide-react";

export default function CineFlowStudio() {
  const [duration, setDuration] = useState<number>(3);
  const [prompt, setPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("Biblical Epic");
  const [cameraMovement, setCameraMovement] = useState<string>("Slow Dolly In");
  const [voiceTone, setVoiceTone] = useState<string>("Deep Ultra-Slow Hindi");
  const [activeTab, setActiveTab] = useState<string>("director");

  const durationPresets = [
    { label: "3 Min (Youth/Short)", val: 3, scenes: 18 },
    { label: "15 Min (Mid-Length)", val: 15, scenes: 90 },
    { label: "30 Min (Deep Study)", val: 30, scenes: 180 },
    { label: "60 Min (Full Feature)", val: 60, scenes: 360 },
  ];

  const currentScenes = duration * 6;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Clapperboard className="w-7 h-7 text-indigo-500" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">CineFlow Pro Studio</h1>
            <p className="text-xs text-slate-400">Autonomous AI Filmmaking Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>AI Director Engine: <strong>Active</strong></span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <Sparkles className="w-4 h-4" /> Export Project
          </button>
        </div>
      </header>

      {/* Main Studio Grid */}
      <main className="flex-1 grid grid-cols-12 gap-6 p-6 overflow-hidden">
        {/* Left Controls & Prompting */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 overflow-y-auto">
          
          {/* Duration & Scene Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> Project Duration & Scene Matrix
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durationPresets.map((preset) => (
                <button
                  key={preset.val}
                  onClick={() => setDuration(preset.val)}
                  className={`p-3 rounded-lg border text-left transition ${
                    duration === preset.val
                      ? "bg-indigo-950/70 border-indigo-500 text-indigo-200"
                      : "bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <div className="font-semibold text-sm">{preset.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{preset.scenes} Scenes (10s each)</div>
                </button>
              ))}
            </div>
          </div>

          {/* Master Prompt / Screenplay Input (Unlimited Characters) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Master Prompt / Screenplay (No Character Limit)
              </label>
              <span className="text-xs text-slate-500">Auto-Chunking Enabled</span>
            </div>
            <textarea
              rows={8}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="पूरा विवरण, कहानी या उपदेश यहाँ लिखें... (उदा: यीशु तूफान में नाव को शांत करते हैं...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition text-sm leading-relaxed"
            />
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-slate-400">
                Target Output: <strong className="text-slate-200">{duration} Minutes</strong> ({currentScenes} Cinematic Shots)
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
                <Play className="w-3.5 h-3.5" /> Generate {currentScenes} Scenes
              </button>
            </div>
          </div>

          {/* Granular Scene Director Pipeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Generated Timeline Matrix ({currentScenes} Shots)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2">
              {Array.from({ length: Math.min(currentScenes, 12) }).map((_, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs flex flex-col gap-1.5">
                  <div className="flex justify-between text-slate-400 font-semibold">
                    <span>Scene #{idx + 1}</span>
                    <span>10.0s</span>
                  </div>
                  <div className="text-slate-300 truncate">Shot: {cameraMovement}</div>
                  <div className="text-slate-500 text-[11px] truncate">Prompt: Generating continuity frame...</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Configuration Matrix */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Camera Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-400" /> Camera Motion Rig
            </h3>
            <select
              value={cameraMovement}
              onChange={(e) => setCameraMovement(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option>Slow Dolly In (Focus/Reverence)</option>
              <option>Crane Down / Top-Down View</option>
              <option>Wide Orbit 360°</option>
              <option>Dynamic Tracking Shot</option>
              <option>Eye-Level Static Shot</option>
              <option>Cinematic Handheld</option>
            </select>
          </div>

          {/* Visual Style & Ambience */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Visual Atmosphere
            </h3>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option>Biblical Epic / Volumetric Rays</option>
              <option>Cinematic 35mm Masterpiece</option>
              <option>Dark Realistic Drama</option>
              <option>Historical Documentary Tone</option>
              <option>Hyper-Realistic CGI</option>
            </select>
          </div>

          {/* Voice & Acoustic Timing */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Music className="w-4 h-4 text-sky-400" /> Audio & Vocal Studio
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Voice Configuration</label>
                <select
                  value={voiceTone}
                  onChange={(e) => setVoiceTone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option>Deep Ultra-Slow Hindi (1.5s Pause Matrix)</option>
                  <option>Dramatic Narrative Hindi</option>
                  <option>Warm Documentarian Voice</option>
                </select>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-[11px] text-slate-400">
                Pacing: <strong>1.5s Sentence Gap</strong> | Ambient SFX: <strong>Auto-Balanced</strong>
              </div>
            </div>
          </div>

          {/* Character Consistency Lock */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" /> Continuity Locking
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                <span>Face & Identity Lock</span>
                <span className="text-emerald-400 font-bold">Enabled</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800 text-slate-300">
                <span>Costume & Texture Continuity</span>
                <span className="text-emerald-400 font-bold">Enabled</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
