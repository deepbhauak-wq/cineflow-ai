"use client";

import React, { useState } from "react";
import { 
  Clapperboard, Camera, UserCheck, Music, Sparkles, 
  Layers, Clock, Play, Cpu, Film, ShieldCheck, RotateCcw, RotateCw 
} from "lucide-react";

export default function CineFlowStudio() {
  const [duration, setDuration] = useState<number>(3);
  const [prompt, setPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("Biblical Epic");
  const [cameraMovement, setCameraMovement] = useState<string>("Slow Dolly In");
  const [voiceTone, setVoiceTone] = useState<string>("Deep Ultra-Slow Hindi");

  const durationPresets = [
    { label: "3 Min (Youth/Short)", val: 3, scenes: 18 },
    { label: "15 Min (Mid-Length)", val: 15, scenes: 90 },
    { label: "30 Min (Deep Study)", val: 30, scenes: 180 },
    { label: "60 Min (Full Feature)", val: 60, scenes: 360 },
  ];

  const currentScenes = duration * 6;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl">
            <Clapperboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              CineFlow AI <span className="text-xs bg-indigo-900/80 text-indigo-300 border border-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Pro Studio</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Quick Action Bar (Added Professional Controls) */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-800 bg-slate-950">
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-700 transition">
          <Play className="w-3.5 h-3.5" /> Live Preview
        </button>
        <button className="flex items-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 px-4 py-2 rounded-lg text-xs font-semibold border border-emerald-500/30 transition">
          <Cpu className="w-3.5 h-3.5" /> Render Project
        </button>
        <div className="ml-auto flex gap-2">
          <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-slate-300"><RotateCcw className="w-4 h-4" /></button>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-slate-300"><RotateCw className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 grid grid-cols-12 gap-6 p-6 max-w-[1600px] w-full mx-auto">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> Timeline Duration
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durationPresets.map((preset) => (
                <button
                  key={preset.val}
                  onClick={() => setDuration(preset.val)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    duration === preset.val ? "bg-indigo-600/15 border-indigo-500 text-indigo-200" : "bg-slate-950/40 border-slate-800 hover:bg-slate-800/50 text-slate-300"
                  }`}
                >
                  <div className="font-semibold text-sm text-white">{preset.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{preset.scenes} Scenes</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Master Prompt
            </label>
            <textarea
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="अपनी कहानी यहाँ लिखें..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button className="group w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-lg transition">
              <Play className="w-3.5 h-3.5 fill-white" /> 
              <span>Build {currentScenes} Scenes</span>
              <span className="ml-2 px-1.5 py-0.5 bg-indigo-700 rounded text-[10px] opacity-80">Pro</span>
            </button>
          </div>
        </div>

        {/* Settings Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-400" /> Camera Motion Rig
            </h3>
            <select
              value={cameraMovement}
              onChange={(e) => setCameraMovement(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
            >
              <option>Slow Dolly In (Focus/Reverence)</option>
              <option>Wide Orbit 360°</option>
              <option>Cinematic Handheld</option>
            </select>
          </div>
          {/* Add more setting cards here if needed */}
        </div>
      </main>
    </div>
  );
              }
