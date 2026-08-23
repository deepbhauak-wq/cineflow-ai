"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function StudioEditor() {
  const [activeScene, setActiveScene] = useState(1);
  const [voiceText, setVoiceText] = useState("कबीर अपने परिवार के लिए कुछ बहुत अच्छा करना चाहता था।");
  const [voiceEmotion, setVoiceEmotion] = useState("Cinematic Narration");
  const [voiceSpeed, setVoiceSpeed] = useState("1.0x (Normal)");
  const [bgMusic, setBgMusic] = useState("Epic Orchestral Tension (-22dB)");
  const [transitionEffect, setTransitionEffect] = useState("Cinematic Crossfade");
  const [watermarkPos, setWatermarkPos] = useState("TOP RIGHT");
  const [showLogo, setShowLogo] = useState(true);
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert("🎉 4K Cinematic Masterpiece Rendered & Exported Successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 md:p-8 font-sans pb-28">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-lg shadow-lg">🎞️</div>
          <div>
            <h1 className="text-base sm:text-lg font-bold">Pro Multi-Track AI Studio</h1>
            <p className="text-[11px] text-slate-400">Scene Swaps • Voice Tuning • Auto-Dubbing • 4K Export</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/" className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
            ← Hub
          </Link>
          <button onClick={handleExport} className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-black shadow-lg shadow-cyan-500/30 cursor-pointer">
            {exporting ? "Rendering 4K..." : "Export 4K Video 🚀"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* Live Cinema Player Preview */}
        <div className="bg-black border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative aspect-video flex flex-col items-center justify-center">
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-slate-700 text-[10px] text-cyan-400 font-mono">
            CINEFLOW AI 4K HDR
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl">▶️</span>
            <p className="text-xs font-semibold text-slate-300">Live 16:9 / 9:16 Cinema Preview Player</p>
            <p className="text-[10px] text-slate-500">Active Scene {activeScene} Loaded with Audio & BGM Mix</p>
          </div>
        </div>

        {/* Multi-Track Timeline */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Multi-Track Pro Timeline</label>
            <span className="text-[10px] text-slate-400">Total Duration: 0:30s (3 Scenes)</span>
          </div>

          <div className="space-y-2">
            {/* Video Track */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-slate-400 font-mono w-14 shrink-0">🎬 Video</span>
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveScene(s)}
                  className={`px-4 py-2 rounded-xl border text-xs font-medium whitespace-nowrap transition ${
                    activeScene === s ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500" : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  Scene {s} (0:10s)
                </button>
              ))}
            </div>

            {/* Voice Track */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono w-14 shrink-0">🎙️ Voice</span>
              <div className="flex-1 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-purple-300 flex items-center justify-between">
                <span>ElevenLabs Shuddh Hindi ({voiceEmotion})</span>
                <span className="text-[10px] bg-purple-950/60 px-2 py-0.5 rounded text-purple-200">{voiceSpeed}</span>
              </div>
            </div>

            {/* BGM Track */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono w-14 shrink-0">🎵 BGM</span>
              <div className="flex-1 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-cyan-300 flex items-center justify-between">
                <span>{bgMusic}</span>
                <span className="text-[10px] text-slate-400">Ducking Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* PRO INSPECTOR: ACTIVE SCENE SETTINGS */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Inspector: Scene {activeScene} Settings</h2>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded">Pro Engine Active</span>
          </div>

          {/* Voice Dialog Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-400 block">Voiceover Dialog Text (Shuddh Hindi / Auto-Dub)</label>
            <textarea
              rows={2}
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Voice Tuning Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Voice Emotion / Tone</label>
              <select value={voiceEmotion} onChange={(e) => setVoiceEmotion(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                <option value="Cinematic Narration">Cinematic Narration (Deep Calm)</option>
                <option value="Emotional & Dramatic">Emotional & Dramatic</option>
                <option value="Energetic Trailer">Energetic Trailer</option>
                <option value="Soft Storytelling">Soft Storytelling</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Speech Speed</label>
              <select value={voiceSpeed} onChange={(e) => setVoiceSpeed(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                <option value="0.9x (Slow Cinematic)">0.9x (Slow Cinematic)</option>
                <option value="1.0x (Normal)">1.0x (Normal)</option>
                <option value="1.15x (Fast Pace)">1.15x (Fast Pace)</option>
              </select>
            </div>
          </div>

          {/* BGM & Transitions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Background Music Track</label>
              <select value={bgMusic} onChange={(e) => setBgMusic(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                <option value="Epic Orchestral Tension (-22dB)">Epic Orchestral Tension (-22dB)</option>
                <option value="Emotional Flute Melody (-20dB)">Emotional Flute Melody (-20dB)</option>
                <option value="Dark Cyberpunk Synth (-25dB)">Dark Cyberpunk Synth (-25dB)</option>
                <option value="No BGM (Voice Only)">No BGM (Voice Only)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Scene Transition Effect</label>
              <select value={transitionEffect} onChange={(e) => setTransitionEffect(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                <option value="Cinematic Crossfade">Cinematic Crossfade</option>
                <option value="Smooth Zoom In">Smooth Zoom In</option>
                <option value="Glitch Cut">Glitch Cut</option>
                <option value="Hard Cut">Hard Cut</option>
              </select>
            </div>
          </div>

          {/* Watermark Setup */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-[11px] text-slate-400 font-medium">Brand Watermark / Logo Overlay</label>
              <input type="checkbox" checked={showLogo} onChange={() => setShowLogo(!showLogo)} className="w-4 h-4 accent-cyan-500 cursor-pointer"/>
            </div>
            {showLogo && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["TOP RIGHT", "TOP LEFT", "BOTTOM RIGHT", "BOTTOM LEFT"].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setWatermarkPos(pos)}
                    className={`py-2 rounded-xl border text-[11px] font-semibold transition ${
                      watermarkPos === pos ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-xs text-cyan-300 transition">
              ⚡ Re-Render Scene {activeScene} (AI Veo)
            </button>
            <button className="py-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/50 font-semibold text-xs text-purple-200 transition">
              🎙️ Auto-Dub & Re-Voice Audio
            </button>
          </div>

        </div>

      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="bg-slate-900/95 border border-slate-700 rounded-full px-5 py-2 shadow-2xl flex items-center gap-6 pointer-events-auto">
          <Link href="/character-vault" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 text-xs">
            ←
          </Link>
          <span className="text-xs text-slate-400 font-medium">Editor Suite</span>
          <Link href="/" className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold">
            🏠
          </Link>
        </div>
      </div>

    </div>
  );
            }
            
