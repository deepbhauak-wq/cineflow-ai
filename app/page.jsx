"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function GoogleFlowApp() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState("home"); // "home" or "project_detail"
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("Video"); // "Image" or "Video"
  const [ratio, setRatio] = useState("9:16");
  const [multiplier, setMultiplier] = useState("x1");
  const [duration, setDuration] = useState("8s");
  const [model, setModel] = useState("Omni Flash");
  const [statusMsg, setStatusMsg] = useState("");

  const actionCards = [
    { title: "Edit video", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80" },
    { title: "Edit photo", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80" },
    { title: "Use avatar", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80" },
    { title: "Animate photo", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&q=80" },
    { title: "Take a video", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
    { title: "Take a photo", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80" }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2000);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      notify("⚠️ Please type a prompt first!");
      return;
    }
    notify(`🚀 Generating ${mode} with ${model}...`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white font-sans text-xs flex flex-col justify-between max-w-md mx-auto relative select-none">
      
      {/* 1. TOP BAR */}
      {view === "home" ? (
        <div className="p-4 flex justify-between items-center z-20">
          <h1 className="text-xl font-bold tracking-tight text-white">Google Flow</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => notify("🔔 No new notifications")} className="text-lg text-slate-300 hover:text-white">
              🔔
            </button>
            <Link
              href="/vault"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border border-slate-700 shadow-md"
            >
              <span className="text-[#1a73e8] font-black text-xs">AK</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-4 flex items-center justify-between z-20 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <button onClick={() => setView("home")} className="text-lg text-slate-300 hover:text-white">
              ←
            </button>
            <span className="text-xs font-medium text-slate-200">Aug 22, 01:16 pm</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <button onClick={() => notify("🔍 Search")} className="text-base">🔍</button>
            <button onClick={() => notify("⚙️ Options")} className="text-base font-bold">⋮</button>
          </div>
        </div>
      )}

      {statusMsg && (
        <div className="mx-4 bg-slate-900 border border-slate-700 text-cyan-300 p-2.5 rounded-2xl text-center font-medium shadow-lg z-30">
          {statusMsg}
        </div>
      )}

      {/* 2. BODY CONTENT */}
      {view === "home" ? (
        <div className="px-4 py-1 space-y-6 flex-1">
          {/* Action Carousel */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {actionCards.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setPrompt(`Cinematic ${item.title.toLowerCase()} high quality scene`);
                  setView("project_detail");
                }}
                className="flex flex-col items-center gap-2 shrink-0 cursor-pointer active:scale-95 transition"
              >
                <div className="w-24 h-32 rounded-2xl overflow-hidden bg-[#16181f] border border-slate-800">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] text-slate-300 font-medium">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white">Projects</h2>
              <button
                onClick={() => setView("project_detail")}
                className="px-3.5 py-1.5 bg-[#1b1e28] hover:bg-[#252a38] border border-slate-800 rounded-full font-bold text-xs flex items-center gap-1.5 transition"
              >
                <span className="text-sm">+</span> New
              </button>
            </div>
            <div className="py-12 text-center text-slate-500 text-xs font-normal">
              No projects found. Create one to get started.
            </div>
          </div>
        </div>
      ) : (
        /* Empty Project Detail Canvas */
        <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-center px-4 py-8">
          <div className="text-slate-400 text-xs font-normal space-y-1">
            <p className="font-semibold text-slate-300">No assets yet.</p>
            <p className="text-[11px] text-slate-500">Create one or upload from your gallery.</p>
          </div>
          <label className="px-4 py-2 bg-[#1b1e28] hover:bg-[#252a38] border border-slate-800 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow">
            <span>📤</span> Upload
            <input type="file" accept="image/*,video/*" className="hidden" onChange={() => notify("📁 Asset Uploaded!")} />
          </label>
        </div>
      )}

      {/* 3. BOTTOM FLOATING CREATION SHEET */}
      <div className="bg-[#12141a] border-t border-slate-800/90 rounded-t-[32px] p-4 space-y-3 shadow-2xl z-30">
        {/* Prompt Input Row */}
        <div className="flex items-center gap-2 bg-transparent pb-1">
          <input
            type="text"
            placeholder="What do you want to make?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none font-normal"
          />
          <div className="flex items-center gap-2 shrink-0">
            <label className="w-8 h-8 rounded-full bg-[#1e222d] text-slate-300 flex items-center justify-center font-bold text-base hover:bg-[#2a3040] cursor-pointer">
              +
              <input type="file" accept="image/*,video/*" className="hidden" onChange={() => notify("📁 Asset Attached")} />
            </label>
            <div className="px-3 py-1.5 bg-[#252936] rounded-full text-slate-300 text-xs font-medium flex items-center gap-1">
              <span>{mode}</span>
              <span className="text-[10px] text-slate-400">📱 {multiplier}</span>
            </div>
            <button
              onClick={handleGenerate}
              className="w-9 h-9 rounded-full bg-[#252936] hover:bg-cyan-600 text-white flex items-center justify-center font-bold transition active:scale-95"
            >
              ➔
            </button>
          </div>
        </div>

        {/* Credit Counter */}
        <div className="text-center text-[11px] text-slate-400 font-medium">
          Generating will use <span className="text-white underline font-bold">{mode === "Video" ? "12 AI credits" : "0 AI credits"}</span>
        </div>

        {/* Image / Video Mode Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-[#1b1e28] p-1 rounded-2xl">
          <button
            onClick={() => setMode("Image")}
            className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
              mode === "Image" ? "bg-[#282d3c] text-white shadow-sm" : "text-slate-400"
            }`}
          >
            <span>🖼️</span> Image
          </button>
          <button
            onClick={() => setMode("Video")}
            className={`py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
              mode === "Video" ? "bg-[#282d3c] text-white shadow-sm" : "text-slate-400"
            }`}
          >
            <span>🎥</span> Video
          </button>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="grid grid-cols-5 gap-1.5 bg-[#1b1e28] p-1.5 rounded-2xl text-center">
          {["16:9", "4:3", "1:1", "3:4", "9:16"].map((r) => (
            <button
              key={r}
              onClick={() => setRatio(r)}
              className={`py-2 rounded-xl font-bold text-[10px] flex flex-col items-center justify-center gap-0.5 transition ${
                ratio === r ? "bg-[#282d3c] text-white ring-1 ring-slate-600" : "text-slate-400"
              }`}
            >
              <div className={`border border-current rounded-xs ${r === "16:9" ? "w-4 h-2.5" : r === "9:16" ? "w-2.5 h-4" : "w-3 h-3"}`} />
              <span>{r}</span>
            </button>
          ))}
        </div>

        {/* Batch Multiplier */}
        <div className="grid grid-cols-4 gap-1.5 bg-[#1b1e28] p-1.5 rounded-2xl text-center">
          {["x1", "x2", "x3", "x4"].map((m) => (
            <button
              key={m}
              onClick={() => setMultiplier(m)}
              className={`py-1.5 rounded-xl font-bold text-xs transition ${
                multiplier === m ? "bg-[#282d3c] text-white shadow" : "text-slate-400"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Duration (Only in Video Mode) */}
        {mode === "Video" && (
          <div className="grid grid-cols-4 gap-1.5 bg-[#1b1e28] p-1.5 rounded-2xl text-center">
            {["4s", "6s", "8s", "10s"].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`py-1.5 rounded-xl font-bold text-xs transition ${
                  duration === d ? "bg-[#282d3c] text-white shadow" : "text-slate-400"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* AI Model Selector */}
        <div className="relative">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-[#1b1e28] text-white font-medium text-xs py-2.5 px-4 rounded-2xl border border-slate-800 outline-none appearance-none cursor-pointer"
          >
            <option value="Omni Flash">Omni Flash</option>
            <option value="🍌 Nano Banana 2">🍌 Nano Banana 2</option>
            <option value="Veo 2.0 Ultra">Veo 2.0 Ultra</option>
            <option value="Kling Pro 1.5">Kling Pro 1.5</option>
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}
