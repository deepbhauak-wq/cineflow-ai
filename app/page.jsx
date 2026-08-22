"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowMasterStudio() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Core Story & Generation State
  const [prompt, setPrompt] = useState(
    "एक संघर्षशील युवा की महागाथा जो घोर विपत्तियों और असफलताओं के बीच भी अपने संकल्प को नहीं छोड़ता और अपनी अटूट मेहनत से सफलता का एक नया इतिहास रचता है। 4K अल्ट्रा-रियलिस्टिक सिनेमैटिक लाइटिंग, ड्रामेटिक ड्रोन शॉट्स और ओरिजिनल बैकग्राउंड स्कोर।"
  );
  
  // Pipeline Settings
  const [ratio, setRatio] = useState("16:9");
  const [timeline, setTimeline] = useState("60 Min");
  const [storyEngine, setStoryEngine] = useState("Auto");
  const [videoEngine, setVideoEngine] = useState("Veo");
  const [style, setStyle] = useState("Cinematic Epic");
  const [cameraMovement, setCameraMovement] = useState("Drone 360°");
  const [characterLock, setCharacterLock] = useState(true);
  const [voiceTrack, setVoiceTrack] = useState("Deep Cinematic Hindi");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2200);
  };

  const handleLogin = (provider) => {
    setIsLoggedIn(true);
    notify(`✅ Signed in successfully via ${provider}`);
  };

  const triggerFullPipeline = () => {
    if (!prompt.trim()) {
      notify("⚠️ Please enter a master story prompt!");
      return;
    }
    notify(`🚀 Pipeline Running: Script ➔ Characters ➔ ${timeline} Scenes ➔ ${videoEngine} 4K Film`);
  };

  if (!mounted) return null;

  // 1. AUTH GATEWAY
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
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
              className="w-full py-2.5 bg-[#141d33] hover:bg-[#1a2642] border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white transition active:scale-95"
            >
              <span className="text-sm">🔴</span> Continue with Google / Gmail
            </button>
            <button
              onClick={() => handleLogin("Facebook")}
              className="w-full py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-blue-400 transition active:scale-95"
            >
              <span className="text-sm">🔵</span> Continue with Facebook
            </button>
            <button
              onClick={() => handleLogin("Instagram")}
              className="w-full py-2.5 bg-pink-500/10 hover:bg-pink-500/20 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-pink-300 transition active:scale-95"
            >
              <span className="text-sm">🟣</span> Continue with Instagram
            </button>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[9px] text-slate-500 font-bold uppercase">OR CREDENTIALS</span>
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
                className="w-full bg-[#060a14] p-2.5 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
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
                  className="w-full bg-[#060a14] p-2.5 pr-14 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
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

  // 2. MASTER STUDIO INTERFACE
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-28 max-w-md mx-auto space-y-4 font-sans text-xs select-none">
      {/* Top Header */}
      <header className="flex justify-between items-center border-b border-slate-800/80 pb-2.5 sticky top-0 bg-[#070b14]/90 backdrop-blur-md z-40">
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
        <div className="flex items-center gap-1.5">
          <Link
            href="/vault"
            className="px-2.5 py-1 rounded-lg font-bold text-[10px] bg-[#22103a] text-purple-300 border border-purple-800/80 hover:bg-purple-900 transition flex items-center gap-1 shadow-md"
          >
            Vault 📂
          </Link>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-[9px] bg-[#3a0d18] text-red-300 border border-red-900 px-2.5 py-1 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </header>

      {statusMsg && (
        <div className="bg-cyan-950 border border-cyan-500 text-cyan-300 p-2 rounded-xl text-center font-bold text-xs shadow-lg">
          {statusMsg}
        </div>
      )}

      <div className="space-y-4">
        {/* Banner Tagline */}
        <div className="text-center space-y-1 pt-1">
          <span className="text-[9px] bg-[#0c1e29] border border-cyan-500/30 text-cyan-400 px-3 py-0.5 rounded-full font-bold inline-block shadow-sm">
            ✨ Multi-Agent Autonomous Film Pipeline
          </span>
          <h2 className="text-sm font-black text-white leading-snug">
            Turn a Single Idea into a <span className="text-cyan-400">Full-Feature Cinematic Film</span>
          </h2>
        </div>

        {/* 1. MASTER STORY / SCREENPLAY INPUT */}
        <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-1.5 shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-bold text-cyan-400 text-[10px] uppercase">🎛️ 1. MASTER STORY / SCREENPLAY INPUT</span>
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

        {/* 2. ASPECT RATIO */}
        <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
          <span className="font-bold text-cyan-400 text-[10px] block uppercase">📺 2. ASPECT RATIO</span>
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

        {/* 3. TIMELINE & LONG VIDEO MODE */}
        <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
          <span className="font-bold text-cyan-400 text-[10px] block uppercase">📚 3. TIMELINE & LONG VIDEO MODE</span>
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

        {/* 4. STORY ENGINE MODEL */}
        <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
          <span className="font-bold text-purple-400 text-[10px] block uppercase">🧠 4. STORY ENGINE MODEL</span>
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

        {/* 5. VIDEO GENERATION MODEL */}
        <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
          <span className="font-bold text-cyan-400 text-[10px] block uppercase">🎥 5. VIDEO GENERATION MODEL</span>
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

        {/* 6. VISUAL ATMOSPHERE & STYLE */}
        <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
          <span className="font-bold text-amber-400 text-[10px] block uppercase">🎞️ 6. VISUAL ATMOSPHERE & STYLE</span>
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

        {/* 7. PRO CAMERA & CONTINUITY CONTROLS */}
        <div className="bg-[#0b1222] border border-slate-800/80 p-3 rounded-2xl space-y-2 shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-bold text-cyan-400 text-[10px] block uppercase">🎬 7. PRO CAMERA & CONTINUITY</span>
            <button
              onClick={() => setCharacterLock(!characterLock)}
              className={`px-2 py-0.5 rounded text-[8px] font-bold border transition ${
                characterLock ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-slate-900 border-slate-800 text-slate-500"
              }`}
            >
              Face Consistency: {characterLock ? "LOCKED 🔒" : "OFF"}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {["Drone 360°", "Dolly In", "Tracking Shot", "Pan & Tilt", "Close-up POV", "Crane Shot"].map((cam) => (
              <button
                key={cam}
                onClick={() => setCameraMovement(cam)}
                className={`p-2 rounded-xl border text-center font-bold text-[9px] transition ${
                  cameraMovement === cam
                    ? "bg-[#0d2238] border-cyan-500 text-cyan-300"
                    : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                {cam}
              </button>
            ))}
          </div>
        </div>

        {/* Master Action Button */}
        <button
          onClick={triggerFullPipeline}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-500 rounded-2xl font-black text-xs uppercase tracking-wider text-white shadow-xl shadow-cyan-500/20 active:scale-95 transition"
        >
          🚀 GENERATE AUTONOMOUS CINEMA FILM
        </button>
      </div>
    </div>
  );
                                                                      }
