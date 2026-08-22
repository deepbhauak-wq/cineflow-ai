"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [prompt, setPrompt] = useState("यीशु तूफान के बीच नाव में...");
  
  // States for 6-point Structure
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("60 Min");
  const [story, setStory] = useState("Auto");
  const [video, setVideo] = useState("Veo");
  const [style, setStyle] = useState("Bible Art");
  const [loading, setLoading] = useState(false);

  // Auth Handler
  const handleAuth = (e) => { e.preventDefault(); setIsLoggedIn(true); };

  // Generate Button Handler
  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
        alert("🚀 Cinema Video Package Generated Successfully!");
        setLoading(false);
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-8 rounded-3xl border border-slate-800 text-center">
          <h2 className="text-xl font-black text-white mb-6">{authMode === 'login' ? 'Studio Login' : 'Create Account'}</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => alert("Google Auth Active")} className="text-[10px] font-bold p-3 bg-white text-black rounded-xl border border-slate-700">Google</button>
            <button onClick={() => alert("FB Auth Active")} className="text-[10px] font-bold p-3 bg-[#1877F2] text-white rounded-xl border border-slate-700">Facebook</button>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
            <input type="password" placeholder="Password" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
            <button className="w-full py-3 bg-cyan-600 rounded-xl font-black text-xs text-white uppercase">{authMode === 'login' ? 'Login' : 'Sign Up'}</button>
          </form>
          <p className="mt-4 text-[10px] text-slate-500 cursor-pointer" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
            {authMode === 'login' ? "Need account? Sign Up" : "Have account? Login"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-10">
      <header className="px-5 py-4 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-[#090f1d]/80 backdrop-blur-md">
        <h1 className="text-xs font-black text-cyan-400 uppercase tracking-widest">CineFlow Pro Studio</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-[9px] bg-red-900/20 text-red-400 px-3 py-1 rounded font-bold uppercase border border-red-900">Logout</button>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        {/* 1. Master Story */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[9px] font-black uppercase text-cyan-500">🎛️ 1. Master Story Input</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-3 text-xs outline-none focus:border-cyan-500" />
        </div>

        {/* 2. Aspect Ratio */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
            <label className="text-[9px] font-black uppercase text-cyan-500">📺 2. Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">
                {["16:9", "9:16", "21:9"].map(r => <button key={r} onClick={() => setRatio(r)} className={`p-2 rounded-lg text-[10px] font-bold border transition-all ${ratio === r ? 'bg-cyan-900 border-cyan-500' : 'bg-[#060a14] border-slate-800'}`}>{r}</button>)}
            </div>
        </div>

        {/* 3. Timeline */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
            <label className="text-[9px] font-black uppercase text-cyan-500">📚 3. Timeline Mode</label>
            <div className="grid grid-cols-3 gap-2">{["3 Min", "30 Min", "60 Min"].map(d => <button key={d} onClick={() => setDuration(d)} className={`p-2 rounded-lg text-[10px] font-bold border transition-all ${duration === d ? 'bg-indigo-900 border-indigo-500' : 'bg-[#060a14] border-slate-800'}`}>{d}</button>)}</div>
        </div>

        {/* 4 & 5. AI Engines */}
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800">
                <label className="text-[9px] font-black text-purple-400 uppercase">🧠 4. Story AI</label>
                <div className="grid grid-cols-1 gap-1 mt-1">{["Auto", "GPT", "Gemini"].map(m => <button key={m} onClick={() => setStoryModel(m)} className={`text-[9px] p-1 rounded font-bold ${storyModel === m ? 'bg-purple-900' : ''}`}>{m}</button>)}</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800">
                <label className="text-[9px] font-black text-cyan-400 uppercase">📹 5. Video AI</label>
                <div className="grid grid-cols-1 gap-1 mt-1">{["Veo", "Kling", "Runway"].map(v => <button key={v} onClick={() => setVideoModel(v)} className={`text-[9px] p-1 rounded font-bold ${videoModel === v ? 'bg-cyan-900' : ''}`}>{v}</button>)}</div>
            </div>
        </div>

        {/* 6. Visual Style Gallery */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-[9px] font-black uppercase text-amber-500">🎞️ 6. Visual Atmosphere</label>
          <div className="grid grid-cols-2 gap-2">
            {[{n:"Bible Art", i:"📜"}, {n:"Cinematic", i:"⚔️"}, {n:"3D Anim", i:"🧊"}, {n:"Documentary", i:"🎥"}].map((st) => (
              <button key={st.n} onClick={() => setStyle(st.n)} className={`p-3 rounded-xl border text-[10px] font-bold flex items-center gap-2 transition-all ${style === st.n ? 'bg-[#1f1910] border-amber-500 text-amber-200' : 'bg-[#060a14] border-slate-800 text-slate-400'}`}>
                <span className="text-sm">{st.i}</span> {st.n}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleGenerate} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white hover:scale-[1.01] transition-all">
          {loading ? "PROCESSING..." : "🚀 Generate Cinema Video Package"}
        </button>
      </main>
    </div>
  );
}
