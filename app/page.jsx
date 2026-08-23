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
  const [duration, setDuration] = useState("3 Min");
  const [visualStyle, setVisualStyle] = useState("Cinematic");
  const [customStyle, setCustomStyle] = useState("");
  const [videoModel, setVideoModel] = useState("Veo");
  const [storyModel, setStoryModel] = useState("Gemini");
  const [voiceLang, setVoiceLang] = useState("Hindi (Pure Shuddh)");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const styles = [
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
    { name: "Anime", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=60" },
    { name: "Fantasy", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=60" },
    { name: "Dark Cinema", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&auto=format&fit=crop&q=60" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("cineflow_logged_in");
    const savedEmail = localStorage.getItem("cineflow_user_email");
    if (saved === "true") {
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

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (f) setUploadedImage(URL.createObjectURL(f));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex flex-col items-center justify-center p-4 text-white">
        <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-2xl mb-3">🎬</div>
          <h1 className="text-xl font-bold mb-1">CineFlow AI</h1>
          <p className="text-xs text-slate-400 mb-6">Autonomous Cinema Studio</p>

          <div className="w-full space-y-2 mb-4">
            <button onClick={() => handleLogin("google.user@gmail.com")} className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold">
              Continue with Google / Gmail
            </button>
            <button onClick={() => handleLogin("facebook.user@fb.com")} className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold">
              Continue with Facebook
            </button>
            <button onClick={() => handleLogin("instagram.user@insta.com")} className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold">
              Continue with Instagram
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(email); }} className="w-full space-y-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-[10px] text-slate-400">{showPassword ? "Hide" : "Show"}</button>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 font-bold text-xs text-black">SIGN IN</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 pb-28">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-sm">🎬</div>
          <h1 className="text-base font-bold">CineFlow AI</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-xs font-mono text-cyan-300">⚡ 55 Cr</span>
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold uppercase">{email.charAt(0)}</div>
          <button onClick={handleLogout} className="text-xs text-red-400">Logout</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Story Input & Reference Upload */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase">1. Master Story & Reference Image</label>
          <textarea rows={3} value={storyPrompt} onChange={(e) => setStoryPrompt(e.target.value)} placeholder="Story topic..." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none"/>
          <div className="flex items-center gap-3">
            <label className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-cyan-300 cursor-pointer">
              <span>🖼️ Upload Gallery Photo</span>
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden"/>
            </label>
            {uploadedImage && <span className="text-xs text-green-400">Attached ✓</span>}
          </div>
        </div>

        {/* Visual Styles */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase">2. Visual Style ({visualStyle})</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {styles.map((s) => (
              <div key={s.name} onClick={() => setVisualStyle(s.name)} className={`rounded-xl overflow-hidden border cursor-pointer ${visualStyle === s.name ? "border-cyan-400" : "border-slate-800"}`}>
                <img src={s.img} alt={s.name} className="w-full h-14 object-cover"/>
                <p className="text-[10px] text-center p-1 bg-black truncate">{s.name}</p>
              </div>
            ))}
          </div>
          <input type="text" value={customStyle} onChange={(e) => setCustomStyle(e.target.value)} placeholder="Custom Style..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <label className="text-xs font-semibold text-cyan-400 uppercase block mb-2">3. Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {["16:9", "9:16", "21:9"].map((r) => (
                <button key={r} onClick={() => setAspectRatio(r)} className={`py-2 text-xs rounded-xl border ${aspectRatio === r ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{r}</button>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <label className="text-xs font-semibold text-cyan-400 uppercase block mb-2">4. Duration</label>
            <div className="grid grid-cols-3 gap-2">
              {["3 Min", "15 Min", "30 Min"].map((d) => (
                <button key={d} onClick={() => setDuration(d)} className={`py-2 text-xs rounded-xl border ${duration === d ? "bg-purple-500/20 border-purple-500 text-purple-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); window.location.href = "/studio/editor"; }, 1000); }} className="w-full py-3.5 rounded-2xl bg-cyan-500 font-bold text-xs text-black">
          {loading ? "Processing..." : "🚀 GENERATE CINEMA FILM"}
        </button>
      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
        <div className="bg-slate-900 border border-slate-700 rounded-full px-5 py-2 shadow-2xl flex items-center gap-6">
          <Link href="/character-vault" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 text-xs">←</Link>
          <span className="text-xs text-slate-400">Flow</span>
          <Link href="/studio/editor" className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold">→</Link>
        </div>
      </div>
    </div>
  );
}
