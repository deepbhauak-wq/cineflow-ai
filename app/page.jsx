"use client";
import React, { useState, useEffect } from "react";

export default function CineFlowApp() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("studio");
  const [prompt, setPrompt] = useState("एक योद्धा प्राचीन मंदिर की खोज में है।");
  const [cam, setCam] = useState("JCB Crane / Jib");
  const [scenes, setScenes] = useState([]);
  const [vault, setVault] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      setVault(JSON.parse(localStorage.getItem("cf_v") || "[]"));
    } catch (e) {
      setVault([]);
    }
  }, []);

  const toast = (t) => {
    setMsg(t);
    setTimeout(() => setMsg(""), 2000);
  };

  const handleGen = () => {
    setLoading(true);
    toast("🚀 4K Render Engine Active...");
    setTimeout(() => {
      const newSc = [
        {
          id: 1,
          title: "Scene 1: Shot",
          desc: prompt,
          cam: cam,
          voice: "तूफान गहराता जा रहा था...",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80"
        }
      ];
      setScenes(newSc);
      const item = { id: Date.now(), name: prompt.slice(0, 18), cam, date: new Date().toLocaleDateString() };
      const updated = [item, ...vault];
      setVault(updated);
      localStorage.setItem("cf_v", JSON.stringify(updated));
      setLoading(false);
      toast("✅ Package Ready & Saved!");
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-slate-100 p-4 max-w-sm mx-auto space-y-3 text-xs font-sans">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h1 className="font-bold text-cyan-400 uppercase">CineFlow Pro</h1>
        <div className="flex gap-1">
          <button onClick={() => setTab("studio")} className={`px-3 py-1 rounded font-bold ${tab === "studio" ? "bg-cyan-600 text-white" : "bg-slate-900 text-slate-400"}`}>
            Studio
          </button>
          <button onClick={() => setTab("vault")} className={`px-3 py-1 rounded font-bold ${tab === "vault" ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400"}`}>
            Vault ({vault.length})
          </button>
        </div>
      </div>

      {msg && <div className="bg-cyan-950 border border-cyan-500 text-cyan-300 p-2 rounded text-center font-bold">{msg}</div>}

      {tab === "studio" && (
        <div className="space-y-3">
          <div className="bg-slate-900 p-3 rounded-xl space-y-1">
            <span className="font-bold text-cyan-400 block">Storyline</span>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2} className="w-full bg-black p-2 rounded border border-slate-700 text-white outline-none" />
          </div>

          <div className="bg-slate-900 p-2 rounded-xl space-y-1">
            <span className="font-bold text-amber-400 block">Camera Rig</span>
            <div className="grid grid-cols-2 gap-1">
              {["JCB Crane / Jib", "FPV Drone"].map((c) => (
                <button key={c} onClick={() => setCam(c)} className={`p-1.5 rounded font-bold ${cam === c ? "bg-amber-600 text-white" : "bg-black text-slate-400"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGen} disabled={loading} className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold uppercase text-white">
            {loading ? "⚡ Rendering..." : "🚀 Render Package"}
          </button>

          {scenes.map((sc) => (
            <div key={sc.id} className="bg-slate-900 rounded-xl overflow-hidden p-2 space-y-2">
              <img src={sc.img} alt={sc.title} className="w-full h-28 object-cover rounded-lg" />
              <div className="flex justify-between font-bold text-cyan-300">
                <span>{sc.title}</span>
                <span className="text-amber-300">🏗️ {sc.cam}</span>
              </div>
              <p className="text-slate-300">{sc.desc}</p>
              <p className="text-slate-500 italic">🎙️ "{sc.voice}"</p>
            </div>
          ))}
        </div>
      )}

      {tab === "vault" && (
        <div className="space-y-2">
          {vault.length === 0 ? (
            <p className="text-slate-500 text-center py-6">No archives saved.</p>
          ) : (
            vault.map((v) => (
              <div key={v.id} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-purple-300">{v.name}</h2>
                  <p className="text-[10px] text-slate-500">{v.cam} • {v.date}</p>
                </div>
                <span className="text-[10px] bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-900 font-bold">Saved</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
