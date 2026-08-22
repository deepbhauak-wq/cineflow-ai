"use client";

import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [prompt, setPrompt] = useState(
    "यीशु तूफान के बीच नाव में शिष्यों के साथ हैं। शांत और सामर्थी मुद्रा, रात का भयानक समुद्री तूफ़ान, बिजली की चमक और विशाल लहरें।"
  );
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("60 Min");
  const [storyModel, setStoryModel] = useState("Auto");
  const [videoModel, setVideoModel] = useState("Veo");
  const [style, setStyle] = useState("Bible Art");

  const applyAkPreset = () => {
    setRatio("16:9");
    setDuration("60 Min");
    setStoryModel("Auto");
    setVideoModel("Veo");
    setStyle("Bible Art");
    setPrompt(
      "यीशु तूफान के बीच नाव में शिष्यों के साथ हैं। शांत और सामर्थी मुद्रा, रात का भयानक समुद्री तूफ़ान, बिजली की चमक और विशाल लहरें।"
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-20 selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-slate-800/80 bg-[#090f1d] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-lg">
            🎬
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
              CineFlow <span className="text-cyan-400">AI Pro Studio</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">
              Google Flow-Grade Autonomous Cinema Engine
            </p>
          </div>
        </div>

        <button
          onClick={applyAkPreset}
          className="bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-amber-400 text-xs font-bold active:scale-95 transition-all"
        >
          <span>✨</span> AK Engine
        </button>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-5">
        {/* Top Tagline */}
        <div className="text-center space-y-2 pt-2 pb-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0d1c2d] border border-cyan-500/30 text-cyan-300">
            <span>✨</span> Multi-Agent Autonomous Film Pipeline
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            Turn a Single Idea into a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Full-Feature Cinematic Film
            </span>
          </h2>
        </div>

        {/* AK Ministry Preset Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#161226] via-[#101328] to-[#0d1124] border border-amber-500/30 shadow-2xl space-y-3 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-lg flex-shrink-0">
              🔖
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                ⭐ AK MINISTRY MASTER PRESET
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                60 Min (360 Scenes) • Ultra-Slow Deep Hindi Narration (1.5s Pause) • Character Locked
              </p>
            </div>
          </div>
          <button
            onClick={applyAkPreset}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
          >
            Apply Preset
          </button>
        </div>

        {/* 1. Master Story / Screenplay Input */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase text-slate-200 flex items-center gap-2">
              <span className="text-cyan-400">🎛️</span> 1. MASTER STORY / SCREENPLAY INPUT
            </label>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
              Auto-Scene Decomposition On
            </span>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
          />
        </div>

        {/* 2. Aspect Ratio */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-xs font-black uppercase text-slate-200 flex items-center gap-2">
            <span className="text-cyan-400">📺</span> 2. ASPECT RATIO
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "16:9", sub: "YouTube" },
              { id: "9:16", sub: "Shorts/Reels" },
              { id: "21:9", sub: "Cinematic" },
              { id: "4:3", sub: "Classic" },
              { id: "1:1", sub: "Square" },
              { id: "Auto", sub: "AI Smart" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setRatio(item.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  ratio === item.id
                    ? "bg-cyan-950/40 border-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                    : "bg-[#060a14] border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="text-xs font-black">{item.id}</div>
                <div className="text-[9px] text-slate-400">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Timeline & Long Video Mode */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-xs font-black uppercase text-slate-200 flex items-center gap-2">
            <span className="text-cyan-400">📚</span> 3. TIMELINE & LONG VIDEO MODE
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "3 Min", sub: "18 Scenes" },
              { id: "15 Min", sub: "90 Scenes" },
              { id: "20 Min", sub: "120 Scenes" },
              { id: "30 Min", sub: "180 Scenes" },
              { id: "60 Min", sub: "360 Scenes" },
              { id: "Custom", sub: "Variable" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setDuration(item.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  duration === item.id
                    ? "bg-indigo-950/50 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                    : "bg-[#060a14] border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="text-xs font-black">{item.id}</div>
                <div className="text-[9px] text-slate-400">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Story Engine Model */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-xs font-black uppercase text-slate-200 flex items-center gap-2">
            <span className="text-purple-400">🧠</span> 4. STORY ENGINE MODEL
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["Auto", "GPT", "Gemini", "Claude", "Fast AI", "Pro AI"].map((m) => (
              <button
                key={m}
                onClick={() => setStoryModel(m)}
                className={`py-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                  storyModel === m
                    ? "bg-purple-950/60 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/10"
                    : "bg-[#060a14] border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Video Generation Model */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-xs font-black uppercase text-slate-200 flex items-center gap-2">
            <span className="text-cyan-400">📹</span> 5. VIDEO GENERATION MODEL
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Auto"].map((vm) => (
              <button
                key={vm}
                onClick={() => setVideoModel(vm)}
                className={`py-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                  videoModel === vm
                    ? "bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-500/10"
                    : "bg-[#060a14] border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                {vm}
              </button>
            ))}
          </div>
        </div>

        {/* 6. Visual Atmosphere & Style */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-xs font-black uppercase text-slate-200 flex items-center gap-2">
            <span className="text-amber-400">🎞️</span> 6. VISUAL ATMOSPHERE & STYLE
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Bible Art",
              "Cinematic Epic",
              "Realistic 8K",
              "Historical Drama",
              "Dark Cyberpunk",
              "3D Animation",
              "Anime",
              "Custom Style",
            ].map((st) => (
              <button
                key={st}
                onClick={() => setStyle(st)}
                className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                  style === st
                    ? "bg-[#1f1910] border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10"
                    : "bg-[#060a14] border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <span>{st}</span>
                {style === st && <span className="text-amber-400 font-black">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button className="w-full py-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 rounded-2xl font-black text-sm uppercase tracking-wider text-white shadow-xl shadow-cyan-500/20 active:scale-[0.99] transition-all">
          🚀 Generate Cinema Video Package
        </button>
      </main>
    </div>
  );
}
