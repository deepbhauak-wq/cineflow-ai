"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProStudioEditor() {
  const [tab, setTab] = useState("timeline");
  const [scene, setScene] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [autoPreset, setAutoPreset] = useState(true);
  const [proc, setProc] = useState(false);
  const [modal, setModal] = useState(false);

  // Logo & Watermark System (Gallery Support)
  const [pos, setPos] = useState("top-right");
  const [style, setStyle] = useState("gold");
  const [wmOn, setWmOn] = useState(true);
  const [customLogoUrl, setCustomLogoUrl] = useState("");

  // Audio Controls (-22dB Ducking)
  const [audioName, setAudioName] = useState("");
  const [vVol, setVVol] = useState(100);
  const [mVol, setMVol] = useState(10);
  const [sVol, setSVol] = useState(40);

  // Packaging & Metadata
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

  const copyText = (txt, label) => {
    navigator.clipboard.writeText(txt);
    alert(label + " Copied to Clipboard!");
  };

  const runExport = (quality) => {
    setProc(true);
    setTimeout(() => {
      setProc(false);
      setModal(false);
      alert("Master Video (" + quality + ") downloaded with Permanent Watermark at [" + pos.toUpperCase() + "]!");
    }, 1500);
  };

  const autoFill = () => {
    setTitle("⚡ AUTO: एक ऐसा त्याग जिसने इतिहास बदल दिया | 4K Cinema");
    setDesc("⚡ AUTO METADATA:\nकठिन परिस्थितियों में अडिग रहने की गाथा।\n\nAudio: 100% Shuddh Hindi\nMixing: -22dB Ducking");
    setTags("#HindiCinema #TrueStory #ViralVideo");
    alert("AI Packaging Synced!");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-2.5 font-sans pb-20 relative selection:bg-cyan-500 selection:text-black">
      {proc && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-[11px] text-cyan-400 font-bold">Processing 4K Master Video & Watermark...</p>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase">Master Direct Exporter</span>
              <button onClick={() => setModal(false)} className="text-xs text-slate-400 cursor-pointer">✕</button>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button onClick={() => runExport("4K Cinema UHD (60 FPS)")} className="w-full py-2.5 px-3 rounded-xl bg-cyan-500 text-black font-bold flex items-center justify-between shadow cursor-pointer">
                <span>⬇ 1. 4K Cinema UHD (60 FPS)</span>
                <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded font-mono">Master Video</span>
              </button>
              <button onClick={() => runExport("1080p Full HD (MP4)")} className="w-full py-2.5 px-3 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-bold flex items-center justify-between cursor-pointer">
                <span>⬇ 2. 1080p Full HD</span>
                <span className="text-[9px] bg-cyan-950 px-1.5 py-0.5 rounded font-mono">Fast Render</span>
              </button>
              <button onClick={() => runExport("4K Thumbnail Image")} className="w-full py-2.5 px-3 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-bold flex items-center justify-between cursor-pointer">
                <span>⬇ 3. 4K Thumbnail Image</span>
                <span className="text-[9px] bg-yellow-950 px-1.5 py-0.5 rounded font-mono">High CTR JPG</span>
              </button>
              <button onClick={() => runExport("Master Audio Track (WAV)")} className="w-full py-2.5 px-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-between cursor-pointer">
                <span>⬇ 4. Audio Only Master (WAV)</span>
                <span className="text-[9px] bg-purple-950 px-1.5 py-0.5 rounded font-mono">Lossless Audio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-2xl mx-auto flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
        <div>
          <h1 className="text-xs font-bold text-white tracking-tight flex items-center gap-1"><span>🎬</span> PRO CINEMA STUDIO</h1>
          <p className="text-[8px] text-slate-400">Direct Download • Permanent Watermark • Multi-Track Editor</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/" className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 border border-slate-700">← Hub</Link>
          <button onClick={() => setModal(true)} className="px-2.5 py-0.5 rounded bg-cyan-500 text-black font-bold text-[10px] shadow cursor-pointer">Export 💾</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-2.5">
        {/* Preview Player */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 space-y-1.5 shadow-xl">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-wider">Live Preview (Scene {scene})</span>
            <span className="text-[8px] text-green-400 font-mono">🔒 Master Locked</span>
          </div>
          <div className="w-full aspect-video rounded-lg bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <img src={thumbs[thumb]} alt="" className="w-full h-full object-cover opacity-80"/>
            {wmOn && (
              <div className={`absolute ${pos === "top-left" ? "top-2.5 left-2.5" : pos === "top-right" ? "top-2.5 right-2.5" : pos === "bottom-left" ? "bottom-2.5 left-2.5" : "bottom-2.5 right-2.5"} px-2.5 py-1 rounded-lg border text-[9px] font-bold backdrop-blur-md flex items-center gap-1.5 shadow-xl z-20 ${style === "gold" ? "bg-amber-950/90 border-amber-500 text-amber-300 shadow-lg" : style === "neon-cyan" ? "bg-cyan-950/90 border-cyan-500 text-cyan-300 shadow-lg" : "bg-black/90 border-slate-600 text-white"}`}>
                {customLogoUrl ? <img src={customLogoUrl} alt="" className="w-3.5 h-3.5 rounded-full object-cover"/> : <span>👑</span>}
                <span>PRO CINEMA</span>
              </div>
            )}
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xs shadow-lg cursor-pointer">▶</div>
          </div>
        </div>

        {/* AI Director */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-1.5 flex gap-1.5">
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="AI Director: 'Make scene emotional'..." className="w-full bg-slate-800/80 border border-slate-700 rounded px-2 py-1 text-[11px] text-white focus:outline-none"/>
          <button onClick={() => { setProc(true); setTimeout(() => { setProc(false); alert("AI adjustments applied!"); setPrompt(""); }, 1200); }} className="px-2.5 py-1 rounded bg-cyan-500 text-black font-bold text-[10px] whitespace-nowrap cursor-pointer">Run ✨</button>
        </div>

        {/* Master Preset */}
        <div className="bg-slate-900 border border-purple-500/30 rounded-lg p-2 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-purple-300">⭐ Master Cinema Preset</p>
            <p className="text-[8px] text-slate-400">Locked Character • 1.5s Pause • Deep Narration • BGM -22dB</p>
          </div>
          <button onClick={() => setAutoPreset(!autoPreset)} className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer ${autoPreset ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}>
            {autoPreset ? "ON 🟢" : "OFF"}
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex gap-1 overflow-x-auto bg-slate-950 p-1 rounded-lg border border-slate-800">
          {[
            { id: "timeline", label: "🎞️ Timeline" },
            { id: "watermark", label: "👑 Logo" },
            { id: "audio", label: "🎵 Audio" },
            { id: "publish", label: "🔴 Metadata" },
            { id: "thumbnails", label: "🖼️ Thumbs" },
            { id: "download", label: "💾 Download" }
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${tab === t.id ? "bg-cyan-500 text-black" : "text-slate-400 hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB: TIMELINE */}
        {tab === "timeline" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-2 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[9px]">Timeline Track</span>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded border border-slate-800">
              <span className="text-slate-400 w-10 text-[9px]">Video</span>
              <div className="flex gap-1 overflow-x-auto">
                {[1, 2, 3, 4].map((s) => (
                  <button key={s} onClick={() => setScene(s)} className={`px-2 py-0.5 rounded border text-[10px] cursor-pointer ${scene === s ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-400"}`}>Scene {s}</button>
                ))}
              </div>
            </div>
            <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800 text-slate-300 text-[9px]">
              <span>Voice: 100% Shuddh Hindi (1.5s Pause)</span>
              <span className="text-green-400">BGM: -22dB Ducked</span>
            </div>
          </div>
        )}

        {/* TAB: WATERMARK */}
        {tab === "watermark" && (
          <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-amber-400 text-[9px] uppercase">Permanent Watermark Engine</span>
              <button onClick={() => setWmOn(!wmOn)} className={`px-1.5 py-0.5 rounded text-[8px] font-bold cursor-pointer ${wmOn ? "bg-green-500/20 text-green-300 border border-green-500" : "bg-slate-800 text-slate-400"}`}>{wmOn ? "ON" : "OFF"}</button>
            </div>
            <div className="flex items-center gap-1.5">
              <label className="flex-1 py-1.5 px-2 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold cursor-pointer text-center">
                📁 Upload Logo from Gallery
                <input type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) setCustomLogoUrl(URL.createObjectURL(e.target.files[0])); }} className="hidden"/>
              </label>
              <button onClick={() => { setCustomLogoUrl("https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200"); alert("⚡ AUTO: Logo loaded!"); }} className="py-1.5 px-3 rounded bg-cyan-600 text-white font-bold text-[10px] cursor-pointer">⚡ AUTO</button>
            </div>
            <div>
              <span className="text-[8px] text-slate-400 block mb-1">Corner Position:</span>
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
            <div>
              <span className="text-[8px] text-slate-400 block mb-1">Color Finish:</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: "gold", l: "👑 Gold" },
                  { id: "neon-cyan", l: "⚡ Neon" },
                  { id: "classic-white", l: "⚪ White" }
                ].map((s) => (
                  <button key={s.id} onClick={() => setStyle(s.id)} className={`py-1 rounded border text-[9px] font-bold cursor-pointer ${style === s.id ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{s.l}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: AUDIO */}
        {tab === "audio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-cyan-400 text-[9px] uppercase">Audio Mix & Auto Ducking</span>
              <span className="text-[8px] text-green-400 font-mono">BGM: -22dB</span>
            </div>
            <div className="flex items-center gap-1.5">
              <label className="flex-1 py-1.5 px-2 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold cursor-pointer text-center">
                🎵 Upload Audio from Gallery
                <input type="file" accept="audio/*" onChange={(e) => { if (e.target.files[0]) setAudioName(e.target.files[0].name); }} className="hidden"/>
              </label>
              <button onClick={() => setAudioName("⚡ AUTO_Gallery_Cinematic_Score.wav")} className="py-1.5 px-3 rounded bg-cyan-600 text-white font-bold text-[10px] cursor-pointer">⚡ AUTO</button>
            </div>
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

        {/* TAB: METADATA */}
        {tab === "publish" && (
          <div className="bg-slate-900 border border-red-500/30 rounded-lg p-2.5 space-y-1.5 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-red-400 text-[9px] uppercase">Metadata Packaging</span>
              <button onClick={autoFill} className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold text-[8px] cursor-pointer">⚡ AUTO</button>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[8px] text-slate-400 uppercase">Title</span>
                <button onClick={() => copyText(title, "Title")} className="text-[8px] text-cyan-400 hover:underline cursor-pointer">📋 Copy</button>
              </div>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white"/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[8px] text-slate-400 uppercase">Description</span>
                <button onClick={() => copyText(desc, "Description")} className="text-[8px] text-cyan-400 hover:underline cursor-pointer">📋 Copy</button>
              </div>
              <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-white"/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[8px] text-slate-400 uppercase">Tags</span>
                <button onClick={() => copyText(tags, "Tags")} className="text-[8px] text-cyan-400 hover:underline cursor-pointer">📋 Copy</button>
              </div>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-[11px] text-cyan-300 font-mono"/>
            </div>
          </div>
        )}

        {/* TAB: THUMBNAILS */}
        {tab === "thumbnails" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-1.5 text-xs">
            <span className="font-bold text-yellow-400 text-[9px] uppercase block border-b border-slate-800 pb-1">AI Thumbnail Vault</span>
            <div className="grid grid-cols-4 gap-1.5">
              {thumbs.map((img, idx) => (
                <div key={idx} className="space-y-1 bg-slate-950 p-1 rounded border border-slate-800">
                  <div onClick={() => setThumb(idx)} className={`relative aspect-video rounded overflow-hidden border cursor-pointer ${thumb === idx ? "border-yellow-400" : "border-slate-800"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover"/>
                    {thumb === idx && <span className="absolute bottom-0.5 right-0.5 bg-yellow-500 text-black text-[7px] font-bold px-0.5 rounded">ACTIVE</span>}
                  </div>
                  <button onClick={() => alert("Thumbnail Downloaded!")} className="w-full py-0.5 rounded bg-slate-800 text-[8px] text-slate-300 font-semibold cursor-pointer">⬇ Save</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: DOWNLOAD */}
        {tab === "download" && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 space-y-2 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[9px] block border-b border-slate-800 pb-1">4 Master Export Options</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <span className="font-
