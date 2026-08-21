"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [prompt, setPrompt] = useState("प्रभु हनुमान शांत दृश्य में, चारों ओर समुद्री तूफान...");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("60m");
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const plans = [
    { id: "starter", name: "Starter", price: "$19", credits: "300 / mo", features: ["720p Output", "Basic Sync"] },
    { id: "pro", name: "Pro Studio", price: "$49", credits: "1,500 / mo", features: ["4K Engine", "Full Multimodal"], popular: true },
    { id: "studio", name: "Master", price: "$99", credits: "Unlimited", features: ["60m Movies", "Hindi TTS"] },
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans pb-24">
      <header className="border-b border-slate-800 bg-[#090f1d] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center font-bold">CF</div><span className="text-lg font-bold">CineFlow <span className="text-cyan-400">AI</span></span></div>
      </header>
      <main className="max-w-4xl mx-auto px-4 pt-10 space-y-8">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-[#0b1222] border border-slate-700 rounded-lg p-4 text-sm" rows={3} />
        <div className="bg-[#0b1222] p-6 rounded-xl border border-slate-700 grid grid-cols-2 gap-4">
          <div className="flex gap-2">{["16:9","9:16","1:1"].map(r => <button key={r} onClick={() => setAspectRatio(r)} className={`flex-1 py-2 text-xs font-bold rounded border ${aspectRatio === r ? 'bg-cyan-600' : 'border-slate-700'}`}>{r}</button>)}</div>
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="bg-[#060a14] border border-slate-700 rounded p-2 text-xs font-bold w-full"><option value="60m">60 Minutes</option><option value="1m">1 Minute</option></select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(p => (
            <div key={p.id} onClick={() => setSelectedPlan(p.id)} className={`p-6 rounded-xl border cursor-pointer ${selectedPlan === p.id ? 'bg-[#0f172a] border-cyan-600' : 'bg-[#0b1222] border-slate-800'}`}>
              {p.popular && <div className="text-[10px] text-cyan-400 font-black">RECOMMENDED</div>}
              <h4 className="font-bold">{p.name}</h4><div className="text-2xl font-black my-2">{p.price}</div>
              <ul className="text-[11px] text-slate-400 mb-4">{p.features.map(f => <li key={f}>✓ {f}</li>)}</ul>
              <button className={`w-full py-2 text-xs font-bold rounded ${selectedPlan === p.id ? 'bg-cyan-600' : 'bg-slate-800'}`}>Select</button>
            </div>
          ))}
        </div>
        <button className="w-full py-4 bg-cyan-600 rounded-lg font-black text-sm uppercase">Generate Movie Package</button>
      </main>
    </div>
  );
}
