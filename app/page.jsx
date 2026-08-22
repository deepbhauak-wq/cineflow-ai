"use client";
import React, { useState, useEffect } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prompt, setPrompt] = useState("एक योद्धा घने जंगल में विशाल मंदिर और प्राचीन मशीनों की खोज कर रहा है। 8K सिनेमैटिक।");
  const [ratio, setRatio] = useState("16:9");
  const [cameraRig, setCameraRig] = useState("JCB Crane / Jib");
  const [credits, setCredits] = useState(50);
  const [statusMsg, setStatusMsg] = useState("");

  const [pipelineState, setPipelineState] = useState("idle");
  const [editingId, setEditingId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [editCamera, setEditCamera] = useState("");
  const [editVoice, setEditVoice] = useState("");
  const [editBgm, setEditBgm] = useState("");
  const [scenes, setScenes] = useState([]);
  const [savedProjects, setSavedProjects] = useState([]);

  // Load Saved Projects on Mount
  useEffect(() => {
    const localData = localStorage.getItem("cineflow_projects");
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setSavedProjects(parsed);
        if (parsed.length > 0) {
          setScenes(parsed[0].scenes || []);
          setPipelineState("completed");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleGenerate = () => {
    if (credits < 10) return notify("⚠️ क्रेडिट्स समाप्त! अपग्रेड करें।");
    setPipelineState("generating");
    notify("🚀 AI ऑटो-पाइपलाइन: रेंडरिंग और सेविंग जारी...");

    setTimeout(() => {
      setCredits((prev) => prev - 10);
      const newScenes = [
        {
          id: 1,
          title: "Scene 01: Aerial Exploration",
          desc: "योद्धा घने जंगल के रास्ते से प्राचीन खंडहरों की ओर बढ़ता है।",
          camera: cameraRig,
          voice: "गहरी घाटियों के पार एक रहस्यमयी शक्ति जाग रही थी...",
          bgm: "Epic Orchestral Drums & Ambient Wind",
          img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
          videoStatus: "1080p 60fps Synced",
          audioStatus: "Dolby 5.1 Mixed"
        },
        {
          id: 2,
          title: "Scene 02: Heavy Machinery & Temple Gate",
          desc: "विशाल मंदिर का द्वार खुलता है और सुनहरी दिव्य ऊर्जा बाहर निकलती है।",
          camera: "JCB Mechanical Jib Low-Rise",
          voice: "जैसे ही भारी पहिये घूमे, सदियों का ताला टूट गया...",
          bgm: "Ancient Chants & Cinematic Bass Drops",
          img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80",
          videoStatus: "4K HDR Master",
          audioStatus: "Voice + SFX Dynamic Mix"
        }
      ];

      const newProj = {
        id: Date.now(),
        name: prompt.slice(0, 24) + "...",
        date: new Date().toLocaleDateString(),
        scenes: newScenes
      };

      const updatedProjects = [newProj, ...savedProjects];
      setSavedProjects(updatedProjects);
      setScenes(newScenes);
      localStorage.setItem("cineflow_projects", JSON.stringify(updatedProjects));

      setPipelineState("completed");
      notify("✅ फिल्म प्रोजेक्ट सुरक्षित और तैयार हो गया!");
    }, 1500);
  };

  const startEdit = (sc) => {
    setEditingId(sc.id);
    setEditPrompt(sc.desc);
    setEditCamera(sc.camera);
    setEditVoice(sc.voice);
    setEditBgm(sc.bgm);
  };

  const saveEdit = (id) => {
    const updated = scenes.map((s) =>
      s.id === id
        ? { ...s, desc: editPrompt, camera: editCamera, voice: editVoice, bgm: editBgm }
        : s
    );
    setScenes(updated);

    if (savedProjects.length > 0) {
      const projs = [...savedProjects];
      projs[0].scenes = updated;
      setSavedProjects(projs);
      localStorage.setItem("cineflow_projects", JSON.stringify(projs));
    }

    setEditingId(null);
    notify(`✅ Scene 0${id} बदलाव हमेशा के लिए सुरक्षित हो गए!`);
  };

  const loadProject = (proj) => {
    setScenes(proj.scenes);
    setPipelineState("completed");
    notify(`📂 "${proj.name}" प्रोजेक्ट लोड हो गया!`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black">🎬</div>
          <div>
            <h2 className="text-lg font-black tracking-wider text-white">CineFlow Pro Studio</h2>
            <p className="text-[11px] text-slate-400">Persistent Scene & Multi-Track Studio</p>
          </div>
          <button onClick={() => { setIsLoggedIn(true); notify("Login Successful!"); }} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs rounded-xl uppercase tracking-wider text-white shadow-lg cursor-pointer">
            Enter Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-24 max-w-xl mx-auto space-y-4 font-sans">
      <header className="flex justify-between items-center border-b border-slate-800 pb-3 sticky top-0 bg-[#070b14]/90 backdrop-blur-md z-40">
        <div>
          <h1 className="text-xs font-black text-cyan-400 uppercase tracking-widest">CineFlow Pro Vault</h1>
          <p className="text-[9px] text-emerald-400 font-bold">{credits} Active Credits</p>
        </div>
        <button onClick={() => { setIsLoggedIn(false); setPipelineState("idle"); }} className="text-[10px] bg-red-950 text-red-400 border border-red-900 px-3 py-1 rounded-lg font-bold cursor-pointer">Logout</button>
      </header>

      {statusMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 border border-cyan-500 px-4 py-1.5 rounded-full text-[11px] font-bold z-50 shadow-2xl">
          {statusMsg}
        </div>
      )}

      {/* Saved Projects Library */}
      {savedProjects.length > 0 && (
        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-2">
          <label className="text-[10px] font-black uppercase text-purple-400 flex items-center justify-between">
            <span>💾 Saved Projects Archive ({savedProjects.length})</span>
            <span className="text-[8px] text-slate-400">Auto-Synced</span>
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {savedProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => loadProject(p)}
                className="p-2 bg-[#060a14] border border-slate-800 rounded-xl text-left min-w-[130px] shrink-0 active:scale-95 cursor-pointer"
              >
                <div className="text-[10px] font-bold text-slate-200 truncate">{p.name}</div>
                <div className="text-[8px] text-cyan-400 font-semibold">{p.scenes.length} Scenes • {p.date}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Master Input */}
      <div className="p-3.5 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-1.5">
        <label className="text-[10px] font-black uppercase text-cyan-400">🎛️ 1. Master Storyline & Concept</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2} className="w-full bg-[#060a14] p-2.5 text-xs text-white rounded-xl border border-slate-800 outline-none focus:border-cyan-500 resize-none" />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-1">
          <label className="text-[10px] font-black uppercase text-amber-400">🏗️ 2. Camera Rig</label>
          <div className="grid grid-cols-2 gap-1">
            {["JCB Crane / Jib", "FPV Drone", "Tracking Dolly", "360 Orbit"].map((cam) => (
              <button key={cam} onClick={() => setCameraRig(cam)} className={`p-1.5 text-[9px] font-bold rounded-lg border text-left truncate ${cameraRig === cam ? "bg-amber-950 border-amber-500 text-amber-300" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{cam}</button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-2xl space-y-1">
          <label className="text-[10px] font-black uppercase text-cyan-400">📺 3. Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-1">
            {["16:9", "9:16", "21:9"].map((r) => (
              <button key={r} onClick={() => setRatio(r)} className={`p-1.5 text-[10px] font-bold rounded-lg border ${ratio === r ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{r}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate */}
      <button onClick={handleGenerate} disabled={pipelineState === "generating"} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl cursor-pointer active:scale-[0.99]">
        {pipelineState === "generating" ? "⚡ Auto-Rendering & Saving..." : "🚀 Generate Cinema Package"}
      </button>

      {/* Multi-Track Scene Editing Timeline */}
      {pipelineState === "completed" && scenes.length > 0 && (
        <div className="pt-3 border-t border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase text-white tracking-wider">🎬 Multi-Track Scene Suite</h3>
            <span className="text-[9px] bg-emerald-950 border border-emerald-500 text-emerald-300 px-2 py-0.5 rounded font-bold">Editable</span>
          </div>

          {scenes.map((sc) => (
            <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-3 pb-3.5">
              {/* Scene Frame */}
              <div className="relative h-32 w-full bg-slate-900">
                <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                <span className="absolute top-2 left-2 bg-cyan-950/80 border border-cyan-500 px-2 py-0.5 rounded text-[9px] font-black text-cyan-300">{sc.title}</span>
                <span className="absolute top-2 right-2 bg-amber-950/80 border border-amber-500 px-2 py-0.5 rounded text-[8px] font-bold text-amber-300">🏗️ {sc.camera}</span>
                <div className="absolute bottom-2 left-2 flex gap-2">
                  <span className="bg-black/70 px-2 py-0.5 rounded text-[8px] text-emerald-400 font-bold">📹 {sc.videoStatus}</span>
                  <span className="bg-black/70 px-2 py-0.5 rounded text-[8px] text-purple-400 font-bold">🎙️ {sc.audioStatus}</span>
                </div>
              </div>

              {/* Editing Suite */}
              <div className="px-3 space-y-2.5">
                {editingId === sc.id ? (
                  <div className="space-y-2 bg-[#060a14] p-3 rounded-xl border border-cyan-500">
                    <label className="text-[9px] text-cyan-400 font-black uppercase block">✏️ Edit Visual Prompt:</label>
                    <textarea value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} rows={2} className="w-full bg-[#0b1222] p-2 text-xs text-white rounded-lg border border-slate-700 outline-none" />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[8px] text-amber-400 font-bold uppercase block">Camera Movement:</label>
                        <input type="text" value={editCamera} onChange={(e) => setEditCamera(e.target.value)} className="w-full bg-[#0b1222] p-1.5 text-[10px] text-white rounded border border-slate-700 outline-none" />
                      </div>
                      <div>
                        <label className="text-[8px] text-purple-400 font-bold uppercase block">Voiceover Dialogue:</label>
                        <input type="text" value={editVoice} onChange={(e) => setEditVoice(e.target.value)} className="w-full bg-[#0b1222] p-1.5 text-[10px] text-white rounded border border-slate-700 outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[8px] text-indigo-400 font-bold uppercase block">Background Music / SFX:</label>
                      <input type="text" value={editBgm} onChange={(e) => setEditBgm(e.target.value)} className="w-full bg-[#0b1222] p-1.5 text-[10px] text-white rounded border border-slate-700 outline-none" />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button onClick={() => saveEdit(sc.id)} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase rounded-lg cursor-pointer">💾 Save Changes to Vault</button>
                      <button onClick={() => setEditingId(null)} className="px-3 py-2 bg-slate-800 text-slate-300 text-[10px] font-bold rounded-lg cursor-pointer">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-300 leading-relaxed bg-[#060a14] p-2 rounded-xl border border-slate-800">{sc.desc}</p>
                    
                    <div className="space-y-1 bg-[#060a14] p-2 rounded-xl border border-slate-800 text-[10px]">
                      <p className="text-slate-400">🎙️ <span className="text-slate-200 font-semibold">Voice:</span> "{sc.voice}"</p>
                      <p className="text-slate-400">🎵 <span className="text-slate-200 font-semibold">Music:</span> {sc.bgm}</p>
                    </div>

                    <div className="flex gap-2 pt-0.5">
                      <button onClick={() => notify(`🔄 Scene 0${sc.id} Re-Rolled!`)} className="flex-1 py-2 bg-cyan-950 border border-cyan-500 text-cyan-300 text-[10px] font-black uppercase rounded-xl cursor-pointer">🔄 Re-Roll</button>
                      <button onClick={() => startEdit(sc)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-black uppercase rounded-xl cursor-pointer">✏️ Multi-Track Edit</button>
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
                                                                                                           
