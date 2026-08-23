"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Master Studio 2026 Settings States
  const [storyPrompt, setStoryPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min (18 Scenes)");
  const [visualStyle, setVisualStyle] = useState("Cinematic");
  const [customStyle, setCustomStyle] = useState("");
  const [videoModel, setVideoModel] = useState("Veo");
  const [storyModel, setStoryModel] = useState("Gemini");
  const [voiceLang, setVoiceLang] = useState("Hindi (Pure Shuddh)");
  
  // Gallery / Image & Output Gallery State
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedGallery, setGeneratedGallery] = useState([
    { id: 1, type: "video", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60", title: "Scene 01: Master Epic Start" },
    { id: 2, type: "image", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60", title: "Character Vault Preview" }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("cineflow_logged_in");
    const savedEmail = localStorage.getItem("cineflow_user_email");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
      if (savedEmail) setEmail(savedEmail);
    }
  }, []);

  const handleLogin = (userEmail = "user@gmail.com") => {
    localStorage.setItem("cineflow_logged_in", "true");
    localStorage.setItem("cineflow_user_email", userEmail);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("cineflow_logged_in");
    localStorage.removeItem("cineflow_user_email");
    setIsLoggedIn(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setGeneratedGallery(prev => [{ id: Date.now(), type: "image", url: imageUrl, title: "Custom Uploaded Reference" }, ...prev]);
    }
  };

  // 1. LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#0a0d14] flex flex-col items-center justify-center p-4 text-white font-sans overflow-x-hidden">
        <div className="w-full max-w-sm rounded-3xl bg-[#0f1422]/95 border border-slate-800/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
            <span className="text-2xl">🎬</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 text-center">
            CineFlow AI Pro Studio
          </h1>
          <p className="text-xs text-slate-400 text-center mb-6">2026 Autonomous Cinema Engine</p>

          <div className="w-full flex flex-col gap-3">
            <button type="button" onClick={() => handleLogin("google.user@gmail.com")} className="w-full py-3 px-4 rounded-xl bg-[#141b2d] hover:bg-[#1c263f] border border-slate-700/60 flex items-center justify-center gap-3 transition text-sm font-medium cursor-pointer">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
              <span>Continue with Google / Gmail</span>
            </button>
            <button type="button" onClick={() => handleLogin("facebook.user@fb.com")} className="w-full py-3 px-4 rounded-xl bg-[#141b2d] hover:bg-[#1c263f] border border-slate-700/60 flex items-center justify-center gap-3 transition text-sm font-medium cursor-pointer">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Continue with Facebook</span>
            </button>
            <button type="button" onClick={() => handleLogin("instagram.user@insta.com")} className="w-full py-3 px-4 rounded-xl bg-[#141b2d] hover:bg-[#1c263f] border border-slate-700/60 flex items-center justify-center gap-3 transition text-sm font-medium cursor-pointer">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24"><defs><linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="90%" stopColor="#285AEB"/></linearGradient></defs><path fill="url(#igGrad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>Continue with Instagram</span>
            </button>
          </div>

          <div className="w-full flex items-center my-5">
            <div className="flex-1 h-px bg-slate-800"></div>
            <span className="px-3 text-[10px] tracking-widest text-slate-500 font-semibold uppercase">OR CREDENTIALS</span>
            <div className="flex-1 h-px bg-slate-800"></div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(email); }} className="w-full space-y-3.5">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Email / ID</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"/>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white">{showPassword ? "Hide" : "Show"}</button>
              </div>
            </div>
            <button type="submit" className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-95 transition">SIGN IN</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. MAIN STUDIO DASHBOARD (2026 Updated Version)
  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 md:p-8 font-sans overflow-x-hidden">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">🎬</div>
          <div>
            <h1 className="text-base sm:text-lg font-bold">CineFlow AI Pro Studio</h1>
            <p className="text-xs text-slate-400">User: <span className="text-cyan-400">{email || "Pro Creator"}</span> (2026 Update)</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono text-cyan-300">⚡ 55 Cr</div>
          <Link href="/character-vault" className="px-3 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-xs text-purple-200">Vault 🔒</Link>
          <Link href="/studio/editor" className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">Editor 🎞️</Link>
          <button onClick={handleLogout} className="px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300">Logout</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-5 pb-20">
        
        {/* Live Generated Media Gallery Preview */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">📁 Live Generation & Reference Gallery (2026)</label>
            <span className="text-[10px] text-slate-400">View generated & uploaded assets</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {generatedGallery.map((item) => (
              <div key={item.id} className="relative aspect-video rounded-xl overflow-hidden border border-slate-700/60 bg-black/40 group">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                  <p className="text-[10px] text-white truncate font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 1. Master Story Input & Gallery Upload */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">1. Master Story & Reference Gallery Upload</label>
          <textarea rows={3} value={storyPrompt} onChange={(e) => setStoryPrompt(e.target.value)} placeholder="Enter storyline here... AI will auto-decompose into scenes." className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"/>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-slate-800/80">
            <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#141b2d] hover:bg-[#1c263f] border border-slate-700 text-xs font-medium text-cyan-300 cursor-pointer flex items-center justify-center gap-2 transition">
              <span>🖼️ Choose Photo from Gallery</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
            </label>
            {uploadedImage ? (
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl w-full sm:w-auto">
                <img src={uploadedImage} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-cyan-500/40"/>
                <div className="text-xs">
                  <p className="font-semibold text-cyan-300">Reference Loaded ✓</p>
                  <button onClick={() => setUploadedImage(null)} className="text-[10px] text-red-400 hover:underline">Remove</button>
                </div>
              </div>
            ) : <span className="text-[11px] text-slate-500">No reference image selected</span>}
          </div>
        </div>

        {/* 2. Visual Style Selection (All 2026 Styles + Custom) */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">2. Visual Art Style</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Realistic", "Cinematic", "Epic", "Bible Art", "Historical", "Documentary", "3D Cartoon", "Disney-like", "Pixar-like", "Illustration", "Comic Book", "Picture Book", "Classical", "Handcrafted", "Flat Art", "Simple Sketch", "Anime", "Fantasy", "Dark Cinematic"].map((style) => (
              <button key={style} onClick={() => setVisualStyle(style)} className={`py-2 px-3 rounded-xl border text-xs font-medium transition ${visualStyle === style ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-[#141b2d] border-slate-800 text-slate-400"}`}>{style}</button>
            ))}
          </div>
          <input type="text" value={customStyle} onChange={(e) => setCustomStyle(e.target.value)} placeholder="Or type Custom Visual Style prompt..." className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 mt-2 focus:outline-none focus:border-cyan-500"/>
        </div>

        {/* 3. Aspect Ratio & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">3. Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {["16:9", "9:16", "21:9", "4:3", "1:1", "Auto"].map((ratio) => (
                <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`py-2 rounded-xl border text-xs font-semibold transition ${aspectRatio === ratio ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-[#141b2d] border-slate-800 text-slate-400"}`}>{ratio}</button>
              ))}
            </div>
          </div>

          <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">4. Timeline Tier</label>
            <div className="grid grid-cols-2 gap-2">
              {["3 Min (18 Scenes)", "15 Min (90 Scenes)", "30 Min (180 Scenes)", "60 Min (360 Scenes)"].map((tier) => (
                <button key={tier} onClick={() => setDuration(tier)} className={`py-2 px-1 rounded-xl border text-[11px] font-semibold transition ${duration === tier ? "bg-purple-500/20 border-purple-500 text-purple-300" : "bg-[#141b2d] border-slate-800 text-slate-400"}`}>{tier}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Voiceover & Language Support */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">5. Voiceover & Global Languages</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto pr-1">
            {["Hindi (Pure Shuddh)", "English", "Spanish", "Portuguese", "Korean", "Japanese", "Chinese", "Indonesian", "French", "German", "Arabic", "All Languages"].map((lang) => (
              <button key={lang} onClick={() => setVoiceLang(lang)} className={`py-2 px-2 rounded-xl border text-xs transition ${voiceLang === lang ? "bg-cyan-500/20 border-cyan-500 text-white font-semibold" : "bg-[#141b2d] border-slate-800 text-slate-400"}`}>{lang}</button>
            ))}
          </div>
        </div>

        {/* 6. Video & Story Engines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">6. Video Engine Model</label>
            <div className="grid grid-cols-3 gap-2">
              {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Sora"].map((m) => (
                <button key={m} onClick={() => setVideoModel(m)} className={`py-2 rounded-xl border text-xs font-semibold transition ${videoModel === m ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-[#141b2d] border-slate-800 text-slate-400"}`}>{m}</button>
              ))}
            </div>
          </div>

          <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">7. Story Engine Model</label>
            <div className="grid grid-cols-3 gap-2">
              {["Gemini", "Claude", "AutoGPT", "Fast AI", "Pro AI", "Auto"].map((s) => (
                <button key={s} onClick={() => setStoryModel(s)} className={`py-2 rounded-xl border text-xs font-semibold transition ${storyModel === s ? "bg-purple-500/20 border-purple-500 text-purple-300" : "bg-[#141b2d] border-slate-800 text-slate-400"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate CTA */}
        <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); window.location.href = "/studio/editor"; }, 1200); }} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer">
          {loading ? "Initializing 2026 AI Pipeline..." : "🚀 GENERATE AUTONOMOUS CINEMA FILM"}
        </button>
      </div>
    </div>
  );
}
