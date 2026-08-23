"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState("google");
  const [gEmail, setGEmail] = useState("");
  const [gPass, setGPass] = useState("");
  const [showGP, setShowGP] = useState(false);
  const [fbU, setFbU] = useState("");
  const [fbP, setFbP] = useState("");
  const [instaU, setInstaU] = useState("");
  const [instaP, setInstaP] = useState("");
  const [activeEmail, setActiveEmail] = useState("user@gmail.com");
  const [loading, setLoading] = useState(false);
  const [showPlayModal, setShowPlayModal] = useState(false);
  const [isPlayingCompleted, setIsPlayingCompleted] = useState(false);
  const [isPlayingDashboard, setIsPlayingDashboard] = useState(false);

  // Complete 7 Settings States with AUTO Available
  const [storyPrompt, setStoryPrompt] = useState("");
  const [visualStyle, setVisualStyle] = useState("AUTO");
  const [customStyle, setCustomStyle] = useState("");
  const [aspectRatio, setAspectRatio] = useState("AUTO");
  const [duration, setDuration] = useState("AUTO");
  const [voiceLang, setVoiceLang] = useState("AUTO (100% Shuddh Hindi)");
  const [videoModel, setVideoModel] = useState("AUTO");
  const [storyModel, setStoryModel] = useState("AUTO");
  const [galleryImage, setGalleryImage] = useState(null);

  const styleCatalog = [
    { name: "Disney-like", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300" },
    { name: "Pixar-like", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300" },
    { name: "Realistic", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
    { name: "Cinematic", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200" },
    { name: "Epic", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200" },
    { name: "Bible Art", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200" },
    { name: "Historical", img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=200" },
    { name: "Documentary", img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=200" },
    { name: "3D Cartoon", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=200" },
    { name: "Anime", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200" },
    { name: "Fantasy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200" },
    { name: "Dark Cinema", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200" }
  ];

  useEffect(() => {
    const s = localStorage.getItem("cineflow_logged_in");
    const e = localStorage.getItem("cineflow_user_email");
    if (s === "true" && e) {
      setIsLoggedIn(true);
      setActiveEmail(e);
    }
  }, []);

  const handleAuth = (e, m) => {
    e.preventDefault();
    let em = m === "google" ? (gEmail || "gmail@user.com") : m === "facebook" ? (fbU ? fbU + "@fb.com" : "fb@user.com") : (instaU ? instaU + "@insta.com" : "insta@user.com");
    localStorage.setItem("cineflow_logged_in", "true");
    localStorage.setItem("cineflow_user_email", em);
    setActiveEmail(em);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("cineflow_logged_in");
    localStorage.removeItem("cineflow_user_email");
    setIsLoggedIn(false);
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPlayModal(true);
    }, 3500);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center p-4 text-white font-sans">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-black border border-cyan-500/40 p-2 flex items-center justify-center mb-3">
            <span className="text-xl text-cyan-400 font-bold">▶</span>
          </div>
          <h1 className="text-xl font-bold mb-1">CineFlow AI Pro</h1>
          <p className="text-xs text-slate-400 mb-4">Autonomous Cinema Engine</p>
          <div className="w-full grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl mb-4">
            <button type="button" onClick={() => setLoginMethod("google")} className={`py-1 rounded-lg text-xs font-bold ${loginMethod === "google" ? "bg-cyan-500 text-black" : "text-slate-400"}`}>Gmail</button>
            <button type="button" onClick={() => setLoginMethod("facebook")} className={`py-1 rounded-lg text-xs font-bold ${loginMethod === "facebook" ? "bg-[#1877F2] text-white" : "text-slate-400"}`}>Facebook</button>
            <button type="button" onClick={() => setLoginMethod("instagram")} className={`py-1 rounded-lg text-xs font-bold ${loginMethod === "instagram" ? "bg-purple-600 text-white" : "text-slate-400"}`}>Instagram</button>
          </div>
          {loginMethod === "google" && (
            <form onSubmit={(e) => handleAuth(e, "google")} className="w-full space-y-3">
              <input type="email" required value={gEmail} onChange={(e) => setGEmail(e.target.value)} placeholder="name@gmail.com" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <div className="relative">
                <input type={showGP ? "text" : "password"} required value={gPass} onChange={(e) => setGPass(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
                <button type="button" onClick={() => setShowGP(!showGP)} className="absolute right-3 top-2 text-[10px] text-cyan-400">{showGP ? "Hide" : "Show"}</button>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 font-bold text-xs text-black cursor-pointer">PERMANENT SIGN IN</button>
            </form>
          )}
          {loginMethod === "facebook" && (
            <form onSubmit={(e) => handleAuth(e, "facebook")} className="w-full space-y-3">
              <input type="text" required value={fbU} onChange={(e) => setFbU(e.target.value)} placeholder="Username / Email" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <input type="password" required value={fbP} onChange={(e) => setFbP(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#1877F2] font-bold text-xs text-white cursor-pointer">PERMANENT SIGN IN</button>
            </form>
          )}
          {loginMethod === "instagram" && (
            <form onSubmit={(e) => handleAuth(e, "instagram")} className="w-full space-y-3">
              <input type="text" required value={instaU} onChange={(e) => setInstaU(e.target.value)} placeholder="Username" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <input type="password" required value={instaP} onChange={(e) => setInstaP(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-purple-600 font-bold text-xs text-white cursor-pointer">PERMANENT SIGN IN</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      {loading && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-cyan-400 font-bold">Rendering Film with Shuddh Hindi Voiceover...</p>
        </div>
      )}

      {showPlayModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-green-400">🎉 Master Production Rendered (-22 dB Ducking)</span>
              <button onClick={() => setShowPlayModal(false)} className="text-xs text-slate-400 cursor-pointer">Close ✕</button>
            </div>
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black relative flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800" alt="" className="w-full h-full object-cover"/>
              <button onClick={() => setIsPlayingCompleted(!isPlayingCompleted)} className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-black text-xl font-bold">{isPlayingCompleted ? "❚❚" : "▶"}</div>
              </button>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="text-xs text-slate-400">100% Shuddh Hindi • 10-13 Words Locked</p>
              <Link href="/studio/editor" className="px-3 py-1.5 rounded-xl bg-cyan-500 text-black font-bold text-xs">Open in Editor ✏️</Link>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-black border border-cyan-500/40 flex items-center justify-center">
            <span className="text-xs text-cyan-400 font-bold">▶</span>
          </div>
          <h1 className="text-sm font-bold tracking-tight">CineFlow AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-[11px] text-cyan-300 font-mono">⚡ 55 Cr</span>
          <button onClick={handleLogout} className="text-xs text-red-400 hover:underline cursor-pointer">Logout</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Cinematic Player */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase">🎬 Full-Size Cinematic Player View</label>
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative flex items-center justify-center shadow-inner">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800" alt="" className="w-full h-full object-cover opacity-80"/>
            <button onClick={() => setIsPlayingDashboard(!isPlayingDashboard)} className="absolute inset-0 flex items-center justify-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black text-xl font-bold">{isPlayingDashboard ? "❚❚" : "▶"}</div>
            </button>
          </div>
        </div>

        {/* BOX 1: Master Story */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase">1. Master Story & Reference Image</label>
          <textarea rows={2} value={storyPrompt} onChange={(e) => setStoryPrompt(e.target.value)} placeholder="Enter storyline here... or write AUTO to let AI generate story." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"/>
          <div className="flex items-center gap-3">
            <label className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-[11px] text-cyan-300 cursor-pointer font-semibold inline-flex items-center gap-1.5">
              <span>🖼️ Gallery Upload</span>
              <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files[0]; if (f) setGalleryImage(URL.createObjectURL(f)); }} className="hidden"/>
            </label>
            {galleryImage && <span className="text-[10px] text-green-400">✅ Photo Loaded</span>}
          </div>
        </div>

        {/* BOX 2: Visual Art Style (With AUTO Card + All Options) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase">2. Visual Art Style ({visualStyle})</label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <div onClick={() => setVisualStyle("AUTO")} className={`flex-shrink-0 w-28 rounded-xl overflow-hidden border cursor-pointer p-2 flex flex-col items-center justify-center bg-cyan-950/40 ${visualStyle === "AUTO" ? "border-cyan-400 ring-2 ring-cyan-500/30" : "border-slate-800"}`}>
              <span className="text-xl">⚡</span>
              <p className="text-[10px] font-bold text-cyan-300 mt-1">AUTO</p>
            </div>
            {styleCatalog.map((s) => (
              <div key={s.name} onClick={() => setVisualStyle(s.name)} className={`flex-shrink-0 w-28 rounded-xl overflow-hidden border cursor-pointer ${visualStyle === s.name ? "border-cyan-400 ring-2 ring-cyan-500/30" : "border-slate-800 opacity-70"}`}>
                <img src={s.img} alt={s.name} className="w-full h-14 object-cover"/>
                <p className="text-[9px] text-center p-1 bg-black truncate font-medium">{s.name}</p>
              </div>
            ))}
          </div>
          <input type="text" value={customStyle} onChange={(e) => setCustomStyle(e.target.value)} placeholder="Custom Art Style prompt..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white mt-1"/>
        </div>

        {/* BOX 3: Aspect Ratio (With AUTO + All Options) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 shadow-xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase">3. Aspect Ratio ({aspectRatio})</label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {["AUTO", "16:9", "9:16", "21:9", "4:3", "1:1", "Custom"].map((r) => (
              <button key={r} onClick={() => setAspectRatio(r)} className={`py-1.5 rounded-lg border text-xs cursor-pointer ${aspectRatio === r ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
                {r === "AUTO" ? "⚡ AUTO" : r}
              </button>
            ))}
          </div>
        </div>

        {/* BOX 4: Timeline Tier (With AUTO + All Options) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 shadow-xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase">4. Timeline Tier ({duration})</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {["AUTO", "3 Min (18 Scenes)", "15 Min (90 Scenes)", "30 Min (180 Scenes)", "60 Min (360 Scenes)"].map((d) => (
              <button key={d} onClick={() => setDuration(d)} className={`py-1.5 px-1 rounded-lg border text-[11px] cursor-pointer ${duration === d ? "bg-purple-500/20 border-purple-500 text-purple-300 font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
                {d === "AUTO" ? "⚡ AUTO" : d}
              </button>
            ))}
          </div>
        </div>

        {/* BOX 5: Voiceover & Languages (With AUTO + All Options) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 shadow-xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase">5. Voiceover & Languages ({voiceLang})</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {["AUTO", "Hindi (Pure Shuddh)", "English", "Spanish", "Portuguese", "Korean", "Japanese", "Chinese", "Arabic"].map((l) => (
              <button key={l} onClick={() => setVoiceLang(l === "AUTO" ? "AUTO (100% Shuddh Hindi)" : l)} className={`py-1.5 rounded-lg border text-xs cursor-pointer ${voiceLang.includes(l) ? "bg-cyan-500/20 border-cyan-500 text-white font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
                {l === "AUTO" ? "⚡ AUTO" : l}
              </button>
            ))}
          </div>
        </div>

        {/* BOX 6: Video Engine Model (With AUTO + All Options) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 shadow-xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase">6. Video Engine Model ({videoModel})</label>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-1.5">
            {["AUTO", "Veo", "Kling", "Runway", "Hailuo", "Luma", "Sora"].map((m) => (
              <button key={m} onClick={() => setVideoModel(m)} className={`py-1.5 rounded-lg border text-xs cursor-pointer ${videoModel === m ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
                {m === "AUTO" ? "⚡ AUTO" : m}
              </button>
            ))}
          </div>
        </div>

        {/* BOX 7: Story Engine Model (With AUTO + All Options) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 shadow-xl">
          <label className="text-xs font-semibold text-cyan-400 uppercase">7. Story Engine Model ({storyModel})</label>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-1.5">
            {["AUTO", "Gemini", "Claude", "AutoGPT", "Fast AI", "Pro AI", "DeepSeek"].map((s) => (
              <button key={s} onClick={() => setStoryModel(s)} className={`py-1.5 rounded-lg border text-xs cursor-pointer ${storyModel === s ? "bg-purple-500/20 border-purple-500 text-purple-300 font-bold" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
                {s === "AUTO" ? "⚡ AUTO" : s}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-sm text-black cursor-pointer shadow-xl">
          🚀 GENERATE AUTONOMOUS CINEMA FILM
        </button>
      </div>

      {/* Right Side Dock */}
      <div className="fixed bottom-4 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1.5 rounded-full shadow-2xl backdrop-blur-lg">
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-sm border border-slate-700 shadow-md" title="Home">🏠</Link>
        <Link href="/character-vault" className="w-9 h-9 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-sm border border-slate-700 shadow-md" title="Vault">👤</Link>
        <Link href="/studio/editor" className="w-9 h-9 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold shadow-lg shadow-cyan-500/30" title="Editor">🎬</Link>
      </div>
    </div>
  );
}
