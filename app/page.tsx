
"use client";

import React, { useState } from "react";
import {
  Clapperboard,
  Sparkles,
  Play,
  Tv,
  Smartphone,
  Layers,
  Sliders,
  Volume2,
  Film,
  Zap,
  CheckCircle2,
  Shield,
  Video,
  Image as ImageIcon,
  ChevronDown
} from "lucide-react";



export default function CineFlowOriginal() {
  const [prompt, setPrompt] = useState(
    "A lone astronaut drifts through the neon-lit ruins of a floating city at dusk, searching for a signal. Wide establishing shots, volumetric fog, warm rim light against deep cyan shadows, slow dolly moves."
  );
  const [outputMode, setOutputMode] = useState<"image" | "video">("video");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [artStyle, setArtStyle] = useState("Dark Cyberpunk");
  const [duration, setDuration] = useState<number>(3);
  const [autoPilot, setAutoPilot] = useState(true);
  const [musicSync, setMusicSync] = useState(true);
  const [autoDubbing, setAutoDubbing] = useState(true);

  const durationOptions = [
    { val: 3, label: "3 min", scenes: "18 scenes", pro: false },
    { val: 15, label: "15 min", scenes: "90 scenes", pro: false },
    { val: 30, label: "30 min", scenes: "180 scenes", pro: true },
    { val: 60, label: "60 min", scenes: "360 scenes", pro: true },
  ];

  const styles = [
    { id: "Cinematic Realism", badge: "8K" },
    { id: "3D Animation", badge: "Pixar" },
    { id: "Dark Cyberpunk", badge: "Neon" },
    { id: "Anime", badge: "2D" },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-[#090f1d]/80 backdrop-blur-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
            CineFlow <span className="text-cyan-400">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0e172a] border border-cyan-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs text-cyan-300 shadow-sm shadow-cyan-950">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span className="font-semibold">65 Credits</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
            JK
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          AI Film Studio • v2.0
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
          Turn a single idea into a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            cinematic video
          </span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-3 max-w-xl">
          Describe a scene and CineFlow AI directs the shots, dubs the dialogue, scores the music, and edits the full film — automatically.
        </p>

        {/* Auto-Pilot Switch */}
        <div 
          onClick={() => setAutoPilot(!autoPilot)}
          className="mt-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0c1527] border border-cyan-500/40 cursor-pointer shadow-lg shadow-cyan-950/50 hover:border-cyan-400 transition"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">
            Auto-Pilot Mode <span className="text-slate-400 font-normal">(Full AI Direction)</span>
          </span>
          <div className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${autoPilot ? "bg-cyan-500" : "bg-slate-700"}`}>
            <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${autoPilot ? "translate-x-4" : "translate-x-0"}`}></div>
          </div>
        </div>
      </div>

      {/* Main Studio Console */}
      <main className="max-w-3xl mx-auto px-4 space-y-6">

        {/* Scene Description Card */}
        <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl backdrop-blur relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-white">Describe your scene</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3">Write one idea — the AI expands it into a full script and shot list.</p>
          
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-[#070c18] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed placeholder:text-slate-600"
          />

          <div className="flex justify-between items-center mt-3">
            <span className="text-[11px] text-slate-500">{prompt.length} characters</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 hover:border-purple-400 text-purple-300 text-xs font-medium transition">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI Magic Enhance
            </button>
          </div>
        </div>

        {/* Output Mode Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Output mode</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setOutputMode("image")}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition ${
                outputMode === "image"
                  ? "bg-cyan-950/20 border-cyan-500 text-white shadow-sm shadow-cyan-950"
                  : "bg-[#0b1325] border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className={`p-2 rounded-lg ${outputMode === "image" ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-800 text-slate-400"}`}>
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Image</div>
                <div className="text-[10px] text-slate-500">0 Credits</div>
              </div>
            </button>

            <button
              onClick={() => setOutputMode("video")}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition ${
                outputMode === "video"
                  ? "bg-cyan-950/30 border-cyan-500 text-white shadow-sm shadow-cyan-950"
                  : "bg-[#0b1325] border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className={`p-2 rounded-lg ${outputMode === "video" ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                <Video className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">Video</div>
                <div className="text-[10px] text-cyan-400">Paid / Auto</div>
              </div>
            </button>
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aspect ratio</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setAspectRatio("16:9")}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition ${
                aspectRatio === "16:9"
                  ? "bg-cyan-950/30 border-cyan-500 text-white shadow-sm shadow-cyan-950"
                  : "bg-[#0b1325] border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <Tv className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">16:9</div>
                <div className="text-[10px] text-slate-500">Landscape</div>
              </div>
            </button>

            <button
              onClick={() => setAspectRatio("9:16")}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition ${
                aspectRatio === "9:16"
                  ? "bg-cyan-950/30 border-cyan-500 text-white shadow-sm shadow-cyan-950"
                  : "bg-[#0b1325] border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">9:16</div>
                <div className="text-[10px] text-slate-500">Shorts / Reels</div>
              </div>
            </button>
          </div>
        </div>

        {/* Visual Art Style */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Visual art style</label>
          <div className="grid grid-cols-2 gap-3">
            {styles.map((st) => (
              <button
                key={st.id}
                onClick={() => setArtStyle(st.id)}
                className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition ${
                  artStyle === st.id
                    ? "bg-cyan-950/30 border-cyan-500 text-cyan-200 shadow-sm shadow-cyan-950"
                    : "bg-[#0b1325] border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs font-semibold">{st.id}</span>
                </div>
                <span className="text-[10px] bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-slate-400 uppercase">
                  {st.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Duration Presets */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Video duration</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {durationOptions.map((opt) => (
              <button
                key={opt.val}
                onClick={() => setDuration(opt.val)}
                className={`p-3.5 rounded-xl border text-left transition ${
                  duration === opt.val
                    ? "bg-cyan-950/30 border-cyan-500 text-white shadow-sm shadow-cyan-950"
                    : "bg-[#0b1325] border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-200">{opt.label}</span>
                  {opt.pro && (
                    <span className="text-[9px] bg-indigo-950 border border-indigo-600 text-indigo-300 px-1.5 py-0.2 rounded font-bold">
                      PRO
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">{opt.scenes}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Suite & Auto-Dubbing Card */}
        <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Audio suite & auto-dubbing</h3>
              <p className="text-[11px] text-slate-400">Score, narrate, and localize your film automatically.</p>
            </div>
          </div>

          <div className="p-3 bg-[#070c18] border border-slate-800 rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold text-slate-200">Music & SFX auto-sync</div>
                <div className="text-[10px] text-slate-500">Beat-matched score and sound effects</div>
              </div>
            </div>
            <div 
              onClick={() => setMusicSync(!musicSync)}
              className={`w-8 h-4.5 rounded-full p-0.5 cursor-pointer transition ${musicSync ? "bg-cyan-500" : "bg-slate-700"}`}
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${musicSync ? "translate-x-3.5" : "translate-x-0"}`}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Voice emotion</label>
              <select className="w-full bg-[#070c18] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
                <option>Dramatic</option>
                <option>Epic Trailer Voice</option>
                <option>Calm / Documentarian</option>
                <option>Deep Hindi Ultra-Slow</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Custom voice</label>
              <button className="w-full bg-[#070c18] border border-slate-800 hover:border-slate-700 rounded-lg p-2.5 text-xs text-slate-300 flex items-center justify-between">
                <span>Upload Voice</span>
                <span className="text-[9px] bg-indigo-950 border border-indigo-600 text-indigo-300 px-1.5 py-0.2 rounded font-bold">
                  PRO
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Generate / Build Action Button */}
        <div className="pt-2">
          <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition active:scale-[0.99]">
            <Play className="w-4 h-4 fill-white" /> Generate Cinematic Film ({duration} Min • {duration * 6} Shots)
          </button>
        </div>

      </main>
    </div>
  );
      }
