"use client";
import React, { useState } from "react";

export default function CineFlow() {
  const [u, setU] = useState(false);
  const [p, setP] = useState("योद्धा मंदिर खोज रहा है।");
  const [cr, setCr] = useState(50);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [eid, setEid] = useState(null);
  const [etxt, setEtxt] = useState("");
  const [scs, setScs] = useState([]);

  const pop = (m) => {
    setMsg(m);
    setTimeout(() => setMsg(""), 2000);
  };

  const gen = () => {
    pop("🚀 Rendering...");
    setTimeout(() => {
      setCr(c => c - 10);
      setScs([
        { id: 1, t: "Scene 1", desc: "योद्धा जंगल में है।" },
        { id: 2, t: "Scene 2", desc: "मंदिर का द्वार खुला।" }
      ]);
      setDone(true);
      pop("✅ Done!");
    }, 1000);
  };

  if (!u) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-xs bg-[#0b1222] p-5 rounded-2xl border border-slate-800 space-y-3 text-center">
          <h2 className="text-sm font-black text-cyan-400">🎬 CineFlow Pro</h2>
          <button
            onClick={() => { setU(true); pop("Logged in!"); }}
            className="w-full py-2.5 bg-cyan-600 font-bold text-xs rounded-lg"
          >
            Enter Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 max-w-md mx-auto space-y-3">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h1 className="text-xs font-black text-cyan-400">CINEFLOW PRO</h1>
        <button
          onClick={() => setU(false)}
          className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded"
        >
          Logout
        </button>
      </div>

      {msg && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 bg-cyan-950 text-cyan-300 border border-cyan-500 px-3 py-1 rounded-full text-[10px] font-bold">
          {msg}
        </div>
      )}

      <textarea
        value={p}
        onChange={e => setP(e.target.value)}
        rows={2}
        className="w-full bg-[#060a14] p-2 text-xs text-white rounded border border-slate-800"
      />

      <button
        onClick={gen}
        className="w-full py-2.5 bg-cyan-600 font-bold text-xs rounded-xl text-white"
      >
        🚀 Generate
      </button>

      {done && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          {scs.map(s => (
            <div
              key={s.id}
              className="bg-[#0b1222] border border-slate-800 p-2.5 rounded-xl space-y-1.5"
            >
              <span className="text-[11px] font-bold text-cyan-400">{s.t}</span>
              {eid === s.id ? (
                <div className="space-y-1">
                  <textarea
                    value={etxt}
                    onChange={e => setEtxt(e.target.value)}
                    className="w-full bg-[#060a14] p-1 text-xs text-white rounded border border-cyan-500"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setScs(scs.map(x => x.id === s.id ? { ...x, desc: etxt } : x));
                        setEid(null);
                        pop("Saved!");
                      }}
                      className="flex-1 py-1 bg-emerald-600 text-[9px] font-bold rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEid(null)}
                      className="px-2 py-1 bg-slate-800 text-[9px] rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-[11px] text-slate-300">{s.desc}</p>
                  <button
                    onClick={() => { setEid(s.id); setEtxt(s.desc); }}
                    className="px-2 py-1 bg-slate-800 text-[9px] font-bold rounded"
                  >
                    ✏️ Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
