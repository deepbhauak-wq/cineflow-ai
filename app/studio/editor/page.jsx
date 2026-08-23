"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProStudioEditor() {
  const [tab, setTab] = useState("movie");
  const [scene, setScene] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [proc, setProc] = useState(false);
  const [modal, setModal] = useState(false);

  // Movie & Thumbnail Assets
  const [customThumb, setCustomThumb] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const thumbTopics = [
    { title: "Life Changing Turning Point", tamil: "வாழ்வை மாற்றும் திருப்புமுனை", desc: "Emotional Realization / Deep Voice" },
    { title: "Secret of Success & Sacrifice", tamil: "வெற்றியின் ரகசியம் மற்றும் தியாகம்", desc: "Inspirational / Cinematic Background" },
    { title: "The Truth of Human Life", tamil: "மனித வாழ்க்கையின் உண்மையான அர்த்தம்", desc: "Philosophical / Calm Narration" },
    { title: "Miracle Moments in Hard Times", tamil: "கடினமான காலங்களில் அதிசய தருணங்கள்", desc: "Motivational / Epic Orchestral" }
  ];

  // Audio Engine
  const [audioName, setAudioName] = useState("");
  const [vVol, setVVol] = useState(100);
  const [mVol, setMVol] = useState(10);
  const [sVol, setSVol] = useState(40);

  const activeThumb = customThumb || "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600";

  const runExport = (q) => {
    setProc(true);
    setTimeout(() => {
      setProc(false);
      setModal(false);
      alert("Pure Cinema Movie (" + q + ") downloaded successfully!");
    }, 1500);
  };

  const handleAutoGallery = (type) => {
    if (type === "audio") {
      setAudioName("⚡ AUTO_Gallery_Cinematic_Score.wav");
      alert("⚡ AUTO: Gallery audio track synced!");
    } else if (type === "thumb") {
      setCustomThumb("https://images.unsplash.com/photo-1544717305-2782549b5136?w=600");
      alert("⚡ AUTO: Thumbnail picked from gallery!");
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-2.5 font-sans pb-20 relative selection:bg-cyan-500 selection:text-black">
      
      {proc && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-[11px] text-cyan-400 font-bold">Rendering Clean Cinema Movie Master...</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase">Direct Movie Exporter</span>
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
          <p className="text-[8px] text-slate-400">Pure Clean Movie • Direct Download</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/" className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 border border-slate-700">← Hub</Link>
          <button onClick={() => setModal(true)} className="px-2.5 py-0.5 rounded bg-cyan-500 text-black font-bold text-[10px] shadow cursor-pointer">Direct Download 💾</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-2.5">
        
        {/* Clean Cinema Movie Preview Player (No Watermark) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 space-y-1.5 shadow-xl">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider">Clean Movie Preview (Scene {scene})</span>
            <span className="text-[8px] text-green-400 font-mono">🔒 Master Ready</span>
          </div>
          <div className="w-full aspect-video rounded-lg bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <img src={activeThumb} alt="" className="w-full h-full object-cover opacity-80"/>
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
            { id: "movie", label: "🎬 Movie Details" },
            { id: "thumb", label: "🖼️ Thumbnail & Topics" },
            { id: "audio", label: "🎵 Gallery Audio" },
            { id: "download", label: "💾 Direct Download" }
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${tab === t.id ? "bg-cyan-500 text-black" : "text-slate-400 hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: MOVIE DETAILS */}
        {tab === "movie" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-cyan-400 text-[9px] uppercase">Movie Pipeline & Scene Index</span>
              <span className="text-[8px] text-green-400 font-mono">Clean Output (No Watermark)</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map((s) => (
                <button key={s} onClick={() => setScene(s)} className={`py-1.5 rounded-lg border text-center font-bold text-[10px] cursor-pointer ${scene === s ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-400"}`}>
                  Scene {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: THUMBNAIL & TOPICS */}
        {tab === "thumb" && (
          <div className="bg-slate-900 border border-yellow-500/30 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-yellow-400 text-[9px] uppercase">Thumbnail & Multilingual Topics</span>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] text-slate-400 block font-semibold uppercase">🖼️ Custom Thumbnail from Gallery:</span>
              <div className="flex items-center gap-1.5">
                <label className="flex-1 py-1.5 px-2 rounded bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-[10px] font-bold cursor-pointer text-center">
                  📁 Pick Thumbnail Image
                  <input type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) setCustomThumb(URL.createObjectURL(e.target.files[0])); }} className="hidden"/>
                </label>
                <button onClick={() => handleAutoGallery("thumb")} className="py-1.5 px-3 rounded bg-cyan-600 text-white font-bold text-[10px] cursor-pointer">⚡ AUTO</button>
              </div>
            </div>
            <div className="space-y-1 pt-1">
              <span className="text-[8px] text-cyan-400 block font-semibold uppercase">💡 Smart Topics (English, Hindi, தமிழ்):</span>
              <div className="space-y-1">
                {thumbTopics.map((item, idx) => (
                  <div key={idx} onClick={() => setSelectedTopic(item.title)} className={`bg-slate-950 p-2 rounded border cursor-pointer ${selectedTopic === item.title ? "border-yellow-400 bg-yellow-950/20" : "border-slate-800"}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white">{item.title}</span>
                      <span className="text-[9px] text-yellow-300 font-mono">தமிழ்: {item.tamil}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIO ENGINE */}
        {tab === "audio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-cyan-400 text-[9px] uppercase">Audio Mix & Gallery Music</span>
            </div>
            <div className="flex items-center gap-1.5">
              <label className="flex-1 py-1.5 px-2 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold cursor-pointer text-center">
                🎵 Pick Audio From Gallery
                <input type="file" accept="audio/*" onChange={(e) => { if (e.target.files[0]) setAudioName(e.target.files[0].name); }} className="hidden"/>
              </label>
              <button onClick={() => handleAutoGallery("audio")} className="py-1.5 px-3 rounded bg-cyan-600 text-white font-bold text-[10px] cursor-pointer">⚡ AUTO</button>
            </div>
            {audioName && <span className="text-[9px] text-green-400 block font-mono truncate">✅ {audioName}</span>}
          </div>
        )}

        {/* TAB 4: DIRECT DOWNLOAD */}
        {tab === "download" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1.5 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[9px] block border-b border-slate-800 pb-1">One-Click Clean Movie Exporters</span>
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
