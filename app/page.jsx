"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function MixedStudioApp() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Prompt & Studio Controls
  const [prompt, setPrompt] = useState(
    "एक गहरा अंतरिक्ष अन्वेषक दल एक रहस्यमयी चमकते ग्रह की खोज करता है। महाकाय बादलों के बीच से उड़ता हुआ आधुनिक स्पेसशिप और रोमांचक दृश्य।"
  );
  const [mode, setMode] = useState("Video"); // "Image" or "Video"
  const [ratio, setRatio] = useState("16:9");
  const [timeline, setTimeline] = useState("60 Min");
  const [storyEngine, setStoryEngine] = useState("Auto");
  const [videoEngine, setVideoEngine] = useState("Veo");
  const [style, setStyle] = useState("Cinematic Epic");
  const [multiplier, setMultiplier] = useState("x1");
  const [statusMsg, setStatusMsg] = useState("");

  // Flow Carousel Items
  const actionItems = [
    { title: "Edit video", query: "fashion-model-blue-tracksuit-top-down-minimal" },
    { title: "Edit photo", query: "modern-blue-fuzzy-chair-studio-lighting-minimal" },
    { title: "Use avatar", query: "portrait-split-screen-female-model-studio-headshot" },
    { title: "Animate photo", query: "vintage-retro-colorful-cars-road-winding-green-meadow" },
    { title: "Take a video", query: "young-man-blue-jacket-outdoor-park-sunny-selfie" },
    { title: "Take a photo", query: "high-fashion-editorial-model-purple-dress-pose-clean" }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2200);
  };

  const handleLogin = (provider) => {
    setIsLoggedIn(true);
    notify(`✅ Logged in via ${provider}`);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      notify("⚠️ Please enter a prompt!");
      return;
    }
    notify(`🚀 Generating 4K ${mode} (${ratio} • ${timeline} • ${videoEngine})...`);
  };

  if (!mounted) return null;

  // 1. AUTH GATEWAY
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#060913] text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-[#0b101d] p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black shadow-lg shadow-cyan-500/20">
              🎬
            </div>
            <h1 className="text-base font-black text-white tracking-wider">CineFlow AI Pro Studio</h1>
            <p className="text-[10px] text-slate-400">Google Flow-Grade Autonomous Cinema Engine</p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleLogin("Google")}
              className="w-full py-2.5 bg-[#12192a] hover:bg-[#18223a] border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white transition active:scale-95"
            >
              <span className="text-sm">🔴</span> Continue with Google / Gmail
            </button>
            <button
              onClick={() => handleLogin("Facebook")}
              className="w-full py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-blue-400 transition active:scale-95"
            >
              <span className="text-sm">🔵</span> Continue with Facebook
            </button>
            <button
              onClick={() => handleLogin("Instagram")}
              className="w-full py-2.5 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 hover:from-pink-500/20 border border-pink-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-pink-300 transition active:scale-95"
            >
              <span className="text-sm">🟣</span> Continue with Instagram
            </button>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[9px] text-slate-500 font-bold uppercase">Or Credentials</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Email / ID</label>
              <input
                type="text"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#060913] p-2.5 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#060913] p-2.5 pr-14 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-lg font-bold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              onClick={() => handleLogin("Email")}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs rounded-xl uppercase text-white shadow-lg active:scale-95 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. MIXED HYBRID MASTER STUDIO
  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 p-4 pb-36 max-w-md mx-auto space-y-4 font-sans text-xs select-none">
      {/* Mixed Header (Google Flow + CineFlow Studio Controls) */}
      <header className="flex justify-between items-center border-b border-slate-800/80 pb-2.5 sticky top-0 bg-[#060810]/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-black shadow-md">
            🎬
          </div>
          <div>
            <h1 className="text-xs font-black text-cyan-400">
              CineFlow <span className="text-white">AI Pro Studio</span>
            </h1>
            <p className="text-[8px] text-slate-500">Google Flow-Grade Autonomous Cinema Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/vault"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-xs text-white shadow-md hover:ring-2 ring-cyan-400"
          >
            AK
          </Link>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-[9px] bg-red-950 text-red-400 border border-red-900 px-2 py-1 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </header>

      {statusMsg && (
        <div className="bg-cyan-950/90 border border-cyan-500 text-cyan-300 p-2 rounded-xl text-center font-bold text-xs shadow-lg">
          {statusMsg}
        </div>
      )}

      {/* Google Flow Horizontal Carousel Actions */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-slate-300 uppercase">⚡ Quick AI Creators</span>
          <span className="text-cyan-400 text-[8px] font-bold">Scroll &gt;</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {actionItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setPrompt(`Cinematic ${item.title.toLowerCase()} high quality 4k epic production render`);
                notify(`✨ Loaded: ${item.title}`);
              }}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 transition"
            >
              <div className="w-20 h-28 rounded-2xl overflow-hidden bg-[#0d1220] border border-slate-800 shadow-md">
                <img
                  src={`https://image.pollinations.ai/prompt/${item.query}?width=180&height=240&nologo=true`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=180&q=80";
                  }}
                />
              </div>
              <span className="text-[10px] text-slate-300 font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Agent Film Pipeline Heading */}
      <div className="text-center space-y-1 pt-1">
        <span className="text-[9px] bg-[#0c1e29] border border-cyan-500/30 text-cyan-400 px-3 py-0.5 rounded-full font-bold inline-block">
          ✨ Multi-Agent Autonomous Film Pipeline
        </span>
        <h2 className="text-sm font-black text-white leading-snug">
          Turn a Single Idea into a <span className="text-cyan-400">Full-Feature Cinematic Film</span>
        </h2>
      </div>

      {/* 1. Master Story / Screenplay Input */}
      <div className="bg-[#0b101e] border border-slate-800/80 p-3 rounded-2xl space-y-1.5 shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-bold text-cyan-400 text-[10px] uppercase">🎛️ 1. Master Story / Screenplay Input</span>
          <span className="text-[8px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-bold">
            Auto-Scene Decomposition On
          </span>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full bg-[#060913] p-2.5 rounded-xl text-slate-200 border border-slate-800 text-[11px] outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      {/* 2. Aspect Ratio (Exact Matrix from Screen 2) */}
      <div className="bg-[#0b101e] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
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
              className={`p-2 rounded-xl border text-left transition ${
                ratio === item.id ? "bg-[#0d2238] border-cyan-500 text-cyan-300" : "bg-[#060913] border-slate-800 text-slate-400"
              }`}
            >
              <div className="font-bold text-[10px]">{item.id}</div>
              <div className="text-[8px] opacity-60">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Timeline & Long Video Mode */}
      <div className="bg-[#0b101e] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
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
              className={`p-2 rounded-xl border text-left transition ${
                timeline === item.id ? "bg-[#181336] border-purple-500 text-purple-300" : "bg-[#060913] border-slate-800 text-slate-400"
              }`}
            >
              <div className="font-bold text-[10px]">{item.id}</div>
              <div className="text-[8px] opacity-60">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Story Engine Model */}
      <div className="bg-[#0b101e] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
        <span className="font-bold text-purple-400 text-[10px] block uppercase">🧠 4. Story Engine Model</span>
        <div className="grid grid-cols-3 gap-1.5">
          {["Auto", "GPT", "Gemini", "Claude", "Fast AI", "Pro AI"].map((eng) => (
            <button
              key={eng}
              onClick={() => setStoryEngine(eng)}
              className={`py-2 rounded-xl border font-bold text-[10px] transition ${
                storyEngine === eng ? "bg-[#231542] border-purple-500 text-purple-200" : "bg-[#060913] border-slate-800 text-slate-400"
              }`}
            >
              {eng}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Video Generation Model */}
      <div className="bg-[#0b101e] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
        <span className="font-bold text-cyan-400 text-[10px] block uppercase">🎥 5. Video Generation Model</span>
        <div className="grid grid-cols-3 gap-1.5">
          {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Auto"].map((v) => (
            <button
              key={v}
              onClick={() => setVideoEngine(v)}
              className={`py-2 rounded-xl border font-bold text-[10px] transition ${
                videoEngine === v ? "bg-[#0b2438] border-cyan-500 text-cyan-300" : "bg-[#060913] border-slate-800 text-slate-400"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Visual Atmosphere & Style */}
      <div className="bg-[#0b101e] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
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
              className={`p-2 rounded-xl border text-left font-bold text-[10px] flex justify-between items-center transition ${
                style === st ? "bg-[#211b0e] border-amber-500 text-amber-300" : "bg-[#060913] border-slate-800 text-slate-400"
              }`}
            >
              <span>{st}</span>
              {style === st && <span className="text-amber-400">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 7. BOTTOM FIXED MIXED ACTION BAR (Google Flow Style Bar) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0f121a]/95 backdrop-blur-xl border-t border-slate-800/90 p-3.5 space-y-2.5 z-50">
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 font-medium">
          <span>Mode: <strong className="text-cyan-400">{mode}</strong></span>
          <span>Credits: <strong className="text-white underline">{mode === "Video" ? "12 AI credits" : "0 AI credits"}</strong></span>
          <span>Quality: <strong className="text-emerald-400">4K Clean</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[#181d2a] p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setMode("Image")}
              className={`px-2.5 py-1.5 rounded-lg font-bold text-[10px] transition ${
                mode === "Image" ? "bg-cyan-600 text-white shadow" : "text-slate-400"
              }`}
            >
              🖼️
            </button>
            <button
              onClick={() => setMode("Video")}
              className={`px-2.5 py-1.5 rounded-lg font-bold text-[10px] transition ${
                mode === "Video" ? "bg-cyan-600 text-white shadow" : "text-slate-400"
              }`}
            >
              🎥
            </button>
          </div>

          <button
            onClick={handleGenerate}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-xl font-black text-xs uppercase tracking-wider text-white shadow-xl shadow-cyan-500/20 active:scale-95 transition"
          >
            🚀 Generate Autonomous Film
          </button>
        </div>
      </div>
    </div>
  );
}
