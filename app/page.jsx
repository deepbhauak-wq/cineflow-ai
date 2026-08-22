"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [prompt, setPrompt] = useState("यीशु तूफान के बीच नाव में...");
  
  // States for 6-point UI
  const [ratio, setRatio] = useState("16:9");
  const [style, setStyle] = useState("Bible Art");

  // Auth Handling
  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-[#0b1222] p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <h2 className="text-xl font-black text-white mb-6 text-center">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'signup' && <input type="text" placeholder="Full Name" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />}
            <input type="email" placeholder="Email Address" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
            <input type="password" placeholder="Password" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
            <button className="w-full py-3 bg-cyan-600 rounded-xl font-black text-xs text-white uppercase">{authMode === 'login' ? 'Login' : 'Sign Up'}</button>
          </form>
          <div className="mt-6 text-[10px] text-center text-slate-500">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-cyan-400 font-bold cursor-pointer">
              {authMode === 'login' ? 'Sign Up' : 'Login'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard (The 6-point UI structure you liked)
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-10">
      <header className="px-5 py-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-sm font-black text-cyan-400 uppercase">CineFlow Pro Studio</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-[9px] bg-red-900/20 text-red-400 px-3 py-1 rounded border border-red-900 font-bold">LOGOUT</button>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        {/* 1. Master Story */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[9px] font-black uppercase text-cyan-500">🎛️ 1. Master Story Input</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-3 text-xs outline-none" rows={3} />
        </div>

        {/* 2. Aspect Ratio */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
            <label className="text-[9px] font-black uppercase text-cyan-500">📺 2. Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-2">{["16:9", "9:16", "21:9"].map(r => <button key={r} onClick={() => setRatio(r)} className={`p-2 rounded-lg text-[10px] font-bold ${ratio === r ? 'bg-cyan-950 border border-cyan-500' : 'bg-[#060a14] border border-slate-800'}`}>{r}</button>)}</div>
        </div>

        {/* 3. Timeline */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
            <label className="text-[9px] font-black uppercase text-cyan-500">📚 3. Timeline</label>
            <div className="grid grid-cols-3 gap-2">{["3 Min", "30 Min", "60 Min"].map(d => <button key={d} className="p-2 bg-[#060a14] rounded-lg border border-slate-800 text-[10px] font-bold">{d}</button>)}</div>
        </div>

        {/* 4 & 5. AI Engines */}
        <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[9px] font-black text-purple-400">🧠 4. STORY AI</label><select className="w-full bg-transparent text-xs font-bold mt-1 outline-none"><option>Auto</option></select></div>
            <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[9px] font-black text-cyan-400">📹 5. VIDEO AI</label><select className="w-full bg-transparent text-xs font-bold mt-1 outline-none"><option>Veo</option></select></div>
        </div>

        {/* 6. Visual Style Gallery */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-[9px] font-black uppercase text-amber-500">🎞️ 6. Visual Atmosphere & Style</label>
          <div className="grid grid-cols-2 gap-2">
            {[{n:"Bible Art", i:"📜"}, {n:"Cinematic", i:"⚔️"}, {n:"3D Anim", i:"🧊"}, {n:"Documentary", i:"🎥"}].map((st) => (
              <button key={st.n} onClick={() => setStyle(st.n)} className={`p-3 rounded-xl border text-[10px] font-bold flex items-center gap-2 transition-all ${style === st.n ? 'bg-[#1f1910] border-amber-500 text-amber-200' : 'bg-[#060a14] border-slate-800 text-slate-400'}`}>
                <span className="text-sm">{st.i}</span> {st.n}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white">🚀 Generate Cinema Video Package</button>
      </main>
    </div>
  );
}
