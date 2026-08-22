
"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [bg, setBg] = useState("पृष्ठभूमि: शांत दृश्य, समुद्री तूफान, 4K स्टाइल।");
  const [scene, setScene] = useState("प्रभु हनुमान, दिव्य प्रकाश के साथ।");

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans p-4 max-w-xl mx-auto space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <h1 className="font-black text-xs text-cyan-400 uppercase tracking-wider">CineFlow Pro</h1>
        <span className="text-[9px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 font-bold">AK MINISTRY: ON</span>
      </div>

      {/* Prompts Section */}
      <div className="bg-[#0b1222] p-3 rounded-lg border border-slate-800 space-y-2">
        <textarea value={bg} onChange={(e) => setBg(e.target.value)} className="w-full bg-[#060a14] border border-slate-800 rounded p-2 text-[10px] text-slate-400 outline-none" rows="2" />
        <textarea value={scene} onChange={(e) => setScene(e.target.value)} className="w-full bg-[#060a14] border border-cyan-500/30 rounded p-2 text-[10px] text-white outline-none" rows="2" />
      </div>

      {/* Compact Settings Grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { l: "Story AI", v: "Auto" }, { l: "Video", v: "Veo" },
          { l: "Ratio", v: "16:9" }, { l: "Style", v: "Bible Art" }
        ].map(item => (
          <div key={item.l} className="bg-[#0b1222] p-2 rounded-lg border border-slate-800">
            <span className="text-[8px] font-bold text-slate-500 uppercase block">{item.l}</span>
            <select className="w-full bg-transparent text-[10px] font-bold outline-none cursor-pointer"><option>{item.v}</option></select>
          </div>
        ))}
      </div>

      {/* Action */}
      <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-lg font-black text-[10px] uppercase tracking-widest hover:scale-[1.01] transition-all">
        🚀 Generate Video Engine Package
      </button>
    </div>
  );
}
