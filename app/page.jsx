"use client";
import React, { useState, useEffect } from "react";

export default function CineFlowApp() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("studio");
  const [auth, setAuth] = useState(true);

  // Studio Controls
  const [prompt, setPrompt] = useState("एक प्राचीन योद्धा घने जंगल में रहस्यमयी मंदिर की खोज कर रहा है।");
  const [camera, setCamera] = useState("JCB Crane / Jib");
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min");
  const [credits, setCredits] = useState(50);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Scenes & Vault State
  const [scenes, setScenes] = useState([]);
  const [vault, setVault] = useState([]);
  const [activeVault, setActiveVault] = useState(null);

  // Edit State
  const [editId, setEditId] = useState(null);
  const [ePrompt, setEPrompt] = useState("");
  const [eCam, setECam] = useState("");
  const [eVoice, setEVoice] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      const data = JSON.parse(localStorage.getItem("cf_vault") || "[]");
      setVault(data);
      if (data.length > 0) setActiveVault(data[0]);
    } catch (err) {
      setVault([]);
    }
  }, []);

  const toast = (txt) => {
    setMsg(txt);
    setTimeout(() => setMsg(""), 2000);
  };

  const handleGenerate = () => {
    if (credits < 10) return toast("⚠️ क्रेडिट्स कम हैं!");
    setLoading(true);
    toast("🚀 AI जनरेशन शुरू...");

    setTimeout(() => {
      const newScenes = [
        {
          id: 1,
          title: "Scene 01: Entrance",
          desc: prompt,
          camera: camera,
          voice: "तूफान गहराता जा रहा था...",
          bgm: "Epic Drums",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80"
        },
        {
          id: 2,
          title: "Scene 02: Revelation",
          desc: "मंदिर के विशाल द्वार खुले और प्रकाश फैला।",
          camera: "FPV Drone",
          voice: "रहस्य अब सामने था...",
          bgm: "Ancient Mystery",
          img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80"
        }
      ];

      setCredits((c) => c - 10);
      setScenes(newScenes);

      const item = {
        id: Date.now(),
        name: prompt.slice(0, 20),
        ratio,
        duration,
        scenes: newScenes
      };
      const updated = [item, ...vault];
      setVault(updated);
      setActiveVault(item);
      localStorage.setItem("cf_vault", JSON.stringify(updated));

      setLoading(false);
      toast("✅ फिल्म पैकेज तैयार!");
    }, 1000);
  };

  const startEdit = (sc) => {
    setEditId(sc.id);
    setEPrompt(sc.desc);
    setECam(sc.camera);
    setEVoice(sc.voice);
  };

  const saveEdit = (id, isVault = false) => {
    if (!isVault) {
      setScenes((prev) =>
        prev.map((s) => (s.id === id ? { ...s, desc: ePrompt, camera: eCam, voice: eVoice } : s))
      );
    } else if (activeVault) {
      const updatedSc = activeVault.scenes.map((s) =>
        s.id === id ? { ...s, desc: ePrompt, camera: eCam, voice: eVoice } : s
      );
      const updatedProj = { ...activeVault, scenes: updatedSc };
      const updatedList = vault.map((v) => (v.id === activeVault.id ? updatedProj : v));
      setActiveVault(updatedProj);
      setVault(updatedList);
      localStorage.setItem("cf_vault", JSON.stringify(updatedList));
    }
    setEditId(null);
    toast("✅ सीन अपडेट हुआ!");
  };

  const deleteVaultItem = (id) => {
    const list = vault.filter((v) => v.id !== id);
    setVault(list);
    localStorage.setItem("cf_vault", JSON.stringify(list));
    if (activeVault?.id === id) setActiveVault(list[0] || null);
    toast("🗑️ प्रोजेक्ट हटाया गया!");
  };

  if (!mounted) return null;

  if (!auth) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center space-y-4 max-w-xs w-full">
          <div className="text-3xl">🎬</div>
          <h2 className="text-sm font-bold">CineFlow Pro Studio</h2>
          <button onClick={() => setAuth(true)} className="w-full py-2.5 bg-cyan-600 rounded-xl text-xs font-bold uppercase text-white">
            Enter Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-20 max-w-md mx-auto space-y-4 text-xs">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-slate-800 pb-2 sticky top-0 bg-slate-950/90 backdrop-blur z-20">
        <div>
          <h1 className="font-black text-cyan-400 uppercase">CineFlow Pro</h1>
          <span className="text-[10px] text-emerald-400 font-bold">{credits} Credits</span>
        </div>
        <div className="flex gap-1.5 items-center">
          <button
            onClick={() => setTab("studio")}
            className={`px-3 py-1 rounded font-bold ${tab === "studio" ? "bg-cyan-600 text-white" : "bg-slate-900 text-slate-400"}`}
          >
            Studio
          </button>
          <button
            onClick={() => setTab("vault")}
            className={`px-3 py-1 rounded font-bold ${tab === "vault" ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400"}`}
          >
            Vault ({vault.length})
          </button>
          <button onClick={() => setAuth(false)} className="bg-red-950 text-red-400 px-2 py-1 rounded font-bold">
            Exit
          </button>
        </div>
      </header>

      {msg && <div className="bg-cyan-950 border border-cyan-500 text-cyan-300 p-2 rounded text-center font-bold">{msg}</div>}

      {/* STUDIO TAB */}
      {tab === "studio" && (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="font-bold text-cyan-400 block">1. Master Story Input</span>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={2}
              className="w-full bg-black p-2 rounded border border-slate-700 outline-none text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl space-y-1">
              <span className="font-bold text-amber-400 block">2. Camera Rig</span>
              <div className="grid grid-cols-2 gap-1">
                {["JCB Crane / Jib", "FPV Drone", "Tracking Dolly", "360 Orbit"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCamera(c)}
                    className={`p-1 rounded text-[9px] font-bold truncate ${camera === c ? "bg-amber-600 text-white" : "bg-black text-slate-400"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl space-y-1">
              <span className="font-bold text-cyan-400 block">3. Ratio & Length</span>
              <div className="grid grid-cols-2 gap-1">
                {["16:9", "9:16"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`p-1 rounded font-bold ${ratio === r ? "bg-cyan-600 text-white" : "bg-black text-slate-400"}`}
                  >
                    {r}
                  </button>
                ))}
                {["3 Min", "30 Min"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`p-1 rounded font-bold ${duration === d ? "bg-indigo-600 text-white" : "bg-black text-slate-400"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold uppercase text-white shadow-lg"
          >
            {loading ? "⚡ Generating Package..." : "🚀 Generate Cinema Package"}
          </button>

          {scenes.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="font-bold uppercase text-white block">🎬 Scene Suite</span>
              {scenes.map((sc) => (
                <div key={sc.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden space-y-2 pb-2">
                  <div className="relative h-28 bg-black">
                    <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[9px] font-bold text-cyan-300">{sc.title}</span>
                    <span className="absolute top-1 right-1 bg-black/80 px-2 py-0.5 rounded text-[9px] text-amber-300">🏗️ {sc.camera}</span>
                  </div>

                  <div className="p-2 space-y-2">
                    {editId === sc.id ? (
                      <div className="space-y-1.5">
                        <textarea
                          value={ePrompt}
                          onChange={(e) => setEPrompt(e.target.value)}
                          rows={2}
                          className="w-full bg-black p-1.5 rounded border border-cyan-500 outline-none text-white"
                        />
                        <div className="grid grid-cols-2 gap-1">
                          <input
                            type="text"
                            value={eCam}
                            onChange={(e) => setECam(e.target.value)}
                            placeholder="Camera"
                            className="bg-black p-1 rounded border border-slate-700 text-white"
                          />
                          <input
                            type="text"
                            value={eVoice}
                            onChange={(e) => setEVoice(e.target.value)}
                            placeholder="Voice"
                            className="bg-black p-1 rounded border border-slate-700 text-white"
                          />
                        </div>
                        <div className="flex gap-1 pt-1">
                          <button onClick={() => saveEdit(sc.id, false)} className="flex-1 py-1 bg-emerald-600 rounded font-bold text-white">
                            Save
                          </button>
                          <button onClick={() => setEditId(null)} className="px-3 py-1 bg-slate-800 rounded text-slate-300">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-300">{sc.desc}</p>
                        <p className="text-[10px] text-slate-400">🎙️ "{sc.voice}" | 🎵 {sc.bgm}</p>
                        <div className="flex gap-1">
                          <button onClick={() => toast(`🔄 Scene 0${sc.id} Re-Rolled!`)} className="flex-1 py-1 bg-slate-800 rounded font-bold text-cyan-300">
                            Re-Roll
                          </button>
                          <button onClick={() => startEdit(sc)} className="flex-1 py-1 bg-slate-800 rounded font-bold text-slate-200">
                            Edit Multi-Track
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VAULT TAB */}
      {tab === "vault" && (
        <div className="space-y-3">
          {vault.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center space-y-2">
              <p className="text-slate-400">वॉल्ट में कोई प्रोजेक्ट नहीं है।</p>
              <button onClick={() => setTab("studio")} className="py-1.5 px-3 bg-cyan-600 rounded font-bold text-white">
                Studio खोलें
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {vault.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setActiveVault(v);
                      setEditId(null);
                    }}
                    className={`p-2 rounded-lg border text-left shrink-0 min-w-[110px] ${
                      activeVault?.id === v.id ? "bg-purple-950 border-purple-500 text-purple-200" : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <span className="font-bold truncate block">{v.name}</span>
                    <span className="text-[8px] opacity-70">{v.ratio} | {v.duration}</span>
                  </button>
                ))}
              </div>

              {activeVault && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="font-bold text-cyan-400 truncate">{activeVault.name}</span>
                    <button onClick={() => deleteVaultItem(activeVault.id)} className="bg-red-950 text-red-400 px-2 py-0.5 rounded font-bold">
                      Delete
                    </button>
                  </div>

                  {activeVault.scenes?.map((sc) => (
                    <div key={sc.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden space-y-2 pb-2">
                      <div className="relative h-28 bg-black">
                        <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[9px] font-bold text-cyan-300">{sc.title}</span>
                        <span className="absolute top-1 right-1 bg-black/80 px-2 py-0.5 rounded text-[9px] text-amber-300">🏗️ {sc.camera}</span>
                      </div>

                      <div className="p-2 space-y-2">
                        {editId === sc.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              value={ePrompt}
                              onChange={(e) => setEPrompt(e.target.value)}
                              rows={2}
                              className="w-full bg-black p-1.5 rounded border border-purple-500 outline-none text-white"
                            />
                            <div className="grid grid-cols-2 gap-1">
                              <input
                                type="text"
                                value={eCam}
                                onChange={(e) => setECam(e.target.value)}
                                placeholder="Camera"
                                className="bg-black p-1 rounded border border-slate-700 text-white"
                              />
                              <input
                                type="text"
                                value={eVoice}
                                onChange={(e) => setEVoice(e.target.value)}
                                placeholder="Voice"
                                className="bg-black p-1 rounded border border-slate-700 text-white"
                              />
                            </div>
                            <div className="flex gap-1 pt-1">
                              <button onClick={() => saveEdit(sc.id, true)} className="flex-1 py-1 bg-emerald-600 rounded font-bold text-white">
                                Save
                              </button>
                              <button onClick={() => setEditId(null)} className="px-3 py-1 bg-slate-800 rounded text-slate-300">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-slate-300">{sc.desc}</p>
                            <p className="text-[10px] text-slate-400">🎙️ "{sc.voice}" | 🎵 {sc.bgm}</p>
                            <button onClick={() => startEdit(sc)} className="w-full py-1 bg-slate-800 rounded font-bold text-slate-200">
                              Edit Scene
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
      )}
    </div>
  );
              }
