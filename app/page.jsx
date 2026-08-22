"use client";
import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [user, setUser] = useState(false);
  const [prompt, setPrompt] = useState("प्राचीन योद्धा घने जंगल में रहस्यमयी मंदिर की खोज कर रहा है।");
  const [ratio, setRatio] = useState("16:9");
  const [dur, setDur] = useState("3 Min");
  const [story, setStory] = useState("Auto");
  const [video, setVideo] = useState("Veo");
  const [style, setStyle] = useState("Cinematic Epic");
  const [plan, setPlan] = useState("free");
  const [cr, setCr] = useState(50);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [scenes, setScenes] = useState([]);

  const pop = (t) => { setMsg(t); setTimeout(() => setMsg(""), 3000); };

  const gen = () => {
    if (cr < 10) return pop("⚠️ Credits Over!");
    pop("🚀 Rendering AI Film...");
    setTimeout(() => {
      setCr(c => c - 10);
      setScenes([
        { id: 1, title: "Scene 1", desc: "योद्धा घने जंगल में आगे बढ़ता है।", cam: "Wide Drone", voice: "तूफान शुरू हो गया..." },
        { id: 2, title: "Scene 2", desc: "मंदिर के द्वार पर दिव्य रोशनी।", cam: "Dolly In", voice: "दरवाजा खुल गया..." }
      ]);
      setDone(true);
      pop("✅ Render Complete!");
    }, 1500);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 space-y-3 text-center">
          <h2 className="text-base font-black">🎬 CineFlow Studio Login</h2>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setUser(true); pop("Google Login!"); }} className="p-2 bg-white text-black font-bold text-xs rounded-xl">🌐 Google</button>
            <button onClick={() => { setUser(true); pop("FB Login!"); }} className="p-2 bg-[#1877F2] font-bold text-xs rounded-xl">🔵 Facebook</button>
          </div>
          <button onClick={() => { setUser(true); pop("Direct Enter!"); }} className="w-full py-2.5 bg-cyan-600 font-bold text-xs rounded-xl uppercase">Enter Studio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-20 max-w-xl mx-auto space-y-4">
      <header className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div><h1 className="text-xs font-black text-cyan-400">CINEFLOW PRO</h1><p className="text-[9px] text-slate-400">{cr} Credits</p></div>
        <button onClick={() => { setUser(false); setDone(false); }} className="text-[10px] bg-red-950 text-red-400 px-2.5 py-1 rounded font-bold">Logout</button>
      </header>

      {msg && <div className="fixed top-12 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 border border-cyan-500 px-3 py-1 rounded-full text-xs font-bold z-50">{msg}</div>}

      <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[10px] font-bold text-cyan-400">🎛️ 1. Master Story</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={2} className="w-full bg-[#060a14] border border-slate-800 rounded p-2 text-xs text-white outline-none" />
      </div>

      <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[10px] font-bold text-cyan-400">📺 2. Ratio</label>
        <div className="grid grid-cols-3 gap-1">{["16:9", "9:16", "21:9"].map(r => <button key={r} onClick={() => setRatio(r)} className={`p-1.5 rounded text-xs font-bold ${ratio === r ? "bg-cyan-950 border border-cyan-500 text-cyan-300" : "bg-[#060a14]"}`}>{r}</button>)}</div>
      </div>

      <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[10px] font-bold text-indigo-400">📚 3. Timeline</label>
        <div className="grid grid-cols-3 gap-1">{["3 Min", "30 Min", "60 Min"].map(d => <button key={d} onClick={() => setDur(d)} className={`p-1.5 rounded text-xs font-bold ${dur === d ? "bg-indigo-950 border border-indigo-500 text-indigo-300" : "bg-[#060a14]"}`}>{d}</button>)}</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
          <label className="text-[9px] font-bold text-purple-400">🧠 4. Story AI</label>
          <div className="grid grid-cols-2 gap-1">{["Auto", "GPT", "Gemini", "Claude"].map(m => <button key={m} onClick={() => setStory(m)} className={`py-1 rounded text-[10px] font-bold ${story === m ? "bg-purple-950 text-purple-300" : "bg-[#060a14]"}`}>{m}</button>)}</div>
        </div>
        <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
          <label className="text-[9px] font-bold text-cyan-400">📹 5. Video AI</label>
          <div className="grid grid-cols-2 gap-1">{["Veo", "Kling", "Runway", "Hailuo"].map(v => <button key={v} onClick={() => setVideo(v)} className={`py-1 rounded text-[10px] font-bold ${video === v ? "bg-cyan-950 text-cyan-300" : "bg-[#060a14]"}`}>{v}</button>)}</div>
        </div>
      </div>

      <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[10px] font-bold text-amber-400">🎞️ 6. Style</label>
        <div className="grid grid-cols-2 gap-1">{["Cinematic Epic", "Realistic 8K", "3D Animation", "Dark Cyberpunk"].map(s => <button key={s} onClick={() => setStyle(s)} className={`p-1.5 rounded text-xs font-bold text-left ${style === s ? "bg-[#1f1910] border border-amber-500 text-amber-300" : "bg-[#060a14]"}`}>{s}</button>)}</div>
      </div>

      <div className="p-3 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[10px] font-bold text-emerald-400">💳 Plans</label>
        <div className="grid grid-cols-3 gap-1">
          {[{ id: "free", n: "Free", p: "$0", c: 50 }, { id: "pro", n: "Pro", p: "$49", c: 1500 }, { id: "mas", n: "Master", p: "$99", c: 5000 }].map(pl => (
            <button key={pl.id} onClick={() => { setPlan(pl.id); setCr(pl.c); pop(`Switched: ${pl.n}`); }} className={`p-1.5 rounded border text-center ${plan === pl.id ? "border-emerald-500 bg-emerald-950/40" : "bg-[#060a14] border-slate-800"}`}>
              <div className="text-[8px] uppercase text-slate-400">{pl.n}</div><div className="text-xs font-black">{pl.p}</div>
            </button>
          ))}
        </div>
      </div>

      <button onClick={gen} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xs uppercase text-white shadow-lg">🚀 Generate Cinema Package</button>

      {done && (
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <h3 className="text-xs font-bold uppercase text-white">🎬 Scene Timeline</h3>
          {scenes.map(sc => (
            <div key={sc.id} className="bg-[#0b1222] border border-slate-800 p-3 rounded-xl space-y-2">
              <div className="flex justify-between text-xs font-bold text-cyan-400"><span>{sc.title}</span><span className="text-[9px] text-slate-400">{sc.cam}</span></div>
              {editId === sc.id ? (
                <div className="space-y-1">
                  <textarea value={editText} onChange={e => setEditText(e.target.value)} className="w-full bg-[#060a14] p-1.5 text-xs text-white rounded border border-cyan-500" />
                  <div className="flex gap-1">
                    <button onClick={() => { setScenes(scenes.map(s => s.id === sc.id ? { ...s, desc: editText } : s)); setEditId(null); pop("Scene Saved!"); }} className="flex-1 py-1 bg-emerald-600 text-[10px] font-bold rounded">Save</button>
                    <button onClick={() => setEditId(null)} className="px-2 py-1 bg-slate-800 text-[10px] rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-300 bg-[#060a14] p-2 rounded">{sc.desc}</p>
                  <p className="text-[10px] text-slate-400 italic">🎙️ "{sc.voice}"</p>
                  <div className="flex gap-2">
                    <button onClick={() => { pop(`🔄 Scene ${sc.id} Re-rendering...`); }} className="flex-1 py-1.5 bg-cyan-950 border border-cyan-500 text-cyan-300 text-[10px] font-bold rounded">🔄 Regenerate</button>
                    <button onClick={() => { setEditId(sc.id); setEditText(sc.desc); }} className="px-3 py-1.5 bg-slate-800 text-slate-200 text-[10px] font-bold rounded">✏️ Edit</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
