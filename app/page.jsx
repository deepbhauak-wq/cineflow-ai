"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Tabs & Modes
  const [mainTab, setMainTab] = useState("Home"); // "Home", "Create", "Mine"
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [scriptMode, setScriptMode] = useState("Smart");

  // Dynamic Story State
  const [prompt, setPrompt] = useState(
    "एक साहसी नायक जो प्राचीन दक्षिण भारत के घने जंगलों और मंदिरों के बीच एक विशाल रहस्यमयी शक्ति की खोज में निकलता है। भव्य सिनेमाई दृश्य, 4K रियलिज्म।"
  );

  // Settings
  const [aspectRatio, setAspectRatio] = useState("Landscape");
  const [duration, setDuration] = useState("Auto");
  const [language, setLanguage] = useState("Hindi");
  const [storyModel, setStoryModel] = useState("GPT-5.6");
  const [styleModel, setStyleModel] = useState("Midjourney V7");
  const [selectedStyle, setSelectedStyle] = useState("South Indian Epic");
  const [statusMsg, setStatusMsg] = useState("");

  // Seed for Daily AI Image Refresh
  const [seed, setSeed] = useState(Date.now());

  // 12 Visual Styles with Daily Live AI Image Generation URLs
  const visualStyles = [
    {
      id: "South Indian Epic",
      label: "South Epic",
      query: "south-indian-cinema-epic-warrior-temple-cinematic-4k"
    },
    {
      id: "Realistic",
      label: "Realistic",
      query: "hyperrealistic-cinematic-portrait-natural-lighting-8k"
    },
    {
      id: "3D Cartoon",
      label: "3D Cartoon",
      query: "3d-pixar-disney-style-cute-character-render-vibrant"
    },
    {
      id: "Disney",
      label: "Disney Magic",
      query: "disney-animation-fantasy-prince-magical-palace"
    },
    {
      id: "Pixar",
      label: "Pixar 3D",
      query: "pixar-style-grandpa-baking-cozy-sunlight-warm"
    },
    {
      id: "Epic Battle",
      label: "Epic Action",
      query: "mythological-epic-action-warrior-bow-arrow-cinematic"
    },
    {
      id: "Illustration",
      label: "Illustration",
      query: "digital-concept-art-editorial-fashion-illustration"
    },
    {
      id: "Simple Sketch",
      label: "Pencil Sketch",
      query: "hand-drawn-charcoal-pencil-sketch-portrait"
    },
    {
      id: "Handcrafted",
      label: "Claymation",
      query: "handcrafted-stop-motion-teddy-bear-felt-texture"
    },
    {
      id: "Flat Art",
      label: "Flat Vector",
      query: "modern-flat-vector-nature-honeybee-flower-minimal"
    },
    {
      id: "Comic book",
      label: "Comic VFX",
      query: "marvel-comic-book-cover-superhero-energy-burst"
    },
    {
      id: "Classicism",
      label: "Oil Painting",
      query: "renaissance-classicism-oil-painting-greek-sculpture"
    }
  ];

  // Daily Featured Showcase Cards (MagicLight Home Style)
  const homeCards = [
    {
      title: "Story To Video",
      tag: "Top Trending",
      query: "cinematic-snow-white-apple-forest-hyperrealistic",
      btn: "Create"
    },
    {
      title: "Kids 3D Story",
      tag: "Animation",
      query: "cute-little-kid-red-sweater-christmas-apple-3d",
      btn: "Create"
    },
    {
      title: "Interview / Podcast",
      tag: "Real Human",
      query: "professional-athlete-sports-stadium-interview-mic",
      btn: "Create"
    },
    {
      title: "South Mega Drama",
      tag: "Blockbuster",
      query: "south-cinema-mass-action-hero-ocean-sunset-smoke",
      btn: "Create"
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2200);
  };

  const handleRefreshImages = () => {
    setSeed(Date.now());
    notify("🔄 Daily AI Images Refreshed Live!");
  };

  const handleLogin = (provider) => {
    setIsLoggedIn(true);
    notify(`✅ Logged in via ${provider}`);
  };

  if (!mounted) return null;

  // 1. AUTH GATEWAY
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#060913] text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-[#0b101d] p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black shadow-lg shadow-cyan-500/20">
              🎬
            </div>
            <h1 className="text-base font-black text-white tracking-wider">CineFlow AI Pro Studio</h1>
            <p className="text-[10px] text-slate-400">Google Flow-Grade Autonomous Cinema Engine</p>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleLogin("Google")}
              className="w-full py-2.5 bg-[#12192a] hover:bg-[#18223a] border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white transition active:scale-95"
            >
              <span className="text-sm">🔴</span> Continue with Google / Gmail
            </button>
            <button
              onClick={() => handleLogin("Facebook")}
              className="w-full py-2.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-blue-400 transition active:scale-95"
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
                className="w-full bg-[#060913] p-2.5 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
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
                  className="w-full bg-[#060913] p-2.5 pr-14 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500"
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
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs rounded-xl uppercase text-white shadow-lg active:scale-95 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN APPLICATION INTERFACE
  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 p-4 pb-28 max-w-md mx-auto space-y-4 font-sans text-xs">
      {/* Top Header Bar */}
      <header className="flex justify-between items-center border-b border-slate-800/80 pb-2.5 sticky top-0 bg-[#070b13]/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-black shadow-md">
            🎬
          </div>
          <div>
            <h1 className="text-xs font-black text-cyan-400">
              CineFlow <span className="text-white">AI Studio</span>
            </h1>
            <p className="text-[8px] text-slate-500">Live AI Multi-Agent Video Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRefreshImages}
            className="px-2 py-1 bg-[#12192a] border border-cyan-500/40 rounded-lg text-cyan-300 text-[9px] font-bold flex items-center gap-1"
          >
            🔄 Daily AI
          </button>
          <Link
            href="/vault"
            className="px-2.5 py-1 rounded-lg font-bold text-[10px] bg-purple-950 text-purple-300 border border-purple-800 hover:bg-purple-900 transition flex items-center gap-1"
          >
            Vault 📂
          </Link>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-[9px] bg-red-950 text-red-400 border border-red-900 px-2.5 py-1 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </header>

      {statusMsg && (
        <div className="bg-cyan-950 border border-cyan-500 text-cyan-300 p-2 rounded-xl text-center font-bold text-xs">
          {statusMsg}
        </div>
      )}

      {/* --- HOME SHOWCASE VIEW --- */}
      {mainTab === "Home" && (
        <div className="space-y-4">
          {/* Top Banner Discount & Credits */}
          <div className="bg-gradient-to-r from-[#172033] to-[#0d1424] border border-slate-800 p-3 rounded-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <div>
                <span className="bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase">50% OFF</span>
                <h3 className="font-bold text-white text-[11px] mt-0.5">💎 50 Daily Free AI Credits</h3>
              </div>
            </div>
            <button
              onClick={() => setMainTab("Create")}
              className="py-1.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-[9px] uppercase shadow"
            >
              + Create
            </button>
          </div>

          {/* 4 Featured Daily Dynamic AI Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {homeCards.map((card, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-800/80 group shadow-lg"
              >
                <img
                  src={`https://image.pollinations.ai/prompt/${card.query}?width=400&height=500&seed=${seed + i}&nologo=true`}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[8px] font-bold text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {card.tag}
                </span>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-1.5">
                  <h4 className="text-[11px] font-black text-white leading-tight">{card.title}</h4>
                  <button
                    onClick={() => {
                      setMainTab("Create");
                      notify(`🚀 Selected: ${card.title}`);
                    }}
                    className="w-full py-1.5 bg-white/20 hover:bg-cyan-500/80 backdrop-blur-md text-white font-black text-[9px] rounded-xl transition uppercase"
                  >
                    {card.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mini Categories */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "cinema", title: "Mega Blockbuster", icon: "🏛️" },
              { id: "explainer", title: "Explainer Story", icon: "📖" },
              { id: "seedance", title: "Seedance 2.5", icon: "🎬" }
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setMainTab("Create")}
                className="bg-[#0b101d] border border-slate-800 p-2.5 rounded-2xl text-center space-y-1 hover:border-cyan-500 transition"
              >
                <div className="text-base">{c.icon}</div>
                <div className="text-[9px] font-bold text-slate-300 truncate">{c.title}</div>
              </button>
            ))}
          </div>

          {/* Featured Horizontal Slider */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-[10px] font-bold">
            {["✨ Featured", "Cartoon", "Music", "Drama", "Sci-Fi", "South Action"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl border shrink-0 transition ${
                  activeCategory === cat ? "bg-[#141e33] border-cyan-500 text-cyan-300" : "bg-[#0b101d] border-slate-800 text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Minimax Engine Promo Card */}
          <div className="bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 p-3.5 rounded-2xl flex justify-between items-center shadow-lg">
            <div>
              <span className="text-[8px] font-black text-purple-400 block uppercase">Autonomous Model</span>
              <h3 className="text-xs font-black text-white">Minimax H3 Ultra Engine</h3>
              <p className="text-[8px] text-slate-400">Faster Generation & Deep Cinematic Reasoning</p>
            </div>
            <button
              onClick={() => setMainTab("Create")}
              className="py-1.5 px-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-[9px] uppercase"
            >
              Create ➔
            </button>
          </div>
        </div>
      )}

      {/* --- CREATE / STUDIO VIEW --- */}
      {mainTab === "Create" && (
        <div className="space-y-4">
          {/* Step Tabs: 1 Content | 2 Cast | 3 Storyboard | 4 Edit */}
          <div className="flex justify-between items-center bg-[#0b101d] p-1.5 rounded-xl border border-slate-800 text-[10px] font-bold">
            <span className="text-cyan-400 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[9px]">1</span> Content
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[9px]">2</span> Cast
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[9px]">3</span> Storyboard
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[9px]">4</span> Edit
            </span>
          </div>

          {/* Script Box */}
          <div className="bg-[#0b101d] border border-slate-800 rounded-2xl p-3 space-y-2">
            <div className="flex bg-[#060913] p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setScriptMode("Smart")}
                className={`flex-1 py-1 rounded-lg font-bold text-[10px] transition ${
                  scriptMode === "Smart" ? "bg-[#141e33] text-cyan-300 shadow" : "text-slate-400"
                }`}
              >
                Smart Script
              </button>
              <button
                onClick={() => setScriptMode("Basic")}
                className={`flex-1 py-1 rounded-lg font-bold text-[10px] transition ${
                  scriptMode === "Basic" ? "bg-[#141e33] text-cyan-300 shadow" : "text-slate-400"
                }`}
              >
                Basic Script
              </button>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full bg-[#060913] p-2.5 rounded-xl text-slate-200 border border-slate-800/80 text-[11px] outline-none focus:border-cyan-500 resize-none leading-relaxed"
            />

            <div className="flex justify-between items-center pt-1 text-[9px]">
              <div className="flex gap-2">
                <button
                  onClick={() => setPrompt((prev) => prev + " रोमांचक बैकग्राउंड म्यूजिक, ड्रामेटिक ड्रोन शॉट्स और 4K रियलिस्टिक टेक्सचर।")}
                  className="bg-[#12192a] hover:bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 text-cyan-300 flex items-center gap-1"
                >
                  ✨ Expansion
                </button>
                <button
                  onClick={() => notify("🔥 South Indian Action Preset Applied!")}
                  className="bg-[#12192a] hover:bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 text-amber-300 flex items-center gap-1"
                >
                  🔥 Trending: South Epic
                </button>
              </div>
              <span className="text-slate-500">{prompt.length}/12000</span>
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-300 block">Aspect Ratio</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setAspectRatio("Landscape")}
                className={`p-2.5 rounded-2xl border flex items-center gap-3 transition ${
                  aspectRatio === "Landscape" ? "bg-[#0d2238] border-cyan-500 text-cyan-300" : "bg-[#0b101d] border-slate-800 text-slate-400"
                }`}
              >
                <div className="w-9 h-6 rounded bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 shadow-sm shrink-0" />
                <div className="text-left">
                  <div className="font-bold text-[10px] text-white">Landscape</div>
                  <div className="text-[8px] text-slate-500">16:9、4:3</div>
                </div>
              </button>

              <button
                onClick={() => setAspectRatio("Portrait")}
                className={`p-2.5 rounded-2xl border flex items-center gap-3 transition ${
                  aspectRatio === "Portrait" ? "bg-[#0d2238] border-cyan-500 text-cyan-300" : "bg-[#0b101d] border-slate-800 text-slate-400"
                }`}
              >
                <div className="w-6 h-9 rounded bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 shadow-sm shrink-0" />
                <div className="text-left">
                  <div className="font-bold text-[10px] text-white">Portrait</div>
                  <div className="text-[8px] text-slate-500">9:16、3:4</div>
                </div>
              </button>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-300 block">Duration</span>
            <div className="grid grid-cols-4 gap-1.5">
              {["Auto", "3-5min 👑", "5-10min 👑", "10-20min 👑"].map((dur) => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={`py-2 rounded-xl border font-bold text-[9px] transition ${
                    duration === dur ? "bg-[#141e33] border-cyan-500 text-cyan-300" : "bg-[#0b101d] border-slate-800 text-slate-400"
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Video Language */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-300">Video Language</span>
              <span className="text-amber-400 text-[9px] font-bold">All &gt;</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {["Hindi", "Tamil", "Telugu", "English"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-2 rounded-xl border font-bold text-[9px] transition ${
                    language === lang ? "bg-[#141e33] border-cyan-500 text-cyan-300" : "bg-[#0b101d] border-slate-800 text-slate-400"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Story Model */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-300">Story Model</span>
              <span className="text-slate-500 text-[9px]">🛈</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {["GPT-5.6 👑", "Gemini Flash 3.1", "GLM-5.2 👑"].map((sm) => (
                <button
                  key={sm}
                  onClick={() => setStoryModel(sm)}
                  className={`py-2 rounded-xl border font-bold text-[9px] transition ${
                    storyModel === sm ? "bg-[#21163b] border-purple-500 text-purple-300" : "bg-[#0b101d] border-slate-800 text-slate-400"
                  }`}
                >
                  {sm}
                </button>
              ))}
            </div>
          </div>

          {/* Style Model Engine */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-300">Style Model</span>
              <span className="bg-red-600 text-white text-[7px] font-bold px-1.5 py-0.2 rounded">NEW</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {["Midjourney V7", "Magiclight 3.0", "Gpt-Image-2"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStyleModel(st)}
                  className={`py-2 rounded-xl border font-bold text-[9px] transition ${
                    styleModel === st ? "bg-[#141e33] border-cyan-500 text-cyan-300" : "bg-[#0b101d] border-slate-800 text-slate-400"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Artwork Cards (Daily AI Images Auto-Generated) */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-300">Select Artwork Style</span>
              <button
                onClick={handleRefreshImages}
                className="text-cyan-400 text-[9px] font-bold flex items-center gap-1"
              >
                🔄 Auto-Refresh
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {visualStyles.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedStyle(item.id)}
                  className={`relative rounded-2xl overflow-hidden aspect-[3/4] border-2 transition active:scale-95 text-left group ${
                    selectedStyle === item.id ? "border-amber-400 shadow-lg shadow-amber-500/20" : "border-slate-800/80"
                  }`}
                >
                  <img
                    src={`https://image.pollinations.ai/prompt/${item.query}?width=300&height=400&seed=${seed + idx}&nologo=true`}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 text-center text-[9px] font-bold text-white tracking-wide">
                    {item.label}
                  </span>
                  {selectedStyle === item.id && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center text-[9px] font-black">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => notify("🚀 AI Autonomous Pipeline Running...")}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-2xl font-black text-xs uppercase tracking-wider text-white shadow-xl shadow-cyan-500/20 active:scale-95 transition"
          >
            Next ➔
          </button>
        </div>
      )}

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#070b13]/95 backdrop-blur-xl border-t border-slate-800/80 py-2 px-6 flex justify-between items-center z-50">
        <button
          onClick={() => setMainTab("Home")}
          className={`flex flex-col items-center gap-0.5 transition ${
            mainTab === "Home" ? "text-cyan-400 font-bold" : "text-slate-500"
          }`}
        >
          <span className="text-base">🏠</span>
          <span className="text-[9px]">Home</span>
        </button>

        <button
          onClick={() => setMainTab("Create")}
          className="w-11 h-11 -mt-4 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-cyan-500/30 active:scale-90 transition"
        >
          +
        </button>

        <Link
          href="/vault"
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-purple-400 transition"
        >
          <span className="text-base">👤</span>
          <span className="text-[9px]">Mine / Vault</span>
        </Link>
      </nav>
    </div>
  );
}
