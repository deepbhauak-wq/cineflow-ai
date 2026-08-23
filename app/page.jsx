"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState("google");

  const [gEmail, setGEmail] = useState("");
  const [gPass, setGPass] = useState("");
  const [showGP, setShowGP] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [fbU, setFbU] = useState("");
  const [fbP, setFbP] = useState("");
  const [showFbP, setShowFbP] = useState(false);

  const [instaU, setInstaU] = useState("");
  const [instaP, setInstaP] = useState("");
  const [showInstaP, setShowInstaP] = useState(false);

  const [activeEmail, setActiveEmail] = useState("user@gmail.com");

  const [storyPrompt, setStoryPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min (18 Scenes)");
  const [visualStyle, setVisualStyle] = useState("Cinematic");
  const [customStyle, setCustomStyle] = useState("");
  const [videoModel, setVideoModel] = useState("Veo");
  const [storyModel, setStoryModel] = useState("Gemini");
  const [voiceLang, setVoiceLang] = useState("Hindi (Pure Shuddh)");
  const [uploadedImage, setUploadedImage] = useState(null);

  const styleCatalog = [
    { name: "Realistic", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60" },
    { name: "Cinematic", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&auto=format&fit=crop&q=60" },
    { name: "Epic", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=60" },
    { name: "Bible Art", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=60" },
    { name: "Historical", img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=200&auto=format&fit=crop&q=60" },
    { name: "Documentary", img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=200&auto=format&fit=crop&q=60" },
    { name: "3D Cartoon", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=60" },
    { name: "Disney-like", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=60" },
    { name: "Pixar-like", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=200&auto=format&fit=crop&q=60" },
    { name: "Illustration", img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&auto=format&fit=crop&q=60" },
    { name: "Comic Book", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=60" },
    { name: "Picture Book", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&auto=format&fit=crop&q=60" },
    { name: "Classical", img: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=200&auto=format&fit=crop&q=60" },
    { name: "Handcrafted", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200&auto=format&fit=crop&q=60" },
    { name: "Flat Art", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&auto=format&fit=crop&q=60" },
    { name: "Simple Sketch", img: "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=200&auto=format&fit=crop&q=60" },
    { name: "Anime", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=60" },
    { name: "Fantasy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=60" },
    { name: "Dark Cinematic", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=60" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("cineflow_logged_in");
    const savedEmail = localStorage.getItem("cineflow_user_email");
    if (saved === "true" && savedEmail) {
      setIsLoggedIn(true);
      setActiveEmail(savedEmail);
    }
  }, []);

  const handleAuth = (e, m) => {
    e.preventDefault();
    let email = m === "google" ? (gEmail || "gmail@user.com") : m === "facebook" ? (fbU ? `${fbU}@fb.com` : "fb@user.com") : (instaU ? `${instaU}@insta.com` : "insta@user.com");
    if (rememberMe) {
      localStorage.setItem("cineflow_logged_in", "true");
      localStorage.setItem("cineflow_user_email", email);
    }
    setActiveEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("cineflow_logged_in");
    localStorage.removeItem("cineflow_user_email");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#0a0d14] flex flex-col items-center justify-center p-4 text-white font-sans">
        <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          
          {/* Exact CineFlow AI Circular Play Logo */}
          <div className="w-20 h-20 rounded-2xl bg-black border border-cyan-500/40 p-2 flex items-center justify-center shadow-xl shadow-cyan-500/20 mb-4">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white font-black pl-1">▶</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 text-center">CineFlow AI Pro</h1>
          <p className="text-xs text-slate-400 text-center mb-5">Autonomous Cinema Engine</p>

          <div className="w-full grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5">
            <button type="button" onClick={() => setLoginMethod("google")} className={`py-1.5 rounded-lg text-[11px] font-bold cursor-pointer ${loginMethod === "google" ? "bg-cyan-500 text-black" : "text-slate-400"}`}>Gmail</button>
            <button type="button" onClick={() => setLoginMethod("facebook")} className={`py-1.5 rounded-lg text-[11px] font-bold cursor-pointer ${loginMethod === "facebook" ? "bg-[#1877F2] text-white" : "text-slate-400"}`}>Facebook</button>
            <button type="button" onClick={() => setLoginMethod("instagram")} className={`py-1.5 rounded-lg text-[11px] font-bold cursor-pointer ${loginMethod === "instagram" ? "bg-purple-600 text-white" : "text-slate-400"}`}>Instagram</button>
          </div>

          {loginMethod === "google" && (
            <form onSubmit={(e) => handleAuth(e, "google")} className="w-full space-y-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Gmail Address</label>
                <input type="email" required value={gEmail} onChange={(e) => setGEmail(e.target.value)} placeholder="name@gmail.com" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Google Password</label>
                <div className="relative">
                  <input type={showGP ? "text" : "password"} required value={gPass} onChange={(e) => setGPass(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
                  <button type="button" onClick={() => setShowGP(!showGP)} className="absolute right-3 top-2 text-[10px] text-cyan-400 font-semibold cursor-pointer">{showGP ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="remG" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 accent-cyan-500 cursor-pointer"/>
                <label htmlFor="remG" className="text-[11px] text-slate-300 cursor-pointer">Remember me (Auto-Login)</label>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-cyan-500 font-bold text-xs text-black cursor-pointer">SIGN IN WITH GMAIL</button>
            </form>
          )}

          {loginMethod === "facebook" && (
            <form onSubmit={(e) => handleAuth(e, "facebook")} className="w-full space-y-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Facebook Username / Email</label>
                <input type="text" required value={fbU} onChange={(e) => setFbU(e.target.value)} placeholder="username" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Facebook Password</label>
                <div className="relative">
                  <input type={showFbP ? "text" : "password"} required value={fbP} onChange={(e) => setFbP(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
                  <button type="button" onClick={() => setShowFbP(!showFbP)} className="absolute right-3 top-2 text-[10px] text-cyan-400 font-semibold cursor-pointer">{showFbP ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="remFb" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 accent-cyan-500 cursor-pointer"/>
                <label htmlFor="remFb" className="text-[11px] text-slate-300 cursor-pointer">Remember me (Auto-Login)</label>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#1877F2] font-bold text-xs text-white cursor-pointer">SIGN IN WITH FACEBOOK</button>
            </form>
          )}

          {loginMethod === "instagram" && (
            <form onSubmit={(e) => handleAuth(e, "instagram")} className="w-full space-y-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Instagram Username</label>
                <input type="text" required value={instaU} onChange={(e) => setInstaU(e.target.value)} placeholder="username" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Instagram Password</label>
                <div className="relative">
                  <input type={showInstaP ? "text" : "password"} required value={instaP} onChange={(e) => setInstaP(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
                  <button type="button" onClick={() => setShowInstaP(!showInstaP)} className="absolute right-3 top-2 text-[10px] text-cyan-400 font-semibold cursor-pointer">{showInstaP ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="remInsta" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="w-4 h-4 accent-cyan-500 cursor-pointer"/>
                <label htmlFor="remInsta" className="text-[11px] text-slate-300 cursor-pointer">Remember me (Auto-Login)</label>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-purple-600 font-bold text-xs text-white cursor-pointer">SIGN IN WITH INSTAGRAM</button>
            </form>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 md:p-8 font-sans pb-28">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-black border border-cyan-500/40 p-1 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-xs text-white font-black pl-0.5">▶</span>
            </div>
          </div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">CineFlow AI</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono text-cyan-300">⚡ 55 Cr</div>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white uppercase">{activeEmail.charAt(0)}</div>
            <button onClick={handleLogout} className="text-xs text-red-400 hover:underline">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* Full-Size Cinematic Player View */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-3 shadow-2xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">🎬 Full-Size Cinematic Player View</label>
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 bg-black relative flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000&auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-90"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
              <span className="text-xs font-bold text-cyan-300">CineFlow AI Production - Scene 01 (4K HDR)</span>
            </div>
          </div>
        </div>

        {/* 1. Master Story & Reference Image */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase">1. Master Story & Reference Image</label>
          <textarea rows={3} value={storyPrompt} onChange={(e) => setStoryPrompt(e.target.value)} placeholder="Enter storyline here..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"/>
          <label className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-cyan-300 cursor-pointer inline-flex items-center gap-2">
            <span>🖼️ Upload Reference Photo</span>
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if (f) setUploadedImage(URL.createObjectURL(f)); }} className="hidden"/>
          </label>
        </div>

        {/* 2. Visual Art Style */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase">2. Visual Art Style ({visualStyle})</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-64 overflow-y-auto">
            {styleCatalog.map((s) => (
              <div key={s.name} onClick={() => setVisualStyle(s.name)} className={`relative rounded-xl overflow-hidden border cursor-pointer ${visualStyle === s.name ? "border-cyan-400 ring-2 ring-cyan-500/30" : "border-slate-800"}`}>
                <img src={s.img} alt={s.name} className="w-full h-16 object-cover"/>
                <p className="text-[10px] text-center p-1 bg-black/80 truncate">{s.name}</p>
              </div>
            ))}
          </div>
          <input type="text" value={customStyle} onChange={(e) => setCustomStyle(e.target.value)} placeholder="Or write Custom Art Style prompt..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
        </div>

        {/* 3 & 4. Aspect Ratio & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-semibold text-cyan-400 uppercase">3. Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {["16:9", "9:16", "21:9", "4:3", "1:1", "Auto"].map((r) => (
                <button key={r} onClick={() => setAspectRatio(r)} className={`py-2 rounded-xl border text-xs ${aspectRatio === r ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{r}</button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-semibold text-cyan-400 uppercase">4. Timeline Tier</label>
            <div className="grid grid-cols-2 gap-2">
              {["3 Min (18 Scenes)", "15 Min (90 Scenes)", "30 Min (180 Scenes)", "60 Min (360 Scenes)"].map((t) => (
                <button key={t} onClick={() => setDuration(t)} className={`py-2 px-1 rounded-xl border text-[11px] ${duration === t ? "bg-purple-500/20 border-purple-500 text-purple-300 font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Voiceover & Languages */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-semibold text-cyan-400 uppercase">5. Voiceover & Languages</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Hindi (Pure Shuddh)", "English", "Spanish", "Portuguese", "Korean", "Japanese", "Chinese", "Arabic"].map((l) => (
              <button key={l} onClick={() => setVoiceLang(l)} className={`py-2 rounded-xl border text-xs ${voiceLang === l ? "bg-cyan-500/20 border-cyan-500 text-white font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{l}</button>
            ))}
          </div>
        </div>

        {/* 6 & 7. Video Engine & Story Engine Models */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-semibold text-cyan-400 uppercase">6. Video Engine Model</label>
            <div className="grid grid-cols-3 gap-2">
              {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Sora"].map((m) => (
                <button key={m} onClick={() => setVideoModel(m)} className={`py-2 rounded-xl border text-xs font-semibold transition ${videoModel === m ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{m}</button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <label className="text-xs font-semibold text-cyan-400 uppercase">7. Story Engine Model</label>
            <div className="grid grid-cols-3 gap-2">
              {["Gemini", "Claude", "AutoGPT", "Fast AI", "Pro AI", "Auto"].map((s) => (
                <button key={s} onClick={() => setStoryModel(s)} className={`py-2 rounded-xl border text-xs font-semibold transition ${storyModel === s ? "bg-purple-500/20 border-purple-500 text-purple-300 font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => window.location.href = "/studio/editor"} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-b
