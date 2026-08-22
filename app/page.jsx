"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [prompt, setPrompt] = useState(
    "यीशु तूफ़ान के बीच नाव में शिष्यों के साथ हैं। शांत और सामर्थी मुद्रा, रात का भयानक समुद्री तूफ़ान, बिजली की चमक और विशाल लहरें।"
  );
  const [ratio, setRatio] = useState("16:9");
  const [timeline, setTimeline] = useState("60 Min");
  const [storyEngine, setStoryEngine] = useState("Auto");
  const [videoEngine, setVideoEngine] = useState("Veo");
  const [style, setStyle] = useState("Bible Art");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2000);
  };

  const handleLogin = (provider) => {
    setIsLoggedIn(true);
    notify(`✅ Logged in via ${provider}`);
  };

  if (!mounted) return null;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4 font-sans">
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

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-24 max-w-md mx-auto space-y-4 font-sans text-xs">
      <header className="flex justify-between items-center border-b border-slate-800 pb-2.5 sticky top-0 bg-[#070b14]/90 backdrop-blur-md z-40">
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
          <span className="bg-[#1f190e] border border-amber-500/40 text-amber-300 text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            ✨ AK Engine
          </span>
          <Link
            href="/vault"
            className="px-2.5 py-1 rounded-lg font-bold text-[10px] bg-purple-950 text-purple-300 border border-purple-800 hover:bg-purple-900 transition"
          >
            Vault 📂
          </Link>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-[9px] bg-red-950 text-red-400 border border-red-900 px-2.5 py-1 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </header>

      {statusMsg && (
        <div className="bg-cyan-950 border border-cyan-500 text-cyan-300 p-2 rounded-xl text-center font-bold text-xs">
          {statusMsg}
        </div>
      )}

      <div className="space-y-4">
        <div className="text-center space-y-1 pt-1">
          <span className="text-[9px] bg-[#0c1e29] border border-cyan-500/30 text-cyan-400 px-3 py-0.5 rounded-full font-bold inline-block">
            ✨ Multi-Agent Autonomous Film Pipeline
          </span>
          <h2 className="text-sm font-black text-white leading-snug">
            Turn a Single Idea into a <span className="text-cyan-400">Full-Feature Cinematic Film</span>
          </h2>
        </div>

        <div className="bg-gradient-to-b from-[#141209] to-[#0b1222] border border-amber-500/30 p-3 rounded-2xl space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-amber-400 text-sm">🔖</span>
            <div>
              <h3 className="font-bold text-amber-300 text-[10px]">⭐ AK MINISTRY MASTER PRESET</h3>
              <p className="text-[8px] text-slate-400">
                60 Min (360 Scenes) • Ultra-Slow Deep Hindi Narration (1.5s Pause) • Character Locked
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setTimeline("60 Min");
              setStyle("Bible Art");
              notify("⭐ AK Master Preset Applied!");
            }}
            className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[10px] rounded-xl uppercase tracking-wider"
          >
            Apply Preset
          </button>
        </div>

        <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-bold text-cyan-400 text-[10px]">🎛️ 1. MASTER STORY / SCREENPLAY INPUT</span>
            <span className="text-[8px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-bold">
              Auto-Scene Decomposition On
            </span>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full bg-[#060a14] p-2 rounded-xl text-slate-200 border border-slate-800 text-[11px] outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
          <span className="font-bold text-cyan-400 text-[10px] block">📺 2. ASPECT RATIO</span>
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
                  ratio === item.id ? "bg-[#0d2238] border-cyan-500 text-cyan-300" : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                <div className="font-bold text-[10px]">{item.id}</div>
                <div className="text-[8px] opacity-60">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
          <span className="font-bold text-cyan-400 text-[10px] block">📚 3. TIMELINE & LONG VIDEO MODE</span>
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
                  timeline === item.id ? "bg-[#181336] border-purple-500 text-purple-300" : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                <div className="font-bold text-[10px]">{item.id}</div>
                <div className="text-[8px] opacity-60">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
          <span className="font-bold text-purple-400 text-[10px] block">🧠 4. STORY ENGINE MODEL</span>
          <div className="grid grid-cols-3 gap-1.5">
            {["Auto", "GPT", "Gemini", "Claude", "Fast AI", "Pro AI"].map((eng) => (
              <button
                key={eng}
                onClick={() => setStoryEngine(eng)}
                className={`py-2 rounded-xl border font-bold text-[10px] transition ${
                  storyEngine === eng ? "bg-[#231542] border-purple-500 text-purple-200" : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                {eng}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
          <span className="font-bold text-cyan-400 text-[10px] block">🎥 5. VIDEO GENERATION MODEL</span>
          <div className="grid grid-cols-3 gap-1.5">
            {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Auto"].map((v) => (
              <button
                key={v}
                onClick={() => setVideoEngine(v)}
                className={`py-2 rounded-xl border font-bold text-[10px] transition ${
                  videoEngine === v ? "bg-[#0b2438] border-cyan-500 text-cyan-300" : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
          <span className="font-bold text-amber-400 text-[10px] block">🎞️ 6. VISUAL ATMOSPHERE & STYLE</span>
          <div className="grid grid-cols-2 gap-1.5">
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
                className={`p-2 rounded-xl border text-left font-bold text-[10px] flex justify-between items-center transition ${
                  style === st ? "bg-[#211b0e] border-amber-500 text-amber-300" : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                <span>{st}</span>
                {style === st && <span className="text-amber-400">✓</span>}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => notify("🚀 Film Generation Pipeline Triggered!")}
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black text-xs uppercase text-white shadow-xl active:scale-95 transition"
        >
          🚀 Generate Autonomous Cinema Film
        </button>
      </div>
    </div>
  );
}
