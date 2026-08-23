"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProStudioEditor() {
  const [activeTab, setActiveTab] = useState("timeline");
  const [activeScene, setActiveScene] = useState(1);
  const [aiPrompt, setAiPrompt] = useState("");
  const [akMinistryActive, setAkMinistryActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportModal, setExportModal] = useState(false);

  // YouTube Automation & Metadata
  const [ytTitle, setYtTitle] = useState("जीवन बदलने वाली कहानी | 4K Hindi Cinema");
  const [ytDescription, setYtDescription] = useState("कबीर के त्याग की दिल छू लेने वाली गाथा।\n\n📌 Subscribe for inspirational cinema.");
  const [ytTags, setYtTags] = useState("#HindiCinema #LifeLessons #AKMinistry #EmotionalStories #ViralHindi");
  const [ytPrivacy, setYtPrivacy] = useState("Public");
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  // Audio Mix & Grading
  const [voiceVol, setVoiceVol] = useState(100);
  const [musicVol, setMusicVol] = useState(10);
  const [sfxVol, setSfxVol] = useState(40);
  const [colorGrade, setColorGrade] = useState("AK Ministry Cinematic");
  const [showWatermark, setShowWatermark] = useState(true);

  const thumbnailOptions = [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500"
  ];

  const handleAiEdit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("AI Editor: Timeline, voice pacing & -22dB audio ducking auto-synced!");
      setAiPrompt("");
    }, 2000);
  };

  const handleAutoPackaging = () => {
    setYtTitle("⚡ AUTO: एक ऐसा त्याग जिसने इतिहास बदल दिया | 4K Hindi Cinema");
    setYtDescription("⚡ AUTO METADATA:\nकठिन परिस्थितियों में अडिग रहने की गाथा।\n\nAudio: 100% Shuddh Hindi\nMixing: -22dB Ducking\nSubscribe for more.");
    setYtTags("#HindiCinema #TrueStory #InspirationalShorts #AKMinistry #TrendingHindi");
    alert("AI Packaging Complete: Title, Description, Hashtags & Thumbnail Locked!");
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      
      {isProcessing && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
          <p className="text-xs text-cyan-400 font-bold">🧠 Executing AI Pipeline & Audio Ducking...</p>
        </div>
      )}

      {/* Export / Publish Modal */}
      {exportModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-red-400 uppercase">🔴 YouTube 4K Exporter & Publisher</span>
              <button onClick={() => setExportModal(false)} className="text-xs text-slate-400">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                <span>Output Format</span>
                <span className="text-cyan-400 font-bold">4K Cinema (60 FPS)</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-red-500/30 flex justify-between items-center">
                <span>Privacy Mode</span>
                <span className="text-red-400 font-bold">{ytPrivacy}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button onClick={() => { setExportModal(false); alert("Exported 4K Master File!"); }} className="py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-xs">💾 Export 4K</button>
                <button onClick={() => { setExportModal(false); alert("Published directly to YouTube!"); }} className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs">🚀 Direct Publish</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-sm font-bold text-white flex items-center gap-1.5"><span>🎬</span> AI Filmmaking Studio</h1>
          <p className="text-[10px] text-slate-400">Multi-Track Timeline • Auto YouTube Packaging</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-cyan-300 border border-slate-700">← Hub</Link>
          <button onClick={() => setExportModal(true)} className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs shadow-lg">Publish 🚀</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        
        {/* Cinema Player */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-cyan-400 uppercase">Live Master Preview (Scene {activeScene})</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[9px] text-cyan-300 font-mono font-bold">⚡ CINEFLOW ENGINE</span>
          </div>
          <div className="w-full aspect-video rounded-2xl bg-black border border-slate-800 relative flex items-center justify-center overflow-hidden">
            <img src={thumbnailOptions[selectedThumbnail]} alt="" className="w-full h-full object-cover opacity-80"/>
            {showWatermark && (
              <span className="absolute top-3 right-3 bg-black/70 px-2 py-0.5 rounded border border-slate-700 text-[9px] font-bold text-cyan-300">⚡ AK MINISTRY LOGO</span>
            )}
            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-lg shadow-xl cursor-pointer">▶</div>
          </div>
        </div>

        {/* AI Prompt Box */}
        <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-3 flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="🧠 AI Director: 'Make scene emotional' or 'Add slow camera tracking'..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
          />
          <button onClick={handleAiEdit} className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-black font-bold text-xs whitespace-nowrap">Run ✨</button>
        </div>

        {/* AK Ministry Preset */}
        <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-purple-300">⭐ AK Ministry Cinematic Preset</p>
            <p className="text-[10px] text-slate-400">Locked Character • 1.5s Pause • Deep Narration • BGM -22dB</p>
          </div>
          <button onClick={() => setAkMinistryActive(!akMinistryActive)} className={`px-3 py-1 rounded-xl text-xs font-bold ${akMinistryActive ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-400"}`}>
            {akMinistryActive ? "ACTIVE 🟢" : "OFF"}
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1.5 overflow-x-auto bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: "timeline", label: "🎞️ Timeline" },
            { id: "publish", label: "🔴 YouTube Packaging" },
            { id: "basic", label: "✂️ Edit" },
            { id: "ai", label: "🎥 AI Gen" },
            { id: "character", label: "👤 Character" },
            { id: "audio", label: "🔊 Audio Mix" },
            { id: "color", label: "🎨 Grade" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap ${activeTab === tab.id ? "bg-cyan-500 text-black" : "text-slate-400"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB: YOUTUBE PACKAGING */}
        {activeTab === "publish" && (
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-3 space-y-2.5 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
              <span className="font-bold text-red-400 uppercase">YouTube Metadata & SEO Engine</span>
              <button onClick={handleAutoPackaging} className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold text-[10px]">⚡ AUTO GENERATE</button>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Thumbnails</span>
              <div className="grid grid-cols-3 gap-2">
                {thumbnailOptions.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt=""
                    onClick={() => setSelectedThumbnail(idx)}
                    className={`h-16 w-full object-cover rounded-xl border cursor-pointer ${selectedThumbnail === idx ? "border-red-500 ring-2 ring-red-500/40" : "border-slate-800 opacity-60"}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Title</span>
              <input type="text" value={ytTitle} onChange={(e) => setYtTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Description</span>
              <textarea rows={2} value={ytDescription} onChange={(e) => setYtDescription(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block mb-1">Hashtags</span>
              <input type="text" value={ytTags} onChange={(e) => setYtTags(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-cyan-300 font-mono"/>
            </div>
          </div>
        )}

        {/* TAB: TIMELINE */}
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
              <span>Voice: Shuddh Hindi (1.5s Pause)</span>
              <span className="text-green-400">BGM: -22dB</span>
            </div>
          </div>
        )}

        {/* TAB: BASIC EDIT */}
        {activeTab === "basic" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
            {["Cut", "Trim", "Split", "Crop", "Speed 1x", "Reverse"].map(op => (
              <button key={op} onClick={() => alert(`${op} applied`)} className="py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-semibold">{op}</button>
            ))}
          </div>
        )}

        {/* TAB: AI GEN */}
        {activeTab === "ai" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {["Regen Scene", "Extend Scene", "Lighting", "Weather", "Background", "Image → Video"].map(op => (
              <button key={op} onClick={() => alert(`${op} triggered`)} className="py-2 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-bold">✨ {op}</button>
            ))}
          </div>
        )}

        {/* TAB: CHARACTER */}
        {activeTab === "character" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {["Face Lock", "Outfit Change", "Expression", "Action", "Voice Lock", "Apply All"].map(op => (
              <button key={op} onClick={() => alert(`${op} locked`)} className="py-2 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-300 font-bold">👤 {op}</button>
            ))}
          </div>
        )}

        {/* TAB: AUDIO MIX */}
        {activeTab === "audio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 text-xs">
            <div className="flex justify-between items-center"><span className="text-cyan-400 font-bold uppercase">Audio Ducking</span><span className="text-green-400 font-mono">BGM -22dB</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800"><span>Voice ({voiceVol}%)</span><input type="range" min="0" max="100" value={voiceVol} onChange={(e) => setVoiceVol(e.target.value)} className="w-full accent-cyan-500"/></div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800"><span>Music ({musicVol}%)</span><input type="range" min="0" max="50" value={musicVol} onChange={(e) => setMusicVol(e.target.value)} className="w-full accent-yellow-500"/></div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800"><span>SFX ({sfxVol}%)</span><input type="range" min="0" max="100" value={sfxVol} onChange={(e) => setSfxVol(e.target.value)} className="w-full accent-purple-500"/></div>
            </div>
          </div>
        )}

        {/* TAB: COLOR GRADE */}
        {activeTab === "color" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 grid grid-cols-3 gap-2 text-xs">
            {["AK Ministry Cinematic", "Warm Biblical", "Dark Drama", "Vibrant 3D", "Documentary", "AI Auto"].map(g => (
              <button key={g} onClick={() => setColorGrade(g)} className={`py-2 rounded-xl border font-bold ${colorGrade === g ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{g}</button>
            ))}
          </div>
        )}

      </div>

      {/* Dock */}
      <div className="fixed bottom-4 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1.5 rounded-full shadow-2xl backdrop-blur-lg">
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-sm border border-slate-700">🏠</Link>
        <Link href="/character-vault" className="w-9 h-9 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-sm border border-slate-700">👤</Link>
        <Link href="/studio/editor" className="w-9 h-9 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold shadow-lg">🎬</Link>
      </div>
    </div>
  );
}
