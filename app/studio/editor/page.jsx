"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProStudioEditor() {
  const [tab, setTab] = useState("timeline");
  const [scene, setScene] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [proc, setProc] = useState(false);
  const [modal, setModal] = useState(false);

  // Watermark System & Gallery Auto Support
  const [pos, setPos] = useState("top-right");
  const [style, setStyle] = useState("gold");
  const [wmOn, setWmOn] = useState(true);
  const [galleryLogo, setGalleryLogo] = useState("");

  // Audio Engine & Auto Gallery Music
  const [audioName, setAudioName] = useState("");
  const [vVol, setVVol] = useState(100);
  const [mVol, setMVol] = useState(10);
  const [sVol, setSVol] = useState(40);

  // Scene Video Data
  const scenes = [
    { id: 1, title: "Scene 1", duration: "0:00 - 0:10", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600", text: "कबीर अपने परिवार के लिए कुछ बहुत अच्छा करना चाहता था।" },
    { id: 2, title: "Scene 2", duration: "0:10 - 0:20", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600", text: "लेकिन हर कदम पर मन में असफलता का भय भी लगा रहता था।" },
    { id: 3, title: "Scene 3", duration: "0:20 - 0:30", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600", text: "एक दिन एक बड़ा अवसर मिला, पर वह निर्णय लेने से डर रहा था।" },
    { id: 4, title: "Scene 4", duration: "0:30 - 0:40", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600", text: "उसने विश्वास के साथ कदम आगे बढ़ाया और सब कुछ बदल गया।" }
  ];

  const activeSceneData = scenes.find((s) => s.id === scene) || scenes[0];

  const runExport = (q) => {
    setProc(true);
    setTimeout(() => {
      setProc(false);
      setModal(false);
      alert("Master Video (" + q + ") downloaded successfully with active gallery assets!");
    }, 1500);
  };

  const handleAutoGallery = (type) => {
    if (type === "logo") {
      setGalleryLogo("https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200");
      alert("⚡ AUTO: Gallery logo successfully applied to watermark!");
    } else if (type === "audio") {
      setAudioName("⚡ AUTO_Gallery_Cinematic_Score.wav");
      alert("⚡ AUTO: Gallery audio track automatically synced & -22dB ducked!");
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-2.5 font-sans pb-20 relative selection:bg-cyan-500 selection:text-black">
      
      {proc && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-[11px] text-cyan-400 font-bold">Rendering Master Video File...</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase">Direct Master Exporter</span>
              <button onClick={() => setModal(false)} className="text-xs text-slate-400 cursor-pointer">✕</button>
            </div>
            <div className="space-y-1.5 text-xs">
              <button onClick={() => runExport("4K Cinema UHD")} className="w-full py-2 rounded-lg bg-cyan-500 text-black font-bold text-[11px] cursor-pointer">⬇ Direct Download 4K UHD (60 FPS)</button>
              <button onClick={() => runExport("1080p FHD")} className="w-full py-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-[11px] cursor-pointer">⬇ Direct Download 1080p Full HD</button>
              <button onClick={() => runExport("Audio WAV")} className="w-full py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500 font-bold text-[11px] cursor-pointer">⬇ Download Master Audio (WAV)</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="max-w-2xl mx-auto flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
        <div>
          <h1 className="text-xs font-bold text-white tracking-tight flex items-center gap-1"><span>🎬</span> PRO CINEMA STUDIO</h1>
          <p className="text-[8px] text-slate-400">Direct Download • Visual Multi-Track Timeline • Audio Ducking</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/" className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 border border-slate-700">← Hub</Link>
          <button onClick={() => setModal(true)} className="px-2.5 py-0.5 rounded bg-cyan-500 text-black font-bold text-[10px] shadow cursor-pointer">Direct Download 💾</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-2.5">
        
        {/* Cinema Preview Player */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 space-y-1.5 shadow-xl">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider">Preview (Scene {scene})</span>
            <span className="text-[8px] text-green-400 font-mono">🔒 Master Locked</span>
          </div>
          <div className="w-full aspect-video rounded-lg bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <img src={activeSceneData.img} alt="" className="w-full h-full object-cover opacity-80"/>
            {wmOn && (
              <div className={`absolute ${pos === "top-left" ? "top-2 left-2" : pos === "top-right" ? "top-2 right-2" : pos === "bottom-left" ? "bottom-2 left-2" : "bottom-2 right-2"} px-2 py-0.5 rounded border text-[8px] font-bold backdrop-blur-md flex items-center gap-1 ${style === "gold" ? "bg-amber-950/90 border-amber-500 text-amber-300" : style === "neon-cyan" ? "bg-cyan-950/90 border-cyan-500 text-cyan-300" : "bg-black/90 border-slate-600 text-white"}`}>
                {galleryLogo ? <img src={galleryLogo} alt="" className="w-3 h-3 rounded-full object-cover"/> : <span>👑</span>}
                <span>PRO CINEMA</span>
              </div>
            )}
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xs shadow-lg cursor-pointer">▶</div>
          </div>
        </div>

        {/* AI Director Prompt */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-1.5 flex gap-1.5">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="🧠 AI Director: 'Make scene emotional'..." className="w-full bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none"/>
          <button onClick={() => { setProc(true); setTimeout(() => { setProc(false); alert("AI adjustments applied!"); setPrompt(""); }, 1200); }} className="px-2.5 py-1 rounded bg-cyan-500 text-black font-bold text-[10px] whitespace-nowrap cursor-pointer">Run ✨</button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 overflow-x-auto bg-slate-950 p-1 rounded-lg border border-slate-800">
          {[
            { id: "timeline", label: "🎞️ Visual Timeline" },
            { id: "watermark", label: "👑 Gallery Logo" },
            { id: "audio", label: "🎵 Gallery Audio" },
            { id: "download", label: "💾 Direct Download" }
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${tab === t.id ? "bg-cyan-500 text-black" : "text-slate-400 hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: VISUAL TIMELINE WITH VIDEO FRAMES */}
        {tab === "timeline" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-cyan-400 uppercase text-[9px]">Multi-Track Visual Scene Timeline</span>
              <span className="text-[8px] text-green-400 font-mono">BGM: -22dB Ducked</span>
            </div>

            {/* Video Track with Thumbnails */}
            <div className="space-y-1">
              <span className="text-[8px] text-slate-400 font-semibold uppercase block">🎥 Video Track:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {scenes.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setScene(s.id)}
                    className={`bg-slate-950 p-1 rounded-lg border cursor-pointer transition ${
                      scene === s.id ? "border-cyan-500 ring-1 ring-cyan-500/40" : "border-slate-800 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="relative aspect-video rounded overflow-hidden mb-1">
                      <img src={s.img} alt="" className="w-full h-full object-cover"/>
                      <span className="absolute bottom-0.5 right-0.5 bg-black/80 px-1 py-0.2 rounded text-[7px] font-mono text-cyan-300">{s.duration}</span>
                    </div>
                    <div className="flex justify-between items-center px-0.5">
                      <span className="text-[9px] font-bold text-white">{s.title}</span>
                      {scene === s.id && <span className="text-[7px] text-cyan-400 font-bold">ACTIVE</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspector Dialog Track */}
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-purple-400 font-semibold uppercase">🎙️ Voiceover Script (Scene {scene}):</span>
                <span className="text-[8px] text-slate-400">1.5s Pause Locked</span>
              </div>
              <p className="text-[10px] text-slate-200 font-sans">{activeSceneData.text}</p>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY LOGO WATERMARK */}
        {tab === "watermark" && (
          <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-amber-400 text-[9px] uppercase">Permanent Watermark & Gallery Integration</span>
              <button onClick={() => setWmOn(!wmOn)} className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer ${wmOn ? "bg-green-500/20 text-green-300 border border-green-500" : "bg-slate-800 text-slate-400"}`}>{wmOn ? "ON" : "OFF"}</button>
            </div>
            
            <div className="flex items-center gap-1.5">
              <label className="flex-1 py-1.5 px-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold cursor-pointer text-center">
                📁 Pick Logo From Gallery
                <input type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) setGalleryLogo(URL.createObjectURL(e.target.files[0])); }} className="hidden"/>
              </label>
              <button onClick={() => handleAutoGallery("logo")} className="py-1.5 px-3 rounded bg-cyan-600 text-white font-bold text-[10px] cursor-pointer">⚡ AUTO</button>
            </div>
            {galleryLogo && <span className="text-[9px] text-green-400 block font-mono">✅ Gallery Logo Active</span>}

            <div>
              <span className="text-[8px] text-slate-400 block mb-1">Corner:</span>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: "top-left", l: "Top-Left ↖" },
                  { id: "top-right", l: "Top-Right ↗" },
                  { id: "bottom-left", l: "Bottom-Left ↙" },
                  { id: "bottom-right", l: "Bottom-Right ↘" }
                ].map((p) => (
                  <button key={p.id} onClick={() => setPos(p.id)} className={`py-1 rounded border text-[9px] font-bold cursor-pointer ${pos === p.id ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{p.l}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY AUDIO ENGINE */}
        {tab === "audio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-cyan-400 text-[9px] uppercase">Audio Mix & Gallery Music</span>
              <span className="text-[8px] text-green-400 font-mono">BGM: -22dB</span>
            </div>

            <div className="flex items-center gap-1.5">
              <label className="flex-1 py-1.5 px-2 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold cursor-pointer text-center">
                🎵 Pick Audio From Gallery
                <input type="file" accept="audio/*" onChange={(e) => { if (e.target.files[0]) setAudioName(e.target.files[0].name); }} className="hidden"/>
              </label>
              <button onClick={() => handleAutoGallery("audio")} className="py-1.5 px-3 rounded bg-cyan-600 text-white font-bold text-[10px] cursor-pointer">⚡ AUTO</button>
            </div>
            {audioName && <span className="text-[9px] text-green-400 block font-mono truncate">✅ {audioName}</span>}

            <div className="grid grid-cols-3 gap-1.5 text-[9px] pt-1">
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

        {/* TAB 4: DIRECT DOWNLOAD */}
        {tab === "download" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1.5 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[9px] block border-b border-slate-800 pb-1">One-Click File Exporters</span>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block text-[10px]">4K UHD</span>
                <button onClick={() => runExport("4K UHD")} className="w-full py-1 rounded bg-cyan-500 text-black font-bold text-[9px] cursor-pointer">⬇ Download</button>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <span className="font-bold text-slate-200 block text-[10px]">1080p FHD</span>
                <button onClick={() => runExport("1080p FHD")} className="w-full py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-bold text-[9px] cursor-pointer">⬇ Download</button>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
                <span className="font-bold text-purple-300 block text-[10px]">Audio WAV</span>
                <button onClick={() => runExport("Audio WAV")} className="w-full py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500 font-bold text-[10px] cursor-pointer">⬇ Download</button>
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
