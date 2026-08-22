
"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [bg, setBg] = useState("स्टोरी का बैकग्राउंड: समुद्री तूफान, दिव्य प्रकाश...");
  const [scene, setScene] = useState("दृश्य: प्रभु हनुमान शांति से प्रार्थना कर रहे हैं।");

  return (
    <div className="min-h-screen bg-[#060911] text-slate-200 font-sans p-4 max-w-xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <h1 className="font-black text-xs text-cyan-400 uppercase tracking-widest">CineFlow Pro Studio</h1>
        <div className="text-[9px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">AK MINISTRY: ON</div>
      </div>

      {/* Prompts (The core) */}
      <div className="bg-[#0b1222] p-3 rounded-lg border border-slate-800 space-y-2">
        <textarea value={bg} onChange={(e) => setBg(e.target.value)} className="w-full bg-[#060a14] border border-slate-800 rounded p-2 text-[10px] text-slate-400 outline-none" rows="2" />
        <textarea value={scene} onChange={(e) => setScene(e.target.value)} className="w-full bg-[#060a14] border border-cyan-500/30 rounded p-2 text-[10px] text-white outline-none" rows="2" />
      </div>

      {/* Settings Grid (Clean & Simple) */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { l: "Story AI", v: "Auto (GPT)" }, { l: "Video AI", v: "Veo Cinema" },
          { l: "Aspect", v: "16:9 Cinema" }, { l: "Style", v: "Bible Art" },
          { l: "Duration", v: "60 Minutes" }, { l: "Language", v: "Hindi/Eng" }
        ].map(item => (
          <div key={item.l} className="bg-[#0b1222] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[8px] font-bold text-slate-500 uppercase block">{item.l}</span>
            <select className="w-full bg-transparent text-[10px] font-bold outline-none cursor-pointer text-white">
              <option>{item.v}</option>
              <option>Custom</option>
            </select>
          </div>
        ))}
      </div>

      {/* Generate */}
      <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-lg font-black text-[11px] uppercase tracking-widest hover:scale-[1.01] transition-all shadow-lg shadow-cyan-900/20">
        🚀 Generate Cinematic Movie
      </button>
    </div>
  );
}
