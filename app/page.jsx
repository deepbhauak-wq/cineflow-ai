"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function IntegratedGoogleFlowStudio() {
  const [mounted, setMounted] = useState(false);
  const [prompt, setPrompt] = useState(
    "एक साहसी नायक जो प्राचीन विशाल साम्राज्य और रहस्यमयी प्राकृतिक वादियों के बीच एक महान यात्रा पर निकलता है। 4K सिनेमैटिक लाइटिंग, ड्रामेटिक ड्रोन शॉट्स और रियलिस्टिक विजुअल्स।"
  );
  
  // Google Flow Sheet Controls
  const [mode, setMode] = useState("Video"); // "Image" or "Video"
  const [ratio, setRatio] = useState("16:9");
  const [multiplier, setMultiplier] = useState("x1");
  const [duration, setDuration] = useState("8s");
  const [model, setModel] = useState("Omni Flash");
  
  // CineFlow Studio Controls
  const [timeline, setTimeline] = useState("60 Min");
  const [storyEngine, setStoryEngine] = useState("Auto");
  const [videoEngine, setVideoEngine] = useState("Veo");
  const [style, setStyle] = useState("Cinematic Epic");
  const [statusMsg, setStatusMsg] = useState("");

  // Google Flow Top Carousel Items
  const actionItems = [
    { title: "Edit video", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80" },
    { title: "Edit photo", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80" },
    { title: "Use avatar", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80" },
    { title: "Animate photo", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&q=80" },
    { title: "Take a video", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
    { title: "Take a photo", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80" }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2200);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      notify("⚠️ Please enter a prompt!");
      return;
    }
    notify(`🚀 Generating ${mode} with ${model} (${ratio}, ${timeline}, ${videoEngine})...`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-44 max-w-md mx-auto space-y-4 font-sans text-xs select-none relative">
      
      {/* 1. GOOGLE FLOW TOP HEADER */}
      <header className="flex justify-between items-center border-b border-slate-800/80 pb-2.5 sticky top-0 bg-[#070b14]/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-black shadow-md">
            🎬
          </div>
          <div>
            <h1 className="text-xs font-black text-cyan-400">
              Google Flow <span className="text-white">AI Pro Studio</span>
            </h1>
            <p className="text-[8px] text-slate-500">Autonomous Multi-Agent Cinema Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => notify("🔔 Notifications: 0 Unread")} className="text-sm text-slate-400 hover:text-white">
            🔔
          </button>
          <Link
            href="/vault"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-xs text-white shadow-md hover:ring-2 ring-cyan-400 transition"
          >
            AK
          </Link>
        </div>
      </header>

      {statusMsg && (
        <div className="bg-cyan-950 border border-cyan-500 text-cyan-300 p-2 rounded-xl text-center font-bold text-xs shadow-lg">
          {statusMsg}
        </div>
      )}

      {/* 2. GOOGLE FLOW HORIZONTAL ACTION CAROUSEL */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center px-0.5">
          <span className="text-[10px] font-bold text-slate-300 uppercase">⚡ Flow Actions</span>
          <span className="text-cyan-400 text-[8px] font-bold">Slide &gt;</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {actionItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setPrompt(`Cinematic realistic ${item.title.toLowerCase()} 4K HDR master shot`);
                notify(`✨ Loaded: ${item.title}`);
              }}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition"
            >
              <div className="w-20 h-28 rounded-2xl overflow-hidden bg-[#0b1222] border border-slate-800 shadow-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] text-slate-300 font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Title */}
      <div className="text-center space-y-1 pt-1">
        <span className="text-[9px] bg-[#0c1e29] border border-cyan-500/30 text-cyan-400 px-3 py-0.5 rounded-full font-bold inline-block shadow-sm">
          ✨ Multi-Agent Autonomous Film Pipeline
        </span>
        <h2 className="text-sm font-black text-white leading-snug">
          Turn a Single Idea into a <span className="text-cyan-400">Full-Feature Cinematic Film</span>
        </h2>
      </div>

      {/* 3. CINEFLOW STUDIO 6-PANEL CONTROLS */}
      
      {/* Panel 1: Master Story / Screenplay Input */}
      <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-1.5 shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-bold text-cyan-400 text-[10px] uppercase">🎛️ 1. Master Story / Screenplay Input</span>
          <span className="text-[8px] bg-[#0c2b3d] text-cyan-300 border border-cyan-700/60 px-2 py-0.5 rounded font-bold">
            Auto-Scene Decomposition On
          </span>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full bg-[#060a14] p-2.5 rounded-xl text-slate-200 border border-slate-800/90 text-[11px] outline-none focus:border-cyan-500 resize-none leading-relaxed"
        />
      </div>

      {/* Panel 2: Aspect Ratio */}
      <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
        <span className="font-bold text-cyan-400 text-[10px] block uppercase">📺 2. Aspect Ratio</span>
        <div className="grid grid-cols-3 gap-1.5">
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
              className={`p-2.5 rounded-xl border text-left transition ${
                ratio === item.id
                  ? "bg-[#0d2238] border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10"
                  : "bg-[#060a14] border-slate-800 text-slate-400"
              }`}
            >
              <div className="font-bold text-[10px]">{item.id}</div>
              <div className="text-[8px] opacity-60">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel 3: Timeline & Long Video Mode */}
      <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
        <span className="font-bold text-cyan-400 text-[10px] block uppercase">📚 3. Timeline & Long Video Mode</span>
        <div className="grid grid-cols-3 gap-1.5">
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
              onClick={() => setTimeline(item.id)}
              className={`p-2.5 rounded-xl border text-left transition ${
                timeline === item.id
                  ? "bg-[#1f153a] border-purple-500 text-purple-300 shadow-md shadow-purple-500/10"
                  : "bg-[#060a14] border-slate-800 text-slate-400"
              }`}
            >
              <div className="font-bold text-[10px]">{item.id}</div>
              <div className="text-[8px] opacity-60">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel 4: Story Engine Model */}
      <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
        <span className="font-bold text-purple-400 text-[10px] block uppercase">🧠 4. Story Engine Model</span>
        <div className="grid grid-cols-3 gap-1.5">
          {["Auto", "GPT", "Gemini", "Claude", "Fast AI", "Pro AI"].map((eng) => (
            <button
              key={eng}
              onClick={() => setStoryEngine(eng)}
              className={`py-2.5 rounded-xl border font-bold text-[10px] transition ${
                storyEngine === eng
                  ? "bg-[#251545] border-purple-500 text-purple-200 shadow-md shadow-purple-500/10"
                  : "bg-[#060a14] border-slate-800 text-slate-400"
              }`}
            >
              {eng}
            </button>
          ))}
        </div>
      </div>

      {/* Panel 5: Video Generation Model */}
      <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
        <span className="font-bold text-cyan-400 text-[10px] block uppercase">🎥 5. Video Generation Model</span>
        <div className="grid grid-cols-3 gap-1.5">
          {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Auto"].map((v) => (
            <button
              key={v}
              onClick={() => setVideoEngine(v)}
              className={`py-2.5 rounded-xl border font-bold text-[10px] transition ${
                videoEngine === v
                  ? "bg-[#0b2438] border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10"
                  : "bg-[#060a14] border-slate-800 text-slate-400"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Panel 6: Visual Atmosphere & Style */}
      <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
        <span className="font-bold text-amber-400 text-[10px] block uppercase">🎞️ 6. Visual Atmosphere & Style</span>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            "Cinematic Epic",
            "Realistic 8K",
            "Historical Drama",
            "Dark Cyberpunk",
            "3D Animation",
            "Anime",
            "Documentary Film",
            "Custom Style",
          ].map((st) => (
            <button
              key={st}
              onClick={() => setStyle(st)}
              className={`p-2.5 rounded-xl border text-left font-bold text-[10px] flex justify-between items-center transition ${
                style === st
                  ? "bg-[#211909] border-amber-500 text-amber-300 shadow-md shadow-amber-500/10"
                  : "bg-[#060a14] border-slate-800 text-slate-400"
              }`}
            >
              <span>{st}</span>
              {style === st && <span className="text-amber-400">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 4. GOOGLE FLOW FLOATING BOTTOM SHEET (DRAWER) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#12141a]/95 backdrop-blur-xl border-t border-slate-800/90 rounded-t-[28px] p-3.5 space-y-2.5 shadow-2xl z-50">
        
        {/* Quick Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="What do you want to make?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 outline-none font-medium truncate"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => notify("📁 Asset upload attached")}
              className="w-7 h-7 rounded-full bg-[#1e222d] text-slate-300 flex items-center justify-center font-bold text-sm hover:bg-[#2a3040]"
            >
              +
            </button>
            <div className="px-2.5 py-1 bg-[#252936] rounded-full text-slate-300 text-[10px] font-medium flex items-center gap-1">
              <span>{mode}</span>
              <span className="text-slate-400">📱 {multiplier}</span>
            </div>
            <button
              onClick={handleGenerate}
              className="w-8 h-8 rounded-full bg-[#252936] hover:bg-cyan-600 text-white flex items-center justify-center font-bold text-xs transition active:scale-95"
            >
              ➔
            </button>
          </div>
        </div>

        {/* Credit Tracker */}
        <div className="text-center text-[10px] text-slate-400 font-medium">
          Generating will use <span className="text-white underline font-bold">{mode === "Video" ? "12 AI credits" : "0 AI credits"}</span>
        </div>

        {/* Mode & Batch Toggles Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex bg-[#1b1e28] p-1 rounded-xl">
            <button
              onClick={() => setMode("Image")}
              className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition ${
                mode === "Image" ? "bg-[#282d3c] text-white shadow-sm" : "text-slate-400"
              }`}
            >
              🖼️ Image
            </button>
            <button
              onClick={() => setMode("Video")}
              className={`flex-1 py-1.5 rounded-lg font-bold text-[10px] transition ${
                mode === "Video" ? "bg-[#282d3c] text-white shadow-sm" : "text-slate-400"
              }`}
            >
              🎥 Video
            </button>
          </div>

          <div className="flex bg-[#1b1e28] p-1 rounded-xl">
            {["x1", "x2", "x3", "x4"].map((m) => (
              <button
                key={m}
                onClick={() => setMultiplier(m)}
                className={`flex-1 py-1.5 rounded-lg font-bold text-[9px] transition ${
                  multiplier === m ? "bg-[#282d3c] text-white shadow-sm" : "text-slate-400"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Main Master Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-500 rounded-xl font-black text-xs uppercase tracking-wider text-white shadow-xl shadow-cyan-500/20 active:scale-95 transition"
        >
          🚀 Generate Autonomous Cinema Film
        </button>
      </div>

    </div>
  );
        }
