"use client";
import React, { useState, useEffect } from "react";

export default function CineFlowMasterApp() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("studio");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Free vs Subscription Plan Logic
  const [credits, setCredits] = useState(5);
  const [isPro, setIsPro] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // Page 1 UI Inputs (Exact Original)
  const [prompt, setPrompt] = useState(
    "यीशु तूफ़ान के बीच नाव में शिष्यों के साथ हैं। शांत और सामर्थी मुद्रा, रात का भयानक समुद्री तूफ़ान, बिजली की चमक और विशाल लहरें।"
  );
  const [ratio, setRatio] = useState("16:9");
  const [timeline, setTimeline] = useState("60 Min");
  const [storyEngine, setStoryEngine] = useState("Auto");
  const [videoEngine, setVideoEngine] = useState("Veo");
  const [style, setStyle] = useState("Bible Art");

  // Page 2 Auto Quality & SEO Pipeline
  const [characterLock, setCharacterLock] = useState(true);
  const [voiceClone, setVoiceClone] = useState(true);
  const [autoFoley, setAutoFoley] = useState(true);
  const [hdrGrade, setHdrGrade] = useState(true);
  const [anim3D, setAnim3D] = useState(true);
  const [autoSubtitles, setAutoSubtitles] = useState(true);

  // Vault Projects State
  const [vaultProjects, setVaultProjects] = useState([]);
  const [selectedVaultProj, setSelectedVaultProj] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Daily Free Credit Refill System
    const lastDate = localStorage.getItem("cf_last_login_date");
    const today = new Date().toDateString();

    if (lastDate !== today) {
      setCredits(5);
      localStorage.setItem("cf_last_login_date", today);
      localStorage.setItem("cf_free_credits", "5");
    } else {
      const savedCredits = localStorage.getItem("cf_free_credits");
      setCredits(savedCredits !== null ? parseInt(savedCredits, 10) : 5);
    }

    const proStatus = localStorage.getItem("cf_is_pro") === "true";
    setIsPro(proStatus);

    try {
      const saved = JSON.parse(localStorage.getItem("cf_master_archive") || "[]");
      setVaultProjects(saved);
      if (saved.length > 0) setSelectedVaultProj(saved[0]);
    } catch (e) {
      setVaultProjects([]);
    }
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2500);
  };

  const handleLogin = (provider) => {
    setIsLoggedIn(true);
    notify(`✅ Logged in via ${provider}`);
  };

  const handlePaymentSuccess = () => {
    setIsPro(true);
    localStorage.setItem("cf_is_pro", "true");
    setShowPaymentModal(false);
    notify("🎉 Pro Subscription Activated! Unlimited 4K Clean Renders.");
  };

  const applyMasterPreset = () => {
    setTimeline("60 Min");
    setStoryEngine("Auto");
    setVideoEngine("Veo");
    setStyle("Bible Art");
    setCharacterLock(true);
    notify("⭐ AK Ministry Master Preset Applied!");
  };

  const handleGenerate = () => {
    if (!isPro && credits <= 0) {
      setShowPaymentModal(true);
      notify("⚠️ Daily Free Credits Exhausted! Upgrade to Pro.");
      return;
    }

    notify("🚀 Auto-Generating YouTube Copyright-Free 4K Film...");
    setTimeout(() => {
      if (!isPro) {
        const remaining = credits - 1;
        setCredits(remaining);
        localStorage.setItem("cf_free_credits", remaining.toString());
      }

      const newProj = {
        id: Date.now(),
        name: prompt.slice(0, 28),
        date: new Date().toLocaleDateString(),
        ratio,
        timeline,
        videoEngine,
        style,
        resolution: "4K Master (100% Watermark Free)",
        seoTags: "✅ YouTube SEO Optimized • 100% Original Audio & Visuals • No Copyright",
        scenes: [
          {
            id: 1,
            title: "Scene 01: The Mighty Calm",
            desc: prompt,
            voice: "और यीशु ने उठकर आंधी को डांटा, और शांत हो गया...",
            bgm: "Original Celestial Strings (Copyright Free)",
            img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
            camera: "Techno Crane Sweep",
            lut: "Cinematic Teal & Gold",
            animation: "Dynamic Fluid Simulation",
            textStyle: "Gold Hindi Subtitles"
          },
          {
            id: 2,
            title: "Scene 02: Divine Light & Glory",
            desc: "तूफान थमा और बादलों के बीच से स्वर्णिम प्रकाश नाव पर चमका।",
            voice: "तुम्हारा विश्वास कहाँ है? शिष्य विस्मय से भर गए...",
            bgm: "Deep Ambient Chants (Copyright Free)",
            img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80",
            camera: "FPV Smooth Glide",
            lut: "High Dynamic Range HDR",
            animation: "Divine Ray Particles",
            textStyle: "Clean White Sans"
          }
        ]
      };

      const updated = [newProj, ...vaultProjects];
      setVaultProjects(updated);
      setSelectedVaultProj(newProj);
      localStorage.setItem("cf_master_archive", JSON.stringify(updated));
      notify("✅ YouTube Ready 4K Master Saved to Vault!");
    }, 1200);
  };

  const updateSceneInVault = (sceneId, field, value) => {
    if (!selectedVaultProj) return;
    const updatedScenes = selectedVaultProj.scenes.map((s) =>
      s.id === sceneId ? { ...s, [field]: value } : s
    );
    const updatedProj = { ...selectedVaultProj, scenes: updatedScenes };
    const updatedList = vaultProjects.map((p) =>
      p.id === selectedVaultProj.id ? updatedProj : p
    );
    setSelectedVaultProj(updatedProj);
    setVaultProjects(updatedList);
    localStorage.setItem("cf_master_archive", JSON.stringify(updatedList));
    notify(`✅ Scene 0${sceneId} ${field.toUpperCase()} Updated!`);
  };

  const deleteVaultProj = (id) => {
    const filtered = vaultProjects.filter((p) => p.id !== id);
    setVaultProjects(filtered);
    localStorage.setItem("cf_master_archive", JSON.stringify(filtered));
    if (selectedVaultProj?.id === id) setSelectedVaultProj(filtered[0] || null);
    notify("🗑️ Film Archive Deleted!");
  };

  if (!mounted) return null;

  // 1. AUTHENTICATION GATEWAY
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#060913] text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-[#0a101f] p-6 rounded-3xl border border-slate-800/80 space-y-4 shadow-2xl">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-[#146df7] to-[#0ea5e9] flex items-center justify-center text-xl font-black shadow-lg shadow-cyan-500/20">
              🎬
            </div>
            <h1 className="text-base font-black text-white tracking-wider">CineFlow AI Pro Studio</h1>
            <p className="text-[10px] text-slate-400">Google Flow-Grade Autonomous Cinema Engine</p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleLogin("Google")}
              className="w-full py-2.5 bg-[#121a2d] hover:bg-[#18233c] border border-slate-700/70 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white transition active:scale-95"
            >
              <span className="text-sm">🔴</span> Continue with Google / Gmail
            </button>
            <button
              onClick={() => handleLogin("Facebook")}
              className="w-full py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-[#4f9eff] transition active:scale-95"
            >
              <span className="text-sm">🔵</span> Continue with Facebook
            </button>
            <button
              onClick={() => handleLogin("Instagram")}
              className="w-full py-2.5 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 hover:from-pink-500/20 border border-pink-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-pink-300 transition active:scale-95"
            >
              <span className="text-sm">🟣</span> Continue with Instagram
            </button>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[9px] text-slate-500 font-bold uppercase">Or Credentials</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <div className="space-y-2.5">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Email / ID</label>
              <input
                type="text"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050811] p-2.5 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#050811] p-2.5 pr-14 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-lg font-bold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              onClick={() => handleLogin("Email")}
              className="w-full py-3 bg-gradient-to-r from-[#146df7] to-[#0ea5e9] font-bold text-xs rounded-xl uppercase text-white shadow-lg active:scale-95 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN APP INTERFACE
  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 p-4 pb-24 max-w-md mx-auto space-y-4 font-sans text-xs">
      {/* Top Header */}
      <header className="flex justify-between items-center border-b border-slate-800/80 pb-2.5 sticky top-0 bg-[#060913]/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#146df7] to-[#0ea5e9] flex items-center justify-center text-sm font-black shadow-md">
            🎬
          </div>
          <div>
            <h1 className="text-xs font-black text-[#0ea5e9]">
              CineFlow <span className="text-[#38bdf8]">AI Pro Studio</span>
            </h1>
            <p className="text-[8px] text-slate-500">
              {isPro ? "👑 Pro Unlimited" : `⚡ Daily Free: ${credits}/5`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {!isPro ? (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[9px] px-2 py-1 rounded-lg uppercase shadow-md"
            >
              ⚡ Get Pro
            </button>
          ) : (
            <span className="bg-emerald-950 border border-emerald-500 text-emerald-300 text-[8px] font-bold px-2 py-0.5 rounded-lg">
              PRO ✔
            </span>
          )}
          <span className="bg-[#1f190e] border border-amber-500/40 text-amber-300 text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            ✨ AK Engine
          </span>
          <button
            onClick={() => setActiveTab(activeTab === "studio" ? "vault" : "studio")}
            className="px-2.5 py-1 rounded-lg font-bold text-[10px] bg-[#0a101f] text-cyan-400 border border-slate-800"
          >
            {activeTab === "studio" ? `Vault 📂 (${vaultProjects.length})` : "Studio 🎬"}
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-[9px] bg-red-950 text-red-400 border border-red-900 px-2 py-1 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </header>

      {statusMsg && (
        <div className="bg-cyan-950/90 border border-cyan-500 text-cyan-300 p-2 rounded-xl text-center font-bold text-xs shadow-lg">
          {statusMsg}
        </div>
      )}

      {/* PAGE 1: STUDIO (EXACT SCREENSHOT LAYOUT) */}
      {activeTab === "studio" && (
        <div className="space-y-4">
          <div className="text-center space-y-1 pt-1">
            <span className="text-[9px] bg-[#0c1e29] border border-cyan-500/30 text-cyan-400 px-3 py-0.5 rounded-full font-bold inline-block">
              ✨ Multi-Agent Autonomous Film Pipeline
            </span>
            <h2 className="text-base font-black text-white leading-snug">
              Turn a Single Idea into a <span className="text-[#38bdf8]">Full-Feature Cinematic Film</span>
            </h2>
          </div>

          {/* Master Preset Card */}
          <div className="bg-gradient-to-b from-[#141209] to-[#0a101f] border border-amber-500/40 p-3.5 rounded-2xl space-y-2.5 shadow-xl">
            <div className="flex items-start gap-2.5">
              <span className="text-amber-400 text-base">🔖</span>
              <div>
                <h3 className="font-bold text-amber-300 text-[11px]">⭐ AK MINISTRY MASTER PRESET</h3>
                <p className="text-[9px] text-slate-400 leading-tight">
                  60 Min (360 Scenes) • Ultra-Slow Deep Hindi Narration (1.5s Pause) • Character Locked
                </p>
              </div>
            </div>
            <button
              onClick={applyMasterPreset}
              className="w-full py-2.5 bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider shadow-lg active:scale-95 transition"
            >
              Apply Preset
            </button>
          </div>

          {/* 1. Master Story / Screenplay Input */}
          <div className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-black text-slate-200 text-[10px] uppercase">
                🎛️ 1. Master Story / Screenplay Input
              </span>
              <span className="text-[8px] bg-[#082838] text-cyan-300 border border-cyan-700/60 px-2 py-0.5 rounded font-bold">
                Auto-Scene Decomposition On
              </span>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full bg-[#050811] p-3 rounded-xl text-slate-200 border border-slate-800 text-[11px] outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          {/* 2. Aspect Ratio */}
          <div className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
            <span className="font-black text-slate-200 text-[10px] block uppercase">📺 2. Aspect Ratio</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "16:9", sub: "YouTube" },
                { id: "9:16", sub: "Shorts/Reels" },
                { id: "21:9", sub: "Cinematic" },
                { id: "4:3", sub: "Classic" },
                { id: "1:1", sub: "Square" },
                { id: "Auto", sub: "AI Smart" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRatio(item.id)}
                  className={`p-2 rounded-xl border text-left transition ${
                    ratio === item.id ? "bg-[#0b2438] border-cyan-500 text-cyan-300" : "bg-[#050811] border-slate-800/80 text-slate-400"
                  }`}
                >
                  <div className="font-bold text-[10px]">{item.id}</div>
                  <div className="text-[8px] opacity-60">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Timeline & Long Video Mode */}
          <div className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
            <span className="font-black text-slate-200 text-[10px] block uppercase">📚 3. Timeline & Long Video Mode</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "3 Min", sub: "18 Scenes" },
                { id: "15 Min", sub: "90 Scenes" },
                { id: "20 Min", sub: "120 Scenes" },
                { id: "30 Min", sub: "180 Scenes" },
                { id: "60 Min", sub: "360 Scenes" },
                { id: "Custom", sub: "Variable" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTimeline(item.id)}
                  className={`p-2 rounded-xl border text-left transition ${
                    timeline === item.id ? "bg-[#181336] border-purple-500 text-purple-300" : "bg-[#050811] border-slate-800/80 text-slate-400"
                  }`}
                >
                  <div className="font-bold text-[10px]">{item.id}</div>
                  <div className="text-[8px] opacity-60">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Story Engine Model */}
          <div className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
            <span className="font-black text-slate-200 text-[10px] block uppercase">🧠 4. Story Engine Model</span>
            <div className="grid grid-cols-3 gap-1.5">
              {["Auto", "GPT", "Gemini", "Claude", "Fast AI", "Pro AI"].map((eng) => (
                <button
                  key={eng}
                  onClick={() => setStoryEngine(eng)}
                  className={`py-2 rounded-xl border font-bold text-[10px] transition ${
                    storyEngine === eng ? "bg-[#231542] border-purple-500 text-purple-200" : "bg-[#050811] border-slate-800/80 text-slate-400"
                  }`}
                >
                  {eng}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Video Generation Model */}
          <div className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
            <span className="font-black text-slate-200 text-[10px] block uppercase">🎥 5. Video Generation Model</span>
            <div className="grid grid-cols-3 gap-1.5">
              {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Auto"].map((v) => (
                <button
                  key={v}
                  onClick={() => setVideoEngine(v)}
                  className={`py-2 rounded-xl border font-bold text-[10px] transition ${
                    videoEngine === v ? "bg-[#0b2438] border-cyan-500 text-cyan-300" : "bg-[#050811] border-slate-800/80 text-slate-400"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Visual Atmosphere & Style */}
          <div className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
            <span class
