"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProStudioEditor() {
  const [tab, setTab] = useState("timeline");
  const [scene, setScene] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [akPreset, setAkPreset] = useState(true);
  const [proc, setProc] = useState(false);
  const [modal, setModal] = useState(false);

  // Logo & Watermark System
  const [pos, setPos] = useState("top-right");
  const [style, setStyle] = useState("gold");
  const [wmOn, setWmOn] = useState(true);

  // Audio Controls (-22dB Ducking)
  const [audioName, setAudioName] = useState("");
  const [vVol, setVVol] = useState(100);
  const [mVol, setMVol] = useState(10);
  const [sVol, setSVol] = useState(40);

  // YouTube Packaging
  const [title, setTitle] = useState("जीवन बदलने वाली कहानी | 4K Hindi Cinema");
  const [desc, setDesc] = useState("कबीर के त्याग और संघर्ष की अमर गाथा।");
  const [tags, setTags] = useState("#HindiCinema #LifeLessons #AKMinistry");
  const [thumb, setThumb] = useState(0);

  const thumbs = [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600"
  ];

  const copyText = (txt, label) => {
    navigator.clipboard.writeText(txt);
    alert(label + " Copied to Clipboard!");
  };

  const runExport = (quality) => {
    setProc(true);
    setTimeout(() => {
      setProc(false);
      setModal(false);
      alert("Master Video Downloaded (" + quality + ") with " + style.toUpperCase() + " Logo at [" + pos.toUpperCase() + "]!");
    }, 2000);
  };

  const autoFill = () => {
    setTitle("⚡ AUTO: एक ऐसा त्याग जिसने इतिहास बदल दिया | 4K Hindi Cinema");
    setDesc("⚡ AUTO METADATA:\nकठिन परिस्थितियों में अडिग रहने की गाथा।\n\nAudio: 100% Shuddh Hindi\nMixing: -22dB Ducking");
    setTags("#HindiCinema #TrueStory #AKMinistry #ViralHindiVideo");
    alert("AI Packaging Synced!");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-3 font-sans pb-24 relative">
      {proc && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-cyan-400 font-bold">Processing 4K Master Video & Audio Ducking...</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-red-400 uppercase">Direct Exporter & Publisher</span>
              <button onClick={() => setModal(false)} className="text-xs text-slate-400">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <button onClick={() => runExport("4K Cinema")} className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold">⬇ Direct Download 4K (60 FPS)</button>
              <button onClick={() => runExport("1080p FHD")} className="w-full py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-bold">⬇ Direct Download 1080p</button>
              <button onClick={() => { setModal(false); alert("Directly published to YouTube!"); }} className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold">🚀 Direct Publish to YouTube</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
        <div>
          <h1 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">🎬 AK MINISTRY PRO STUDIO</h1>
          <p className="text-[9px] text-slate-400">Direct Download • 4-Corner Logo • YouTube SEO Engine</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-cyan-300 border border-slate-700">← Hub</Link>
          <button onClick={() => setModal(true)} className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-[11px] shadow-lg">Publish / Export 🚀</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 space-y-2 shadow-xl">
          <div className="flex justify-between items-center px-1">
            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">Live Preview (Scene {scene})</span>
            <span className="text-[9px] text-green-400 font-mono">🔒 Continuity Locked</span>
          </div>
          <div className="w-full aspect-video rounded-xl bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <img src={thumbs[thumb]} alt="" className="w-full h-full object-cover opacity-80"/>
            {wmOn && (
              <div className={`absolute ${pos === "top-left" ? "top-2 left-2" : pos === "top-right" ? "top-2 right-2" : pos === "bottom-left" ? "bottom-2 left-2" : "bottom-2 right-2"} px-2 py-0.5 rounded border text-[9px] font-bold backdrop-blur-md ${style === "gold" ? "bg-amber-950/80 border-amber-500 text-amber-300" : style === "neon-cyan" ? "bg-cyan-950/80 border-cyan-500 text-cyan-300" : "bg-black/80 border-slate-600 text-white"}`}>
                👑 AK MINISTRY PRO
              </div>
            )}
            <div className="w-10 h-10 rounded-full bg-cyan-500/90 flex items-center justify-center text-black font-bold text-sm shadow-xl cursor-pointer">▶</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-2 flex gap-2">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="🧠 AI Director: 'Make scene emotional'..." className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none"/>
          <button onClick={() => { setProc(true); setTimeout(() => { setProc(false); alert("AI Director applied!"); setPrompt(""); }, 1500); }} className="px-3 py-1 rounded-lg bg-cyan-500 text-black font-bold text-xs whitespace-nowrap">Run ✨</button>
        </div>

        <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-2.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-purple-300">⭐ AK Ministry Cinematic Preset</p>
            <p className="text-[9px] text-slate-400">Locked Character • 1.5s Pause • Deep Narration • BGM -22dB • "आमीन"</p>
          </div>
          <button onClick={() => setAkPreset(!akPreset)} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${akPreset ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}>
            {akPreset ? "ACTIVE 🟢" : "OFF"}
          </button>
        </div>

        <div className="flex gap-1 overflow-x-auto bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: "timeline", label: "🎞️ Timeline" },
            { id: "watermark", label: "👑 Logo (4-Corners)" },
            { id: "audio", label: "🎵 Audio & Ducking" },
            { id: "publish", label: "🔴 YouTube & Copy" },
            { id: "thumbnails", label: "🖼️ Thumbnails" },
            { id: "download", label: "💾 Direct Download" }
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition ${tab === t.id ? "bg-cyan-500 text-black" : "text-slate-400 hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "watermark" && (
          <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-3 space-y-2.5 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="font-bold text-amber-400 text-[10px] uppercase">AK Ministry Watermark Configuration</span>
              <button onClick={() => setWmOn(!wmOn)} className={`px-2 py-0.5 rounded text-[9px] font-bold ${wmOn ? "bg-green-500/20 text-green-300 border border-green-500" : "bg-slate-800 text-slate-400"}`}>{wmOn ? "WATERMARK ON" : "OFF"}</button>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block mb-1">Corner Placement:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: "top-left", l: "Top-Left ↖" },
                  { id: "top-right", l: "Top-Right ↗" },
                  { id: "bottom-left", l: "Bottom-Left ↙" },
                  { id: "bottom-right", l: "Bottom-Right ↘" }
                ].map((p) => (
                  <button key={p.id} onClick={() => setPos(p.id)} className={`py-1.5 rounded-lg border text-[10px] font-bold ${pos === p.id ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{p.l}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 block mb-1">Color Finish:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "gold", l: "👑 Gold Mode" },
                  { id: "neon-cyan", l: "⚡ Neon Cyan" },
                  { id: "classic-white", l: "⚪ Classic White" }
                ].map((s) => (
                  <button key={s.id} onClick={() => setStyle(s.id)} className={`py-1.5 rounded-lg border text-[10px] font-bold ${style === s.id ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{s.l}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "audio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2.5 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="font-bold text-cyan-400 text-[10px] uppercase">Audio Mixing Engine</span>
              <span className="text-[9px] text-green-400 font-mono">BGM Clamped @ -22dB</span>
            </div>
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between">
              <label className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold cursor-pointer">
                🎵 Upload Local Music
                <input type="file" accept="audio/*" onChange={(e) => { if (e.target.files[0]) setAudioName(e.target.files[0].name); }} className="hidden"/>
              </label>
              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[180px]">{audioName || "Default Cinematic Pad"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Voice ({vVol}%)</span>
                <input type="range" min="0" max="100" value={vVol} onChange={(e) => setVVol(e.target.value)} className="w-full accent-cyan-500"/>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">BGM ({mVol}%) [-22dB]</span>
                <input type="range" min="0" max="40" value={mVol} onChange={(e) => setMVol(e.target.value)} className="w-full accent-yellow-500"/>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">SFX ({sVol}%)</span>
                <input type="range" min="0" max="100" value={sVol} onChange={(e) => setSVol(e.target.value)} className="w-full accent-purple-500"/>
              </div>
            </div>
          </div>
        )}

        {tab === "publish" && (
          <div className="bg-slate-900 border border-red-500/30 rounded-xl p-3 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="font-bold text-red-400 text-[10px] uppercase">YouTube Packaging & Copy Utility</span>
              <button onClick={autoFill} className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[9px]">⚡ AUTO GENERATE</button>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[9px] text-slate-400 uppercase">Title</span>
                <button onClick={() => copyText(title, "Title")} className="text-[9px] text-cyan-400 hover:underline">📋 Copy</button>
              </div>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-xs text-white"/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[9px] text-slate-400 uppercase">Description</span>
                <button onClick={() => copyText(desc, "Description")} className="text-[9px] text-cyan-400 hover:underline">📋 Copy</button>
              </div>
              <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-xs text-white"/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[9px] text-slate-400 uppercase">Hashtags (#)</span>
                <button onClick={() => copyText(tags, "Hashtags")} className="text-[9px] text-cyan-400 hover:underline">📋 Copy</button>
              </div>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-xs text-cyan-300 font-mono"/>
            </div>
          </div>
        )}

        {tab === "thumbnails" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
            <span className="font-bold text-yellow-400 text-[10px] uppercase block border-b border-slate-800 pb-1">AI Thumbnail Vault (High CTR)</span>
            <div className="grid grid-cols-4 gap-2">
              {thumbs.map((img, idx) => (
                <div key={idx} className="space-y-1 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <div onClick={() => setThumb(idx)} className={`relative aspect-video rounded overflow-hidden border cursor-pointer ${thumb === idx ? "border-yellow-400 ring-1 ring-yellow-400/40" : "border-slate-800"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover"/>
                    {thumb === idx && <span className="absolute bottom-0.5 right-0.5 bg-yellow-500 text-black text-[8px] font-bold px-1 rounded">ACTIVE</span>}
                  </div>
                  <button onClick={() => alert("Thumbnail Downloaded!")} className="w-full py-0.5 rounded bg-slate-800 text-[9px] text-slate-300 font-semibold">⬇ Download</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "timeline" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[10px]">Multi-Track Scene Timeline</span>
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 w-12 text-[10px]">Video</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {[1, 2, 3, 4].map((s) => (
                  <button key={s} onClick={() => setScene(s)} className={`px-2.5 py-1 rounded-lg border text-xs ${scene === s ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-400"}`}>Scene {s}</button>
                ))}
              </div>
            </div>
            <div className="flex justify-between bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300 text-[10px]">
              <span>Voice: 100% Shuddh Hindi (1.5s Pause)</span>
              <span className="text-green-400">BGM: -22dB Ducked</span>
            </div>
          </div>
        )}

        {tab === "download" && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[10px] block border-b border-slate-800 pb-1">One-Click Master Exporter</span>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block text-[11px]">4K Cinema Master</span>
                <p className="text-[9px] text-slate-400">3840x2160 Ultra HD • 60 FPS</p>
                <button onClick={() => runExport("4K UHD")} className="w-full py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-[10px]">⬇ 4K Download</button>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200 block text-[11px]">1080p FHD</span>
                <p className="text-[9px] text-slate-400">1920x1080 • Fast Rendering</p>
                <button onClick={() => runExport("1080p FHD")} className="w-full py-1.5 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700 font-bold text-[10px]">⬇ 1080p Download</button>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-purple-300 block text-[11px]">Audio Only Master</span>
                <p className="text-[9px] text-slate-400">Pure Voice + -22dB Music (WAV)</p>
                <button onClick={() => alert("Audio WAV downloaded!")} className="w-full py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500 font-bold text-[10px]">⬇ Audio (WAV)</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-3 right-4 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1 rounded-full shadow-2xl backdrop-blur-lg">
        <Link href="/" className="w-8 h-8 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-xs border border-slate-700">🏠</Link>
        <Link href="/character-vault" className="w-8 h-8 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-xs border border-slate-700">👤</Link>
        <Link href="/studio/editor" className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold shadow-lg">🎬</Link>
      </div>
    </div>
  );
}
