"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState("एक साहसी नायक जो प्राचीन विशाल साम्राज्य और रहस्यमयी प्राकृतिक वादियों के बीच एक महान यात्रा पर निकलता है। 4K सिनेमैटिक लाइटिंग, ड्रामेटिक ड्रोन शॉट्स और रियलिस्टिक विजुअल्स।");
  const [ratio, setRatio] = useState("16:9");
  const [timeline, setTimeline] = useState("60 Min");
  const [storyEngine, setStoryEngine] = useState("Auto");
  const [videoEngine, setVideoEngine] = useState("Veo");
  const [style, setStyle] = useState("Cinematic Epic");

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // 1. LOGIN SCREEN UI
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-[#0b1222] p-8 rounded-3xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black">🎬</div>
          <div className="space-y-1">
            <h1 className="text-xl font-black text-white">CineFlow AI Pro Studio</h1>
            <p className="text-[10px] text-slate-400">Google Flow-Grade Autonomous Cinema Engine</p>
          </div>
          <div className="space-y-3">
            <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 bg-[#141d33] border border-slate-700 rounded-xl text-xs font-bold text-white">🔴 Continue with Google / Gmail</button>
            <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 bg-[#1877F2]/10 border border-[#1877F2]/40 rounded-xl text-xs font-bold text-blue-400">🔵 Continue with Facebook</button>
            <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 bg-pink-500/10 border border-pink-500/30 rounded-xl text-xs font-bold text-pink-300">🟣 Continue with Instagram</button>
          </div>
          <div className="text-[9px] text-slate-500 font-bold uppercase">OR CREDENTIALS</div>
          <input type="text" placeholder="name@email.com" className="w-full bg-[#060a14] p-3 rounded-xl border border-slate-800 text-xs text-white" />
          <input type="password" placeholder="••••••••" className="w-full bg-[#060a14] p-3 rounded-xl border border-slate-800 text-xs text-white" />
          <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xs uppercase text-white">SIGN IN</button>
        </div>
      </div>
    );
  }

  // 2. STUDIO DASHBOARD UI
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-10 max-w-md mx-auto space-y-4 font-sans text-xs">
      <header className="flex justify-between items-center border-b border-slate-800 pb-3 sticky top-0 bg-[#070b14]/90 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-black">🎬</div>
            <div>
                <h1 className="text-[11px] font-black text-white">CineFlow <span className="text-cyan-400">AI Pro Studio</span></h1>
                <p className="text-[8px] text-slate-500">Google Flow-Grade Autonomous Cinema Engine</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#22103a] text-purple-300 rounded-lg font-bold text-[10px]">Vault 📂</button>
            <button onClick={() => setIsLoggedIn(false)} className="px-3 py-1 bg-red-950 text-red-300 rounded-lg font-bold text-[10px]">Logout</button>
        </div>
      </header>

      <div className="bg-[#141e2a] border border-cyan-500/30 p-2 rounded-xl text-center font-bold text-cyan-300 text-[9px] uppercase tracking-wider">
        ✨ Multi-Agent Autonomous Film Pipeline
      </div>
      <h2 className="text-sm font-black text-white text-center">Turn a Single Idea into a <span className="text-cyan-400">Full-Feature Cinematic Film</span></h2>

      {/* Inputs */}
      <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
        <div className="flex justify-between text-cyan-400 font-bold text-[10px]"><span>🎛️ 1. MASTER STORY / SCREENPLAY INPUT</span> <span className="text-[8px] bg-cyan-950 px-2 rounded">Auto-Scene Decomposition On</span></div>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full bg-[#060a14] p-2 rounded-xl border border-slate-800 text-xs" />
      </div>

      <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
        <span className="font-bold text-cyan-400 text-[10px]">📺 2. ASPECT RATIO</span>
        <div className="grid grid-cols-3 gap-2">
            {["16:9", "9:16", "21:9", "4:3", "1:1", "Auto"].map(r => (
                <button key={r} onClick={() => setRatio(r)} className={`p-2 rounded-xl border ${ratio === r ? "bg-[#0d2238] border-cyan-500 text-cyan-300" : "bg-[#060a14] border-slate-800"}`}>
                    <div className="font-bold text-[10px]">{r}</div>
                    <div className="text-[8px] opacity-60">{r === "16:9" ? "YouTube" : r === "9:16" ? "Reels" : "Cinematic"}</div>
                </button>
            ))}
        </div>
      </div>

      <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
        <span className="font-bold text-cyan-400 text-[10px]">📚 3. TIMELINE & LONG VIDEO MODE</span>
        <div className="grid grid-cols-3 gap-2">
            {["3 Min", "15 Min", "20 Min", "30 Min", "60 Min", "Custom"].map(t => (
                <button key={t} onClick={() => setTimeline(t)} className={`p-2 rounded-xl border ${timeline === t ? "bg-[#1f153a] border-purple-500 text-purple-300" : "bg-[#060a14] border-slate-800"}`}>
                    <div className="font-bold text-[10px]">{t}</div>
                </button>
            ))}
        </div>
      </div>

      <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
        <span className="font-bold text-purple-400 text-[10px]">🧠 4. STORY ENGINE MODEL</span>
        <div className="grid grid-cols-3 gap-2">
            {["Auto", "GPT", "Gemini", "Claude", "Fast AI", "Pro AI"].map(e => (
                <button key={e} onClick={() => setStoryEngine(e)} className={`py-2 rounded-xl border ${storyEngine === e ? "bg-[#251545] border-purple-500 text-purple-200" : "bg-[#060a14] border-slate-800"}`}>
                    {e}
                </button>
            ))}
        </div>
      </div>

      <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
        <span className="font-bold text-cyan-400 text-[10px]">🎥 5. VIDEO GENERATION MODEL</span>
        <div className="grid grid-cols-3 gap-2">
            {["Veo", "Kling", "Runway", "Halluo", "Luma", "Auto"].map(v => (
                <button key={v} onClick={() => setVideoEngine(v)} className={`py-2 rounded-xl border ${videoEngine === v ? "bg-[#0b2438] border-cyan-500 text-cyan-300" : "bg-[#060a14] border-slate-800"}`}>
                    {v}
                </button>
            ))}
        </div>
      </div>

      <div className="bg-[#0b1222] border border-slate-800 p-3 rounded-2xl space-y-2">
        <span className="font-bold text-amber-400 text-[10px]">🎞️ 6. VISUAL ATMOSPHERE & STYLE</span>
        <div className="grid grid-cols-2 gap-2">
            {["Cinematic Epic", "Realistic 8K", "Historical Drama", "Dark Cyberpunk", "3D Animation", "Anime", "Documentary Film", "Custom Style"].map(st => (
                <button key={st} onClick={() => setStyle(st)} className={`p-2.5 rounded-xl border text-left font-bold ${style === st ? "bg-[#211909] border-amber-500 text-amber-300" : "bg-[#060a14] border-slate-800"}`}>
                    {st} {style === st && "✓"}
                </button>
            ))}
        </div>
      </div>

      <button className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-500 rounded-2xl font-black text-xs uppercase text-white shadow-xl shadow-cyan-500/20 active:scale-95 transition">
        🚀 GENERATE AUTONOMOUS CINEMA FILM
      </button>
    </div>
  );
}
