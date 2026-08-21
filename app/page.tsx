"use client";

import React, { useState } from "react";
import {
  Clapperboard,
  Sparkles,
  Play,
  Tv,
  Smartphone,
  Layers,
  Sliders,
  Volume2,
  Film,
  Zap,
  CheckCircle2,
  Shield,
  Video,
  Image as ImageIcon,
  ChevronDown,
  Camera,
  UserCheck,
  Globe,
  Brain,
  Radio,
  SlidersHorizontal,
  Bookmark,
  Check
} from "lucide-react";

export default function CineFlowProStudio() {
  const [prompt, setPrompt] = useState(
    "यीशु तूफान के बीच नाव में शिष्यों के साथ हैं। शांत और सामर्थी मुद्रा, रात का भयानक समुद्री तूफ़ान, बिजली की चमक और विशाल लहरें।"
  );
  const [outputMode, setOutputMode] = useState<"image" | "video">("video");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("60m");
  const [storyModel, setStoryModel] = useState("Auto");
  const [videoModel, setVideoModel] = useState("Veo");
  const [artStyle, setArtStyle] = useState("Bible Art");
  const [cameraMotion, setCameraMotion] = useState("Slow Dolly In");
  const [cameraStrength, setCameraStrength] = useState("Medium");
  const [audioLang, setAudioLang] = useState("Hindi");
  const [visualLang, setVisualLang] = useState("English");
  const [voiceEmotion, setVoiceEmotion] = useState("Deep Ultra-Slow");
  
  const [lockChar, setLockChar] = useState(true);
  const [lockCostume, setLockCostume] = useState(true);
  const [lockLocation, setLockLocation] = useState(true);

  const handlePresetSelect = (type: string) => {
    if (type === "ak_60") {
      setDuration("60m");
      setArtStyle("Bible Art");
      setVoiceEmotion("Deep Ultra-Slow");
      setAudioLang("Hindi");
      setCameraMotion("Cinematic");
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white pb-24">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#090f1d]/90 backdrop-blur-md px-6 py-3.5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              CineFlow <span className="text-cyan-400">AI Pro Studio</span>
            </span>
            <p className="text-[10px] text-slate-400">Google Flow-Grade Autonomous Cinema Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex bg-[#0e172a] border border-cyan-500/30 px-3 py-1.5 rounded-full items-center gap-2 text-xs text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span className="font-semibold">Unlimited Pro Credits</span>
          </div>
          <div className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AK Engine
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-3">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Multi-Agent Autonomous Film Pipeline
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-snug">
          Turn a Single Idea into a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
            Full-Feature Cinematic Film
          </span>
        </h1>
      </div>

      {/* Main Console */}
      <main className="max-w-5xl mx-auto px-4 space-y-6">

        {/* AK Preset Ribbon */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-200">⭐ AK MINISTRY MASTER PRESET</div>
              <div className="text-[11px] text-slate-400">60 Min (360 Scenes) • Ultra-Slow Deep Hindi Narration (1.5s Pause) • Character Locked</div>
            </div>
          </div>
          <button 
            onClick={() => handlePresetSelect("ak_60")}
            className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition"
          >
            Apply Preset
          </button>
        </div>

        {/* Prompt */}
        <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white">1. Master Story / Screenplay Input</h2>
            </div>
            <span className="text-[10px] bg-cyan-950 border border-cyan-700/50 text-cyan-300 px-2 py-0.5 rounded">Auto-Scene Decomposition On</span>
          </div>

          <textarea
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="पूरी कहानी यहाँ लिखें..."
            className="w-full bg-[#070c18] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed placeholder:text-slate-600"
          />
        </div>

        {/* Aspect & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Tv className="w-4 h-4 text-cyan-400" /> 2. Aspect Ratio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "16:9", label: "16:9", sub: "YouTube" },
                { id: "9:16", label: "9:16", sub: "Shorts/Reels" },
                { id: "21:9", label: "21:9", sub: "Cinematic" },
                { id: "4:3", label: "4:3", sub: "Classic" },
                { id: "1:1", label: "1:1", sub: "Square" },
                { id: "Auto", label: "Auto", sub: "AI Smart" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setAspectRatio(r.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    aspectRatio === r.id
                      ? "bg-cyan-950/40 border-cyan-500 text-white shadow-sm"
                      : "bg-[#070c18] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{r.label}</div>
                  <div className="text-[10px] text-slate-500">{r.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> 3. Timeline & Long Video Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "3m", label: "3 Min", scenes: "18 Scenes" },
                { id: "15m", label: "15 Min", scenes: "90 Scenes" },
                { id: "20m", label: "20 Min", scenes: "120 Scenes" },
                { id: "30m", label: "30 Min", scenes: "180 Scenes" },
                { id: "60m", label: "60 Min", scenes: "360 Scenes" },
                { id: "Custom", label: "Custom", scenes: "Variable" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDuration(d.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    duration === d.id
                      ? "bg-indigo-950/50 border-indigo-500 text-white shadow-sm"
                      : "bg-[#070c18] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{d.label}</div>
                  <div className="text-[10px] text-indigo-300/80">{d.scenes}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Models Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" /> 4. Story Engine Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Auto", "GPT", "Gemini", "Claude", "Fast AI", "Pro AI"].map((m) => (
                <button
                  key={m}
                  onClick={() => setStoryModel(m)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition ${
                    storyModel === m
                      ? "bg-purple-950/40 border-purple-500 text-purple-200"
                      : "bg-[#070c18] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" /> 5. Video Generation Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Auto"].map((vm) => (
                <button
                  key={vm}
                  onClick={() => setVideoModel(vm)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition ${
                    videoModel === vm
                      ? "bg-cyan-950/40 border-cyan-500 text-cyan-200"
                      : "bg-[#070c18] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {vm}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Styles */}
        <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-400" /> 6. Visual Atmosphere & Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              "Bible Art", "Cinematic Epic", "Realistic 8K", "Historical Drama", 
              "Dark Cyberpunk", "3D Animation", "Anime", "Custom Style"
            ].map((st) => (
              <button
                key={st}
                onClick={() => setArtStyle(st)}
                className={`p-3 rounded-xl border text-left flex justify-between items-center transition ${
                  artStyle === st
                    ? "bg-amber-950/30 border-amber-500 text-amber-200"
                    : "bg-[#070c18] border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <span className="text-xs font-medium">{st}</span>
                {artStyle === st && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Camera & Consistency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-sky-400" /> 7. Camera Rig & Motion
            </label>
            <div className="space-y-3">
              <select
                value={cameraMotion}
                onChange={(e) => setCameraMotion(e.target.value)}
                className="w-full bg-[#070c18] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option>Slow Dolly In (Focus/Reverence)</option>
                <option>Orbit 360° Epic</option>
                <option>Dynamic Tracking Shot</option>
                <option>Aerial / Drone Shot</option>
                <option>Low Angle Majesty</option>
                <option>Eye-Level Static</option>
              </select>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Motion Strength:</span>
                <div className="flex gap-2">
                  {["Low", "Medium", "High"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setCameraStrength(s)}
                      className={`px-3 py-1 rounded-lg border text-[11px] ${
                        cameraStrength === s
                          ? "bg-sky-500/20 border-sky-500 text-sky-300 font-bold"
                          : "border-slate-800 text-slate-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" /> 8. Character & Scene Consistency Lock
            </label>
            <div className="space-y-2 text-xs">
              <div 
                onClick={() => setLockChar(!lockChar)}
                className="flex items-center justify-between p-2.5 bg-[#070c18] rounded-xl border border-slate-800 cursor-pointer"
              >
                <span className="text-slate-300">Face & Character ID Lock (Scene 1-360)</span>
                <span className={lockChar ? "text-emerald-400 font-bold" : "text-slate-600"}>{lockChar ? "LOCKED" : "OFF"}</span>
              </div>
              <div 
                onClick={() => setLockCostume(!lockCostume)}
                className="flex items-center justify-between p-2.5 bg-[#070c18] rounded-xl border border-slate-800 cursor-pointer"
              >
                <span className="text-slate-300">Costume & Fabric Match</span>
                <span className={lockCostume ? "text-emerald-400 font-bold" : "text-slate-600"}>{lockCostume ? "LOCKED" : "OFF"}</span>
              </div>
              <div 
                onClick={() => setLockLocation(!lockLocation)}
                className="flex items-center justify-between p-2.5 bg-[#070c18] rounded-xl border border-slate-800 cursor-pointer"
              >
                <span className="text-slate-300">Location & Environment Continuity</span>
                <span className={lockLocation ? "text-emerald-400 font-bold" : "text-slate-600"}>{lockLocation ? "LOCKED" : "OFF"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio & Lang */}
        <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">9. Audio, Dubbing & Language Engine</h3>
              <p className="text-[11px] text-slate-400">Voice narration, 1.5s matrix pause, and ambient soundscape.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Voice Language</label>
              <select 
                value={audioLang} 
                onChange={(e) => setAudioLang(e.target.value)}
                className="w-full bg-[#070c18] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
              >
                <option>Hindi</option>
                <option>English</option>
                <option>Spanish</option>
                <option>Arabic</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Visual On-Screen Lang</label>
              <select 
                value={visualLang} 
                onChange={(e) => setVisualLang(e.target.value)}
                className="w-full bg-[#070c18] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
              >
                <option>English (Visual Prompts)</option>
                <option>Hindi</option>
                <option>None (Pure Visual)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Voice Delivery & Pause</label>
              <select 
                value={voiceEmotion} 
                onChange={(e) => setVoiceEmotion(e.target.value)}
                className="w-full bg-[#070c18] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
              >
                <option>Deep Ultra-Slow (1.5s Pause)</option>
                <option>Dramatic Narrative</option>
                <option>Warm Documentarian</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" /> Advanced Shot-by-Shot Timeline
          </button>

          <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 text-xs transition">
            <Play className="w-4 h-4 fill-white" /> 🚀 Generate {duration} Full Film ({duration === "60m" ? 360 : 18} Scenes)
          </button>
        </div>

      </main>
    </div>
  );
}
