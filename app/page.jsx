"use client";
import React, { useState, useEffect } from "react";

export default function UnifiedProCineFlow() {
  const [activeNav, setActiveNav] = useState("generator");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gEmail, setGEmail] = useState("");
  const [gPass, setGPass] = useState("");
  const [activeEmail, setActiveEmail] = useState("user@gmail.com");

  // Generator States
  const [storyPrompt, setStoryPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPlayModal, setShowPlayModal] = useState(false);

  // Editor States
  const [activeScene, setActiveScene] = useState(1);
  const [aiPrompt, setAiPrompt] = useState("");
  const [akMinistryActive, setAkMinistryActive] = useState(true);
  const [activeTab, setActiveTab] = useState("timeline");
  const [voiceVol, setVoiceVol] = useState(100);
  const [musicVol, setMusicVol] = useState(10);
  const [sfxVol, setSfxVol] = useState(40);
  const [colorGrade, setColorGrade] = useState("AK Ministry Cinematic");

  useEffect(() => {
    const s = localStorage.getItem("cineflow_logged_in");
    const e = localStorage.getItem("cineflow_user_email");
    if (s === "true" && e) {
      setIsLoggedIn(true);
      setActiveEmail(e);
    }
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    let em = gEmail || "user@gmail.com";
    localStorage.setItem("cineflow_logged_in", "true");
    localStorage.setItem("cineflow_user_email", em);
    setActiveEmail(em);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("cineflow_logged_in");
    localStorage.removeItem("cineflow_user_email");
    setIsLoggedIn(false);
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPlayModal(true);
    }, 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center p-4 text-white font-sans">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-black border border-cyan-500/40 p-2 flex items-center justify-center mb-3">
            <span className="text-xl text-cyan-400 font-bold">▶</span>
          </div>
          <h1 className="text-xl font-bold mb-1">CineFlow AI Pro</h1>
          <p className="text-xs text-slate-400 mb-4">Autonomous Cinema & Studio Engine</p>
          <form onSubmit={handleAuth} className="w-full space-y-3">
            <input type="email" required value={gEmail} onChange={(e) => setGEmail(e.target.value)} placeholder="name@gmail.com" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
            <input type="password" required value={gPass} onChange={(e) => setGPass(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 font-bold text-xs text-black cursor-pointer">PERMANENT SIGN IN</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      
      {loading && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-cyan-400 font-bold">Rendering Autonomous Film with Shuddh Hindi & -22dB Ducking...</p>
        </div>
      )}

      {showPlayModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-green-400">🎉 Master Production Rendered Successfully</span>
              <button onClick={() => setShowPlayModal(false)} className="text-xs text-slate-400 cursor-pointer">Close ✕</button>
            </div>
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black relative flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800" alt="" className="w-full h-full object-cover"/>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="text-xs text-slate-400">100% Shuddh Hindi • BGM -22dB Locked</p>
              <button onClick={() => { setShowPlayModal(false); setActiveNav("editor"); }} className="px-3 py-1.5 rounded-xl bg-cyan-500 text-black font-bold text-xs">Open in Studio Editor 🎬</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-black border border-cyan-500/40 flex items-center justify-center">
            <span className="text-xs text-cyan-400 font-bold">▶</span>
          </div>
          <h1 className="text-sm font-bold tracking-tight">CineFlow AI Pro</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-[11px] text-cyan-300 font-mono">⚡ 55 Cr</span>
          <button onClick={handleLogout} className="text-xs text-red-400 hover:underline cursor-pointer">Logout</button>
        </div>
      </div>

      {/* Main Content Area Based on Navigation */}
      <div className="max-w-4xl mx-auto space-y-4">
        
        {activeNav === "generator" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <label className="text-xs font-semibold text-cyan-400 uppercase">1. Master Story Prompt</label>
              <textarea rows={2} value={storyPrompt} onChange={(e) => setStoryPrompt(e.target.value)} placeholder="Enter story or write AUTO..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"/>
            </div>

            <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-3 space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-cyan-400 uppercase">Audio & Voiceover Engine (Auto-Locked)</label>
                <span className="text-[10px] text-green-400 font-mono">⚡ ACTIVE</span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono">100% Shuddh Hindi (Deep Calm) • 10-13 Words/Scene • BGM Clamped at -22dB</p>
            </div>

            <button onClick={handleGenerate} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-sm text-black cursor-pointer shadow-xl">
              🚀 GENERATE AUTONOMOUS CINEMA FILM
            </button>
          </div>
        )}

        {activeNav === "vault" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <h2 className="text-xs font-bold text-cyan-400 uppercase">👤 Character Continuity Vault</h2>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Jesus (Main)</p>
                <p className="text-[10px] text-slate-400">Face, Hair & Outfit 100% Locked</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold">⚡ AUTO LOCKED</span>
            </div>
          </div>
        )}

        {activeNav === "editor" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h2 className="text-xs font-bold text-cyan-400 uppercase">🎬 Pro AI Filmmaking Studio Editor</h2>
              <span className="text-[10px] text-green-400 font-mono">⚡ 13-Point System Active</span>
            </div>

            <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-3 space-y-2">
              <label className="text-[10px] font-bold text-cyan-400 uppercase">🧠 AI Editor Prompt (Natural Language)</label>
              <div className="flex gap-2">
                <input type="text" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="e.g. 'इस scene को ज्यादा emotional बनाओ'" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
                <button onClick={() => alert("AI Edit Applied!")} className="px-3 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs">Run</button>
              </div>
            </div>

            <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-purple-300">⭐ AK Ministry Cinematic Preset</p>
                <p className="text-[10px] text-slate-400">1.5s Pause • Deep Narration • BGM -22dB</p>
              </div>
              <button onClick={() => setAkMinistryActive(!akMinistryActive)} className={`px-3 py-1 rounded-xl text-xs font-bold ${akMinistryActive ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                {akMinistryActive ? "ENABLED 🟢" : "DISABLED"}
              </button>
            </div>

            <div className="flex gap-1.5 overflow-x-auto bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              {[
                { id: "timeline", label: "🎞️ Multi-Track Timeline" },
                { id: "basic", label: "✂️ Basic Edit" },
                { id: "ai", label: "🎥 AI Scene Gen" },
                { id: "character", label: "👤 Character Edit" },
                { id: "audio", label: "🔊 Audio Mix (-22dB)" },
                { id: "color", label: "🎨 Color Grade" }
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer ${activeTab === tab.id ? "bg-cyan-500 text-black shadow-md" : "text-slate-400"}`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "timeline" && (
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <span className="text-cyan-400 font-bold uppercase text-[10px]">Multi-Track Timeline</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 w-16">Video:</span>
                  {[1, 2, 3].map(s => (
                    <button key={s} onClick={() => setActiveScene(s)} className={`px-2.5 py-1 rounded-lg border text-xs ${activeScene === s ? "bg-cyan-500 text-black font-bold" : "bg-slate-900 text-slate-400"}`}>Scene {s}</button>
                  ))}
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Voice: 100% Shuddh Hindi (1.5s Pause)</span>
                  <span className="text-green-400">BGM @ -22dB</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Floating Bottom Navigation Dock */}
      <div className="fixed bottom-4 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1.5 rounded-full shadow-2xl backdrop-blur-lg">
        <button onClick={() => setActiveNav("generator")} className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border shadow-md cursor-pointer ${activeNav === "generator" ? "bg-cyan-500 text-black font-bold border-cyan-400" : "bg-slate-800 text-cyan-400 border-slate-700"}`} title="Home">🏠</button>
        <button onClick={() => setActiveNav("vault")} className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border shadow-md cursor-pointer ${activeNav === "vault" ? "bg-purple-500 text-black font-bold border-purple-400" : "bg-slate-800 text-purple-400 border-slate-700"}`} title="Vault">👤</button>
        <button onClick={() => setActiveNav("editor")} className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border shadow-md cursor-pointer ${activeNav === "editor" ? "bg-cyan-500 text-black font-bold border-cyan-400" : "bg-slate-800 text-cyan-400 border-slate-700"}`} title="Editor">🎬</button>
      </div>
    </div>
  );
}
