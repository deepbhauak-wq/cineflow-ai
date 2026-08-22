"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowVault() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [projects, setProjects] = useState([]);
  const [activeProj, setActiveProj] = useState(null);

  // Edit Scene States
  const [editingSceneId, setEditingSceneId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [editCamera, setEditCamera] = useState("");
  const [editVoice, setEditVoice] = useState("");
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
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const startEditScene = (sc) => {
    setEditingSceneId(sc.id);
    setEditPrompt(sc.desc || "");
    setEditCamera(sc.camera || "");
    setEditVoice(sc.voice || "");
  };

  const saveSceneEdit = (sceneId) => {
    if (!activeProj) return;
    const updatedScenes = activeProj.scenes.map((s) => {
      if (s.id === sceneId) {
        return {
          ...s,
          desc: editPrompt,
          camera: editCamera,
          voice: editVoice
        };
      }
      return s;
    });

    const updatedProj = { ...activeProj, scenes: updatedScenes };
    const updatedList = projects.map((p) =>
      p.id === activeProj.id ? updatedProj : p
    );

    setActiveProj(updatedProj);
    setProjects(updatedList);
    localStorage.setItem("cineflow_vault_data", JSON.stringify(updatedList));
    setEditingSceneId(null);
    notify(`✅ Scene 0${sceneId} अपडेट हो गया!`);
  };

  const deleteProject = (id) => {
    const updatedList = projects.filter((p) => p.id !== id);
    setProjects(updatedList);
    localStorage.setItem("cineflow_vault_data", JSON.stringify(updatedList));
    if (activeProj?.id === id) {
      setActiveProj(updatedList[0] || null);
    }
    notify("🗑️ प्रोजेक्ट हटा दिया गया!");
  };

  const clearAllVault = () => {
    localStorage.removeItem("cineflow_vault_data");
    setProjects([]);
    setActiveProj(null);
    notify("🧹 पूरा वॉल्ट खाली कर दिया गया!");
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#070b14]" />;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-xl font-black">
            📂
          </div>
          <h2 className="text-lg font-black tracking-wider text-white">CineFlow Vault</h2>
          <p className="text-xs text-slate-400">कृपया अपने सेव किए गए आर्काइव्स देखने के लिए प्रवेश करें।</p>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 font-bold text-xs rounded-xl uppercase text-white shadow-lg active:scale-95 transition"
          >
            Enter Vault
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-24 max-w-lg mx-auto space-y-4 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-slate-800 pb-3 sticky top-0 bg-[#070b14]/90 backdrop-blur-md z-40">
        <div>
          <h1 className="text-xs font-black text-purple-400 uppercase tracking-widest">CineFlow Vault</h1>
          <p className="text-[9px] text-slate-400 font-bold">{projects.length} Saved Productions</p>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            href="/"
            className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-3 py-1 rounded-lg font-bold"
          >
            ← Studio 🎬
          </Link>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-[10px] bg-red-950 text-red-400 border border-red-900 px-2.5 py-1 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Floating Status Notification */}
      {statusMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-purple-950 text-purple-300 border border-purple-500 px-4 py-1.5 rounded-full text-[11px] font-bold z-50 shadow-2xl">
          {statusMsg}
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="bg-[#0b1222] border border-slate-800 p-8 rounded-3xl text-center space-y-3 shadow-xl">
          <div className="text-3xl">📂</div>
          <h3 className="text-sm font-bold text-slate-200">कोई प्रोजेक्ट सेव नहीं है</h3>
          <p className="text-xs text-slate-400">स्टूडियो में अपनी कहानी जनरेट करें, वह यहाँ अपने आप सेव हो जाएगी।</p>
          <Link
            href="/"
            className="inline-block py-2.5 px-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-xs font-bold text-white uppercase shadow-lg"
          >
            Go to Studio
          </Link>
        </div>
      )}

      {/* Vault Content */}
      {projects.length > 0 && (
        <>
          {/* Top Horizontal Project Selector */}
          <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase text-purple-400">📁 Production Archives</label>
              <button
                onClick={clearAllVault}
                className="text-[9px] text-red-400 hover:text-red-300 underline font-semibold"
              >
                Clear All
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {projects.map((p) => {
                const isSelected = activeProj?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveProj(p);
                      setEditingSceneId(null);
                    }}
                    className={`p-2.5 rounded-xl border text-left shrink-0 min-w-[130px] transition ${
                      isSelected
                        ? "bg-purple-950/80 border-purple-500 text-purple-200 shadow-md"
                        : "bg-[#060a14] border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="text-[10px] font-bold truncate">{p.name || "Untitled Film"}</div>
                    <div className="text-[8px] text-slate-500">{p.date || "Archive"}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Project Scene Details */}
          {activeProj && (
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center bg-[#0b1222] p-3 rounded-2xl border border-slate-800">
                <div>
                  <h2 className="text-xs font-bold text-cyan-400 truncate max-w-[200px]">{activeProj.name}</h2>
                  <p className="text-[9px] text-slate-400">{activeProj.scenes?.length || 0} Synchronized Scenes</p>
                </div>
                <button
                  onClick={() => deleteProject(activeProj.id)}
                  className="text-[10px] bg-red-950 text-red-400 border border-red-900 px-3 py-1 rounded-lg font-bold"
                >
                  Delete Film
                </button>
              </div>

              {/* Scene Cards */}
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
                        <label className="text-[9px] text-cyan-400 font-black uppercase block">
                          ✏️ Edit Visual Prompt:
                        </label>
                        <textarea
                          value={editPrompt}
                          onChange={(e) => setEditPrompt(e.target.value)}
                          rows={2}
                          className="w-full bg-[#0b1222] p-2 text-xs text-white rounded-lg border border-slate-700 outline-none resize-none"
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
                            onClick={() => saveSceneEdit(sc.id)}
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
                          onClick={() => startEditScene(sc)}
                          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-black uppercase rounded-xl transition"
                        >
                          ✏️ Multi-Track Edit Scene
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
