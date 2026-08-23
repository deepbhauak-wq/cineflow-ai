"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function VideoEditor() {
  const [selectedScene, setSelectedScene] = useState(1);
  const [watermarkPos, setWatermarkPos] = useState("top-right");
  const [showWatermark, setShowWatermark] = useState(true);

  const scenes = [
    { id: 1, time: "0:00 - 0:10", text: "कबीर अपने परिवार के लिए कुछ बहुत अच्छा करना चाहता था।" },
    { id: 2, time: "0:10 - 0:20", text: "लेकिन हर कदम पर मन में असफलता का भारी डर उठता था।" },
    { id: 3, time: "0:20 - 0:30", text: "एक दिन एक बड़ा अवसर मिला, पर वह डरकर पीछे हटने लगा।" },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 md:p-8 font-sans">
      {/* Top Bar Navigation */}
      <div className="max-w-7xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xl">
            🎞️
          </div>
          <div>
            <h1 className="text-lg font-bold">Multi-Track AI Studio Editor</h1>
            <p className="text-xs text-slate-400">Scene Swaps • Voice Tuning • Auto-Dubbing</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs hover:bg-slate-800 transition">
            ← Hub
          </Link>
          <Link href="/studio/export" className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-xs shadow-lg shadow-cyan-500/20">
            Export 4K Video →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Video Player & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video bg-black rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-2xl">
            <p className="text-slate-500 text-sm">Live 9:16 / 16:9 Cinema Player Preview</p>
            
            {showWatermark && (
              <div className={`absolute ${watermarkPos === "top-right" ? "top-4 right-4" : watermarkPos === "top-left" ? "top-4 left-4" : watermarkPos === "bottom-right" ? "bottom-4 right-4" : "bottom-4 left-4"} px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-md border border-cyan-500/30 text-[10px] text-cyan-400 font-mono tracking-widest pointer-events-none`}>
                CINEFLOW AI
              </div>
            )}
          </div>

          {/* 3-Track Timeline Panel */}
          <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Multi-Track Timeline</h2>
            
            {/* Track 1: Video Scenes */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-cyan-400 w-16">🎬 Video</span>
              <div className="flex-1 flex gap-2 overflow-x-auto pb-1">
                {scenes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedScene(s.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-medium whitespace-nowrap transition ${
                      selectedScene === s.id ? "bg-cyan-500/20 border-cyan-500 text-white" : "bg-[#141b2d] border-slate-800 text-slate-400"
                    }`}
                  >
                    Scene {s.id} ({s.time})
                  </button>
                ))}
              </div>
            </div>

            {/* Track 2: Voice Track */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-purple-400 w-16">🎙️ Voice</span>
              <div className="flex-1 bg-[#141b2d] border border-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-300">
                <span>ElevenLabs Shuddh Hindi (Deep Calm Tone)</span>
                <span className="text-[10px] text-purple-400 font-mono">1.5s Pause Locked</span>
              </div>
            </div>

            {/* Track 3: Subtitles Track */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-amber-400 w-16">📝 Subs</span>
              <div className="flex-1 bg-[#141b2d] border border-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-300">
                <span>Animated Dynamic Pop Highlights</span>
                <span className="text-[10px] text-amber-400 font-mono">ON</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Inspector & Scene Controls */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-5 space-y-6">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
            Inspector: Scene {selectedScene}
          </h2>

          <div>
            <label className="text-xs text-slate-400 block mb-2">Voiceover Dialog Text</label>
            <textarea
              rows={3}
              value={scenes[selectedScene - 1]?.text || ""}
              readOnly
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl p-3 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs text-slate-400 block">Watermark Setup</label>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141b2d] border border-slate-800">
              <span className="text-xs">Show Brand Logo</span>
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={() => setShowWatermark(!showWatermark)}
                className="w-4 h-4 accent-cyan-500 cursor-pointer"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {["top-right", "top-left", "bottom-right", "bottom-left"].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setWatermarkPos(pos)}
                  className={`py-2 text-[11px] rounded-lg border uppercase transition ${
                    watermarkPos === pos ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-[#141b2d] border-slate-800 text-slate-400"
                  }`}
                >
                  {pos.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <button className="w-full py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-medium hover:bg-purple-600/30">
              ⚡ Re-Render Scene {selectedScene}
            </button>
            <button className="w-full py-2.5 rounded-xl bg-[#141b2d] border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-800">
              🎙️ Auto-Dub & Re-Voice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
      }

