"use client";

import React, { useState } from "react";
import { 
  Clapperboard, Camera, UserCheck, Music, Sparkles, 
  Layers, Clock, Play, Cpu, Film, ShieldCheck 
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
            <p className="text-xs text-slate-400">Autonomous Script-to-Film Pipeline</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs items-center gap-2 text-slate-300">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>AI Director: <strong className="text-white">Active</strong></span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95">
            <Sparkles className="w-4 h-4" /> Export Timeline
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 grid grid-cols-12 gap-6 p-6 max-w-[1600px] w-full mx-auto">
        {/* Left Core Engine */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* Duration Selector Matrix */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> Timeline Duration & Auto-Scene Engine
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durationPresets.map((preset) => (
                <button
                  key={preset.val}
                  onClick={() => setDuration(preset.val)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    duration === preset.val
                      ? "bg-indigo-600/15 border-indigo-500 text-indigo-200 shadow-sm"
                      : "bg-slate-950/40 border-slate-800 hover:bg-slate-800/50 text-slate-300"
                  }`}
                >
                  <div className="font-semibold text-sm text-white">{preset.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{preset.scenes} Scenes (10s each)</div>
                </button>
              ))}
            </div>
          </div>

          {/* Master Prompt Box */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-3 shadow-xl">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Master Prompt / Screenplay (Unlimited Length)
              </label>
              <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">Auto-Chunking On</span>
            </div>
            <textarea
              rows={7}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="पूरी कहानी, उपदेश या घटनाक्रम का विवरण यहाँ लिखें... कोई शब्द सीमा नहीं है।"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition text-sm leading-relaxed placeholder:text-slate-600"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-1">
              <div className="text-xs text-slate-400">
                Estimated Output: <strong className="text-white">{duration} Minutes</strong> ({currentScenes} Consecutive Cinematic Shots)
              </div>
              <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition">
                <Play className="w-3.5 h-3.5 fill-white" /> Build {currentScenes} Scenes
              </button>
            </div>
          </div>

          {/* Granular Scene Timeline */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Storyboard Timeline ({currentScenes} Generated Shots)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
              {Array.from({ length: Math.min(currentScenes, 12) }).map((_, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs flex flex-col gap-1.5">
                  <div className="flex justify-between text-slate-400 font-semibold">
                    <span className="text-indigo-300">Scene #{idx + 1}</span>
                    <span className="text-slate-500">10.0s</span>
                  </div>
                  <div className="text-slate-300 font-medium truncate">Rig: {cameraMovement}</div>
                  <div className="text-slate-500 text-[11px] truncate">Prompt continuity verified...</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Configuration Matrix */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Camera Motion Rig */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-400" /> Camera Motion Rig
            </h3>
            <select
              value={cameraMovement}
              onChange={(e) => setCameraMovement(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option>Slow Dolly In (Focus/Reverence)</option>
              <option>Crane Down / Top-Down View</option>
              <option>Wide Orbit 360°</option>
              <option>Dynamic Tracking Shot</option>
              <option>Eye-Level Static Shot</option>
              <option>Cinematic Handheld</option>
            </select>
          </div>

          {/* Visual Style */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-400" /> Visual Atmosphere
            </h3>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option>Biblical Epic / Volumetric God Rays</option>
              <option>Cinematic 35mm Masterpiece</option>
              <option>Dark Realistic Drama</option>
              <option>Historical Documentary Tone</option>
              <option>Hyper-Realistic CGI</option>
            </select>
          </div>

          {/* Audio Studio */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Music className="w-4 h-4 text-sky-400" /> Audio & Vocal Studio
            </h3>
            <div className="space-y-3">
              <select
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option>Deep Ultra-Slow Hindi (1.5s Pause Matrix)</option>
                <option>Dramatic Narrative Hindi</option>
                <option>Warm Documentarian Voice</option>
              </select>
              <div className="bg-slate-950 border border-slate-800/80 p-2.5 rounded-lg text-[11px] text-slate-400">
                Pacing: <strong>1.5s Sentence Pause</strong> | Ambient SFX: <strong>Auto-Balanced</strong>
              </div>
            </div>
          </div>

          {/* Continuity */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" /> Continuity Matrix
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Face & Character Lock</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Costume Texture Match</span>
                <span className="text-emerald-400 font-semibold">Active</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
                                       }

