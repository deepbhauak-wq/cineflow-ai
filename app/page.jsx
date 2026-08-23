"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [storyPrompt, setStoryPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min (18 Scenes)");
  const [visualStyle, setVisualStyle] = useState("Cinematic");
  const [customStyle, setCustomStyle] = useState("");
  const [videoModel, setVideoModel] = useState("Veo");
  const [storyModel, setStoryModel] = useState("Gemini");
  const [voiceLang, setVoiceLang] = useState("Hindi (Pure Shuddh)");
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const styleCatalog = [
    { name: "Realistic", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60" },
    { name: "Cinematic", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&auto=format&fit=crop&q=60" },
    { name: "Epic", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=60" },
    { name: "Bible Art", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=60" },
    { name: "Historical", img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=300&auto=format&fit=crop&q=60" },
    { name: "Documentary", img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=300&auto=format&fit=crop&q=60" },
    { name: "3D Cartoon", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=60" },
    { name: "Disney-like", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=60" },
    { name: "Pixar-like", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300&auto=format&fit=crop&q=60" },
    { name: "Illustration", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=60" },
    { name: "Comic Book", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=60" },
    { name: "Picture Book", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&auto=format&fit=crop&q=60" },
    { name: "Classical", img: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=300&auto=format&fit=crop&q=60" },
    { name: "Handcrafted", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=60" },
    { name: "Flat Art", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&auto=format&fit=crop&q=60" },
    { name: "Simple Sketch", img: "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=300&auto=format&fit=crop&q=60" },
    { name: "Anime", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&auto=format&fit=crop&q=60" },
    { name: "Fantasy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=60" },
    { name: "Dark Cinematic", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=60" }
  ];

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
    setEmail(userEmail);
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
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#0a0d14] flex flex-col items-center justify-center p-4 text-white font-sans overflow-x-hidden">
        <div className="w-full max-w-sm rounded-3xl bg-[#0f1422]/95 border border-slate-800/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4">
            <span className="text-2xl">🎬</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 text-center">CineFlow AI Pro Studio</h1>
          <p className="text-xs text-slate-400 text-center mb-6">Autonomous Cinema Engine</p>

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

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 md:p-8 font-sans overflow-x-hidden pb-28">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-base shadow-lg shadow-cyan-500/20">🎬</div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">CineFlow AI</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-1">
            <span>⚡</span> 55 Cr
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white uppercase shadow-md" title={email}>
              {email ? email.charAt(0) : "U"}
            </div>
            <button onClick={handleLogout} className="text-xs text-red-400 hover:underline">Logout</button>
          </div>
        </div>
      </div>

      {/* Main Stacked Content Form */}
      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* 1. Master Story Input & Reference Image */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">1. Master Story & Reference Image</label>
          <textarea rows={3} value={storyPrompt} onChange={(e) => setStoryPrompt(e.target.value)} placeholder="Enter storyline here... AI will auto-decompose into scenes." className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"/>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-slate-800/80">
            <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#141b2d] hover:bg-[#1c263f] border border-slate-700 text-xs font-medium text-cyan-300 cursor-pointer flex items-center justify-center gap-2 transition">
              <span>🖼️ Upload Reference Photo from Gallery</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
            </label>
            {uploadedImage ? (
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl w-full sm:w-auto">
                <img src={uploadedImage} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-cyan-500/40"/>
                <div className="text-xs">
                  <p className="font-semibold text-cyan-300">Reference Photo Attached ✓</p>
                  <button onClick={() => setUploadedImage(null)} className="text-[10px] text-red-400 hover:underline">Remove</button>
                </div>
              </div>
            ) : <span className="text-[11px] text-slate-500">No reference image selected</span>}
          </div>
        </div>

        {/* 2. Visual Style Selection */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">2. Visual Art Style ({visualStyle})</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {styleCatalog.map((s) => (
              <div
                key={s.name}
                onClick={() => setVisualStyle(s.name)}
                className={`relative rounded-xl overflow-hidden border cursor-pointer group transition ${
                  visualStyle === s.name ? "border-cyan-400 ring-2 ring-cyan-500/30" : "border-slate-800 opacity-75 hover:opacity-100"
                }`}
              >
                <img src={s.img} alt={s.name} className="w-full h-16 object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-xs p-1 text-center">
                  <p className="text-[10px] font-medium text-white truncate">{s.name}</p>
                </div>
              </div>
            ))}
          </div>
          <input type="text" value={customStyle} onChange={(e) => setCustomStyle(e.target.value)} placeholder="Or write Custom Art Style prompt..." className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 mt-2 focus:outline-none focus:border-cyan-500"/>
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

        {/* 5. Voiceover & Languages */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">5. Voiceover & Languages</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Hindi (Pure Shuddh)", "English", "Spanish", "Portuguese", "Korean", "Japanese", "Chinese", "Indonesian", "French", "German", "Arabic", "All Languages"].map((lang) => (
              <button key={lang} onClick={() => setVoiceLang(lang)} className={`py-2 px-2 rounded-xl border text-xs transition ${voiceLang === lang ? "bg-cyan-500/20 border-cyan-500 text-white font-semibold" : "bg-[#141b2d] border-slate-800 text-slate-400"}`}>{lang}</button>
            ))}
          </div>
        </div>

        {/* 6. Engines */}
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

        <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); window.location.href = "/studio/editor"; }, 1200); }} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer">
          {loading ? "Generating Film Tracks..." : "🚀 GENERATE AUTONOMOUS CINEMA FILM"}
        </button>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-50 px-4 pointer-events-none">
        <div className="bg-[#0f1422]/90 backdrop-blur-lg border border-slate-700/80 rounded-full px-5 py-2.5 
