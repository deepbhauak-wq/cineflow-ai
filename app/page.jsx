"use client";

import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [prompt, setPrompt] = useState("एक प्राचीन योद्धा घने जंगल में रहस्यमयी मंदिर की खोज कर रहा है। सिनेमाई लाइटिंग और 8K रियलिस्टिक विजुअल्स।");
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min");
  const [storyModel, setStoryModel] = useState("Auto");
  const [videoModel, setVideoModel] = useState("Veo");
  const [style, setStyle] = useState("Cinematic Epic");
  const [plan, setPlan] = useState("free");
  const [credits, setCredits] = useState(50);
  const [statusMsg, setStatusMsg] = useState("");

  const [pipelineState, setPipelineState] = useState("idle");
  const [editingSceneId, setEditingSceneId] = useState(null);
  const [editPromptText, setEditPromptText] = useState("");
  const [editVoiceText, setEditVoiceText] = useState("");
  const [editCameraText, setEditCameraText] = useState("");
  const [scenes, setScenes] = useState([]);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    notify("लॉगिन सफल!");
  };

  const handleSocialLogin = (p) => {
    setIsLoggedIn(true);
    notify(`${p} से लॉगिन पूरा हुआ!`);
  };

  const handlePlanSelect = (pId, cr) => {
    setPlan(pId);
    setCredits(cr);
    notify(`Plan: ${pId.toUpperCase()} (${cr} Credits)`);
  };

  const handleGenerate = () => {
    if (credits < 10) return notify("⚠️ क्रेडिट्स समाप्त! अपग्रेड करें।");
    setPipelineState("generating");
    notify("🚀 AI फिल्म पाइपलाइन रेंडरिंग जारी...");
    setTimeout(() => {
      setCredits((prev) => prev - 10);
      setScenes([
        { id: 1, title: "Scene 01: The Storm Begins", desc: "योद्धा घने जंगल में प्रवेश करता है।", camera: "Wide Drone", voice: "रात बहुत अंधेरी थी...", status: "Ready" },
        { id: 2, title: "Scene 02: Ancient Temple", desc: "प्राचीन मंदिर के दरवाजे पर रोशनी।", camera: "Dolly In", voice: "सामने पुराना दरवाजा दिखा...", status: "Ready" },
        { id: 3, title: "Scene 03: The Awakening", desc: "दरवाजा धीरे-धीरे खुलता है।", camera: "Low Angle", voice: "कदम आगे बढ़ाए...", status: "Ready" }
      ]);
      setPipelineState("completed");
      notify("✅ फिल्म और सीन्स ऑटो-जनरेट हो चुके हैं!");
    }, 2000);
  };

  const handleOpenEdit = (sc) => {
    setEditingSceneId(sc.id);
    setEditPromptText(sc.desc);
    setEditVoiceText(sc.voice);
    setEditCameraText(sc.camera);
  };

  const handleSaveScene = (id) => {
    setScenes((prev) => prev.map((s) => s.id === id ? { ...s, desc: editPromptText, voice: editVoiceText, camera: editCameraText } : s));
    setEditingSceneId(null);
    notify(`✅ Scene 0${id} अपडेट हो गया!`);
  };

  const handleRegenerateScene = (id) => {
    notify(`🔄 Scene 0${id} री-रोल हो रहा है...`);
    setTimeout(() => {
      setScenes((prev) => prev.map((s) => s.id === id ? { ...s, desc: `${s.desc} (Fresh AI Variation)` } : s));
      notify(`✅ Scene 0${id} नया बन गया!`);
    }, 1200);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-lg">🎬</div>
            <h2 className="text-base font-black text-white">{authMode === "login" ? "Studio Login" : "Create Account"}</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleSocialLogin("Google")} type="button" className="py-2 rounded-xl bg-white text-slate-900 font-bold text-xs">🌐 Google</button>
            <button onClick={() => handleSocialLogin("Facebook")} type="button" className="py-2 rounded-xl bg-[#1877F2] text-white font-bold text-xs">🔵 Facebook</button>
          </div>
          <form onSubmit={handleAuthSubmit} className="space-y-3">
            {authMode === "signup" && <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full bg-[#060a14] border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none" />}
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-[#060a14] border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none" />
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-[#060a14] border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-[10px] font-bold text-cyan-400">{showPassword ? "HIDE" : "SHOW"}</button>
            </div>
            <button type="submit" className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-xs text-white uppercase">{authMode === "login" ? "Enter Studio" : "Register"}</button>
          </form>
          <div className="text-center">
            <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-[11px] text-slate-400 hover:text-cyan-400">
              {authMode === "login" ? "नया अकाउंट? Sign Up" : "अकाउंट है? Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      <header className="px-4 py-3 border-b border-slate-800 bg-[#090f1d] sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-xs">🎬</div>
          <div>
            <h1 className="text-xs font-black uppercase">CineFlow Pro</h1>
            <p className="text-[9px] text-cyan-400 font-bold">{credits} Credits</p>
          </div>
        </div>
        <button onClick={() => { setIsLoggedIn(false); setPipelineState("idle"); }} className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-2.5 py-1 rounded font-bold">Logout</button>
      </header>

      {statusMsg && <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-cyan-950 border border-cyan-500 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full shadow-lg">{statusMsg}</div>}

      <main className="max-w-xl mx-auto px-4 pt-4 space-y-4">
        {/* 1. Prompt */}
        <div className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 space-y-1">
          <label className="text-[10px] font-bold text-cyan-400 uppercase">🎛️ 1. Master Story Input</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2} className="w-full bg-[#060a14] border border-slate-800 rounded-lg p-2 text-xs text-white outline-none" />
        </div>

        {/* 2. Aspect Ratio */}
        <div className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 space-y-1.5">
          <label className="text-[10px] font-bold text-cyan-400 uppercase">📺 2. Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-1.5">
            {["16:9", "9:16", "21:9", "4:3", "1:1", "Auto"].map((r) => (
              <button key={r} onClick={() => setRatio(r)} className={`p-1.5 rounded-lg border text-xs font-bold ${ratio === r ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{r}</button>
            ))}
          </div>
        </div>

        {/* 3. Duration */}
        <div className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 space-y-1.5">
          <label className="text-[10px] font-bold text-indigo-400 uppercase">📚 3. Timeline</label>
          <div className="grid grid-cols-3 gap-1.5">
            {["3 Min", "15 Min", "20 Min", "30 Min", "60 Min", "Custom"].map((d) => (
              <button key={d} onClick={() => setDuration(d)} className={`p-1.5 rounded-lg border text-xs font-bold ${duration === d ? "bg-indigo-950 border-indigo-500 text-indigo-300" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{d}</button>
            ))}
          </div>
        </div>

        {/* 4 & 5. AI Engines */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 space-y-1">
            <label className="text-[9px] font-bold text-purple-400 uppercase">🧠 4. Story AI</label>
            <div className="grid grid-cols-2 gap-1">
              {["Auto", "GPT", "Gemini", "Claude"].map((m) => (
                <button key={m} onClick={() => setStoryModel(m)} className={`py-1 text-[10px] font-bold rounded border ${storyModel === m ? "bg-purple-950 border-purple-500 text-purple-200" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{m}</button>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 space-y-1">
            <label className="text-[9px] font-bold text-cyan-400 uppercase">📹 5. Video AI</label>
            <div className="grid grid-cols-2 gap-1">
              {["Veo", "Kling", "Runway", "Hailuo"].map((vm) => (
                <button key={vm} onClick={() => setVideoModel(vm)} className={`py-1 text-[10px] font-bold rounded border ${videoModel === vm ? "bg-cyan-950 border-cyan-500 text-cyan-200" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{vm}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Styles */}
        <div className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 space-y-1.5">
          <label className="text-[10px] font-bold text-amber-400 uppercase">🎞️ 6. Visual Style</label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "Cinematic Epic", icon: "⚔️" }, { id: "Realistic 8K", icon: "📸" },
              { id: "Historical", icon: "🏛️" }, { id: "Dark Cyberpunk", icon: "🤖" },
              { id: "3D Animation", icon: "🧊" }, { id: "Anime 2D", icon: "✨" }
            ].map((st) => (
              <button key={st.id} onClick={() => setStyle(st.id)} className={`p-2 rounded-lg border text-xs font-bold flex justify-between ${style === st.id ? "bg-[#1f1910] border-amber-500 text-amber-300" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>
                <span>{st.icon} {st.id}</span>
                {style === st.id && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 7. Plans */}
        <div className="p-3 rounded-xl bg-[#0b1222] border border-slate-800 space-y-1.5">
          <label className="text-[10px] font-bold text-emerald-400 uppercase">💳 Subscription Plan ($ USD)</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: "free", name: "Free", price: "$0", cr: 50 },
              { id: "pro", name: "Pro", price: "$49", cr: 1500 },
              { id: "master", name: "Master", price: "$99", cr: 5000 }
            ].map((p) => (
              <button key={p.id} onClick={() => handlePlanSelect(p.id, p.cr)} className={`p-2 rounded-lg border text-center ${plan === p.id ? "border-emerald-500 bg-emerald-950/30" : "border-slate-800 bg-[#060a14]"}`}>
                <div className="text-[9px] text-slate-400 font-bold uppercase">{p.name}</div>
                <div className="text-xs font-black text-white">{p.price}</div>
                <div className="text-[8px] text-emerald-400 font-bold">{p.cr} Cr</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button onClick={handleGenerate} disabled={pipelineState === "generating"} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xs uppercase text-white shadow-lg">
          {pipelineState === "generating" ? "⚡ Rendering Video..." : "🚀 Generate Cinema Video Package"}
        </button>

        {/* Scene Editing Timeline */}
        {pipelineState === "completed" && scenes.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase">🎬 Generated Scenes Timeline</h3>
            {scenes.map((sc) => (
              <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-cyan-400">{sc.title}</span>
                  <span className="text-[9px] text-slate-400">{sc.camera}</span>
                </div>

                {editingSceneId === sc.id ? (
                  <div className="space-y-2 bg-[#060a14] p-2.5 rounded-lg border border-cyan-500">
                    <textarea value={editPromptText} onChange={(e) => setEditPromptText(e.target.value)} rows={2} className="w-full bg-[#0b1222] p-1.5 text-xs text-white rounded outline-none" />
                    <div className="flex gap-2">
                      <input type="text" value={editCameraText} onChange={(e) => setEditCameraText(e.target.value)} placeholder="Camera" className="w-1/2 bg-[#0b1222] p-1 text-xs text-white rounded outline-none" />
                      <input type="text" value={editVoiceText} onChange={(e) => setEditVoiceText(e.target.value)} placeholder="Voice" className="w-1/2 bg-[#0b1222] p-1 text-xs text-white rounded outline-none" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleSaveScene(sc.id)} className="flex-1 py-1.5 bg-emerald-600 text-[10px] font-bold rounded">💾 Save & Re-render</button>
                      <button onClick={() => setEditingSceneId(null)} className="px-2 py-1.5 bg-slate-800 text-[10px] text-slate-400 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-300 bg-[#060a14] p-2 rounded border border-slate-800">{sc.desc}</p>
                    <p className="text-[11px] text-slate-400 italic">🎙️ "{sc.voice}"</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleRegenerateScene(sc.id)} className="flex-1 py-1.5 bg-cyan-950 border border-cyan-500 text-cyan-300 text-[10px] font-bold rounded">🔄 Regenerate</button>
                      <button onClick={() => handleOpenEdit(sc)} className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded">✏️ Edit Prompt</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
            }
          // ... (ऊपर का कोड वही रहेगा)
            {scenes.map((sc) => (
              <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-cyan-400 uppercase">{sc.title}</span>
                  <span className="text-[10px] px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                    {sc.camera}
                  </span>
                </div>

                {editingSceneId === sc.id ? (
                  <div className="space-y-3 bg-[#060a14] p-4 rounded-xl border-2 border-cyan-500 animate-pulse">
                    <label className="text-[10px] text-cyan-400 font-black uppercase">Edit Prompt:</label>
                    <textarea value={editPromptText} onChange={(e) => setEditPromptText(e.target.value)} className="w-full bg-[#0b1222] p-3 text-xs text-white rounded-lg border border-slate-700" />
                    
                    <div className="flex gap-2">
                        <button onClick={() => handleSaveScene(sc.id)} className="flex-1 py-3 bg-emerald-600 rounded-xl font-black text-[11px]">SAVE & RE-RENDER</button>
                        <button onClick={() => setEditingSceneId(null)} className="px-4 py-3 bg-slate-800 rounded-xl font-black text-[11px]">CANCEL</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-300 italic">"{sc.desc}"</p>
                    <div className="flex gap-3">
                      <button onClick={() => handleRegenerateScene(sc.id)} className="flex-1 py-3 rounded-xl border border-cyan-500 text-cyan-400 font-black text-[11px] hover:bg-cyan-950/30">🔄 RE-GENERATE SCENE</button>
                      <button onClick={() => handleOpenEdit(sc)} className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-black text-[11px] hover:bg-slate-700">✏️ EDIT PROMPT</button>
                    </div>
                  </>
                )}
              </div>
            ))}
// // ... (ऊपर का कोड वही रहेगा)
            {scenes.map((sc) => (
              <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-cyan-400 uppercase">{sc.title}</span>
                  <span className="text-[10px] px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                    {sc.camera}
                  </span>
                </div>

                {editingSceneId === sc.id ? (
                  <div className="space-y-3 bg-[#060a14] p-4 rounded-xl border-2 border-cyan-500 animate-pulse">
                    <label className="text-[10px] text-cyan-400 font-black uppercase">Edit Prompt:</label>
                    <textarea value={editPromptText} onChange={(e) => setEditPromptText(e.target.value)} className="w-full bg-[#0b1222] p-3 text-xs text-white rounded-lg border border-slate-700" />
                    
                    <div className="flex gap-2">
                        <button onClick={() => handleSaveScene(sc.id)} className="flex-1 py-3 bg-emerald-600 rounded-xl font-black text-[11px]">SAVE & RE-RENDER</button>
                        <button onClick={() => setEditingSceneId(null)} className="px-4 py-3 bg-slate-800 rounded-xl font-black text-[11px]">CANCEL</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-300 italic">"{sc.desc}"</p>
                    <div className="flex gap-3">
                      <button onClick={() => handleRegenerateScene(sc.id)} className="flex-1 py-3 rounded-xl border border-cyan-500 text-cyan-400 font-black text-[11px] hover:bg-cyan-950/30">🔄 RE-GENERATE SCENE</button>
                      <button onClick={() => handleOpenEdit(sc)} className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-black text-[11px] hover:bg-slate-700">✏️ EDIT PROMPT</button>
                    </div>
                  </>
                )}
              </div>
            ))}
// ... (बाकी का कोड)


