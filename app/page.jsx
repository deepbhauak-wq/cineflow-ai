"use client";
import React, { useState, useEffect } from "react";

export default function CineFlowStudio() {
  const [mounted, setMounted] = useState(false);
  const [auth, setAuth] = useState(true);
  const [tab, setTab] = useState("studio");

  // Post-Production Suite Controls
  const [prompt, setPrompt] = useState("एक योद्धा प्राचीन मंदिर की खोज में है।");
  const [cam, setCam] = useState("JCB Crane / Jib");
  const [lut, setLut] = useState("Teal & Orange");
  const [ratio, setRatio] = useState("16:9");
  const [credits, setCredits] = useState(50);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Scenes & Vault State
  const [scenes, setScenes] = useState([]);
  const [vault, setVault] = useState([]);
  const [activeProj, setActiveProj] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      const data = JSON.parse(localStorage.getItem("cf_pro_vault") || "[]");
      setVault(data);
      if (data.length > 0) setActiveProj(data[0]);
    } catch (e) {
      setVault([]);
    }
  }, []);

  const toast = (txt) => {
    setMsg(txt);
    setTimeout(() => setMsg(""), 2000);
  };

  const handleGenerate = () => {
    if (credits < 10) return toast("⚠️ Credits Low!");
    setLoading(true);
    toast("🚀 4K Render Engine Active...");

    setTimeout(() => {
      const scList = [
        {
          id: 1,
          title: "Scene 01: Establishing Shot",
          desc: prompt,
          cam: cam,
          lut: lut,
          voice: "तूफान गहराता जा रहा था...",
          audio: "Stereo 3D Ambience",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80"
        },
        {
          id: 2,
          title: "Scene 02: Cinematic Reveal",
          desc: "मंदिर के प्राचीन द्वार खुले और स्वर्ण प्रकाश फैला।",
          cam: "FPV Tracking Drone",
          lut: lut,
          voice: "रहस्य अब सामने था...",
          audio: "Epic 5.1 Surround",
          img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80"
        }
      ];

      setCredits((c) => c - 10);
      setScenes(scList);

      const newProj = {
        id: Date.now(),
        name: prompt.slice(0, 20),
        lut: lut,
        scenes: scList
      };

      const updated = [newProj, ...vault];
      setVault(updated);
      setActiveProj(newProj);
      localStorage.setItem("cf_pro_vault", JSON.stringify(updated));

      setLoading(false);
      toast("✅ Post-Production Complete!");
    }, 1000);
  };

  const saveEdit = (id) => {
    const update = (list) => list.map((s) => (s.id === id ? { ...s, desc: editPrompt } : s));
    setScenes(update(scenes));
    if (activeProj) {
      const updatedProj = { ...activeProj, scenes: update(activeProj.scenes) };
      const updatedVault = vault.map((v) => (v.id === activeProj.id ? updatedProj : v));
      setActiveProj(updatedProj);
      setVault(updatedVault);
      localStorage.setItem("cf_pro_vault", JSON.stringify(updatedVault));
    }
    setEditId(null);
    toast("✅ Scene Updated!");
  };

  if (!mounted) return null;

  if (!auth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 text-xs font-sans">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-3 w-full max-w-xs shadow-2xl">
          <div className="text-3xl">🎬</div>
          <h2 className="font-bold text-cyan-400 uppercase">CineFlow Pro Studio</h2>
          <button onClick={() => setAuth(true)} className="w-full py-2 bg-cyan-600 rounded-lg font-bold text-white uppercase">
            Enter Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 p-4 pb-20 max-w-md mx-auto space-y-3 text-xs font-sans">
      {/* Pro Header */}
      <header className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div>
          <h1 className="font-black text-cyan-400 uppercase tracking-wider">CineFlow Pro</h1>
          <span className="text-[9px] text-emerald-400 font-bold">{credits} Credits Active</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setTab("studio")} className={`px-2.5 py-1 rounded font-bold ${tab === "studio" ? "bg-cyan-600 text-white" : "bg-slate-900 text-slate-400"}`}>
            Studio
          </button>
          <button onClick={() => setTab("vault")} className={`px-2.5 py-1 rounded font-bold ${tab === "vault" ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400"}`}>
            Vault ({vault.length})
          </button>
          <button onClick={() => setAuth(false)} className="bg-red-950 text-red-400 px-2 py-1 rounded font-bold">
            Exit
          </button>
        </div>
      </header>

      {msg && <div className="bg-cyan-950 border border-cyan-500 text-cyan-300 p-2 rounded text-center font-bold">{msg}</div>}

      {/* STUDIO PANEL */}
      {tab === "studio" && (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="font-bold text-cyan-400 uppercase block">1. Storyline & Prompt</span>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              className="w-full bg-black p-2 rounded border border-slate-700 outline-none text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl space-y-1">
              <span className="font-bold text-amber-400 block">Camera Motion</span>
              <div className="grid grid-cols-2 gap-1">
                {["JCB Crane / Jib", "FPV Drone", "Dolly Zoom", "360 Orbit"].map((c) => (
                  <button key={c} onClick={() => setCam(c)} className={`p-1 rounded text-[9px] font-bold truncate ${cam === c ? "bg-amber-600 text-white" : "bg-black text-slate-400"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl space-y-1">
              <span className="font-bold text-purple-400 block">Color LUTs</span>
              <div className="grid grid-cols-2 gap-1">
                {["Teal & Orange", "Dark Noir", "Cyberpunk", "Warm Gold"].map((l) => (
                  <button key={l} onClick={() => setLut(l)} className={`p-1 rounded text-[9px] font-bold truncate ${lut === l ? "bg-purple-600 text-white" : "bg-black text-slate-400"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl flex justify-between items-center">
            <span className="font-bold text-slate-400">Aspect Ratio:</span>
            <div className="flex gap-1">
              {["16:9", "9:16"].map((r) => (
                <button key={r} onClick={() => setRatio(r)} className={`px-2 py-0.5 rounded font-bold ${ratio === r ? "bg-cyan-600 text-white" : "bg-black text-slate-400"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGenerate} disabled={loading} className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold uppercase text-white shadow-lg">
            {loading ? "⚡ Processing 4K Master..." : "🚀 Render Full Cinema Package"}
          </button>

          {scenes.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="font-bold uppercase text-white block">🎬 Master Scene Suite</span>
              {scenes.map((sc) => (
                <div key={sc.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden space-y-2 pb-2">
                  <div className="relative h-28 bg-black">
                    <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[8px] font-bold text-cyan-300">{sc.title}</span>
                    <span className="absolute top-1 right-1 bg-black/80 px-2 py-0.5 rounded text-[8px] text-amber-300">🏗️ {sc.cam} | 🎨 {sc.lut}</span>
                  </div>
                  <div className="p-2 space-y-1.5">
                    {editId === sc.id ? (
                      <div className="space-y-1">
                        <textarea value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} rows={2} className="w-full bg-black p-1.5 rounded border border-cyan-500 text-white outline-none" />
                        <div className="flex gap-1">
                          <button onClick={() => saveEdit(sc.id)} className="flex-1 py-1 bg-emerald-600 font-bold rounded text-white">Save</button>
                          <button onClick={() => setEditId(null)} className="px-2 py-1 bg-slate-800 rounded text-slate-300">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-300">{sc.desc}</p>
                        <p className="text-[10px] text-slate-400">🎙️ "{sc.voice}" | 🎧 {sc.audio}</p>
                        <button onClick={() => { setEditId(sc.id); setEditPrompt(sc.desc); }} className="w-full py-1 bg-slate-800 rounded font-bold text-slate-200">
                          ✏️ Post-Edit Scene
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VAULT PANEL */}
      {tab === "vault" && (
        <div className="space-y-3">
          {vault.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center space-y-2">
              <p className="text-slate-400">वॉल्ट में कोई प्रोजेक्ट नहीं है।</p>
              <button onClick={() => setTab("studio")} className="py-1 px-3 bg-cyan-600 rounded font-bold text-white">
                Studio खोलें
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {vault.map((v) => (
                  <button key={v.id} onClick={() => { setActiveProj(v); setEditId(null); }} className={`p-2 rounded-lg border text-left shrink-0 min-w-[110px] ${activeProj?.id === v.id ? "bg-purple-950 border-purple-500 text-purple-200" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
                    <span className="font-bold truncate block">{v.name}</span>
                    <span className="text-[8px] opacity-70">🎨 {v.lut}</span>
                  </button>
                ))}
              </div>

              {activeProj && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="font-bold text-cyan-400 truncate">{activeProj.name}</span>
                    <button onClick={() => {
                      const updated = vault.filter((v) => v.id !== activeProj.id);
                      setVault(updated);
                      localStorage.setItem("cf_pro_vault", JSON.stringify(updated));
                      setActiveProj(updated[0] || null);
                      toast("🗑️ Deleted!");
                    }} className="bg-red-950 text-red-400 px-2 py-0.5 rounded font-bold">
                      Delete
                    </button>
                  </div>

                  {activeProj.scenes?.map((sc) => (
                    <div key={sc.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden space-y-1.5 pb-2">
                      <div className="relative h-24 bg-black">
                        <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[8px] text-cyan-300 font-bold">{sc.title}</span>
                      </div>
                      <div className="p-2 space-y-1">
                        <p className="text-slate-300">{sc.desc}</p>
                        <p className="text-[10px] text-slate-400">🎙️ "{sc.voice}" | 🎨 {sc.lut}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
                                                                                              }
          
