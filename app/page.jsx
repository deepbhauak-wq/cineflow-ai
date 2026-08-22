"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState("एक योद्धा घने जंगल में मंदिर खोज रहा है।");
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min");
  const [credits, setCredits] = useState(50);
  const [scenes, setScenes] = useState([]);
  const [pipelineState, setPipelineState] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");

  const handleGenerate = () => {
    setPipelineState("generating");
    setTimeout(() => {
      setCredits((c) => c - 10);
      setScenes([
        { id: 1, title: "Scene 1", desc: "योद्धा घने जंगल में आगे बढ़ता है।" },
        { id: 2, title: "Scene 2", desc: "मंदिर का मुख्य द्वार खुलता है।" }
      ]);
      setPipelineState("completed");
    }, 1500);
  };
    if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 text-center space-y-4">
          <h2 className="text-lg font-black text-cyan-400">🎬 CineFlow Pro Login</h2>
          <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 bg-cyan-600 rounded-xl font-bold text-xs uppercase text-white">Enter Studio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-20 max-w-lg mx-auto space-y-4">
      <header className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h1 className="text-xs font-black text-cyan-400 uppercase">CineFlow Pro</h1>
          <span className="text-[10px] text-slate-400">{credits} Credits Left</span>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="text-[10px] bg-red-950 text-red-400 px-3 py-1 rounded font-bold">Logout</button>
      </header>

      <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-2">
        <label className="text-[10px] font-black uppercase text-cyan-400">1. Master Story Input</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2} className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl">
          <label className="text-[10px] font-black uppercase text-cyan-400 block mb-1">2. Aspect Ratio</label>
          <div className="flex gap-1">
            {["16:9", "9:16"].map((r) => (
              <button key={r} onClick={() => setRatio(r)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${ratio === r ? "bg-cyan-950 border border-cyan-500 text-cyan-300" : "bg-[#060a14] text-slate-400"}`}>{r}</button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl">
          <label className="text-[10px] font-black uppercase text-indigo-400 block mb-1">3. Timeline</label>
          <div className="flex gap-1">
            {["3 Min", "30 Min"].map((d) => (
              <button key={d} onClick={() => setDuration(d)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${duration === d ? "bg-indigo-950 border border-indigo-500 text-indigo-300" : "bg-[#060a14] text-slate-400"}`}>{d}</button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleGenerate} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black text-xs uppercase text-white shadow-xl">
        {pipelineState === "generating" ? "⚡ Rendering Video..." : "🚀 Generate Cinema Package"}
      </button>
            {pipelineState === "completed" && (
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <h3 className="text-xs font-black uppercase text-white">🎬 Scene Timeline & Editing</h3>
          {scenes.map((sc) => (
            <div key={sc.id} className="bg-[#0b1222] border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <span className="text-xs font-black text-cyan-400">{sc.title}</span>
              {editingId === sc.id ? (
                <div className="space-y-2">
                  <textarea value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} rows={2} className="w-full bg-[#060a14] p-2 text-xs text-white rounded-xl border border-cyan-500 outline-none" />
                  <div className="flex gap-2">
                    <button onClick={() => { setScenes(scenes.map((s) => (s.id === sc.id ? { ...s, desc: editPrompt } : s))); setEditingId(null); }} className="flex-1 py-1.5 bg-emerald-600 text-white text-[10px] font-black rounded-lg">💾 Save Changes</button>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-slate-300 bg-[#060a14] p-2 rounded-xl border border-slate-800">{sc.desc}</p>
                  <button onClick={() => { setEditingId(sc.id); setEditPrompt(sc.desc); }} className="w-full py-1.5 bg-slate-800 text-slate-200 text-[10px] font-bold rounded-lg">✏️ Edit Prompt</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
