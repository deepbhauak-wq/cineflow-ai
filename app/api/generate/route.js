            
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function StudioEditor() {
  const [activeScene, setActiveScene] = useState(1);
  const [dialogText, setDialogText] = useState("कबीर अपने परिवार के लिए कुछ बहुत अच्छा करना चाहता था।");
  const [voiceProfile, setVoiceProfile] = useState("100% Shuddh Hindi (Deep Calm Tone)");
  const [subsState, setSubsState] = useState("AUTO Animated Dynamic Pop ON");
  const [watermarkPos, setWatermarkPos] = useState("TOP RIGHT");
  const [isRendering, setIsRendering] = useState(false);

  const handleReRender = () => {
    setIsRendering(true);
    setTimeout(() => {
      setIsRendering(false);
      alert("Scene " + activeScene + " Re-Rendered Successfully with Shuddh Hindi & -22dB Ducking!");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      
      {isRendering && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-cyan-400 font-bold">Re-rendering Scene with AI Voice & Auto Ducking...</p>
        </div>
      )}

      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            <span>🎬</span> Multi-Track AI Studio Editor
          </h1>
          <p className="text-[10px] text-slate-400">Scene Swaps • Voice Tuning • Auto-Dubbing</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-semibold border border-slate-700">
            ← Hub
          </Link>
          <button onClick={() => alert("Exporting 4K Master Video...")} className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs shadow-lg cursor-pointer">
            Export 4K Video 🚀
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Live Cinema Preview Player */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">Live 9:16 / 16:9 Cinema Player Preview</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[9px] text-cyan-300 font-mono font-bold">⚡ CINEFLOW AI</span>
          </div>
          <div className="w-full aspect-video rounded-2xl bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden shadow-inner">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800" alt="" className="w-full h-full object-cover opacity-70"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-cyan-500/90 backdrop-blur-md flex items-center justify-center text-black font-bold text-xl shadow-xl">▶</div>
            </div>
          </div>
        </div>

        {/* Multi-Track Timeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-cyan-400 uppercase">Multi-Track Timeline</span>
            <button onClick={() => alert("AUTO Timeline Optimized!")} className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">⚡ AUTO SYNC</button>
          </div>

          <div className="space-y-2 text-xs">
            {/* Video Track */}
            <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              <span className="w-16 text-slate-400 font-semibold">🎥 Video</span>
              <div className="flex gap-2 overflow-x-auto">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => setActiveScene(s)} className={`px-3 py-1.5 rounded-xl border text-xs cursor-pointer ${activeScene === s ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
                    Scene {s} (0:00 - 0:10)
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Track */}
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              <span className="w-16 text-slate-400 font-semibold">🎙️ Voice</span>
              <span className="text-cyan-300 font-medium truncate">{voiceProfile}</span>
              <span className="text-[10px] text-purple-400 font-mono">1.5s Pause Locked</span>
            </div>

            {/* Subtitles Track */}
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
              <span className="w-16 text-slate-400 font-semibold">📝 Subs</span>
              <span className="text-green-400 font-medium">{subsState}</span>
            </div>
          </div>
        </div>

        {/* Inspector Panel for Active Scene */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-cyan-400 uppercase">Inspector: Scene {activeScene}</span>
            <button onClick={() => setVoiceProfile("AUTO Shuddh Hindi (Deep Calm)")} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">⚡ AUTO VOICE</button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Voiceover Dialog Text (10-13 Words / Scene)</label>
              <textarea rows={2} value={dialogText} onChange={(e) => setDialogText(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 text-xs text-white"/>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Watermark Setup</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["TOP RIGHT", "TOP LEFT", "BOTTOM RIGHT", "BOTTOM LEFT"].map(pos => (
                  <button key={pos} onClick={() => setWatermarkPos(pos)} className={`py-2 rounded-xl border text-[11px] font-bold cursor-pointer ${watermarkPos === pos ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button onClick={handleReRender} className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-bold text-xs cursor-pointer shadow">
                ⚡ Re-Render Scene {activeScene}
              </button>
              <button onClick={() => alert("Auto-Dub & Re-Voice pipeline triggered!")} className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs cursor-pointer shadow">
                🎙️ Auto-Dub & Re-Voice
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Right Side Dock */}
      <div className="fixed bottom-4 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1.5 rounded-full shadow-2xl backdrop-blur-lg">
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-sm border border-slate-700 shadow-md" title="Home">🏠</Link>
        <Link href="/character-vault" className="w-9 h-9 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-sm border border-slate-700 shadow-md" title="Vault">👤</Link>
        <Link href="/studio/editor" className="w-9 h-9 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold shadow-lg shadow-cyan-500/30" title="Editor">🎬</Link>
      </div>
    </div>
  );
}
