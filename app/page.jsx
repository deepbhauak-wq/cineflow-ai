"use client";

import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 6-Point Engine States
  const [prompt, setPrompt] = useState(
    "एक प्राचीन योद्धा घने जंगल में रहस्यमयी मंदिर की खोज कर रहा है। रात का समय, तेज बारिश, सिनेमाई लाइटिंग और 8K रियलिस्टिक विजुअल्स।"
  );
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min");
  const [storyModel, setStoryModel] = useState("Auto");
  const [videoModel, setVideoModel] = useState("Veo");
  const [style, setStyle] = useState("Cinematic Epic");
  const [plan, setPlan] = useState("free");
  const [credits, setCredits] = useState(50);
  const [statusMsg, setStatusMsg] = useState("");

  // Pipeline Execution States
  const [pipelineState, setPipelineState] = useState("idle");
  const [editingSceneId, setEditingSceneId] = useState(null);
  const [editPromptText, setEditPromptText] = useState("");
  const [editVoiceText, setEditVoiceText] = useState("");
  const [editCameraText, setEditCameraText] = useState("");

  const [scenes, setScenes] = useState([]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setStatusMsg("लॉगिन सफल!");
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleSocialLogin = (provider) => {
    setIsLoggedIn(true);
    setStatusMsg(`${provider} से लॉगिन पूरा हुआ!`);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handlePlanSelect = (planId, crAmount) => {
    setPlan(planId);
    setCredits(crAmount);
    setStatusMsg(`Plan Activated: ${planId.toUpperCase()} (${crAmount} Credits)`);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  // 1-Click Autonomous Pipeline Trigger
  const handleGenerate = () => {
    if (credits < 10) {
      setStatusMsg("⚠️ क्रेडिट्स समाप्त हो चुके हैं! प्लान अपग्रेड करें।");
      setTimeout(() => setStatusMsg(""), 3000);
      return;
    }
    setPipelineState("generating");
    setStatusMsg("🚀 ऑटोमैटिक AI फिल्म पाइपलाइन शुरू हो रही है...");

    setTimeout(() => {
      setCredits((prev) => prev - 10);
      setScenes([
        {
          id: 1,
          title: "Scene 01: The Storm Begins",
          desc: "योद्धा घने जंगल में प्रवेश करता है, बिजली चमकती है।",
          camera: "Wide Drone Shot",
          voice: "रात बहुत अंधेरी थी और हवाएं तेज...",
          status: "Ready",
        },
        {
          id: 2,
          title: "Scene 02: Discovery of the Temple",
          desc: "प्राचीन मंदिर के दरवाजे पर रहस्यमयी रोशनी का दिखना।",
          camera: "Tracking Dolly In",
          voice: "सामने सदियों पुराना दरवाजा दिखाई दिया...",
          status: "Ready",
        },
        {
          id: 3,
          title: "Scene 03: The Awakening",
          desc: "दरवाजा धीरे-धीरे खुलता है और दिव्य ऊर्जा निकलती है।",
          camera: "Low Angle Dramatic",
          voice: "जैसे ही कदम आगे बढ़ाए, सब कुछ बदल गया...",
          status: "Ready",
        },
      ]);
      setPipelineState("completed");
      setStatusMsg("✅ पूरी फिल्म और सीन्स ऑटो-जनरेट हो चुके हैं!");
      setTimeout(() => setStatusMsg(""), 4000);
    }, 2000);
  };

  // Open Inline Scene Editor
  const handleOpenEdit = (sc) => {
    setEditingSceneId(sc.id);
    setEditPromptText(sc.desc);
    setEditVoiceText(sc.voice);
    setEditCameraText(sc.camera);
  };

  // Save Scene Changes & Re-render
  const handleSaveScene = (id) => {
    setScenes((prev) =>
      prev.map((sc) =>
        sc.id === id
          ? {
              ...sc,
              desc: editPromptText,
              voice: editVoiceText,
              camera: editCameraText,
              status: "Updated & Ready",
            }
          : sc
      )
    );
    setEditingSceneId(null);
    setStatusMsg(`✅ Scene 0${id} अपडेट और रेंडर हो गया!`);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  // 1-Click Fast Regenerate Single Scene
  const handleRegenerateScene = (id) => {
    setStatusMsg(`🔄 Scene 0${id} को दोबारा री-रोल किया जा रहा है...`);
    setScenes((prev) =>
      prev.map((sc) => (sc.id === id ? { ...sc, status: "Regenerating..." } : sc))
    );
    setTimeout(() => {
      setScenes((prev) =>
        prev.map((sc) =>
          sc.id === id
            ? { ...sc, desc: `${sc.desc} (Fresh AI Variation)`, status: "Ready" }
            : sc
        )
      );
      setStatusMsg(`✅ Scene 0${id} नया बन चुका है!`);
      setTimeout(() => setStatusMsg(""), 3000);
    }, 1500);
  };

  // 1. Initial Login Gate
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-5">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-black">
              🎬
            </div>
            <h2 className="text-lg font-black text-white">
              {authMode === "login" ? "Studio Login" : "Create Studio Account"}
            </h2>
            <p className="text-[11px] text-slate-400">Autonomous Cinema AI Engine</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSocialLogin("Google")}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>🌐</span> Google
            </button>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-[#1877F2] text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>🔵</span> Facebook
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-3">
            {authMode === "signup" && (
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-[#060a14] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500"
              />
            )}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-[#060a14] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#060a14] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-500 pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[10px] font-bold text-cyan-400 cursor-pointer"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-xs uppercase tracking-wider text-white active:scale-95 cursor-pointer"
            >
              {authMode === "login" ? "Enter Studio" : "Register Account"}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
              className="text-[11px] text-slate-400 hover:text-cyan-400 cursor-pointer"
            >
              {authMode === "login" ? "नया अकाउंट? Sign Up" : "अकाउंट मौजूद है? Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 6-Point Studio + Live Scene Regenerator
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-28 selection:bg-cyan-500 selection:text-white">
      <header className="px-4 py-3 border-b border-slate-800 bg-[#090f1d] sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-sm">
            🎬
          </div>
          <div>
            <h1 className="text-xs font-black uppercase tracking-wider">CineFlow Pro</h1>
            <p className="text-[9px] text-cyan-400 font-bold">{credits} Active Credits</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setPipelineState("idle");
          }}
          className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-3 py-1 rounded-lg font-bold cursor-pointer"
        >
          Logout
        </button>
      </header>

      {statusMsg && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-cyan-950 border border-cyan-500 text-cyan-300 text-xs font-bold px-4 py-1.5 rounded-full shadow-2xl">
          {statusMsg}
        </div>
      )}

      <main className="max-w-xl mx-auto px-4 pt-5 space-y-4">
        {/* 1. Master Story Input */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-cyan-400 flex items-center gap-2">
            🎛️ 1. Master Story / Screenplay Input
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-cyan-500 resize-none leading-relaxed"
          />
        </div>

        {/* 2. Aspect Ratio */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-cyan-400">📺 2. Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "16:9", label: "16:9 Cinema" },
              { id: "9:16", label: "9:16 Shorts" },
              { id: "21:9", label: "21:9 Ultra" },
              { id: "4:3", label: "4:3 Classic" },
              { id: "1:1", label: "1:1 Square" },
              { id: "Auto", label: "AI Smart" },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRatio(r.id)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  ratio === r.id
                    ? "bg-cyan-950 border-cyan-500 text-cyan-300"
                    : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Timeline */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-indigo-400">
            📚 3. Timeline Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["3 Min", "15 Min", "20 Min", "30 Min", "60 Min", "Custom"].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  duration === d
                    ? "bg-indigo-950 border-indigo-500 text-indigo-300"
                    : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 4 & 5. Models */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1.5">
            <label className="text-[9px] font-black uppercase text-purple-400">🧠 4. Story Engine</label>
            <div className="grid grid-cols-2 gap-1.5">
              {["Auto", "GPT", "Gemini", "Claude"].map((m) => (
                <button
                  key={m}
                  onClick={() => setStoryModel(m)}
                  className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                    storyModel === m
                      ? "bg-purple-950 border-purple-500 text-purple-200"
                      : "bg-[#060a14] border-slate-800 text-slate-400"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1.5">
            <label className="text-[9px] font-black uppercase text-cyan-400">📹 5. Video Model</label>
            <div className="grid grid-cols-2 gap-1.5">
              {["Veo", "Kling", "Runway", "Hailuo"].map((vm) => (
                <button
                  key={vm}
                  onClick={() => setVideoModel(vm)}
                  className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                    videoModel === vm
                      ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                      : "bg-[#060a14] border-slate-800 text-slate-400"
                  }`}
                >
                  {vm}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Visual Atmosphere & Style */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-amber-400">
            🎞️ 6. Visual Atmosphere & Style
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "Cinematic Epic", icon: "⚔️" },
              { id: "Realistic 8K", icon: "📸" },
              { id: "Historical", icon: "🏛️" },
              { id: "Dark Cyberpunk", icon: "🤖" },
              { id: "3D Animation", icon: "🧊" },
              { id: "Anime 2D", icon: "✨" },
              { id: "Documentary", icon: "🎥" },
              { id: "Sci-Fi Space", icon: "🚀" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStyle(st.id)}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                  style === st.id
                    ? "bg-[#1f1910] border-amber-500 text-amber-300"
                    : "bg-[#060a14] border-slate-800 text-slate-400"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{st.icon}</span>
                  <span>{st.id}</span>
                </span>
                {style === st.id && <span className="text-amber-400 font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* 7. Subscription Plans */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-[10px] font-black uppercase text-emerald-400 flex items-center gap-1.5">
            <span>💳</span> Subscription Plans (US Dollar)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "free", name: "Free Tier", price: "$0", cr: 50 },
              { id: "pro", name: "Pro Studio", price: "$49", cr: 1500 },
              { id: "master", name: "Master Studio", price: "$99", cr: 5000 },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handlePlanSelect(p.id, p.cr)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  plan === p.id
                    ? "border-emerald-500 bg-emerald-950/30 scale-[1.02]"
                    : "border-slate-800 bg-[#060a14] text-slate-400"
                }`}
              >
                <div className="text-[9px] font-bold uppercase text-slate-400">{p.name}</div>
                <div className="text-sm font-black text-white my-0.5">{p.price}</div>
                <div className="text-[9px] text-emerald-400 font-semibold">{p.cr} Credits</div>
              </button>
            ))}
          </div>
        </div>

        {/* Master 1-Click Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={pipelineState === "generating"}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl transition-all cursor-pointer ${
            pipelineState === "generating"
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 active:scale-[0.99]"
          }`}
        >
          {pipelineState === "generating"
            ? "⚡ Rendering Complete Video & Audio..."
            : "🚀 Generate Cinema Video Package"}
        </button>

        {/* Live Scene Studio with Real Editing Box */}
        {pipelineState === "completed" && scenes.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  🎬 Generated Film Timeline
                </h3>
                <p className="text-[10px] text-slate-400">
                  Select any scene below to edit prompt or re-render:
                </p>
              </div>
              <button className="bg-emerald-950 border border-emerald-500 text-emerald-300 text-[10px] font-bold px-3 py-1.5 rounded-lg active:scale-95">
                ⬇️ Export Full MP4
              </button>
            </div>

            <div className="space-y-3">
              {scenes.map((sc) => (
                <div
                  key={sc.id}
                  className="bg-[#0b1222] border border-slate-800 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-cyan-400">{sc.title}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      {sc.camera}
                    </span>
                  </div>

                  {/* If Scene is being Edited */}
                  {editingSceneId === sc.id ? (
                    <div className="space-y-2 bg-[#060a14] p-3 rounded-xl border border-cyan-500/50">
                      <label className="text-[9px] text-cyan-400 font-bold uppercase block">
                        Edit Scene Visual Prompt:
                      </label>
                      <textarea
                        value={editPromptText}
              
