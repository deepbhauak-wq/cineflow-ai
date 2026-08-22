"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState("एक योद्धा घने जंगल में मंदिर की खोज कर रहा है।");
  const [scenes, setScenes] = useState([]);
  const [pipelineState, setPipelineState] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const notify = (msg) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(""), 3000); };

  const handleGenerate = () => {
    setPipelineState("generating");
    notify("🚀 रेंडरिंग शुरू...");
    setTimeout(() => {
      setScenes([
        { id: 1, title: "Scene 1", desc: "योद्धा जंगल में प्रवेश करता है।", status: "Ready" },
        { id: 2, title: "Scene 2", desc: "मंदिर का मुख्य द्वार खुलता है।", status: "Ready" }
      ]);
      setPipelineState("completed");
      notify("✅ रेंडर पूरा हुआ!");
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 text-center space-y-4">
          <h2 className="text-xl font-black">Studio Login</h2>
          <input type="email" placeholder="Email" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
          <input type="password" placeholder="Password" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
          <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 bg-cyan-600 rounded-xl font-bold text-xs uppercase">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xs font-black text-cyan-400">CINEFLOW PRO</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-[10px] bg-red-950 px-3 py-1 rounded">Logout</button>
      </header>

      {statusMsg && <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-cyan-950 px-4 py-2 rounded-full text-[10px] font-bold text-cyan-300 z-50">{statusMsg}</div>}

      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-[#0b1222] border border-slate-800 p-3 rounded-xl text-xs" rows={3} />
      <button onClick={handleGenerate} className="w-full py-3 bg-cyan-600 rounded-xl font-black text-xs uppercase my-4">Generate Package</button>

      {pipelineState === "completed" && (
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase">Generated Scenes</h3>
          {scenes.map(sc => (
            <div key={sc.id} className="bg-[#0b1222] border border-slate-800 p-4 rounded-xl space-y-2">
              <p className="text-xs font-bold text-cyan-400">{sc.title}</p>
              {editingId === sc.id ? (
                <div className="space-y-2">
                  <textarea value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} className="w-full bg-[#060a14] p-2 text-xs rounded border border-cyan-500" />
                  <button onClick={() => { setScenes(scenes.map(s => s.id === sc.id ? {...s, desc: editPrompt} : s)); setEditingId(null); notify("Saved!"); }} className="w-full py-2 bg-emerald-600 text-[10px] font-bold rounded">SAVE</button>
                </div>
              ) : (
                <>
                  <p className="text-[11px] text-slate-300">{sc.desc}</p>
                  <button onClick={() => { setEditingId(sc.id); setEditPrompt(sc.desc); }} className="w-full py-2 bg-slate-800 text-[10px] font-bold rounded">✏️ EDIT PROMPT</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
