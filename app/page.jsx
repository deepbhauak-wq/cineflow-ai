"use client";

import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [prompt, setPrompt] = useState("यीशु तूफान के बीच नाव में शिष्यों के साथ हैं।");
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("60 Min");
  const [storyModel, setStoryModel] = useState("Auto");
  const [videoModel, setVideoModel] = useState("Veo");
  const [style, setStyle] = useState("Bible Art");

  const styles = [
    { n: "Bible Art", i: "📜" }, { n: "Cinematic Epic", i: "⚔️" },
    { n: "Realistic 8K", i: "📸" }, { n: "Historical", i: "🏛️" },
    { n: "Cyberpunk", i: "🤖" }, { n: "3D Animation", i: "🧊" },
    { n: "Anime", i: "✨" }, { n: "Documentary", i: "🎥" },
    { n: "2D Illustration", i: "🎨" }, { n: "Custom Style", i: "⚙️" }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-10">
      {/* Header */}
      <header className="px-5 py-4 border-b border-slate-800 bg-[#090f1d] sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">🎬</div>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-wider">CineFlow Pro</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase">Autonomous Cinema Engine</p>
          </div>
        </div>
        <div className="text-[9px] bg-amber-950 text-amber-400 px-2 py-1 rounded border border-amber-800 font-black tracking-widest">AK MINISTRY: ON</div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        
        {/* 1. Master Story */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[9px] font-black uppercase text-cyan-500 flex items-center gap-2">🎛️ 1. Master Story Input</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-cyan-500 resize-none" />
        </div>

        {/* 2. Aspect Ratio */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-[9px] font-black uppercase text-cyan-500 flex items-center gap-2">📺 2. Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-2">
            {["16:9", "9:16", "21:9", "4:3", "1:1", "Auto"].map((r) => (
              <button key={r} onClick={() => setRatio(r)} className={`p-2 rounded-lg border text-xs font-bold transition-all ${ratio === r ? 'bg-cyan-950 border-cyan-500 text-white' : 'bg-[#060a14] border-slate-800 text-slate-500'}`}>{r}</button>
            ))}
          </div>
        </div>

        {/* 3. Timeline */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-[9px] font-black uppercase text-cyan-500 flex items-center gap-2">📚 3. Timeline Mode</label>
          <div className="grid grid-cols-3 gap-2">
            {["3 Min", "15 Min", "20 Min", "30 Min", "60 Min", "Custom"].map((d) => (
              <button key={d} onClick={() => setDuration(d)} className={`p-2 rounded-lg border text-xs font-bold transition-all ${duration === d ? 'bg-indigo-950 border-indigo-500 text-white' : 'bg-[#060a14] border-slate-800 text-slate-500'}`}>{d}</button>
            ))}
          </div>
        </div>

        {/* 4 & 5. Models */}
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
                <label className="text-[9px] font-black uppercase text-purple-400">🧠 4. Story AI</label>
                <select value={storyModel} onChange={(e) => setStoryModel(e.target.value)} className="w-full bg-transparent text-xs font-bold outline-none cursor-pointer">
                    {["Auto", "GPT", "Gemini", "Claude"].map(m => <option key={m}>{m}</option>)}
                </select>
            </div>
            <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
                <label className="text-[9px] font-black uppercase text-cyan-400">📹 5. Video AI</label>
                <select value={videoModel} onChange={(e) => setVideoModel(e.target.value)} className="w-full bg-transparent text-xs font-bold outline-none cursor-pointer">
                    {["Veo", "Kling", "Runway", "Hailuo"].map(v => <option key={v}>{v}</option>)}
                </select>
            </div>
        </div>

        {/* 6. Visual Atmosphere (Decorated) */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-[9px] font-black uppercase text-amber-500 flex items-center gap-2">🎞️ 6. Visual Atmosphere & Style</label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map((st) => (
              <button key={st.n} onClick={() => setStyle(st.n)} className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${style === st.n ? 'bg-[#1f1910] border-amber-500 text-amber-200' : 'bg-[#060a14] border-slate-800 text-slate-400'}`}>
                <span className="text-base">{st.i}</span> {st.n}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-lg shadow-cyan-900/20 active:scale-[0.99] transition-all cursor-pointer">
          🚀 Generate Cinema Video Package
        </button>
      </main>
    </div>
  );
}
