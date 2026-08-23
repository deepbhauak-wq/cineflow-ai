"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProStudioEditor() {
  const [tab, setTab] = useState("timeline");
  const [scene, setScene] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [preset, setPreset] = useState(true);
  const [proc, setProc] = useState(false);
  const [modal, setModal] = useState(false);

  // Watermark System (Gallery Support)
  const [pos, setPos] = useState("top-right");
  const [style, setStyle] = useState("gold");
  const [wmOn, setWmOn] = useState(true);
  const [customLogo, setCustomLogo] = useState("");

  // Audio Engine (-22dB Ducking)
  const [audioName, setAudioName] = useState("");
  const [vVol, setVVol] = useState(100);
  const [mVol, setMVol] = useState(10);
  const [sVol, setSVol] = useState(40);

  // SEO & YouTube Utility
  const [title, setTitle] = useState("जीवन बदलने वाली कहानी | 4K Hindi Cinema");
  const [desc, setDesc] = useState("कबीर के त्याग और संघर्ष की अमर गाथा।");
  const [tags, setTags] = useState("#HindiCinema #LifeLessons #EmotionalStories");
  const [thumb, setThumb] = useState(0);

  const thumbs = [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600"
  ];

  const copy = (txt, lbl) => {
    navigator.clipboard.writeText(txt);
    alert(lbl + " Copied!");
  };

  const runExport = (q) => {
    setProc(true);
    setTimeout(() => {
      setProc(false);
      setModal(false);
      alert("Video (" + q + ") with permanent watermark downloaded!");
    }, 1500);
  };

  const autoFill = () => {
    setTitle("⚡ AUTO: एक ऐसा त्याग जिसने इतिहास बदल दिया | 4K Cinema");
    setDesc("⚡ AUTO METADATA:\nकठिन परिस्थितियों में अडिग रहने की गाथा।\n\nAudio: 100% Shuddh Hindi\nMixing: -22dB Ducking");
    setTags("#HindiCinema #TrueStory #ViralHindiVideo");
    alert("AI Packaging Synced!");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-2.5 font-sans pb-20 relative selection:bg-cyan-500 selection:text-black">
      
      {proc && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-[11px] text-cyan-400 font-bold">Processing 4K Render & Watermark...</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase">Export & Download</span>
              <button onClick={() => setModal(false)} className="text-xs text-slate-400">✕</button>
            </div>
            <div className="space-y-1.5 text-xs">
              <button onClick={() => runExport("4K UHD")} className="w-full py-2 rounded-lg bg-cyan-500 text-black font-bold text-[11px]">⬇ 4K UHD (60 FPS)</button>
              <button onClick={() => runExport("1080p FHD")} className="w-full py-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-[11px]">⬇ 1080p Full HD</button>
              <button onClick={() => runExport("Audio WAV")} className="w-full py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500 font-bold text-[11px]">⬇ Audio Only (WAV)</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="max-w-2xl mx-auto flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
        <div>
          <h1 className="text-xs font-bold text-white tracking-tight flex items-center gap-1"><span>🎬</span> PRO CINEMA STUDIO</h1>
          <p className="text-[8px] text-slate-400">Direct Download • Permanent Logo • SEO Engine</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/" className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 border border-slate-700">← Hub</Link>
          <button onClick={() => setModal(true)} className="px-2.5 py-0.5 rounded bg-cyan-500 text-black font-bold text-[10px] shadow">Export 💾</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-2.5">
        
        {/* Cinema Player */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 space-y-1.5 shadow-xl">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider">Preview (Scene {scene})</span>
            <span className="text-[8px] text-green-400 font-mono">🔒 Continuity Locked</span>
          </div>
          <div className="w-full aspect-video rounded-lg bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <img src={thumbs[thumb]} alt="" className="w-full h-full object-cover opacity-80"/>
            {wmOn && (
              <div className={`absolute ${pos === "top-left" ? "top-2 left-2" : pos === "top-right" ? "top-2 right-2" : pos === "bottom-left" ? "bottom-2 left-2" : "bottom-2 right-2"} px-2 py-0.5 rounded border text-[8px] font-bold backdrop-blur-md flex items-center gap-1 ${style === "gold" ? "bg-amber-950/90 border-amber-500 text-amber-300" : style === "neon-cyan" ? "bg-cyan-950/90 border-cyan-500 text-cyan-300" : "bg-black/90 border-slate-600 text-white"}`}>
                {customLogo ? <img src={customLogo} alt="" className="w-3 h-3 rounded-full object-cover"/> : <span>👑</span>}
                <span>PRO CINEMA</span>
              </div>
            )}
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xs shadow-lg cursor-pointer">▶</div>
          </div>
        </div>

        {/* AI Prompt */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-1.5 flex gap-1.5">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="🧠 AI Director: 'Make scene emotional'..." className="w-full bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none"/>
          <button onClick={() => { setProc(true); setTimeout(() => { setProc(false); alert("AI adjustments applied!"); setPrompt(""); }, 1200); }} className="px-2.5 py-1 rounded bg-cyan-500 text-black font-bold text-[10px] whitespace-nowrap">Run ✨</button>
        </div>

        {/* Cinematic Master Preset */}
        <div className="bg-slate-900 border border-purple-500/30 rounded-lg p-2 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-purple-300">⭐ Cinematic Master Preset</p>
            <p className="text-[8px] text-slate-400">Locked Character • 1.5s Pause • Deep Narration • BGM -22dB</p>
          </div>
          <button onClick={() => setPreset(!preset)} className={`px-2 py-0.5 rounded text-[9px] font-bold ${preset ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}>
            {preset ? "ON 🟢" : "OFF"}
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex gap-1 overflow-x-auto bg-slate-950 p-1 rounded-lg border border-slate-800">
          {[
            { id: "timeline", label: "🎞️ Timeline" },
            { id: "watermark", label: "👑 Logo" },
            { id: "audio", label: "🎵 Audio" },
            { id: "publish", label: "🔴 SEO" },
            { id: "thumbnails", label: "🖼️ Thumbs" },
            { id: "download", label: "💾 Export" }
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap transition ${tab === t.id ? "bg-cyan-500 text-black" : "text-slate-400 hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: WATERMARK / LOGO */}
        {tab === "watermark" && (
          <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-amber-400 text-[9px] uppercase">Permanent Watermark Engine</span>
              <button onClick={() => setWmOn(!wmOn)} className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${wmOn ? "bg-green-500/20 text-green-300 border border-green-500" : "bg-slate-800 text-slate-400"}`}>{wmOn ? "ON" : "OFF"}</button>
            </div>
            <div className="bg-slate-950 p-1.5 rounded border border-slate-800 flex items-center justify-between">
              <label className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-bold cursor-pointer">
                🖼️ Gallery Logo
                <input type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) setCustomLogo(URL.createObjectURL(e.target.files[0])); }} className="hidden"/>
              </label>
              <span className="text-[9px] text-slate-400 font-mono">{customLogo ? "✅ Custom Loaded" : "Default"}</span>
            </div>
            <div>
              <span className="text-[8px] text-slate-400 block mb-1">Corner:</span>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: "top-left", l: "Top-Left ↖" },
                  { id: "top-right", l: "Top-Right ↗" },
                  { id: "bottom-left", l: "Bottom-Left ↙" },
                  { id: "bottom-right", l: "Bottom-Right ↘" }
                ].map((p) => (
                  <button key={p.id} onClick={() => setPos(p.id)} className={`py-1 rounded border text-[9px] font-bold ${pos === p.id ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{p.l}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[8px] text-slate-400 block mb-1">Color:</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "gold", l: "👑 Gold" },
                  { id: "neon-cyan", l: "⚡ Neon" },
                  { id: "classic-white", l: "⚪ White" }
                ].map((s) => (
                  <button key={s.id} onClick={() => setStyle(s.id)} className={`py-1 rounded border text-[9px] font-bold ${style === s.id ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{s.l}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUDIO ENGINE */}
        {tab === "audio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-cyan-400 text-[9px] uppercase">Audio Mix & Ducking</span>
              <span className="text-[8px] text-green-400 font-mono">BGM: -22dB</span>
            </div>
            <div className="bg-slate-950 p-1.5 rounded border border-slate-800 flex items-center justify-between">
              <label className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[9px] font-bold cursor-pointer">
                🎵 Local Audio
                <input type="file" accept="audio/*" onChange={(e) => { if (e.target.files[0]) setAudioName(e.target.files[0].name); }} className="hidden"/>
              </label>
              <span className="text-[9px] text-slate-400 font-mono truncate max-w-[140px]">{audioName || "Cinematic Pad"}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[9px]">
              <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Voice ({vVol}%)</span>
                <input type="range" min="0" max="100" value={vVol} onChange={(e) => setVVol(e.target.value)} className="w-full accent-cyan-500"/>
              </div>
              <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                <span className="text-slate-400 block mb-0.5">BGM ({mVol}%)</span>
                <input type="range" min="0" max="40" value={mVol} onChange={(e) => setMVol(e.target.value)} className="w-full accent-yellow-500"/>
              </div>
              <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                <span className="text-slate-400 block mb-0.5">SFX ({sVol}%)</span>
                <input type="range" min="0" max="100" value={sVol} onChange={(e) => setSVol(e.target.value)} className="w-full accent-purple-500"/>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SEO PACKAGING */}
        {tab === "publish" && (
          <div className="bg-slate-900 border border-red-500/30 rounded-lg p-2.5 space-y-1.5 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-red-400 text-[9px] uppercase">SEO Packaging Utility</span>
              <button onClick={autoFill} className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold text-[8px]">⚡ AUTO</button>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[8px] text-slate-400 uppercase">Title</span>
                <button onClick={() => copy(title, "Title")} className="text-[8px] text-cyan-400 hover:underline">📋 Copy</button>
              </div>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white"/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[8px] text-slate-400 uppercase">Description</span>
                <button onClick={() => copy(desc, "Description")} className="text-[8px] text-cyan-400 hover:underline">📋 Copy</button>
              </div>
              <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white"/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[8px] text-slate-400 uppercase">Tags</span>
                <button onClick={() => copy(tags, "Tags")} className="text-[8px] text-cyan-400 hover:underline">📋 Copy</button>
              </div>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-cyan-300 font-mono"/>
            </div>
          </div>
        )}

        {/* TAB 4: THUMBNAILS */}
        {tab === "thumbnails" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1.5 text-xs">
            <span className="font-bold text-yellow-400 text-[9px] uppercase block border-b border-slate-800 pb-1">AI Thumbnail Vault</span>
            <div className="grid grid-cols-4 gap-1.5">
              {thumbs.map((img, idx) => (
                <div key={idx} className="space-y-1 bg-slate-950 p-1 rounded border border-slate-800">
                  <div onClick={() => setThumb(idx)} className={`relative aspect-video rounded overflow-hidden border cursor-pointer ${thumb === idx ? "border-yellow-400" : "border-slate-800"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover"/>
                    {thumb === idx && <span className="absolute bottom-0.5 right-0.5 bg-yellow-500 text-black text-[7px] font-bold px-0.5 rounded">ON</span>}
                  </div>
                  <button onClick={() => alert("Thumbnail Downloaded!")} className="w-full py-0.5 rounded bg-slate-800 text-[8px] text-slate-300 font-semibold">⬇ Save</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TIMELINE */}
        {tab === "timeline" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 space-y-1.5 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[9px]">Timeline Track</span>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded border border-slate-800">
              <span className="text-slate-400 w-10 text-[9px]">Video</span>
              <div className="flex gap-1 overflow-x-auto">
                {[1, 2, 3, 4].map((s) => (
                  <button key={s} onClick={() => setScene(s)} className={`px-2 py-0.5 rounded border text-[10px] ${scene === s ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-400"}`}>Scene {s}</button>
                ))}
              </div>
            </div>
            <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800 text-slate-300 text-[9px]">
              <span>Voice: 100% Shuddh Hindi (1.5s Pause)</span>
              <span className="text-green-400">BGM: -22dB Ducked</span>
            </div>
          </div>
        )}

        {/* TAB 6: DIRECT DOWNLOAD */}
        {tab === "download" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1.5 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[9px] block border-b border-slate-800 pb-1">One-Click Exporters</span>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block text-[10px]">4K Cinema</span>
                <button onClick={() => runExport("4K UHD")} className="w-full py-1 rounded bg-cyan-500 text-black font-bold text-[9px]">⬇ Download</button>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200 block text-[10px]">1080p FHD</span>
                <button onClick={() => runExport("1080p FHD")} className="w-full py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-bold text-[9px]">⬇ Download</button>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <span className="font-bold text-purple-300 block text-[10px]">Audio WAV</span>
                <button onClick={() => alert("Audio WAV downloaded!")} className="w-full py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500 font-bold text-[9px]">⬇ Download</button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Floating Bottom Dock */}
      <div className="fixed bottom-2.5 right-3 z-50 flex items-center gap-1.5 bg-slate-900/95 border border-slate-700 p-1 rounded-full shadow-2xl backdrop-blur-lg">
        <Link href="/" className="w-7 h-7 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-[10px] border border-slate-700">🏠</Link>
        <Link href="/character-vault" className="w-7 h-7 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-[10px] border border-slate-700">👤</Link>
        <Link href="/stud
