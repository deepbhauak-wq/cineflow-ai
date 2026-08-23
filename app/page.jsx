"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState("google");
  
  const [googleEmail, setGoogleEmail] = useState("");
  const [googlePass, setGooglePass] = useState("");
  const [showGooglePass, setShowGooglePass] = useState(false);

  const [fbUser, setFbUser] = useState("");
  const [fbPass, setFbPass] = useState("");
  const [showFbPass, setShowFbPass] = useState(false);

  const [instaUser, setInstaUser] = useState("");
  const [instaPass, setInstaPass] = useState("");
  const [showInstaPass, setShowInstaPass] = useState(false);

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
  const [loading, setLoading] = useState(false);

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
    if (saved === "true") {
      setIsLoggedIn(true);
      if (savedEmail) setActiveEmail(savedEmail);
    }
  }, []);

  const handleAuthSubmit = (e, method) => {
    e.preventDefault();
    let emailUsed = "user@gmail.com";
    if (method === "google") emailUsed = googleEmail || "google.user@gmail.com";
    if (method === "facebook") emailUsed = fbUser ? `${fbUser}@facebook.com` : "fb.user@facebook.com";
    if (method === "instagram") emailUsed = instaUser ? `${instaUser}@instagram.com` : "insta.user@instagram.com";

    localStorage.setItem("cineflow_logged_in", "true");
    localStorage.setItem("cineflow_user_email", emailUsed);
    setActiveEmail(emailUsed);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("cineflow_logged_in");
    localStorage.removeItem("cineflow_user_email");
    setIsLoggedIn(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/studio/editor";
    }, 1200);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#0a0d14] flex flex-col items-center justify-center p-4 text-white font-sans">
        <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl shadow-cyan-500/20 mb-4 border border-cyan-500/40">
            <img src="https://i.ibb.co/3w513qJ7/32938.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1 text-center">CineFlow AI Pro</h1>
          <p className="text-xs text-slate-400 text-center mb-5">Autonomous Cinema Engine</p>

          <div className="w-full grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5">
            <button type="button" onClick={() => setLoginMethod("google")} className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${loginMethod === "google" ? "bg-cyan-500 text-black" : "text-slate-400"}`}>Gmail</button>
            <button type="button" onClick={() => setLoginMethod("facebook")} className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${loginMethod === "facebook" ? "bg-[#1877F2] text-white" : "text-slate-400"}`}>Facebook</button>
            <button type="button" onClick={() => setLoginMethod("instagram")} className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${loginMethod === "instagram" ? "bg-gradient-to-r from-amber-500 to-purple-600 text-white" : "text-slate-400"}`}>Instagram</button>
          </div>

          {loginMethod === "google" && (
            <form onSubmit={(e) => handleAuthSubmit(e, "google")} className="w-full space-y-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Gmail Address</label>
                <input type="email" required value={googleEmail} onChange={(e) => setGoogleEmail(e.target.value)} placeholder="yourname@gmail.com" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Google Password</label>
                <div className="relative">
                  <input type={showGooglePass ? "text" : "password"} required value={googlePass} onChange={(e) => setGooglePass(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
                  <button type="button" onClick={() => setShowGooglePass(!showGooglePass)} className="absolute right-3 top-2 text-[10px] text-cyan-400 font-semibold cursor-pointer">{showGooglePass ? "Hide" : "Show"}</button>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-white shadow-lg cursor-pointer">SIGN IN WITH GMAIL</button>
            </form>
          )}

          {loginMethod === "facebook" && (
            <form onSubmit={(e) => handleAuthSubmit(e, "facebook")} className="w-full space-y-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Facebook Username / Email</label>
                <input type="text" required value={fbUser} onChange={(e) => setFbUser(e.target.value)} placeholder="username or email" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Facebook Password</label>
                <div className="relative">
                  <input type={showFbPass ? "text" : "password"} required value={fbPass} onChange={(e) => setFbPass(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
                  <button type="button" onClick={() => setShowFbPass(!showFbPass)} className="absolute right-3 top-2 text-[10px] text-cyan-400 font-semibold cursor-pointer">{showFbPass ? "Hide" : "Show"}</button>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#1877F2] font-bold text-xs text-white shadow-lg cursor-pointer">SIGN IN WITH FACEBOOK</button>
            </form>
          )}

          {loginMethod === "instagram" && (
            <form onSubmit={(e) => handleAuthSubmit(e, "instagram")} className="w-full space-y-3.5">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Instagram Username</label>
                <input type="text" required value={instaUser} onChange={(e) => setInstaUser(e.target.value)} placeholder="username" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Instagram Password</label>
                <div className="relative">
                  <input type={showInstaPass ? "text" : "password"} required value={instaPass} onChange={(e) => setInstaPass(e.target.value)} placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
                  <button type="button" onClick={() => setShowInstaPass(!showInstaPass)} className="absolute right-3 top-2 text-[10px] text-cyan-400 font-semibold cursor-pointer">{showInstaPass ? "Hide" : "Show"}</button>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 font-bold text-xs text-white shadow-lg cursor-pointer">SIGN IN WITH INSTAGRAM</button>
            </form>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 md:p-8 font-sans pb-28">
      
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-500/40 shadow-md">
            <img src="https://i.ibb.co/3w513qJ7/32938.jpg" alt="Logo" className="w-full h-full object-cover"/>
          </div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">CineFlow AI</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono text-cyan-300">
            ⚡ 55 Cr
          </div>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white uppercase" title={activeEmail}>
              {activeEmail ? activeEmail.charAt(0) : "U"}
            </div>
            <button onClick={handleLogout} className="text-xs text-red-400 hover:underline">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* Full-Size Cinematic Player View */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 space-y-3 shadow-2xl">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">🎬 Full-Size Cinematic Player View</label>
            <span className="text-[10px] text-slate-400">Live 4K HDR Preview</span>
          </div>

          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 bg-black relative flex items-center justify-center shadow-inner group">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1000&auto=format&fit=crop&q=80" alt="Cinematic Output" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
              <span className="text-xs font-bold text-cyan-300">CineFlow AI Production - Scene 01 (4K HDR)</span>
              <p className="text-[10px] text-slate-300">Autonomous Render Complete • Shuddh Hindi Voiceover Active</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-cyan-500/90 backdrop-blur-md flex items-center justify-center text-black text-xl shadow-xl shadow-cyan-500/40 cursor-pointer hover:scale-110 transition">
                ▶
              </div>
            </div>
          </div>
        </div>

        {/* 1. Master Story & Reference Image */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">1. Master Story & Reference Image</label>
          <textarea rows={3} value={storyPrompt} onChange={(e) => setStoryPrompt(e.target.value)} placeholder="Enter storyline here... AI will auto-decompose into scenes." className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none"/>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-slate-800">
            <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-cyan-300 cursor-pointer flex items-center justify-center gap-2">
              <span>🖼️ Upload Reference Photo from Gallery</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
            </label>
            {uploadedImage ? (
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 p-2 rounded-xl w-full sm:w-auto">
                <img src={uploadedImage} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-cyan-500/40"/>
                <div className="text-xs">
                  <p className="font-semibold text-cyan-300">Reference Photo Attached ✓</p>
                  <button onClick={() => setUploadedImage(null)} className="text-[10px] text-red-400 hover:underline">Remove</button>
                </div>
              </div>
            ) : <span className="text-[11px] text-slate-500">No reference image selected</span>}
          </div>
        </div>

        {/* 2. Visual Art Style */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
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
                <div className="absolute inset-x-0 bottom-0 bg-black/80 p-1 text-center">
                  <p className="text-[10px] font-medium text-white truncate">{s.name}</p>
                </div>
              </div>
            ))}
          </div>
          <input type="text" value={customStyle} onChange={(e) => setCustomStyle(e.target.value)} placeholder="Or write Custom Art Style prompt..." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-2 focus:outline-none"/>
        </div>

        {/* 3 & 4. Aspect Ratio & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">3. Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
              {["16:9", "9:16", "21:9", "4:3", "1:1", "Auto"].map((ratio) => (
                <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`py-2 rounded-xl border text-xs font-semibold transition ${aspectRatio === ratio ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{ratio}</button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">4. Timeline Tier</label>
            <div className="grid grid-cols-2 gap-2">
              {["3 Min (18 Scenes)", "15 Min (90 Scenes)", "30 Min (180 Scenes)", "60 Min (360 Scenes)"].map((tier) => (
                <button key={tier} onClick={() => setDuration(tier)} className={`py-2 px-1 rounded-xl border text-[11px] font-semibold transition ${duration === tier ? "bg-purple-500/20 border-purple-500 text-purple-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{tier}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Voiceover & Languages */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">5. Voiceover & Languages</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Hindi (Pure Shuddh)", "English", "Spanish", "Portuguese", "Korean", "Japanese", "Chinese", "Indonesian", "French", "German", "Arabic", "All Languages"].map((lang) => (
              <button key={lang} onClick={() => setVoiceLang(lang)} className={`py-2 px-2 rounded-xl border text-xs transition ${voiceLang === lang ? "bg-cyan-500/20 border-cyan-500 text-white font-semibold" : "bg-slate-800 border-slate-700 t
