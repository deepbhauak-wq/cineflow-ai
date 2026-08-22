"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowVault() {
  const [projects, setProjects] = useState([]);
  const [activeProj, setActiveProj] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [editCamera, setEditCamera] = useState("");
  const [editVoice, setEditVoice] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cineflow_vault_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProjects(parsed);
        if (parsed.length > 0) setActiveProj(parsed[0]);
      } catch (e) {
        setProjects([]);
      }
    }
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const handleSave = (id) => {
    if (!activeProj) return;
    const updatedScenes = activeProj.scenes.map((s) =>
      s.id === id ? { ...s, desc: editPrompt, camera: editCamera, voice: editVoice } : s
    );
    const updatedP = { ...activeProj, scenes: updatedScenes };
    const list = projects.map((p) => (p.id === activeProj.id ? updatedP : p));
    setActiveProj(updatedP);
    setProjects(list);
    localStorage.setItem("cineflow_vault_data", JSON.stringify(list));
    setEditingId(null);
    notify("✅ Saved!");
  };

  const handleDelete = (id) => {
    const list = projects.filter((p) => p.id !== id);
    setProjects(list);
    localStorage.setItem("cineflow_vault_data", JSON.stringify(list));
    if (activeProj?.id === id) setActiveProj(list[0] || null);
    notify("🗑️ Deleted!");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-20 max-w-md mx-auto space-y-4">
      <header className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div>
          <h1 className="text-xs font-black text-purple-400 uppercase">CineFlow Vault</h1>
          <p className="text-[9px] text-slate-400">{projects.length} Saved Projects</p>
        </div>
        <Link href="/" className="text-[10px] bg-slate-800 text-slate-200 px-3 py-1 rounded font-bold">
          ← Studio
        </Link>
      </header>

      {statusMsg && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 bg-purple-950 text-purple-300 border border-purple-500 px-3 py-1 rounded-full text-[10px] font-bold z-50">
          {statusMsg}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="bg-[#0b1222] border border-slate-800 p-6 rounded-2xl text-center space-y-2">
          <p className="text-xs text-slate-400">No projects saved yet.</p>
          <Link href="/" className="inline-block py-1.5 px-3 bg-cyan-600 rounded-lg text-xs font-bold text-white">
            Create in Studio
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProj(p)}
                className={`p-2 rounded-xl border text-left shrink-0 min-w-[120px] ${
                  activeProj?.id === p.id
                    ? "bg-purple-950 border-purple-500 text-purple-200"
                    : "bg-[#0b1222] border-slate-800 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-bold truncate">{p.name || "Project"}</div>
                <div className="text-[8px] opacity-70">{p.date || "Saved"}</div>
              </button>
            ))}
          </div>

          {activeProj && (
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-[#0b1222] p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs font-black text-cyan-400 truncate">{activeProj.name}</span>
                <button
                  onClick={() => handleDelete(activeProj.id)}
                  className="text-[9px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-bold"
                >
                  Delete
                </button>
              </div>

              {activeProj.scenes?.map((sc) => (
                <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-xl overflow-hidden space-y-2 pb-2.5">
                  <div className="relative h-28 w-full bg-slate-900">
                    <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1.5 left-1.5 bg-black/80 px-2 py-0.5 rounded text-[8px] font-bold text-cyan-300">
                      {sc.title}
                    </span>
                    <span className="absolute top-1.5 right-1.5 bg-black/80 px-2 py-0.5 rounded text-[8px] text-amber-300">
                      🏗️ {sc.camera}
                    </span>
                  </div>

                  <div className="px-3 space-y-2">
                    {editingId === sc.id ? (
                      <div className="space-y-1.5 bg-[#060a14] p-2.5 rounded-lg border border-cyan-500">
                        <textarea
                          value={editPrompt}
                          onChange={(e) => setEditPrompt(e.target.value)}
                          rows={2}
                          className="w-full bg-[#0b1222] p-1.5 text-xs text-white rounded border border-slate-700 outline-none"
                        />
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={editCamera}
                            onChange={(e) => setEditCamera(e.target.value)}
                            placeholder="Camera"
                            className="w-1/2 bg-[#0b1222] p-1 text-[9px] text-white rounded border border-slate-700 outline-none"
                          />
                          <input
                            type="text"
                            value={editVoice}
                            onChange={(e) => setEditVoice(e.target.value)}
                            placeholder="Voice"
                            className="w-1/2 bg-[#0b1222] p-1 text-[9px] text-white rounded border border-slate-700 outline-none"
                          />
                        </div>
                        <div className="flex gap-1.5 pt-1">
                          <button
                            onClick={() => handleSave(sc.id)}
                            className="flex-1 py-1 bg-emerald-600 text-white text-[9px] font-bold uppercase rounded"
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-slate-800 text-slate-300 text-[9px] rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-slate-300">{sc.desc}</p>
                        <p className="text-[10px] text-slate-400 italic">🎙️ "{sc.voice}"</p>
                        <button
                          onClick={() => {
                            setEditingId(sc.id);
                            setEditPrompt(sc.desc);
                            setEditCamera(sc.camera);
                            setEditVoice(sc.voice);
                          }}
                          className="w-full py-1.5 bg-slate-800 text-slate-200 text-[9px] font-bold uppercase rounded-lg"
                        >
                          ✏️ Edit Scene
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
    </div>
  );
}
