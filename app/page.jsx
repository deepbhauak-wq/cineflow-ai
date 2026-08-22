"use client";

import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(50);
  const [prompt, setPrompt] = useState(
    "यीशु तूफान के बीच नाव में शिष्यों के साथ हैं। शांत और सामर्थी मुद्रा, रात का भयानक समुद्री तूफ़ान, बिजली की चमक और विशाल लहरें।"
  );
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("60 Min");
  const [storyModel, setStoryModel] = useState("Auto");
  const [videoModel, setVideoModel] = useState("Veo");
  const [style, setStyle] = useState("Bible Art");
  const [plan, setPlan] = useState("free");
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (provider) => {
    setUser({ name: provider === "google" ? "Google Creator" : "FB Creator", provider });
    setMessage(`Logged in via ${provider === "google" ? "Google" : "Facebook"}!`);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    setUser(null);
    setMessage("Logged out successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePlanSelect = (selectedId, creditAmount) => {
    setPlan(selectedId);
    setCredits(creditAmount);
    setMessage(`Switched to ${selectedId.toUpperCase()} Plan (${creditAmount} Credits)`);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleGenerate = () => {
    if (credits <= 0) {
      setMessage("⚠️ No credits left! Please upgrade plan.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setIsGenerating(true);
    setMessage("🚀 Generating AI Film Pipeline...");
    setTimeout(() => {
      setCredits((prev) => Math.max(0, prev - 10));
      setIsGenerating(false);
      setMessage("✅ Scene Render Completed! (10 Credits Deducted)");
      setTimeout(() => setMessage(""), 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-24 selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <header className="px-4 py-3 border-b border-slate-800 bg-[#090f1d] sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-sm">
            🎬
          </div>
          <div>
            <h1 className="text-xs font-black uppercase tracking-wider">CineFlow Pro</h1>
            <p className="text-[9px] text-cyan-400 font-bold">{credits} Credits Active</p>
          </div>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-300 font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-[10px] font-bold bg-red-950 text-red-400 border border-red-800 px-2.5 py-1 rounded-lg active:scale-95 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-lg font-bold">
              Guest Mode
            </span>
          )}
        </div>
      </header>

      {/* Floating Notification */}
      {message && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-cyan-950 border border-cyan-500 text-cyan-300 text-xs font-bold px-4 py-2 rounded-full shadow-2xl animate-bounce">
          {message}
        </div>
      )}

      <main className="max-w-xl mx-auto px-4 pt-5 space-y-5">
        {/* Social Logins */}
        {!user && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLogin("google")}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 active:scale-95 transition-all"
            >
              <span>🌐</span> Continue with Google
            </button>
            <button
              onClick={() => handleLogin("facebook")}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#1877F2] text-white font-bold text-xs hover:bg-[#166fe5] active:scale-95 transition-all"
            >
              <span>🔵</span> Facebook Login
            </button>
          </div>
        )}

        {/* 1. Master Story Input */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-cyan-400 flex items-center gap-2">
            🎛️ 1. Master Story / Screenplay Input
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        {/* 2. Aspect Ratio */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-cyan-400">📺 2. Aspect Ratio</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "16:9", label: "16:9 Cinema" },
              { id: "9:16", label: "9:16 Shorts" },
              { id: "21:9", label: "21:9 Ultra" },
              { id: "4:3", label: "4:3 Classic" },
              { id: "1:1", label: "1:1 Square" },
              { id: "Auto", label: "AI Smart" },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRatio(r.id)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                  ratio === r.id
                    ? "bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10"
                    : "bg-[#060a14] border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Timeline & Long Video Mode */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-indigo-400">📚 3. Timeline & Long Video Mode</label>
          <div className="grid grid-cols-3 gap-2">
            {["3 Min", "15 Min", "20 Min", "30 Min", "60 Min", "Custom"].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                  duration === d
                    ? "bg-indigo-950/70 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10"
                    : "bg-[#060a14] border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 4 & 5. AI Engines */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1.5">
            <label className="text-[9px] font-black uppercase text-purple-400">🧠 4. Story Engine</label>
            <div className="grid grid-cols-2 gap-1.5">
              {["Auto", "GPT", "Gemini", "Claude"].map((m) => (
                <button
                  key={m}
                  onClick={() => setStoryModel(m)}
                  className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all ${
                    storyModel === m
                      ? "bg-purple-950 border-purple-500 text-purple-200"
                      : "bg-[#060a14] border-slate-800 text-slate-400"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-1.5">
            <label className="text-[9px] font-black uppercase text-cyan-400">📹 5. Video Model</label>
            <div className="grid grid-cols-2 gap-1.5">
              {["Veo", "Kling", "Runway", "Hailuo"].map((vm) => (
                <button
                  key={vm}
                  onClick={() => setVideoModel(vm)}
                  className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all ${
                    videoModel === vm
                      ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                      : "bg-[#060a14] border-slate-800 text-slate-400"
                  }`}
                >
                  {vm}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Visual Atmosphere & Style */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[10px] font-black uppercase text-amber-400">🎞️ 6. Visual Atmosphere & Style</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "Bible Art", icon: "📜" },
              { id: "Cinematic Epic", icon: "⚔️" },
              { id: "Realistic 8K", icon: "📸" },
              { id: "Historical", icon: "🏛️" },
              { id: "Dark Cyberpunk", icon: "🤖" },
              { id: "3D Animation", icon: "🧊" },
              { id: "Anime 2D", icon: "✨" },
              { id: "Documentary", icon: "🎥" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStyle(st.id)}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                  style === st.id
                    ? "bg-[#1f1910] border-amber-500 text-amber-300 shadow-md shadow-amber-500/10"
                    : "bg-[#060a14] border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{st.icon}</span>
                  <span>{st.id}</span>
                </span>
                {style === st.id && <span className="text-amber-400 font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Subscription Plans ($ USD) */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-400">💳 Subscription Plan</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "free", name: "Free Tier", price: "$0", cr: 50 },
              { id: "pro", name: "Pro Studio", price: "$49", cr: 1500 },
              { id: "master", name: "Master AK", price: "$99", cr: 5000 },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handlePlanSelect(p.id, p.cr)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  plan === p.id
                    ? "border-cyan-500 bg-[#0f172a] shadow-lg shadow-cyan-500/10 scale-[1.02]"
                    : "border-slate-800 bg-[#0b1222] hover:border-slate-700"
                }`}
              >
                <div className="text-[10px] text-slate-400 font-bold uppercase">{p.name}</div>
                <div className="text-base font-black text-white my-0.5">{p.price}</div>
                <div className="text-[9px] text-cyan-400 font-semibold">{p.cr} Credits</div>
              </button>
            ))}
          </div>
        </div>

        {/* Master Action Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl transition-all ${
            isGenerating
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 hover:scale-[1.01] active:scale-[0.99] shadow-cyan-500/20"
          }`}
        >
          {isGenerating ? "⚡ Rendering Film Package..." : "🚀 Generate Cinema Video Package"}
        </button>
      </main>
    </div>
  );
}
