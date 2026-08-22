"use client";
import React, { useState } from "react";

export default function CineFlowMiniStudio() {
  const [bgPrompt, setBgPrompt] = useState("पृष्ठभूमि: शांत दृश्य, समुद्री तूफान, 4K रियलिस्टिक स्टाइल।");
  const [activePrompt, setActivePrompt] = useState("प्रभु हनुमान शांत मुद्रा में, दिव्य प्रकाश के साथ।");

  return (
    <div className="min-h-screen bg-[#060911] text-slate-200 font-sans p-4 max-w-xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <span className="text-sm font-black text-cyan-400 tracking-wider uppercase">CineFlow Pro</span>
        <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">LIVE</span>
      </div>

      {/* 1. Background Engine Prompt (Read/Sync) */}
      <div className="bg-[#0b1222] p-3 rounded-lg border border-slate-800 space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
          <span>⚙️ Background Story Trace</span>
          <span className="text-cyan-400">Sync ON</span>
        </div>
        <textarea
          value={bgPrompt}
          onChange={(e) => setBgPrompt(e.target.value)}
          className="w-full bg-[#060a14] border border-slate-800 rounded p-2 text-xs text-slate-300 outline-none resize-none font-mono"
          rows={2}
        />
      </div>

      {/* 2. Active Scene Prompt (Read/Edit) */}
      <div className="bg-[#0b1222] p-3 rounded-lg border border-cyan-500/30 space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-cyan-400 uppercase">
          <span>🎬 Active Scene Prompt</span>
          <span className="text-slate-400">Shot 01/360</span>
        </div>
        <textarea
          value={activePrompt}
          onChange={(e) => setActivePrompt(e.target.value)}
          className="w-full bg-[#060a14] border border-slate-700 rounded p-2 text-xs text-white outline-none resize-none"
          rows={2}
        />
      </div>

      {/* 3. Compact Settings Grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Story AI", val: "Auto (GPT/Gemini)" },
          { label: "Video Model", val: "Veo Cinema HD" },
          { label: "Ratio", val: "16:9 Cinema" },
          { label: "Voice Engine", val: "Deep Hindi TTS" }
        ].map((item) => (
          <div key={item.label} className="bg-[#0b1222] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">{item.label}</span>
            <select className="w-full bg-transparent text-xs font-semibold text-slate-200 outline-none cursor-pointer">
              <option>{item.val}</option>
              <option>Custom</option>
            </select>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-md active:scale-[0.99] transition-all">
        ⚡ Render Video Scene
      </button>
    </div>
  );
}
