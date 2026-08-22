"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [prompt, setPrompt] = useState("यीशु तूफान के बीच नाव में शिष्यों के साथ हैं।");
  const [user, setUser] = useState(null); // null = logged out
  const [plan, setPlan] = useState("Free");

  const styles = [
    { n: "Bible Art", i: "📜" }, { n: "Cinematic", i: "⚔️" },
    { n: "Realistic", i: "📸" }, { n: "Historical", i: "🏛️" },
    { n: "Cyberpunk", i: "🤖" }, { n: "3D Anime", i: "🧊" }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-10">
      {/* Header with Auth */}
      <header className="px-5 py-3 border-b border-slate-800 bg-[#090f1d] flex items-center justify-between sticky top-0 z-50">
        <div className="text-xs font-black text-cyan-400 uppercase tracking-widest">CineFlow Pro</div>
        <div className="flex gap-2 items-center">
            <span className="text-[9px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800 font-bold">50 Free Credits</span>
            {!user ? (
                <button onClick={() => setUser('active')} className="text-[9px] font-bold bg-cyan-600 px-3 py-1 rounded">Login</button>
            ) : (
                <button onClick={() => setUser(null)} className="text-[9px] font-bold bg-red-900/50 text-red-300 px-3 py-1 rounded">Logout</button>
            )}
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        {/* Auth Buttons */}
        {!user && (
            <div className="flex gap-2">
                <button className="flex-1 text-[10px] font-bold p-2 bg-[#4267B2] rounded-lg">Facebook Login</button>
                <button className="flex-1 text-[10px] font-bold p-2 bg-white text-black rounded-lg">Google Login</button>
            </div>
        )}

        {/* 1. Master Story Input */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-2">
          <label className="text-[9px] font-black uppercase text-cyan-500 flex items-center gap-2">🎛️ 1. Master Story Input</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} className="w-full bg-[#060a14] border border-slate-800 rounded-xl p-3 text-xs outline-none focus:border-cyan-500" />
        </div>

        {/* 2 & 3. Aspect & Timeline */}
        <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[8px] font-bold text-slate-500">📺 ASPECT RATIO</label><select className="w-full bg-transparent text-xs font-bold mt-1 outline-none"><option>16:9 Cinema</option></select></div>
            <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[8px] font-bold text-slate-500">📚 TIMELINE</label><select className="w-full bg-transparent text-xs font-bold mt-1 outline-none"><option>60 Min Mode</option></select></div>
        </div>

        {/* 4 & 5. AI Engines */}
        <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[8px] font-bold text-purple-400">🧠 STORY AI</label><select className="w-full bg-transparent text-xs font-bold mt-1 outline-none"><option>GPT-5.6</option></select></div>
            <div className="p-3 rounded-2xl bg-[#0b1222] border border-slate-800"><label className="text-[8px] font-bold text-cyan-400">📹 VIDEO AI</label><select className="w-full bg-transparent text-xs font-bold mt-1 outline-none"><option>Veo Cinema</option></select></div>
        </div>

        {/* 6. Visual Style Gallery */}
        <div className="p-4 rounded-2xl bg-[#0b1222] border border-slate-800 space-y-3">
          <label className="text-[9px] font-black uppercase text-amber-500">🎞️ 6. Visual Atmosphere & Style</label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map((st) => (
              <button key={st.n} className="p-2.5 rounded-xl border border-slate-800 bg-[#060a14] text-[10px] font-bold flex items-center gap-2">
                <span className="text-sm">{st.i}</span> {st.n}
              </button>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-3 gap-2">
            {[{n:"Free", p:"$0"}, {n:"Pro", p:"$49"}, {n:"Master", p:"$99"}].map(pl => (
                <div key={pl.n} onClick={() => setPlan(pl.n)} className={`p-3 rounded-xl border cursor-pointer text-center ${plan === pl.n ? 'border-cyan-500 bg-[#0f172a]' : 'border-slate-800 bg-[#0b1222]'}`}>
                    <div className="text-[9px] text-slate-400 font-bold uppercase">{pl.n}</div>
                    <div className="text-xs font-black">{pl.p}</div>
                </div>
            ))}
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-lg shadow-cyan-900/20 active:scale-[0.99] transition-all">
          🚀 Generate Cinema Video Package
        </button>
      </main>
    </div>
  );
}
