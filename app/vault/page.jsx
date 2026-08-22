"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowVault() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState([]);
  const [activeProj, setActiveProj] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cineflow_vault_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProjects(parsed);
        if (parsed.length > 0) setActiveProj(parsed[0]);
      } catch (err) {
        setProjects([]);
      }
    }
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2000);
  };

  const handleSave = (id) => {
    if (!activeProj) return;
    const updatedScenes = activeProj.scenes.map((s) => {
      if (s.id === id) {
        return { ...s, desc: editPrompt };
      }
      return s;
    });
    const updatedProject = { ...activeProj, scenes: updatedScenes };
    const updatedList = projects.map((p) => {
      if (p.id === activeProj.id) {
        return updatedProject;
      }
      return p;
    });
    setActiveProj(updatedProject);
    setProjects(updatedList);
    localStorage.setItem("cineflow_vault_data", JSON.stringify(updatedList));
    setEditingId(null);
    notify("Saved!");
  };

  const handleDelete = (id) => {
    const updatedList = projects.filter((p) => p.id !== id);
    setProjects(updatedList);
    localStorage.setItem("cineflow_vault_data", JSON.stringify(updatedList));
    if (activeProj?.id === id) {
      setActiveProj(updatedList[0] || null);
    }
    notify("Deleted!");
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-20 max-w-md mx-auto space-y-4">
      <header className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div>
          <h1 className="text-xs font-black text-purple-400 uppercase tracking-wider">Vault Library</h1>
          <p className="text-[9px] text-slate-400">{projects.length} Saved Projects</p>
        </div>
        <Link href="/" className="text-[10px] bg-slate-800 text-slate-200 px-3 py-1 rounded font-bold">
          Open Studio
        </Link>
      </header>

      {statusMsg && (
        <div className="bg-purple-950 border border-purple-800 text-purple-300 p-2 rounded text-center text-xs font-bold">
          {statusMsg}
        </div>
      )}

      {projects.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center space-y-3">
          <p className="text-xs text-slate-400">No projects saved yet.</p>
          <Link href="/" className="inline-block py-2 px-4 bg-cyan-600 rounded-lg text-xs font-bold text-white">
            Create in Studio
          </Link>
        </div>
      )}

      {projects.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {projects.map((p) => {
              const isSelected = activeProj?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProj(p)}
                  className={`p-2 rounded-lg border text-left shrink-0 min-w-[110px] ${
                    isSelected
                      ? "bg-purple-950 border-purple-500 text-purple-200"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  <div className="text-[10px] font-bold truncate">{p.name || "Project"}</div>
                </button>
              );
            })}
          </div>

          {activeProj && (
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 truncate">{activeProj.name}</span>
                <button
                  onClick={() => handleDelete(activeProj.id)}
                  className="text-[9px] bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded font-bold"
                >
                  Delete
                </button>
              </div>

              {activeProj.scenes?.map((sc) => (
                <div key={sc.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-cyan-300">{sc.title}</span>
                    <span className="text-[9px] text-amber-300 bg-black/50 px-2 py-0.5 rounded border border-slate-800">
                      {sc.camera}
                    </span>
                  </div>

                  {editingId === sc.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
                        rows={2}
                        className="w-full bg-black p-2 text-xs text-white rounded border border-slate-700 outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(sc.id)}
                          className="flex-1 py-1 bg-emerald-600 text-white text-[9px] font-bold uppercase rounded"
                        >
                          Save
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
                    <div className="space-y-2">
                      <p className="text-xs text-slate-300">{sc.desc}</p>
                      <button
                        onClick={() => {
                          setEditingId(sc.id);
                          setEditPrompt(sc.desc);
                        }}
                        className="w-full py-1.5 bg-slate-800 text-slate-200 text-[9px] font-bold uppercase rounded-lg"
                      >
                        Edit Scene
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
