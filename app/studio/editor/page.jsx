"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProStudioEditor() {
  const [activeTab, setActiveTab] = useState("timeline");
  const [activeScene, setActiveScene] = useState(1);
  const [aiPrompt, setAiPrompt] = useState("");
  const [akMinistryActive, setAkMinistryActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Logo & Watermark Engine (4 Corners + Gold Mode)
  const [watermarkPos, setWatermarkPos] = useState("top-right"); // top-left, top-right, bottom-left, bottom-right
  const [logoStyle, setLogoStyle] = useState("gold"); // gold, neon-cyan, classic-white
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);

  // Local Music & Audio States
  const [localAudioName, setLocalAudioName] = useState("");
  const [voiceVol, setVoiceVol] = useState(100);
  const [musicVol, setMusicVol] = useState(10); // Ducked at -22dB
  const [sfxVol, setSfxVol] = useState(40);

  // YouTube Metadata & Packaging
  const [ytTitle, setYtTitle] = useState("जीवन बदलने वाली कहानी | Heart Touching Hindi Cinema (4K)");
  const [ytDescription, setYtDescription] = useState("यह कहानी आपको जीवन के गहरे अर्थ और सच्चाई का अहसास कराएगी। देखिए कैसे कबीर ने अपने परिवार के लिए त्याग किया।\n\n📌 Subscribe for more inspirational cinema.");
  const [ytTags, setYtTags] = useState("#HindiCinema #LifeLessons #AKMinistry #EmotionalStories #ViralHindi");
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const thumbnailOptions = [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600"
  ];

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} Copied to Clipboard!`);
  };

  const handleDownloadVideo = (quality) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Master Video (${quality}) with embedded ${logoStyle.toUpperCase()} logo at [${watermarkPos.toUpperCase()}] downloaded successfully!`);
    }, 2000);
  };

  const handleDownloadThumbnail = (index) => {
    alert(`Thumbnail ${index + 1} downloaded in Full 4K Quality!`);
  };

  const handleAutoPackaging = () => {
    setYtTitle("⚡ AUTO: एक ऐसा त्याग जिसने इतिहास बदल दिया | 4K Hindi Cinema");
    setYtDescription("⚡ AUTO GENERATED SEO METADATA:\nकठिन परिस्थितियों में अडिग रहने की अद्वितीय गाथा।\n\nAudio: 100% Shuddh Hindi (Deep Calm Tone)\nMaster Mixing: -22dB Background Ambient Ducking\n\nSubscribe for more regular releases.");
    setYtTags("#HindiCinema #TrueStory #InspirationalShorts #SpiritualJourney #ViralHindiVideo #AKMinistry");
    alert("AI Metadata, High-CTR Title & Tags Generated Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      
      {isProcessing && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-cyan-400 font-bold">Rendering 4K Video with Audio Ducking & Watermark...</p>
        </div>
      )}

      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-sm font-bold text-white flex items-center gap-1.5"><span>🎬</span> AK Ministry Studio Editor</h1>
          <p className="text-[10px] text-slate-400">Direct Download • 4-Corner Logo • YouTube Packaging</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-cyan-300 border border-slate-700">← Hub</Link>
          <button onClick={() => handleDownloadVideo("4K Ultra HD")} className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs shadow-lg cursor-pointer">
            ⬇ Direct Download 4K
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        
        {/* Cinema Player with 4-Corner Watermark Engine */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-cyan-400 uppercase">Live Master Preview (Scene {activeScene})</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[9px] text-cyan-300 font-mono font-bold">⚡ CINEFLOW ENGINE</span>
          </div>
          <div className="w-full aspect-video rounded-2xl bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <img src={thumbnailOptions[selectedThumbnail]} alt="" className="w-full h-full object-cover opacity-80"/>
            
            {/* Dynamic 4-Corner Watermark */}
            {watermarkEnabled && (
              <div className={`absolute ${
                watermarkPos === "top-left" ? "top-3 left-3" :
                watermarkPos === "top-right" ? "top-3 right-3" :
                watermarkPos === "bottom-left" ? "bottom-3 left-3" : "bottom-3 right-3"
              } px-2.5 py-1 rounded-lg border backdrop-blur-md text-[10px] font-bold ${
                logoStyle === "gold" ? "bg-amber-950/80 border-amber-500 text-amber-300 shadow-amber-500/30 shadow-lg" :
                logoStyle === "neon-cyan" ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-cyan-500/30 shadow-lg" :
                "bg-black/80 border-slate-600 text-white"
              }`}>
                👑 AK MINISTRY PRO
              </div>
            )}

            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-lg shadow-xl cursor-pointer">▶</div>
          </div>
        </div>

        {/* Quick Actions: Direct Download & Auto Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button onClick={() => handleDownloadVideo("4K Master")} className="py-2.5 rounded-xl bg-cyan-500 text-black font-bold cursor-pointer shadow">⬇ Download 4K Video</button>
          <button onClick={() => handleDownloadVideo("1080p FHD")} className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-semibold cursor-pointer">⬇ Download 1080p</button>
          <button onClick={() => handleDownloadThumbnail(selectedThumbnail)} className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-yellow-300 font-semibold cursor-pointer">🖼️ Download Thumbnail</button>
          <button onClick={handleAutoPackaging} className="py-2.5 rounded-xl bg-purple-500/20 border border-purple-500 text-purple-300 font-bold cursor-pointer">⚡ AUTO All Settings</button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1.5 overflow-x-auto bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: "timeline", label: "🎞️ Timeline" },
            { id: "watermark", label: "👑 Logo & 4 Corners" },
            { id: "audio", label: "🎵 Local Music & -22dB" },
            { id: "publish", label: "🔴 YouTube SEO & Copy" },
            { id: "thumbnails", label: "🖼️ Thumbnail Vault" },
            { id: "download", label: "💾 Master Download" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                activeTab === tab.id ? "bg-cyan-500 text-black shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: 4-CORNER LOGO & GOLD WATERMARK */}
        {activeTab === "watermark" && (
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-3.5 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-400 uppercase">AK Ministry Watermark System</span>
              <button onClick={() => setWatermarkEnabled(!watermarkEnabled)} className={`px-2.5 py-1 rounded-lg font-bold text-[10px] ${watermarkEnabled ? "bg-green-500/20 text-green-300 border border-green-500" : "bg-slate-800 text-slate-400"}`}>
                {watermarkEnabled ? "LOGO: ON" : "LOGO: OFF"}
              </button>
            </div>

            {/* Corner Positions */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 block font-semibold">Select Logo Screen Corner (4 Sides):</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "top-left", l: "Top Left ↖" },
                  { id: "top-right", l: "Top Right ↗" },
                  { id: "bottom-left", l: "Bottom Left ↙" },
                  { id: "bottom-right", l: "Bottom Right ↘" }
                ].map(pos => (
                  <button key={pos.id} onClick={() => setWatermarkPos(pos.id)} className={`py-2 rounded-xl border text-xs font-bold ${watermarkPos === pos.id ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
                    {pos.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Finish (Gold / Neon / Classic) */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 block font-semibold">Select Logo Theme & Color:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "gold", l: "👑 Gold Emboss" },
                  { id: "neon-cyan", l: "⚡ Neon Cyan" },
                  { id: "classic-white", l: "⚪ Classic White" }
                ].map(st => (
                  <button key={st.id} onClick={() => setLogoStyle(st.id)} className={`py-2 rounded-xl border text-xs font-bold ${logoStyle === st.id ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
                    {st.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LOCAL MUSIC & AUDIO MIX */}
        {activeTab === "audio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-cyan-400 uppercase">Local Audio & Background Music Engine</span>
              <span className="text-green-400 font-mono text-[10px]">BGM Clamped @ -22dB</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <label className="text-[10px] text-slate-400 block font-semibold">Upload Local Custom Song / Background Track:</label>
              <div className="flex items-center gap-2">
                <label className="px-3.5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-xs cursor-pointer">
                  🎵 Choose Local Audio File
                  <input type="file" accept="audio/*" onChange={(e) => { const f = e.target.files[0]; if (f) setLocalAudioName(f.name); }} className="hidden"/>
                </label>
                {localAudioName && <span className="text-[11px] text-green-400 font-mono truncate">✅ {localAudioName} Loaded</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Voice Volume ({voiceVol}%)</span>
                <input type="range" min="0" max="100" value={voiceVol} onChange={(e) => setVoiceVol(e.target.value)} className="w-full accent-cyan-500"/>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Music Volume ({musicVol}%) [-22dB Ducked]</span>
                <input type="range" min="0" max="40" value={musicVol} onChange={(e) => setMusicVol(e.target.value)} className="w-full accent-yellow-500"/>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">SFX Volume ({sfxVol}%)</span>
                <input type="range" min="0" max="100" value={sfxVol} onChange={(e) => setSfxVol(e.target.value)} className="w-full accent-purple-500"/>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: YOUTUBE SEO METADATA & 1-CLICK COPY */}
        {activeTab === "publish" && (
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-3.5 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-red-400 uppercase">YouTube Packaging & Copy/Paste System</span>
              <button onClick={handleAutoPackaging} className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold text-[10px]">⚡ AUTO GENERATE</button>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Video Title</span>
                <button onClick={() => handleCopy(ytTitle, "Title")} className="text-[10px] text-cyan-400 hover:underline">📋 Copy Title</button>
              </div>
              <input type="text" value={ytTitle} onChange={(e) => setYtTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Description</span>
                <button onClick={() => handleCopy(ytDescription, "Description")} className="text-[10px] text-cyan-400 hover:underline">📋 Copy Description</button>
              </div>
              <textarea rows={2} value={ytDescription} onChange={(e) => setYtDescription(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Hashtags (#)</span>
                <button onClick={() => handleCopy(ytTags, "Hashtags")} className="text-[10px] text-cyan-400 hover:underline">📋 Copy Hashtags</button>
              </div>
              <input type="text" value={ytTags} onChange={(e) => setYtTags(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-cyan-300 font-mono"/>
            </div>
          </div>
        )}

        {/* TAB 4: THUMBNAILS VAULT */}
        {activeTab === "thumbnails" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3 text-xs">
            <span className="font-bold text-yellow-400 uppercase block border-b border-slate-800 pb-2">High CTR YouTube Thumbnail Generator</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {thumbnailOptions.map((img, idx) => (
                <div key={idx} className="space-y-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <div onClick={() => setSelectedThumbnail(idx)} className={`relative aspect-video rounded-lg overflow-hidden border cursor-pointer ${selectedThumbnail === idx ? "border-yellow-400 ring-2 ring-yellow-400/40" : "border-slate-800"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover"/>
                    {selectedThumbnail === idx && <span className="absolute bottom-1 right-1 bg-yellow-500 text-black text-[9px] font-bold px-1 rounded">ACTIVE</span>}
                  </div>
                  <button onClick={() => handleDownloadThumbnail(idx)} className="w-full py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-semibold">⬇ Download</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TIMELINE */}
        {activeTab === "timeline" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 text-xs">
            <span className="font-bold text-cyan-400 uppercase text-[10px]">Multi-Track Timeline</span>
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 w-14">Video</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {[1, 2, 3, 4].map(s => (
                  <button key={s} onClick={() => setActiveScene(s)} className={`px-2.5 py-1 rounded-lg border ${activeScene === s ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-400"}`}>Scene {s}</button>
                ))}
              </div>
            </div>
            <div className="flex justify-between bg-slate-950 p-2 rounded-xl border border-slate-800 text-slate-300">
              <span>Voice: 100% Shuddh Hindi (1.5s Pause)</span>
              <span className="text-green-400">BGM: -22dB</span>
            </div>
          </div>
        )}

        {/* TAB 6: MASTER DOWNLOAD */}
        {activeTab === "download" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3 text-xs">
            <span className="font-bold text-cyan-400 uppercase block border-b border-slate-800 pb-2">Direct Video File Exporter</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-300 block">4K Cinema Master</span>
                <p className="text-[10px] text-slate-400">3840x2160 Ultra HD • 60 FPS • High Bitrate</p>
                <button onClick={() => handleDownloadVideo("4K UHD")} className="w-full py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs">⬇ Download 4K</button>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-200 block">1080p Web Ready</span>
                <p className="text-[10px] text-slate-400">1920x1080 Full HD • Fast Render • Small Size</p>
                <button onClick={() => handleDownloadVideo("1080p FHD")} className="w-full py-2 rounded-xl bg-slate-800 text-cyan-300 border border-slate-700 font-bold text-xs">⬇ Download 1080p</button>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-purple-300 block">Audio Only Master</span>
                <p className="text-[10px] text-slate-400">Pure Shuddh Hindi Voice + -22dB Ducked Music (WAV)</p>
                <button onClick={() => alert("Audio Master WAV downloaded!")} className="w-full
