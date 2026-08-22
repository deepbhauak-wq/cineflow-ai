"use client";
import React, { useState } from "react";

export default function CineFlow() {
  const [u, setU] = useState(false);
  const [p, setP] = useState("योद्धा प्राचीन मंदिर की खोज कर रहा है।");
  const [r, setR] = useState("16:9");
  const [d, setD] = useState("3 Min");
  const [sm, setSm] = useState("Auto");
  const [vm, setVm] = useState("Veo");
  const [st, setSt] = useState("Cinematic Epic");
  const [pl, setPl] = useState("free");
  const [cr, setCr] = useState(50);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [eid, setEid] = useState(null);
  const [etxt, setEtxt] = useState("");
  const [scs, setScs] = useState([]);

  const pop = (m) => { setMsg(m); setTimeout(() => setMsg(""), 2500); };

  const gen = () => {
    if (cr < 10) return pop("⚠️ Credits Over!");
    pop("🚀 Rendering AI Video...");
    setTimeout(() => {
      setCr(c => c - 10);
      setScs([
        { id: 1, t: "Scene 1", desc: "योद्धा जंगल में आगे बढ़ता है।", c: "Wide Drone", v: "तूफान शुरू..." },
        { id: 2, t: "Scene 2", desc: "मंदिर के द्वार पर दिव्य रोशनी।", c: "Dolly In", v: "द्वार खुल गया..." }
      ]);
      setDone(true);
      pop("✅ Render Done!");
    }, 1200);
  };

  if (!u) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-xs bg-[#0b1222] p-5 rounded-2xl border border-slate-800 space-y-3 text-center">
          <h2 className="text-sm font-black uppercase tracking-wider text-cyan-400">🎬 CineFlow Pro Login</h2>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setU(true); pop("Google Login!"); }} className="p-2 bg-white text-black font-bold text-[11px] rounded-lg">🌐 Google</button>
            <button onClick={() => { setU(true); pop("FB Login!"); }} className="p-2 bg-[#1877F2] text-white font-bold text-[11px] rounded-lg">🔵 Facebook</button>
          </div>
          <button onClick={() => { setU(true); pop("Enter!"); }} className="w-full py-2 bg-cyan-600 font-bold text-xs rounded-lg uppercase">Enter Studio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-16 max-w-md mx-auto space-y-3">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <div><h1 className="text-xs font-black text-cyan-400 uppercase">CineFlow Pro</h1><span className="text-[9px] text-slate-400">{cr} Credits</span></div>
        <button onClick={() => { setU(false); setDone(false); }} className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-bold">Logout</button>
      </div>

      {msg && <div className="fixed top-3 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 border border-cyan-500 px-3 py-1 rounded-full text-[10px] font-bold z-50">{msg}</div>}

      <div className="p-2.5 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[9px] font-bold text-cyan-400 uppercase">🎛️ 1. Master Story</label>
        <textarea value={p} onChange={e => setP(e.target.value)} rows={2} className="w-full bg-[#060a14] p-1.5 text-xs text-white rounded outline-none border border-slate-800" />
      </div>

      <div className="p-2.5 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[9px] font-bold text-cyan-400 uppercase">📺 2. Ratio</label>
        <div className="grid grid-cols-3 gap-1">{["16:9", "9:16", "21:9"].map(x => <button key={x} onClick={() => setR(x)} className={`p-1 text-[11px] font-bold rounded ${r === x ? "bg-cyan-950 border border-cyan-500 text-cyan-300" : "bg-[#060a14]"}`}>{x}</button>)}</div>
      </div>

      <div className="p-2.5 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[9px] font-bold text-indigo-400 uppercase">📚 3. Timeline</label>
        <div className="grid grid-cols-3 gap-1">{["3 Min", "30 Min", "60 Min"].map(x => <button key={x} onClick={() => setD(x)} className={`p-1 text-[11px] font-bold rounded ${d === x ? "bg-indigo-950 border border-indigo-500 text-indigo-300" : "bg-[#060a14]"}`}>{x}</button>)}</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
          <label className="text-[8px] font-bold text-purple-400 uppercase">🧠 4. Story AI</label>
          <div className="grid grid-cols-2 gap-1">{["Auto", "GPT", "Gemini", "Claude"].map(x => <button key={x} onClick={() => setSm(x)} className={`py-0.5 text-[9px] font-bold rounded ${sm === x ? "bg-purple-950 text-purple-300" : "bg-[#060a14]"}`}>{x}</button>)}</div>
        </div>
        <div className="p-2 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
          <label className="text-[8px] font-bold text-cyan-400 uppercase">📹 5. Video AI</label>
          <div className="grid grid-cols-2 gap-1">{["Veo", "Kling", "Runway", "Hailuo"].map(x => <button key={x} onClick={() => setVm(x)} className={`py-0.5 text-[9px] font-bold rounded ${vm === x ? "bg-cyan-950 text-cyan-300" : "bg-[#060a14]"}`}>{x}</button>)}</div>
        </div>
      </div>

      <div className="p-2.5 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[9px] font-bold text-amber-400 uppercase">🎞️ 6. Style</label>
        <div className="grid grid-cols-2 gap-1">{["Cinematic Epic", "Realistic 8K", "3D Animation", "Dark Cyberpunk"].map(x => <button key={x} onClick={() => setSt(x)} className={`p-1 text-[10px] font-bold text-left rounded ${st === x ? "bg-[#1f1910] border border-amber-500 text-amber-300" : "bg-[#060a14]"}`}>{x}</button>)}</div>
      </div>

      <div className="p-2.5 bg-[#0b1222] border border-slate-800 rounded-xl space-y-1">
        <label className="text-[9px] font-bold text-emerald-400 uppercase">💳 Subscription Plans</label>
        <div className="grid grid-cols-3 gap-1">
          {[{ id: "free", n: "Free", p: "$0", c: 50 }, { id: "pro", n: "Pro", p: "$49", c: 1500 }, { id: "mas", n: "Master", p: "$99", c: 5000 }].map(x => (
            <button key={x.id} onClick={() => { setPl(x.id); setCr(x.c); pop(x.n); }} className={`p-1 border rounded text-center ${pl === x.id ? "border-emerald-500 bg-emerald-950/40" : "bg-[#060a14] border-slate-800"}`}>
              <div className="text-[8px] uppercase text-slate-400">{x.n}</div><div className="text-[11px] font-black">{x.p}</div>
            </button>
          ))}
        </div>
      </div>

      <button onClick={gen} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-xs uppercase text-white shadow-lg">🚀 Generate Cinema Package</button>

      {done && (
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <h3 className="text-[10px] font-black uppercase text-white">🎬 Scene Timeline</h3>
          {scs.map(s => (
            <div key={s.id} className="bg-[#0b1222] border border-slate-800 p-2.5 rounded-xl space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold text-cyan-400"><span>{s.t}</span><span className="text-[9px] text-slate-400">{s.c}</span></div>
              {eid === s.id ? (
                <div className="space-y-1">
                  <textarea value={etxt} onChange={e => setEtxt(e.target.value)} className="w-full bg-[#060a14] p-1 text-xs text-white rounded border border-cyan-500" />
                  <div className="flex gap-1">
                    <button onClick={() => { setScs(scs.map(x => x.id === s.id ? { ...x, desc: etxt } : x)); setEid(null); pop("Saved!"); }} className="flex-1 py-1 bg-emerald-600 text-[9px] font-bold rounded">Save</button>
                    <button onClick={() => setEid(null)} className="px-2 py-1 bg-slate-800 text-[9px] rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[11px] text-slate-300 bg-[#060a14] p-1.5 rounded">{s.desc}</p>
                  <p className="text-[9px] text-slate-400 italic">🎙️ "{s.v}"</p>
                  <div className="flex gap-1.5 pt-0.5">
                    <button onClick={() => pop(`🔄 Re-rolling Scene ${s.id}...`)} className="flex-1 py-1 bg-cyan-950 border border-cyan-500 text-cyan-300 text-[9px] font-bold rounded">🔄 Regenerate</button>
                    <button onClick={() => { setEid(s.id); setEtxt(s.desc); }} className="px-2.5 py-1 bg-slate-800 text-slate-200 text-[9px] font-bold rounded">✏️ Edit</button>
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
