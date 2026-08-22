"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showPass, setShowPass] = useState(false);
  
  // Dashboard states
  const [prompt, setPrompt] = useState("यीशु तूफान के बीच नाव में...");
  const [style, setStyle] = useState("Bible Art");
  const [plan, setPlan] = useState("Pro");

  // Auth Handler
  const handleAuth = (e) => { e.preventDefault(); setIsLoggedIn(true); };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <h2 className="text-lg font-black text-white mb-6 text-center">{authMode === 'login' ? 'Login Studio' : 'Create Account'}</h2>
          
          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="text-[10px] font-bold p-2.5 bg-white text-black rounded-xl">🌐 Google</button>
            <button className="text-[10px] font-bold p-2.5 bg-[#1877F2] text-white rounded-xl">🔵 Facebook</button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'signup' && <input type="text" placeholder="Full Name" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />}
            <input type="email" placeholder="Email Address" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
            
            {/* Password Field with Show/Hide Toggle */}
            <div className="relative">
              <input type={showPass ? "text" : "password"} placeholder="Password" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-[10px] font-bold text-cyan-400">
                {showPass ? "HIDE" : "SHOW"}
              </button>
            </div>
            
            <button className="w-full py-3 bg-cyan-600 rounded-xl font-black text-xs text-white uppercase">{authMode === 'login' ? 'Login' : 'Sign Up'}</button>
          </form>
          <p className="mt-4 text-[10px] text-center text-slate-500 cursor-pointer" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
            {authMode === 'login' ? "New here? Create Account" : "Already have account? Login"}
          </p>
        </div>
      </div>
    );
  }

  // Dashboard (6-Point Structure)
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-10">
      <header className="px-5 py-4 border-b border-slate-800 bg-[#090f1d] flex justify-between items-center">
        <h1 className="text-xs font-black text-cyan-400 uppercase tracking-widest">CineFlow Pro Studio</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-[9px] bg-red-950 text-red-300 px-3 py-1 rounded font-bold uppercase">Logout</button>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[9px] font-black uppercase text-cyan-500">🎛️ 1. Master Story Input</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-3 text-xs outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[8px] font-bold text-slate-500">📺 2. ASPECT RATIO</label><select className="w-full bg-transparent text-xs font-bold outline-none"><option>16:9 Cinema</option></select></div>
            <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[8px] font-bold text-slate-500">📚 3. TIMELINE</label><select className="w-full bg-transparent text-xs font-bold outline-none"><option>60 Min Mode</option></select></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[8px] font-bold text-purple-400">🧠 4. STORY AI</label><select className="w-full bg-transparent text-xs font-bold outline-none"><option>GPT-5.6</option></select></div>
            <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[8px] font-bold text-cyan-400">📹 5. VIDEO AI</label><select className="w-full bg-transparent text-xs font-bold outline-none"><option>Veo</option></select></div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-[9px] font-black uppercase text-amber-500">🎞️ 6. Visual Atmosphere & Style</label>
          <div className="grid grid-cols-2 gap-2">
            {[{n:"Bible Art", i:"📜"}, {n:"Cinematic", i:"⚔️"}, {n:"3D Anim", i:"🧊"}, {n:"Documentary", i:"🎥"}].map((st) => (
              <button key={st.n} onClick={() => setStyle(st.n)} className={`p-3 rounded-xl border text-[10px] font-bold flex items-center gap-2 ${style === st.n ? 'bg-[#1f1910] border-amber-500 text-amber-200' : 'bg-[#060a14] border-slate-800 text-slate-400'}`}>
                <span className="text-sm">{st.i}</span> {st.n}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-lg">🚀 Generate Cinema Video Package</button>
      </main>
    </div>
  );
}
