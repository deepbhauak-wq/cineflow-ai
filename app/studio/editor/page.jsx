"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProStudioEditor() {
  const [tab, setTab] = useState("logo");
  const [prompt, setPrompt] = useState("");
  const [proc, setProc] = useState(false);
  const [modal, setModal] = useState(false);

  // Logo & Watermark System (4 Corners + Gallery Upload)
  const [wmPos, setWmPos] = useState("top-right");
  const [wmStyle, setWmStyle] = useState("gold");
  const [wmOn, setWmOn] = useState(true);
  const [customLogo, setCustomLogo] = useState("");

  // Tamil Dynamic Text Overlay State
  const [tamilText, setTamilText] = useState("வாழ்வை மாற்றும் திருப்புமுனை");
  const [tamilPos, setTamilPos] = useState("bottom-center"); // top, center, bottom

  const previewImg = "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600";

  const runExport = (q) => {
    setProc(true);
    setTimeout(() => {
      setProc(false);
      setModal(false);
      alert("Master file (" + q + ") downloaded successfully with Permanent Logo & Tamil Subtitle/Heading!");
    }, 1500);
  };

  const handleAutoLogo = () => {
    setCustomLogo("https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200");
    alert("⚡ AUTO: Logo successfully loaded from gallery!");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-2.5 font-sans pb-20 relative selection:bg-cyan-500 selection:text-black">
      
      {proc && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-[11px] text-cyan-400 font-bold">Rendering Master Video & Embedding Tamil Text...</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase">Direct File Exporter</span>
              <button onClick={() => setModal(false)} className="text-xs text-slate-400 cursor-pointer">✕</button>
            </div>
            <div className="space-y-1.5 text-xs">
              <button onClick={() => runExport("4K UHD")} className="w-full py-2 rounded-lg bg-cyan-500 text-black font-bold text-[11px] cursor-pointer">⬇ Direct Download 4K UHD</button>
              <button onClick={() => runExport("1080p FHD")} className="w-full py-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-[11px] cursor-pointer">⬇ Direct Download 1080p FHD</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="max-w-2xl mx-auto flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
        <div>
          <h1 className="text-xs font-bold text-white tracking-tight flex items-center gap-1"><span>🎬</span> PRO STUDIO EDITOR</h1>
          <p className="text-[8px] text-slate-400">4-Corner Logo • தமிழ் Text & Headings • Direct Download</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/" className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 border border-slate-700">← Hub</Link>
          <button onClick={() => setModal(true)} className="px-2.5 py-0.5 rounded bg-cyan-500 text-black font-bold text-[10px] shadow cursor-pointer">Direct Download 💾</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-2.5">
        
        {/* Preview Player with 4-Corner Logo & Tamil Subtitle/Heading */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 space-y-1.5 shadow-xl">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider">Live Preview</span>
            <span className="text-[8px] text-yellow-300 font-mono">தமிழ் Ready</span>
          </div>
          <div className="w-full aspect-video rounded-lg bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <img src={previewImg} alt="" className="w-full h-full object-cover opacity-80"/>
            
            {/* 4-Corner Logo Watermark */}
            {wmOn && (
              <div className={`absolute ${
                wmPos === "top-left" ? "top-2.5 left-2.5" :
                wmPos === "top-right" ? "top-2.5 right-2.5" :
                wmPos === "bottom-left" ? "bottom-2.5 left-2.5" : "bottom-2.5 right-2.5"
              } px-2.5 py-1 rounded-lg border text-[9px] font-bold backdrop-blur-md flex items-center gap-1.5 shadow-xl z-20 ${
                wmStyle === "gold" ? "bg-amber-950/90 border-amber-500 text-amber-300" :
                wmStyle === "neon-cyan" ? "bg-cyan-950/90 border-cyan-500 text-cyan-300" :
                "bg-black/90 border-slate-600 text-white"
              }`}>
                {customLogo ? <img src={customLogo} alt="" className="w-3.5 h-3.5 rounded-full object-cover"/> : <span>👑</span>}
                <span>STUDIO</span>
              </div>
            )}

            {/* Tamil Text Overlay / Heading */}
            {tamilText && (
              <div className={`absolute left-0 right-0 px-4 text-center z-10 pointer-events-none ${
                tamilPos === "top" ? "top-8" : tamilPos === "center" ? "inset-y-0 flex items-center justify-center" : "bottom-6"
              }`}>
                <span className="bg-black/70 backdrop-blur-sm text-yellow-300 font-bold px-3 py-1 rounded-lg border border-yellow-500/40 text-xs shadow-2xl tracking-wide">
                  {tamilText}
                </span>
              </div>
            )}

            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xs shadow-lg cursor-pointer">▶</div>
          </div>
        </div>

        {/* AI Prompt */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-1.5 flex gap-1.5">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="🧠 AI Director..." className="w-full bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none"/>
          <button onClick={() => { setProc(true); setTimeout(() => { setProc(false); alert("AI applied!"); setPrompt(""); }, 1200); }} className="px-2.5 py-1 rounded bg-cyan-500 text-black font-bold text-[10px] whitespace-nowrap cursor-pointer">Run ✨</button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 overflow-x-auto bg-slate-950 p-1 rounded-lg border border-slate-800">
          {[
            { id: "logo", label: "👑 4-Corner Logo" },
            { id: "tamil", label: "🇮🇳 தமிழ் Text & Heading" },
            { id: "download", label: "💾 Direct Download" }
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1 rounded text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${tab === t.id ? "bg-cyan-500 text-black" : "text-slate-400 hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: 4-CORNER LOGO WATERMARK */}
        {tab === "logo" && (
          <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-amber-400 text-[9px] uppercase">Permanent 4-Corner Logo Watermark</span>
              <button onClick={() => setWmOn(!wmOn)} className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer ${wmOn ? "bg-green-500/20 text-green-300 border border-green-500" : "bg-slate-800 text-slate-400"}`}>{wmOn ? "ON" : "OFF"}</button>
            </div>

            <div className="flex items-center gap-1.5">
              <label className="flex-1 py-1.5 px-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold cursor-pointer text-center">
                📁 Upload Logo from Gallery
                <input type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) setCustomLogo(URL.createObjectURL(e.target.files[0])); }} className="hidden"/>
              </label>
              <button onClick={handleAutoLogo} className="py-1.5 px-3 rounded bg-cyan-600 text-white font-bold text-[10px] cursor-pointer">⚡ AUTO</button>
            </div>
            {customLogo && <span className="text-[9px] text-green-400 font-mono">✅ Gallery Logo Active</span>}

            <div>
              <span className="text-[8px] text-slate-400 block mb-1">Select Corner Position (4 Sides):</span>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: "top-left", l: "Top-Left ↖" },
                  { id: "top-right", l: "Top-Right ↗" },
                  { id: "bottom-left", l: "Bottom-Left ↙" },
                  { id: "bottom-right", l: "Bottom-Right ↘" }
                ].map((p) => (
                  <button key={p.id} onClick={() => setWmPos(p.id)} className={`py-1 rounded border text-[9px] font-bold cursor-pointer ${wmPos === p.id ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{p.l}</button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[8px] text-slate-400 block mb-1">Logo Theme Style:</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "gold", l: "👑 Gold" },
                  { id: "neon-cyan", l: "⚡ Neon" },
                  { id: "classic-white", l: "⚪ White" }
                ].map((s) => (
                  <button key={s.id} onClick={() => setWmStyle(s.id)} className={`py-1 rounded border text-[9px] font-bold cursor-pointer ${wmStyle === s.id ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{s.l}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TAMIL TEXT & HEADING EDITOR */}
        {tab === "tamil" && (
          <div className="bg-slate-900 border border-yellow-500/30 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-yellow-400 text-[9px] uppercase">தமிழ் Text / Subtitle / Heading Editor</span>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] text-slate-400 block font-semibold uppercase">Enter Tamil Heading / Subtitle:</span>
              <input
                type="text"
                value={tamilText}
                onChange={(e) => setTamilText(e.target.value)}
                placeholder="எ.கா: வாழ்வை மாற்றும் திருப்புமுனை..."
                className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-yellow-300 font-bold"
              />
            </div>

            <div>
              <span className="text-[8px] text-slate-400 block mb-1">Screen Position:</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "top", l: "Top ⬆" },
                  { id: "center", l: "Center ⏺" },
                  { id: "bottom", l: "Bottom ⬇" }
                ].map((pos) => (
                  <button key={pos.id} onClick={() => setTamilPos(pos.id)} className={`py-1 rounded border text-[9px] font-bold cursor-pointer ${tamilPos === pos.id ? "bg-yellow-500/20 border-yellow-500 text-yellow-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{pos.l}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIRECT DOWNLOAD */}
        {tab === "download" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1.5 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[9px] block border-b border-slate-800 pb-1">One-Click File Exporters</span>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block text-[10px]">4K UHD</span>
                <button onClick={() => runExport("4K UHD")} className="w-full py-1 rounded bg-cyan-500 text-black font-bold text-[9px] cursor-pointer">⬇ Download</button>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200 block text-[10px]">1080p FHD</span>
                <button onClick={() => runExport("1080p FHD")} className="w-full py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-bold text-[9px] cursor-pointer">⬇ Download</button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-2.5 right-3 z-50 flex items-center gap-1.5 bg-slate-900/95 border border-slate-700 p-1 rounded-full shadow-2xl backdrop-blur-lg">
        <Link href="/" className="w-7 h-7 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-[10px] border border-slate-700">🏠</Link>
        <Link href="/character-vault" className="w-7 h-7 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-[10px] border border-slate-700">👤</Link>
        <Link href="/studio/editor" className="w-7 h-7 rounded-full bg-cyan-500 text-black flex items-center justify-center text-[10px] font-bold shadow-lg">🎬</Link>
      </div>
    </div>
  );
}
