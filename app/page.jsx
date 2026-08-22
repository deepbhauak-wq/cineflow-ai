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
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Vault() {
  const [credits, setCredits] = useState(50);
  const [plan, setPlan] = useState("Free");

  const plans = [
    { id: "Free", price: "₹0", name: "Free Tier", note: "50 Daily Credits" },
    { id: "Starter", price: "₹199", name: "Starter", note: "150 Credits / Mo" },
    { id: "Pro", price: "₹499", name: "Pro", note: "500 Credits / Mo" },
    { id: "Studio", price: "₹999", name: "Master", note: "Unlimited 4K" }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-4 max-w-sm mx-auto space-y-3 text-xs font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h1 className="font-bold text-purple-400">📂 Vault & Plans</h1>
        <Link href="/" className="bg-cyan-900 px-2 py-1 rounded text-cyan-200">Studio 🎬</Link>
      </div>

      <div className="bg-[#0b1222] p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-400 block">Plan: {plan}</span>
          <span className="font-bold text-emerald-400">⚡ Daily Free: {credits}/50</span>
        </div>
        <span className="bg-emerald-950 text-emerald-300 text-[9px] px-2 py-1 rounded border border-emerald-500">No Watermark</span>
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] text-amber-400 font-bold block">💎 4 SUBSCRIPTION PLANS</span>
        <div className="grid grid-cols-2 gap-1.5">
          {plans.map((p) => (
            <button key={p.id} onClick={()=>setPlan(p.id)} className={`p-2 rounded-xl border text-left ${plan===p.id ? "bg-purple-950 border-purple-500" : "bg-[#060a14] border-slate-800"}`}>
              <div className="font-bold text-[10px]">{p.name}</div>
              <div className="text-amber-300 font-bold">{p.price}</div>
              <div className="text-[8px] text-slate-500">{p.note}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] text-cyan-400 font-bold block">🎬 SCENE CONTROLS</span>
        <div className="grid grid-cols-3 gap-1 text-[9px]">
          <button className="p-2 bg-[#0b1222] border border-slate-800 rounded">🖼️ Image</button>
          <button className="p-2 bg-[#0b1222] border border-slate-800 rounded">🎙️ Audio</button>
          <button className="p-2 bg-[#0b1222] border border-slate-800 rounded">🎥 Video</button>
          <button className="p-2 bg-[#0b1222] border border-slate-800 rounded">✨ Anim</button>
          <button className="p-2 bg-[#0b1222] border border-slate-800 rounded">📝 Text</button>
          <button className="p-2 bg-emerald-950 border border-emerald-500 rounded text-emerald-300">⚡ 4K ReRoll</button>
        </div>
      </div>
    </div>
  );
}
