"use client";

import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [prompt, setPrompt] = useState("एक प्राचीन योद्धा घने जंगल में रहस्यमयी मंदिर की खोज कर रहा है। सिनेमाई 8K विजुअल्स।");
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
  const [scenes, setScenes] = useState([]);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    notify("लॉगिन सफल!");
  };

  const handleGenerate = () => {
    if (credits < 10) return notify("⚠️ क्रेडिट्स समाप्त! अपग्रेड करें।");
    setPipelineState("generating");
    notify("🚀 AI फिल्म रेंडरिंग शुरू...");
    setTimeout(() => {
      setCredits((prev) => prev - 10);
      setScenes([
        { id: 1, title: "Scene 01: Storm Begins", desc: "योद्धा घने जंगल में प्रवेश करता है।", camera: "Wide Drone", voice: "रात बहुत अंधेरी थी...", status: "Ready" },
        { id: 2, title: "Scene 02: Ancient Temple", desc: "मंदिर के द्वार पर रहस्यमयी रोशनी।", camera: "Dolly In", voice: "सामने पुराना दरवाजा दिखा...", status: "Ready" },
        { id: 3, title: "Scene 03: The Awakening", desc: "दरवाजा धीरे-धीरे खुलता है।", camera: "Low Angle", voice: "कदम आगे बढ़ाए...", status: "Ready" },
      ]);
      setPipelineState("completed");
      notify("✅ फिल्म और सीन्स ऑटो-जनरेट हो चुके हैं!");
    }, 1800);
  };

  const handleSaveScene = (id) => {
    setScenes((prev) => prev.map((s) => (s.id === id ? { ...s, desc: editPromptText } : s)));
    setEditingSceneId(null);
    notify(`✅ Scene 0${id} अपडेट हो गया!`);
  };

  const handleRegenerateScene = (id) => {
    notify(`🔄 Scene 0${id} री-रोल हो रहा है...`);
    setTimeout(() => {
      setScenes((prev) => prev.map((s) => (s.id === id ? { ...s, desc: `${s.desc} (Fresh AI Variation)` } : s)));
      notify(`✅ Scene 0${id} नया बन गया!`);
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-black">🎬</div>
            <h2 className="text-base font-black text-white">{authMode === "login" ? "Studio Login" : "Create Account"}</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setIsLoggedIn(true); notify("Google Login Success!"); }} type="button" className="py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs">🌐 Google</button>
            <button onClick={() => { setIsLoggedIn(true); notify("Facebook Login Success!"); }} type="button" className="py-2.5 rounded-xl bg-[#1877F2] text-white font-bold text-xs">🔵 Facebook</button>
          </div>
          <form onSubmit={handleAuth} className="space-y-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-[#060a14] border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none" />
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-[#060a14] border border-slate-700 rounded-xl p-2.5 text-xs text-white outline-none pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-[10px] font-bold text-cyan-400">{showPassword ? "HIDE" : "SHOW"}</button>
            </div>
            <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xs text-white uppercase">{authMode === "login" ? "Enter Studio" : "Register"}</button>
          </form>
          <div className="text-center">
            <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-[11px] text-slate-400 hover:text-cyan-400">{authMode === "login" ? "नया अकाउंट? Sign Up" : "अकाउंट है? Login"}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24">
      <header className="px-4 py-3 border-b border-slate-800 bg-[#090f1d] sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs">🎬</div>
          <div>
            <h1 className="text-xs font-black uppercase">CineFlow Pro</h1>
            <p className="text-[9px] text-cyan-400 font-bold">{credits} Credits Active</p>
          </div>
        </div>
        <button onClick={() => { setIsLoggedIn(false); setPipelineState("idle"); }} className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-3 py-1 rounded-lg font-bold">Logout</button>
      </header>

      {statusMsg && <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-cyan-950 border border-cyan-500 text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full shadow-2xl">{statusMsg}</div>}

      <main className="max-w-xl mx-auto px-4 pt-4 space-y-4">
        {/* 1. Master Prompt */}
        <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-cyan-400">🎛️ 1. Master Story Input</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 outline-none" />
        </div>

        {/* 2. Aspect Ratio */}
        <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-cyan-400">📺 2. Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-1.5">
            {["16:9", "9:16", "21:9", "4:3", "1:1", "Auto"].map((r) => (
              <button key={r} onClick={() => setRatio(r)} className={`p-2 rounded-xl border text-xs font-bold ${ratio === r ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{r}</button>
            ))}
          </div>
        </div>

        {/* 3. Duration */}
        <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-indigo-400">📚 3. Timeline Mode</label>
          <div className="grid grid-cols-3 gap-1.5">
            {["3 Min", "15 Min", "20 Min", "30 Min", "60 Min", "Custom"].map((d) => (
              <button key={d} onClick={() => setDuration(d)} className={`p-2 rounded-xl border text-xs font-bold ${duration === d ? "bg-indigo-950 border-indigo-500 text-indigo-300" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{d}</button>
            ))}
          </div>
        </div>

        {/* 4 & 5. AI Engines */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1">
            <label className="text-[9px] font-black uppercase text-purple-400">🧠 4. Story AI</label>
            <div className="grid grid-cols-2 gap-1">
              {["Auto", "GPT", "Gemini", "Claude"].map((m) => (
                <button key={m} onClick={() => setStoryModel(m)} className={`py-1.5 text-[10px] font-bold rounded-lg border ${storyModel === m ? "bg-purple-950 border-purple-500 text-purple-200" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{m}</button>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1">
            <label className="text-[9px] font-black uppercase text-cyan-400">📹 5. Video AI</label>
            <div className="grid grid-cols-2 gap-1">
              {["Veo", "Kling", "Runway", "Hailuo"].map((vm) => (
                <button key={vm} onClick={() => setVideoModel(vm)} className={`py-1.5 text-[10px] font-bold rounded-lg border ${videoModel === vm ? "bg-cyan-950 border-cyan-500 text-cyan-200" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>{vm}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Visual Atmosphere */}
        <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-amber-400">🎞️ 6. Visual Atmosphere & Style</label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "Cinematic Epic", icon: "⚔️" }, { id: "Realistic 8K", icon: "📸" },
              { id: "Historical", icon: "🏛️" }, { id: "Dark Cyberpunk", icon: "🤖" },
              { id: "3D Animation", icon: "🧊" }, { id: "Anime 2D", icon: "✨" },
              { id: "Documentary", icon: "🎥" }, { id: "Sci-Fi Space", icon: "🚀" }
            ].map((st) => (
              <button key={st.id} onClick={() => setStyle(st.id)} className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-between ${style === st.id ? "bg-[#1f1910] border-amber-500 text-amber-300" : "bg-[#060a14] border-slate-800 text-slate-400"}`}>
                <span className="flex items-center gap-1.5"><span>{st.icon}</span><span>{st.id}</span></span>
                {style === st.id && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 7. Plans */}
        <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-emerald-400">💳 Subscription Plans ($ USD)</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: "free", name: "Free", price: "$0", cr: 50 },
              { id: "pro", name: "Pro", price: "$49", cr: 1500 },
              { id: "master", name: "Master", price: "$99", cr: 5000 }
            ].map((p) => (
              <button key={p.id} onClick={() => { setPlan(p.id); setCredits(p.cr); notify(`Plan: ${p.name}`); }} className={`p-2.5 rounded-xl border text-center ${plan === p.id ? "border-emerald-500 bg-emerald-950/30 scale-[1.02]" : "border-slate-800 bg-[#060a14] text-slate-400"}`}>
                <div className="text-[9px] font-bold uppercase text-slate-400">{p.name}</div>
                <div className="text-xs font-black text-white">{p.price}</div>
                <div className="text-[8px] text-emerald-400 font-bold">{p.cr} Cr</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button onClick={handleGenerate} disabled={pipelineState === "generating"} className="w-full py-4 bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl active:scale-[0.99]">
          {pipelineState === "generating" ? "⚡ Rendering Video & Audio..." : "🚀 Generate Cinema Video Package"}
        </button>

        {/* Scene Editing Timeline */}
        {pipelineState === "completed" && scenes.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-black text-white uppercase tracking-wider">🎬 Generated Film Timeline</h3>
            {scenes.map((sc) => (
              <div key={sc.id} className="bg-[#0b1222] border border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-cyan-400 uppercase">{sc.title}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">{sc.camera}</span>
                </div>

                {editingSceneId === sc.id ? (
                  <div className="space-y-2 bg-[#060a14] p-3 rounded-xl border border-cyan-500">
                    <label className="text-[9px] text-cyan-400 font-bold uppercase block">Edit Visual Prompt:</label>
                    <textarea value={editPromptText} onChange={(e) => setEditPromptText(e.target.value)} rows={2} className="w-full bg-[#0b1222] p-2 text-xs text-white rounded-lg border border-slate-700 outline-none" />
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => handleSaveScene(sc.id)} className="flex-1 py-2 bg-emerald-600 text-[10px] font-black text-white uppercase rounded-lg">💾 Save & Re-render</button>
                      <button onClick={() => setEditingSceneId(null)} className="px-3 py-2 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-lg">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-slate-300 bg-[#060a14] p-2.5 rounded-xl border border-slate-800">{sc.desc}</p>
                    <p className="text-[11px] text-slate-400 italic">🎙️ Voiceover: "{sc.voice}"</p>
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => handleRegenerateScene(sc.id)} className="flex-1 py-2 rounded-xl bg-cyan-950 border border-cyan-500 text-cyan-300 text-[10px] font-black uppercase flex items-center justify-center gap-1">🔄 Regenerate</button>
                      <button onClick={() => { setEditingSceneId(sc.id); setEditPromptText(sc.desc); }} className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-black uppercase">✏️ Edit Prompt</button>
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
