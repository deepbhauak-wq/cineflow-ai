"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowVault() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState([]);
  const [activeProj, setActiveProj] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editDesc, setEditDesc] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setMounted(true);
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

  const notify = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  const handleSave = (id) => {
    if (!activeProj) return;
    const updatedScenes = activeProj.scenes.map((s) => (s.id === id ? { ...s, desc: editDesc } : s));
    const updatedProject = { ...activeProj, scenes: updatedScenes };
    const list = projects.map((p) => (p.id === activeProj.id ? updatedProject : p));
    setActiveProj(updatedProject);
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

  if (!mounted) return <div className="min-h-screen bg-[#070b14]" />;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-20 max-w-md mx-auto space-y-4">
      <header className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div>
          <h1 className="text-xs font-black text-purple-400 uppercase">Vault Library</h1>
          <p className="text-[9px] text-slate-400">{projects.length} Saved Projects</p>
        </div>
        <Link href="/" className="text-[10px] bg-slate-800 text-slate-200 px-3 py-1 rounded font-bold">
          Studio 🎬
        </Link>
      </header>

      {msg && <div className="bg-purple-950 border border-purple-800 text-purple-300 text-xs p-2 rounded text-center font-bold">{msg}</div>}

      {projects.length === 0 ? (
        <div className="bg-[#0b1222] border border-slate-800 p-6 rounded-xl text-center space-y-2">
          <p className="text-xs text-slate-400">No projects saved yet.</p>
          <Link href="/" className="inline-block py-1 px-3 bg-cyan-600 rounded text-xs font-bold text-white">
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
                className={`p-2 rounded-lg border text-left shrink-0 min-w-[110px] ${
                  activeProj?.id === p.id ? "bg-purple-950 border-purple-500 text-purple-200" : "bg-[#0b1222] border-slate-800 text-slate-400"
                }`}
              >
                <div className="text-[10px] font-bold truncate">{p.name}</div>
              </button>
            ))}
          </div>

          {activeProj && (
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-[#0b1222] p-2 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 truncate">{activeProj.name}</span>
                <button onClick={() => handleDelete(activeProj.id)} className="text-[9px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-bold">
                  Delete
                </button>
              </div>

              {activeProj.scenes?.map((sc) => (
                <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-xl overflow-hidden space-y-2 pb-2">
                  <div className="relative h-28 w-full bg-slate-900">
                    <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[8px] font-bold text-cyan-300">{sc.title}</span>
                    <span className="absolute top-1 right-1 bg-black/80 px-2 py-0.5 rounded text-[8px] text-amber-300">🏗️ {sc.camera}</span>
                  </div>
                  <div className="p-2 space-y-2">
                    {editingId === sc.id ? (
                      <div className="space-y-1">
                        <textarea
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          rows={2}
                          className="w-full bg-black p-1.5 text-xs text-white rounded border border-cyan-500 outline-none"
                        />
                        <div className="flex gap-1">
                          <button onClick={() => handleSave(sc.id)} className="flex-1 py-1 bg-emerald-600 text-white text-[9px] font-bold rounded">
                            Save
                          </button>
                          <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-slate-800 text-slate-300 text-[9px] rounded">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-slate-300">{sc.desc}</p>
                        <p className="text-[10px] text-slate-400">🎙️ "{sc.voice}"</p>
                        <button
                          onClick={() => {
                            setEditingId(sc.id);
                            setEditDesc(sc.desc);
                          }}
                          className="w-full py-1 bg-slate-800 text-slate-200 text-[9px] font-bold rounded"
                        >
                          ✏️ Edit
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
