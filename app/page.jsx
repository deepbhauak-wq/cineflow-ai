"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CineFlowApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Force Subscription Plan State (true = show subscription wall if credits/plan required)
  const [showSubscriptionPlan, setShowSubscriptionPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Pro Director");
  const [billingCycle, setBillingCycle] = useState("Monthly");

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

  const [vault, setVault] = useState([
    { id: 1, title: "Epic Cinematic Trailer", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=60" }
  ]);

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

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVault([{ id: Date.now(), title: storyPrompt || "New AI Film", url: uploadedImage || styles[0].img }, ...vault]);
      window.location.href = "/studio/editor";
    }, 1200);
  };

  // 1. PROFESSIONAL LOGIN SCREEN WITH LOGO
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0d14] flex flex-col items-center justify-center p-4 text-white font-sans">
        <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 border border-cyan-500/40 shadow-lg">
            <img src="https://i.ibb.co/3w513qJ7/32938.jpg" alt="Logo" className="w-full h-full object-cover"/>
          </div>
          <h1 className="text-xl font-bold mb-1">CineFlow AI Pro</h1>
          <p className="text-xs text-slate-400 mb-6">Autonomous Cinema Engine</p>

          <div className="w-full space-y-2 mb-4">
            <button onClick={() => handleLogin("google.user@gmail.com")} className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
              <span>🌐</span> Continue with Google
            </button>
            <button onClick={() => handleLogin("facebook.user@fb.com")} className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
              <span>📘</span> Continue with Facebook
            </button>
            <button onClick={() => handleLogin("instagram.user@insta.com")} className="w-full py-2.5 px-4 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
              <span>📸</span> Continue with Instagram
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(email); }} className="w-full space-y-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-[10px] text-slate-400">{showPassword ? "Hide" : "Show"}</button>
            </div>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 font-bold text-xs text-black cursor-pointer">SIGN IN</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 pb-28 font-sans">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-500/40">
            <img src="https://i.ibb.co/3w513qJ7/32938.jpg" alt="Logo" className="w-full h-full object-cover"/>
          </div>
          <h1 className="text-base font-bold">CineFlow AI</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSubscriptionPlan(true)} className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-xs font-mono text-cyan-300 cursor-pointer">
            ⚡ 55 Cr (Upgrade)
          </button>
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold uppercase">{email.charAt(0)}</div>
          <button onClick={handleLogout} className="text-xs text-red-400">Logout</button>
        </div>
      </div>

      {/* FORCE SUBSCRIPTION PLAN MODAL / OVERLAY */}
      {showSubscriptionPlan && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
            <button onClick={() => setShowSubscriptionPlan(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 hover:text-white">✕</button>
            
            <div className="text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] text-cyan-300 font-semibold uppercase tracking-widest">PRO ACCESS REQUIRED</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Choose Your CineFlow AI Plan</h2>
              <p className="text-xs text-slate-400">Unlock Unlimited Veo / Kling generation, 4K export & Character Vault.</p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center">
              <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
                <button onClick={() => setBillingCycle("Monthly")} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${billingCycle === "Monthly" ? "bg-cyan-500 text-black font-bold" : "text-slate-400"}`}>Monthly Billing</button>
                <button onClick={() => setBillingCycle("Yearly")} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${billingCycle === "Yearly" ? "bg-cyan-500 text-black font-bold" : "text-slate-400"}`}>Yearly (Save 40%)</button>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: "Starter Creator", price: billingCycle === "Monthly" ? "$19" : "$12", credits: "300 Credits/mo", desc: "For individual YouTube & social creators." },
                { name: "Pro Director", price: billingCycle === "Monthly" ? "$49" : "$29", credits: "1,200 Credits/mo", desc: "Full Veo/Kling access & 4K multi-track export." },
                { name: "Studio Enterprise", price: billingCycle === "Monthly" ? "$149" : "$99", credits: "Unlimited Credits", desc: "For professional production houses & studios." }
              ].map((plan) => (
                <div 
                  key={plan.name}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`rounded-2xl p-4 border cursor-pointer transition flex flex-col justify-between ${
                    selectedPlan === plan.name ? "bg-cyan-950/30 border-cyan-500 ring-2 ring-cyan-500/30" : "bg-slate-950 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-white">{plan.name}</h3>
                      {selectedPlan === plan.name && <span className="text-[10px] bg-cyan-500 text-black px-1.5 py-0.5 rounded font-bold">Active</span>}
                    </div>
                    <div className="text-lg font-extrabold text-cyan-400">{plan.price}<span className="text-[10px] text-slate-400 font-normal">/mo</span></div>
                    <p className="text-[10px] text-slate-300 font-semibold">{plan.credits}</p>
                    <p className="text-[10px] text-slate-400">{plan.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => { setShowSubscriptionPlan(false); alert(`Successfully subscribed to ${selectedPlan}!`); }} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-black shadow-lg cursor-pointer">
              UNLOCK {selectedPlan.toUpperCase()} NOW 🚀
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Rendered Outputs Vault */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-400 uppercase">🎬 Generated Cinematic Vault</label>
            <button onClick={() => setShowSubscriptionPlan(true)} className="text-[10px] text-cyan-300 underline">View Subscription Plans</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {vault.map((v) => (
              <div key={v.id} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex items-center gap-3">
                <img src={v.url} alt="" className="w-12 h-10 rounded-lg object-cover"/>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{v.title}</p>
                  <p className="text-[10px] text-slate-400">Ready in 4K</p>
                </div>
                <Link href="/studio/editor" className="px-2.5 py-1 rounded-lg bg-cyan-500 text-black text-[10px] font-bold">Edit</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Story Input */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase">1. Master Story & Reference</label>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {styles.map((s) => (
              <div key={s.name} onClick={() => setVisualStyle(s.name)} className={`rounded-xl overflow-hidden border cursor-pointer ${visualStyle === s.name ? "border-cyan-400" : "border-slate-800"}`}>
                <img src={s.img} alt={s.name} className="w-full h-14 object-cover"/>
                <p className="text-[10px] text-center p-1 bg-black truncate">{s.name}</p>
              </div>
            ))}
          </div>
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
        <button onClick={handleGenerate} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-sm text-black cursor-pointer">
          {loading ? "Generating Film..." : "🚀 GENERATE AUTONOMOUS CINEMA FILM"}
        </button>
      </div>

      {/* Floating Bottom Nav (Right Side Only) */}
      <div className="fixed bottom-4 inset-x-0 flex justify-end z-50 px-6">
        <div className="bg-slate-900 border border-slate-700 rounded-full px-4 py-2 shadow-2xl flex items-center gap-3">
          <span className="text-[11px] text-slate-400">Next</span>
          <Link href="/studio/editor" className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold">→</Link>
        </div>
      </div>
    </div>
  );
        }
                                                                                                                                       
