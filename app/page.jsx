"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [prompt, setPrompt] = useState("प्रभु हनुमान शांत दृश्य में, चारों ओर समुद्री तूफान...");
  
  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans p-6">
      <header className="flex justify-between items-center mb-10">
        <div className="text-xl font-bold">CineFlow <span className="text-cyan-400">AI</span></div>
        <div className="text-xs bg-cyan-950 text-cyan-400 px-3 py-1 rounded-full border border-cyan-800">PRO ACTIVE</div>
      </header>

      <main className="max-w-3xl mx-auto space-y-6">
        <div className="bg-[#0b1222] p-5 rounded-xl border border-slate-800">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Master Prompt</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-transparent p-2 text-sm outline-none" rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select className="bg-[#0b1222] border border-slate-800 p-3 rounded-lg text-xs font-bold text-slate-300">
            <option>Story: Auto</option><option>GPT-5.6</option>
          </select>
          <select className="bg-[#0b1222] border border-slate-800 p-3 rounded-lg text-xs font-bold text-slate-300">
            <option>Video: Veo</option><option>Kling 1.5</option>
          </select>
        </div>

        <button className="w-full py-4 bg-cyan-600 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-cyan-500">
          🚀 Generate Video Engine Package
        </button>
      </main>
    </div>
  );
}
