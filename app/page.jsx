"use client";
import React, { useState, useEffect } from "react";

export default function CineFlowApp() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("studio");
  const [prompt, setPrompt] = useState("प्राचीन मंदिर की खोज");
  const [cam, setCam] = useState("JCB Crane");
  const [vault, setVault] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      setVault(JSON.parse(localStorage.getItem("cf_v") || "[]"));
    } catch (e) {
      setVault([]);
    }
  }, []);

  const handleGen = () => {
    const item = { id: Date.now(), name: prompt, cam };
    const updated = [item, ...vault];
    setVault(updated);
    localStorage.setItem("cf_v", JSON.stringify(updated));
    setMsg("✅ Saved to Vault!");
    setTimeout(() => setMsg(""), 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-sm mx-auto space-y-4 font-sans text-xs">
      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
        <h1 className="font-bold text-cyan-400">CineFlow Pro</h1>
        <div className="flex gap-2">
          <button onClick={() => setTab("studio")} className="bg-cyan-600 px-3 py-1 rounded font-bold">Studio</button>
          <button onClick={() => setTab("vault")} className="bg-purple-600 px-3 py-1 rounded font-bold">Vault ({vault.length})</button>
        </div>
      </div>

      {msg && <p className="text-emerald-400 font-bold text-center">{msg}</p>}

      {tab === "studio" && (
        <div className="space-y-3">
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2} className="w-full bg-gray-900 p-2 rounded text-white border border-gray-700 outline-none" />
          <div className="flex gap-2">
            {["JCB Crane", "FPV Drone"].map((c) => (
              <button key={c} onClick={() => setCam(c)} className={`flex-1 py-1.5 rounded font-bold ${cam === c ? "bg-amber-600" : "bg-gray-900"}`}>{c}</button>
            ))}
          </div>
          <button onClick={handleGen} className="w-full py-2.5 bg-blue-600 rounded font-bold uppercase">Generate Package</button>
          <div className="bg-gray-900 p-3 rounded-xl space-y-1">
            <h2 className="font-bold text-cyan-300">Scene 1: Shot</h2>
            <p className="text-gray-400">{prompt}</p>
            <span className="text-amber-400 block text-[10px]">🏗️ {cam}</span>
          </div>
        </div>
      )}

      {tab === "vault" && (
        <div className="space-y-2">
          {vault.length === 0 ? <p className="text-gray-500 text-center py-4">No projects yet.</p> : vault.map((v) => (
            <div key={v.id} className="bg-gray-900 p-2.5 rounded border border-gray-800 flex justify-between">
              <span className="font-bold text-purple-300">{v.name}</span>
              <span className="text-amber-300">{v.cam}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

