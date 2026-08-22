"use client";
import React, { useState, useEffect } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState("योद्धा जंगल में मंदिर और मशीनों की खोज में है।");
  const [ratio, setRatio] = useState("16:9");
  const [cameraRig, setCameraRig] = useState("JCB Crane");
  const [credits, setCredits] = useState(50);
  const [statusMsg, setStatusMsg] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [editCamera, setEditCamera] = useState("");
  const [editVoice, setEditVoice] = useState("");
  const [scenes, setScenes] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("cf_vault");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setSavedProjects(parsed);
        if (parsed.length > 0) setScenes(parsed[0].scenes || []);
      } catch (e) {}
    }
  }, []);

  const notify = (m) => {
    setStatusMsg(m);
    setTimeout(() => setStatusMsg(""), 2500);
  };
    const handleGenerate = () => {
    if (credits < 10) return notify("⚠️ No credits!");
    notify("🚀 AI Multi-Track Render & Save...");
    setTimeout(() => {
      setCredits((c) => c - 10);
      const scList = [
        { id: 1, title: "Scene 1", desc: "योद्धा घने जंगल में आगे बढ़ता है।", camera: cameraRig, voice: "तूफान गहराता जा रहा था...", bgm: "Epic Drums", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
        { id: 2, title: "Scene 2", desc: "मंदिर का विशाल दरवाजा खुलता है।", camera: "JCB Jib", voice: "द्वार खुलते ही दिव्य प्रकाश फैला...", bgm: "Mystery Horns", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80" }
      ];
      const pObj = { id: Date.now(), name: prompt.slice(0, 18), scenes: scList };
      const updated = [pObj, ...savedProjects];
      setSavedProjects(updated);
      setScenes(scList);
      localStorage.setItem("cf_vault", JSON.stringify(updated));
      notify("✅ Saved to Vault!");
    }, 1200);
  };

  const saveEdit = (id) => {
    const updated = scenes.map((s) => s.id === id ? { ...s, desc: editPrompt, camera: editCamera, voice: editVoice } : s);
    setScenes(updated);
    if (savedProjects.length > 0) {
      const pList = [...savedProjects];
      pList[0].scenes = updated;
      setSavedProjects(pList);
      localStorage.setItem("cf_vault", JSON.stringify(pList));
    }
    setEditingId(null);
    notify(`✅ Scene ${id} Saved!`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-xs bg-[#0b1222] p-6 rounded-2xl border border-slate-800 text-center space-y-4">
          <h2 className="text-sm font-black text-cyan-400 uppercase">🎬 CineFlow Vault</h2>
          <button onClick={() => { setIsLoggedIn(true); notify("Logged in!"); }} className="w-full py-2.5 bg-cyan-600 font-bold text-xs rounded-xl uppercase text-white">Enter Studio</button>
        </div>
      </div>
    );
  }  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-20 max-w-md mx-auto space-y-3 font-sans">
      <header className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div><h1 className="text-xs font-black text-cyan-400">CINEFLOW VAULT</h1><span className="text-[9px] text-emerald-400">{credits} Credits</span></div>
        <button onClick={() => setIsLoggedIn(false)} className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-bold">Logout</button>
      </header>

      {statusMsg && <div className="fixed top-3 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 border border-cyan-500 px-3 py-1 rounded-full text-[10px] font-bold z-50">{statusMsg}</div>}

      {savedProjects.length > 0 && (
        <div className="p-2 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
          <label className="text-[9px] font-bold text-purple-400 uppercase">💾 Saved Vault ({savedProjects.length})</label>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {savedProjects.map((p) => (
              <button key={p.id} onClick={() => { setScenes(p.scenes); notify("Project Loaded!"); }} className="p-1.5 bg-[#060a14] border border-slate-800 rounded-lg text-left shrink-0 text-[10px] text-slate-300">{p.name}...</button>
            ))}
          </div>
        </div>
      )}

      <div className="p-2.5 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[9px] font-bold text-cyan-400 uppercase">1. Master Story</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2} className="w-full bg-[#060a14] p-2 text-xs text-white rounded outline-none border border-slate-800" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-[#0b1222] border border-slate-800 rounded-xl">
          <label className="text-[8px] font-bold text-amber-400 uppercase block mb-1">Camera Rig</label>
          <div className="grid grid-cols-2 gap-1">
            {["JCB Crane", "Drone"].map((c) => (
              <button key={c} onClick={() => setCameraRig(c)} className={`p-1 text-[9px] font-bold rounded ${cameraRig === c ? "bg-amber-950 text-amber-300 border border-amber-500" : "bg-[#060a14]"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="p-2 bg-[#0b1222] border border-slate-800 rounded-xl">
          <label className="text-[8px] font-bold text-cyan-400 uppercase block mb-1">Ratio</label>
          <div className="flex gap-1">
            {["16:9", "9:16"].map((r) => (
              <button key={r} onClick={() => setRatio(r)} className={`flex-1 p-1 text-[9px] font-bold rounded ${ratio === r ? "bg-cyan-950 text-cyan-300 border border-cyan-500" : "bg-[#060a14]"}`}>{r}</button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleGenerate} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-xs uppercase text-white shadow-lg">🚀 Generate & Save Suite</button>

      {scenes.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-[10px] font-black uppercase text-white">🎬 Scene Timeline & Vault</h3>
          {scenes.map((sc) => (
            <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-xl overflow-hidden space-y-2 pb-2.5">
              <div className="relative h-24 w-full bg-slate-900">
                <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                <span className="absolute top-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-cyan-400">{sc.title}</span>
                <span className="absolute top-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] text-amber-300">🏗️ {sc.camera}</span>
              </div>

              <div className="px-2.5 space-y-1.5">
                {editingId === sc.id ? (
                  <div className="space-y-1.5 bg-[#060a14] p-2 rounded-lg border border-cyan-500">
                    <textarea value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} rows={2} className="w-full bg-[#0b1222] p-1.5 text-xs text-white rounded outline-none border border-slate-700" />
                    <div className="flex gap-1">
                      <input type="text" value={editCamera} onChange={(e) => setEditCamera(e.target.value)} placeholder="Camera" className="w-1/2 bg-[#0b1222] p-1 text-[9px] text-white rounded border border-slate-700 outline-none" />
                      <input type="text" value={editVoice} onChange={(e) => setEditVoice(e.target.value)} placeholder="Voice" className="w-1/2 bg-[#0b1222] p-1 text-[9px] text-white rounded border border-slate-700 outline-none" />
                    </div>
                    <div className="flex gap-1 pt-1">
                      <button onClick={() => saveEdit(sc.id)} className="flex-1 py-1 bg-emerald-600 text-[9px] font-bold text-white rounded">💾 Save</button>
                      <button onClick={() => setEditingId(null)} className="px-2 py-1 bg-slate-800 text-[9px] rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] text-slate-300">{sc.desc}</p>
                    <div className="text-[9px] text-slate-400 bg-[#060a14] p-1.5 rounded space-y-0.5">
                      <p>🎙️ {sc.voice}</p>
                      <p>🎵 {sc.bgm}</p>
                    </div>
                    <div className="flex gap-1.5 pt-1">
                      <button onClick={() => notify(`🔄 Scene ${sc.id} Re-Rolled!`)} className="flex-1 py-1 bg-cyan-950 border border-cyan-500 text-cyan-300 text-[9px] font-bold rounded">🔄 Re-Roll</button>
                      <button onClick={() => { setEditingId(sc.id); setEditPrompt(sc.desc); setEditCamera(sc.camera); setEditVoice(sc.voice); }} className="px-3 py-1 bg-slate-800 text-slate-200 text-[9px] font-bold rounded">✏️ Edit</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

