
"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [active, setActive] = useState(true); // AK Ministry Mode
  
  const settings = [
    { label: "Story AI", val: "Auto (Gemini)" }, { label: "Video AI", val: "Veo (Cinema)" },
    { label: "Ratio", val: "16:9 Cinema" }, { label: "Language", val: "Hindi / Eng" },
    { label: "Camera", val: "Tracking 360" }, { label: "Style", val: "Bible Art" }
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-200 font-sans p-4 max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <h1 className="font-black text-sm text-cyan-400 uppercase tracking-widest">CineFlow Pro Studio</h1>
        <div className={`cursor-pointer px-3 py-1 rounded text-[9px] font-bold ${active ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-800'}`} onClick={() => setActive(!active)}>AK MINISTRY: {active ? 'ON' : 'OFF'}</div>
      </div>

      {/* Prompts */}
      <div className="bg-[#0b1222] p-3 rounded-lg border border-slate-800 text-[10px]">
        <label className="text-slate-400 uppercase font-bold">Story Trace</label>
        <textarea className="w-full bg-transparent mt-1 outline-none font-mono" rows="2">प्रभु हनुमान, समुद्री तूफान, दिव्य प्रकाश...</textarea>
      </div>

      {/* Grid Settings */}
      <div className="grid grid-cols-2 gap-2">
        {settings.map(s => (
          <div key={s.label} className="bg-[#0b1222] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[9px] font-bold text-slate-500 uppercase">{s.label}</span>
            <select className="w-full bg-transparent text-[11px] font-bold outline-none cursor-pointer"><option>{s.val}</option><option>Edit</option></select>
          </div>
        ))}
      </div>

      {/* Advanced Pro Tools (Compact) */}
      <div className="flex gap-2 text-[9px] font-bold uppercase text-slate-400">
        <button className="flex-1 p-2 bg-[#0b1222] rounded border border-slate-800">Consistency: ID-01</button>
        <button className="flex-1 p-2 bg-[#0b1222] rounded border border-slate-800">Audio: Cinematic</button>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 py-3 bg-slate-800 rounded-lg text-[11px] font-bold uppercase">Advanced</button>
        <button className="flex-1 py-3 bg-cyan-600 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-cyan-500">🚀 Generate</button>
      </div>
    </div>
  );
}
