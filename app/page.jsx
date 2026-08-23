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
  const [showFbP, setShowFbP] = useState(false);

  const [instaU, setInstaU] = useState("");
  const [instaP, setInstaP] = useState("");
  const [showInstaP, setShowInstaP] = useState(false);

  const [activeEmail, setActiveEmail] = useState("user@gmail.com");
  const [loading, setLoading] = useState(false);
  const [showPlayModal, setShowPlayModal] = useState(false);
  const [isPlayingCompleted, setIsPlayingCompleted] = useState(false);
  const [isPlayingDashboard, setIsPlayingDashboard] = useState(false);

  const [storyPrompt, setStoryPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min");
  const [visualStyle, setVisualStyle] = useState("Cinematic");
  const [customStyle, setCustomStyle] = useState("");
  const [videoModel, setVideoModel] = useState("Veo");
  const [storyModel, setStoryModel] = useState("Gemini");
  const [voiceLang, setVoiceLang] = useState("Hindi (Pure Shuddh)");
  const [uploadedImage, setUploadedImage] = useState(null);

  const styleCatalog = [
    { name: "Realistic", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
    { name: "Cinematic", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200" },
    { name: "Epic", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200" },
    { name: "Anime", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200" },
    { name: "Fantasy", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200" },
    { name: "Dark Cinema", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200" }
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
    let email = m === "google" ? (gEmail || "gmail@user.com") : m === "facebook" ? (fbU ? fbU + "@fb.com" : "fb@user.com") : (instaU ? instaU + "@insta.com" : "insta@user.com");
    localStorage.setItem("cineflow_logged_in", "true");
    localStorage.setItem("cineflow_user_email", email);
    setActiveEmail(email);
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
    }, 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#0a0d14] flex flex-col items-center justify-center p-4 text-white font-sans">
        <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-black border border-cyan-500/40 p-2 flex items-center justify-center mb-4">
            <span className="text-xl text-cyan-400 font-bold">▶</span>
          </div>
          <h1 className="text-xl font-bold mb-1">CineFlow AI Pro</h1>
          <p className="text-xs text-slate-400 mb-4">Autonomous Cinema Engine</p>

          <div className="w-full grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl mb-4">
            <button type="button" onClick={() => setLoginMethod("google")} className={`py-1.5 rounded-lg text-[11px] font-bold ${loginMethod === "google" ? "bg-cyan-500 text-black" : "text-slate-400"}`}>Gmail</button>
            <button type="button" onClick={() => setLoginMethod("facebook")} className={`py-1.5 rounded-lg text-[11px] font-bold ${loginMethod === "facebook" ? "bg-[#1877F2] text-white" : "text-slate-400"}`}>Facebook</button>
            <button type="button" onClick={() => setLoginMethod("instagram")} className={`py-1.5 rounded-lg text-[11px] font-bold ${loginMethod === "instagram" ? "bg-purple-600 text-white" : "text-slate-400"}`}>Instagram</button>
          </div>

          {loginMethod === "google" && (
            <form onSubmit={(e) => handleAuth(e, "google")} className="w-full space-y-3">
              <input type="email" required value={gEmail} onChange={(e) => setGEmail(e.target.value)} placeholder="name@gmail.com" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <div className="relative">
                <input type={showGP ? "text" : "password"} required value={gPass} onChange={(e) => setGPass(e.target.value)} placeholder="Password" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
                <button type="button" onClick={() => setShowGP(!showGP)} className="absolute right-3 top-2 text-[10px] text-cyan-400">{showGP ? "Hide" : "Show"}</button>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 font-bold text-xs text-black">PERMANENT SIGN IN</button>
            </form>
          )}

          {loginMethod === "facebook" && (
            <form onSubmit={(e) => handleAuth(e, "facebook")} className="w-full space-y-3">
              <input type="text" required value={fbU} onChange={(e) => setFbU(e.target.value)} placeholder="Facebook Username" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <input type="password" required value={fbP} onChange={(e) => setFbP(e.target.value)} placeholder="Password" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#1877F2] font-bold text-xs text-white">PERMANENT SIGN IN</button>
            </form>
          )}

          {loginMethod === "instagram" && (
            <form onSubmit={(e) => handleAuth(e, "instagram")} className="w-full space-y-3">
              <input type="text" required value={instaU} onChange={(e) => setInstaU(e.target.value)} placeholder="Instagram Username" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <input type="password" required value={instaP} onChange={(e) => setInstaP(e.target.value)} placeholder="Password" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-purple-600 font-bold text-xs text-white">PERMANENT SIGN IN</button>
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
          <p className="text-xs text-cyan-400 font-bold">Rendering Film...</p>
        </div>
      )}

      {showPlayModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-green-400">🎉 Film Rendered Successfully</span>
              <button onClick={() => setShowPlayModal(false)} className="text-xs text-slate-400">Close ✕</button>
            </div>
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800" alt="" className="w-full h-full object-cover"/>
              <button onClick={() => setIsPlayingCompleted(!isPlayingCompleted)} className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">{isPlayingCompleted ? "❚❚" : "▶"}</div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <h1 className="text-sm font-bold">CineFlow AI</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-cyan-300">⚡ 55 Cr</span>
          <button onClick={handleLogout} className="text-xs text-red-400">Logout</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-semibold text-cyan-400 uppercase">Cinematic Player</label>
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800" alt="" className="w-full h-full object-cover opacity-80"/>
            <button onClick={() => setIsPlayingDashboard(!isPlayingDashboard)} className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">{isPlayingDashboard ? "❚❚" : "▶"}</div>
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-semibold text-cyan-400 uppercase">1. Master Story</label>
          <textarea rows={2} value={storyPrompt} onChange={(e) => setStoryPrompt(e.target.value)} placeholder="Storyline..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"/>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <label className="text-xs font-semibold text-cyan-400 uppercase">2. Visual Style ({visualStyle})</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {styleCatalog.map((s) => (
              <div key={s.name} onClick={() => setVisualStyle(s.name)} className={`rounded-xl overflow-hidden border cursor-pointer ${visualStyle === s.name ? "border-cyan-400" : "border-slate-800"}`}>
                <img src={s.img} alt={s.name} className="w-full h-12 object-cover"/>
                <p className="text-[9px] text-center p-1 bg-black truncate">{s.name}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-black cursor-pointer">
          🚀 GENERATE AUTONOMOUS CINEMA FILM
        </button>
      </div>

      <div className="fixed bottom-3 right-4 z-50">
        <Link href="/studio/editor" className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold text-xs">→</Link>
      </div>
    </div>
  );
}
