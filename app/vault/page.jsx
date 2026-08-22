"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowVault() {
  const [projects, setProjects] = useState([]);
  const [activeProj, setActiveProj] = useState(null);
  const [editingSceneId, setEditingSceneId] = useState(null);
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

  const handleSaveScene = (sceneId) => {
    if (!activeProj) return;
    const updatedScenes = activeProj.scenes.map((s) =>
      s.id === sceneId
        ? { ...s, desc: editPrompt, camera: editCamera, voice: editVoice }
        : s
    );
    const updatedProj = { ...activeProj, scenes: updatedScenes };
    const updatedList = projects.map((p) =>
      p.id === activeProj.id ? updatedProj : p
    );

    setActiveProj(updatedProj);
    setProjects(updatedList);
    localStorage.setItem("cineflow_vault_data", JSON.stringify(updatedList));
    setEditingSceneId(null);
    notify("✅ बदलाव सफलतापूर्वक सेव हो गए!");
  };

  const deleteProject = (id) => {
    const filtered = projects.filter((p) => p.id !== id);
    setProjects(filtered);
    localStorage.setItem("cineflow_vault_data", JSON.stringify(filtered));
    if (activeProj?.id === id) setActiveProj(filtered[0] || null);
    notify("🗑️ प्रोजेक्ट हटा दिया गया!");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-24 max-w-lg mx-auto space-y-4 font-sans">
      <header className="flex justify-between items-center border-b border-slate-800 pb-3 sticky top-0 bg-[#070b14]/90 backdrop-blur-md z-40">
        <div>
          <h1 className="text-xs font-black text-purple-400 uppercase tracking-widest">CineFlow Vault</h1>
          <p className="text-[9px] text-slate-400">{projects.length} Saved Productions</p>
        </div>
        <Link
          href="/"
          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg font-bold"
        >
          ← Open Studio
        </Link>
      </header>

      {statusMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-purple-950 text-purple-300 border border-purple-500 px-4 py-1.5 rounded-full text-[11px] font-bold z-50 shadow-2xl">
          {statusMsg}
        </div>
      )}

      {projects.length === 0 ? (
        <div className="bg-[#0b1222] border border-slate-800 p-8 rounded-2xl text-center space-y-3">
          <div className="text-3xl">📂</div>
          <p className="text-xs text-slate-400">अभी तक कोई प्रोजेक्ट सेव नहीं है।</p>
          <Link
            href="/"
            className="inline-block py-2 px-4 bg-cyan-600 rounded-xl text-xs font-bold text-white uppercase"
          >
            Studio में पहला वीडियो बनाएँ
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-purple-400 block">📁 Production Archives</label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProj(p)}
                  className={`p-2.5 rounded-xl border text-left shrink-0 min-w-[140px] ${
                    activeProj?.id === p.id
                      ? "bg-purple-950/60 border-purple-500 text-purple-200"
                      : "bg-[#0b1222] border-slate-800 text-slate-400"
                  }`}
                >
                  <div className="text-[10px] font-black truncate">{p.name || "Untitled Project"}</div>
                  <div className="text-[8px] opacity-70">{p.date || "Saved"}</div>
                </button>
              ))}
            </div>
          </div>

          {activeProj && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center bg-[#0b1222] p-3 rounded-xl border border-slate-800">
                <div>
                  <h2 className="text-xs font-black text-cyan-400">{activeProj.name}</h2>
                  <p className="text-[9px] text-slate-400">{activeProj.scenes?.length || 0} Synced Scenes</p>
                </div>
                <button
                  onClick={() => deleteProject(activeProj.id)}
                  className="text-[10px] bg-red-950 border border-red-800 text-red-400 px-2.5 py-1 rounded-lg font-bold"
                >
                  Delete
                </button>
              </div>

              {activeProj.scenes?.map((sc) => (
                <div
                  key={sc.id}
                  className="bg-[#0b1222] border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3 pb-3.5"
                >
                  <div className="relative h-32 w-full bg-slate-900">
                    <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                    <span className="absolute top-2 left-2 bg-cyan-950/80 border border-cyan-500 px-2 py-0.5 rounded text-[9px] font-black text-cyan-300">
                      {sc.title}
                    </span>
                    <span className="absolute top-2 right-2 bg-amber-950/80 border border-amber-500 px-2 py-0.5 rounded text-[8px] font-bold text-amber-300">
                      🏗️ {sc.camera}
                    </span>
                  </div>

                  <div className="px-3 space-y-2.5">
                    {editingSceneId === sc.id ? (
                      <div className="space-y-2 bg-[#060a14] p-3 rounded-xl border border-cyan-500">
                        <label className="text-[8px] text-cyan-400 font-bold uppercase block">Visual Prompt:</label>
                        <textarea
                          value={editPrompt}
                          onChange={(e) => setEditPrompt(e.target.value)}
                          rows={2}
                          className="w-full bg-[#0b1222] p-2 text-xs text-white rounded-lg border border-slate-700 outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={editCamera}
                            onChange={(e) => setEditCamera(e.target.value)}
                            placeholder="Camera Rig"
                            className="bg-[#0b1222] p-1.5 text-[10px] text-white rounded border border-slate-700 outline-none"
                          />
                          <input
                            type="text"
                            value={editVoice}
                            onChange={(e) => setEditVoice(e.target.value)}
                            placeholder="Voiceover"
                            className="bg-[#0b1222] p-1.5 text-[10px] text-white rounded border border-slate-700 outline-none"
                          />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            onClick={() => handleSaveScene(sc.id)}
                            className="flex-1 py-1.5 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-lg"
                          >
                            💾 Save Changes
                          </button>
                          <button
                            onClick={() => setEditingSceneId(null)}
                            className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-slate-300 leading-relaxed bg-[#060a14] p-2.5 rounded-xl border border-slate-800">
                          {sc.desc}
                        </p>
                        <div className="space-y-1 bg-[#060a14] p-2 rounded-xl border border-slate-800 text-[10px]">
                          <p className="text-slate-400">
                            🎙️ <span className="text-slate-200 font-semibold">Voice:</span> "{sc.voice}"
                          </p>
                          <p className="text-slate-400">
                            🎵 <span className="text-slate-200 font-semibold">BGM:</span> {sc.bgm}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingSceneId(sc.id);
                            setEditPrompt(sc.desc);
                            setEditCamera(sc.camera);
                            setEditVoice(sc.voice);
                          }}
                          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-black uppercase rounded-xl"
                        >
                          ✏️ Edit Scene Multi-Track
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
                                                           }
