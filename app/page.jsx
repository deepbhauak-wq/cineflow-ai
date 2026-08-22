"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CineFlowStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [prompt, setPrompt] = useState("एक प्राचीन योद्धा घने जंगल में रहस्यमयी मंदिर की खोज कर रहा है। सिनेमाई 8K विजुअल्स।");
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min");
  const [cameraRig, setCameraRig] = useState("JCB Crane / Jib");
  const [credits, setCredits] = useState(50);
  const [statusMsg, setStatusMsg] = useState("");
  const [pipelineState, setPipelineState] = useState("idle");

  const [scenes, setScenes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [editCamera, setEditCamera] = useState("");
  const [editVoice, setEditVoice] = useState("");

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const handleGenerate = () => {
    if (credits < 10) return notify("⚠️ अपर्याप्त क्रेडिट्स!");
    setPipelineState("generating");
    notify("🚀 AI ऑटो-रेंडरिंग शुरू...");

    setTimeout(() => {
      const generatedScenes = [
        {
          id: 1,
          title: "Scene 01: The Storm Begins",
          desc: "योद्धा घने जंगल के रास्ते से प्राचीन खंडहरों की ओर बढ़ता है।",
          camera: cameraRig,
          voice: "रात बहुत अंधेरी थी और हवाएं तेज...",
          bgm: "Epic Cinematic Drums",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80"
        },
        {
          id: 2,
          title: "Scene 02: Heavy Machinery & Gate",
          desc: "विशाल मंदिर का द्वार खुलता है और सुनहरी दिव्य ऊर्जा बाहर निकलती है।",
          camera: "JCB Mechanical Jib",
          voice: "जैसे ही भारी पहिये घूमे, सदियों का ताला टूट गया...",
          bgm: "Ancient Chants & Mystery",
          img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80"
        }
      ];

      setCredits((prev) => prev - 10);
      setScenes(generatedScenes);

      const newProj = {
        id: Date.now(),
        name: prompt.slice(0, 25),
        date: new Date().toLocaleDateString(),
        scenes: generatedScenes
      };
      const existing = JSON.parse(localStorage.getItem("cineflow_vault_data") || "[]");
      localStorage.setItem("cineflow_vault_data", JSON.stringify([newProj, ...existing]));

      setPipelineState("completed");
      notify("✅ फिल्म पैकेज तैयार व Vault में सेव हो गया!");
    }, 1200);
  };

  const startEdit = (sc) => {
    setEditingId(sc.id);
    setEditPrompt(sc.desc);
    setEditCamera(sc.camera);
    setEditVoice(sc.voice);
  };

  const saveEdit = (id) => {
    const updated = scenes.map((s) =>
      s.id === id ? { ...s, desc: editPrompt, camera: editCamera, voice: editVoice } : s
    );
    setScenes(updated);
    setEditingId(null);
    notify(`✅ Scene 0${id} अपडेट हो गया!`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black">🎬</div>
          <h2 className="text-lg font-black tracking-wider text-white">CineFlow Pro Studio</h2>
          <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs rounded-xl uppercase text-white">
            Enter Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-24 max-w-lg mx-auto space-y-4 font-sans">
      <header className="flex justify-between items-center border-b border-slate-800 pb-3 sticky top-0 bg-[#070b14]/90 backdrop-blur-md z-40">
        <div>
          <h1 className="text-xs font-black text-cyan-400 uppercase tracking-widest">CineFlow Pro Studio</h1>
          <p className="text-[9px] text-emerald-400 font-bold">{credits} Credits Active</p>
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/vault" className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1 rounded-lg font-bold">
            Vault 📂
          </Link>
          <button onClick={() => setIsLoggedIn(false)} className="text-[10px] bg-red-950 text-red-400 border border-red-900 px-3 py-1 rounded-lg font-bold">
            Logout
          </button>
        </div>
      </header>

      {statusMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 border border-cyan-500 px-4 py-1.5 rounded-full text-[11px] font-bold z-50 shadow-2xl">
          {statusMsg}
        </div>
      )}

      <div className="p-3.5 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-1.5">
        <label className="text-[10px] font-black uppercase text-cyan-400">🎛️ 1. Master Story Input</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="w-full bg-[#060a14] p-2.5 text-xs text-white rounded-xl border border-slate-800 outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-1">
          <label className="text-[10px] font-black uppercase text-amber-400">🏗️ 2. Camera Rig</label>
          <div className="grid grid-cols-2 gap-1">
            {["JCB Crane / Jib", "FPV Drone", "Tracking Dolly", "360 Orbit"].map((cam) => (
              <button
                key={cam}
                onClick={() => setCameraRig(cam)}
                className={`p-1.5 text-[9px] font-bold rounded-lg border text-left truncate ${
                  cameraRig === cam ? "bg-amber-950 border-amber-500 text-amber-300" : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                {cam}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-1">
          <label className="text-[10px] font-black uppercase text-cyan-400">📺 3. Ratio & Timeline</label>
          <div className="grid grid-cols-2 gap-1">
            {["16:9", "9:16"].map((r) => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={`p-1 text-[9px] font-bold rounded-lg border ${
                  ratio === r ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                {r}
              </button>
            ))}
            {["3 Min", "30 Min"].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`p-1 text-[9px] font-bold rounded-lg border ${
                  duration === d ? "bg-indigo-950 border-indigo-500 text-indigo-300" : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={pipelineState === "generating"}
        className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl active:scale-[0.99]"
      >
        {pipelineState === "generating" ? "⚡ AI Rendering Video + Audio..." : "🚀 Generate Cinema Package"}
      </button>

      {pipelineState === "completed" && scenes.length > 0 && (
        <div className="pt-3 border-t border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase text-white tracking-wider">🎬 Multi-Track Scene Suite</h3>
            <span className="text-[9px] bg-emerald-950 border border-emerald-500 text-emerald-300 px-2 py-0.5 rounded font-bold">Live Editing</span>
          </div>

          {scenes.map((sc) => (
            <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3 pb-3.5">
              <div className="relative h-32 w-full bg-slate-900">
                <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                <span className="absolute top-2 left-2 bg-cyan-950/80 border border-cyan-500 px-2 py-0.5 rounded text-[9px] font-black text-cyan-300">{sc.title}</span>
                <span className="absolute top-2 right-2 bg-amber-950/80 border border-amber-500 px-2 py-0.5 rounded text-[8px] font-bold text-amber-300">🏗️ {sc.camera}</span>
              </div>

              <div className="px-3 space-y-2.5">
                {editingId === sc.id ? (
                  <div className="space-y-2 bg-[#060a14] p-3 rounded-xl border border-cyan-500">
                    <label className="text-[9px] text-cyan-400 font-black uppercase block">✏️ Visual Prompt:</label>
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
                        placeholder="Camera Angle"
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
                      <button onClick={() => saveEdit(sc.id)} className="flex-1 py-1.5 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-lg">
                        💾 Save Changes
                      </button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-300 leading-relaxed bg-[#060a14] p-2.5 rounded-xl border border-slate-800">{sc.desc}</p>
                    <div className="space-y-1 bg-[#060a14] p-2 rounded-xl border border-slate-800 text-[10px]">
                      <p className="text-slate-400">🎙️ <span className="text-slate-200 font-semibold">Voice:</span> "{sc.voice}"</p>
                      <p className="text-slate-400">🎵 <span className="text-slate-200 font-semibold">BGM:</span> {sc.bgm}</p>
                    </div>
                    <div className="flex gap-2 pt-0.5">
                      <button onClick={() => notify(`🔄 Scene 0${sc.id} Re-Rolled!`)} className="flex-1 py-2 bg-cyan-950 border border-cyan-500 text-cyan-300 text-[10px] font-black uppercase rounded-xl">
                        🔄 Re-Roll
                      </button>
                      <button onClick={() => startEdit(sc)} className="px-4 py-2 bg-slate-800 text-slate-200 text-[10px] font-black uppercase rounded-xl">
                        ✏️ Multi-Track Edit
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
  );
}
