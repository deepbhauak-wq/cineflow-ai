"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Studio() {
  const [prompt, setPrompt] = useState("यीशु तूफ़ान के बीच नाव में शिष्यों के साथ हैं।");
  const [ratio, setRatio] = useState("16:9");
  const [timeline, setTimeline] = useState("60 Min");
  const [msg, setMsg] = useState("");

  const run = () => {
    setMsg("🚀 Film Generated & Saved to Vault!");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-4 max-w-sm mx-auto space-y-3 text-xs font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h1 className="font-bold text-cyan-400">🎬 CineFlow AI</h1>
        <Link href="/vault" className="bg-purple-900 px-2 py-1 rounded text-purple-200">Vault 📂</Link>
      </div>

      {msg && <div className="bg-cyan-950 text-cyan-300 p-2 rounded text-center">{msg}</div>}

      <div className="bg-[#0b1222] p-3 rounded-xl border border-slate-800 space-y-2">
        <label className="text-slate-400 text-[10px]">STORY INPUT</label>
        <textarea value={prompt} onChange={(e)=>setPrompt(e.target.value)} rows={2} className="w-full bg-[#060a14] p-2 rounded text-slate-200 border border-slate-800 outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#0b1222] p-2 rounded-xl border border-slate-800">
          <label className="text-slate-400 text-[10px] block mb-1">RATIO</label>
          <select value={ratio} onChange={(e)=>setRatio(e.target.value)} className="w-full bg-[#060a14] p-1.5 rounded text-white outline-none">
            <option>16:9</option><option>9:16</option><option>21:9</option>
          </select>
        </div>
        <div className="bg-[#0b1222] p-2 rounded-xl border border-slate-800">
          <label className="text-slate-400 text-[10px] block mb-1">TIMELINE</label>
          <select value={timeline} onChange={(e)=>setTimeline(e.target.value)} className="w-full bg-[#060a14] p-1.5 rounded text-white outline-none">
            <option>60 Min</option><option>30 Min</option><option>15 Min</option><option>3 Min</option>
          </select>
        </div>
      </div>

      <button onClick={run} className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold uppercase shadow-lg">
        🚀 Generate 4K Film
      </button>
    </div>
  );
}
