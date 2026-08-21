"use client";

import React, { useState } from "react";
import {
  Clapperboard,
  Sparkles,
  Play,
  Tv,
  Layers,
  SlidersHorizontal,
  Film,
  Zap,
  Check,
  Video,
  Bookmark,
  CheckCircle2
} from "lucide-react";

export default function CineFlowProStudio() {
  const [prompt, setPrompt] = useState(
    "यीशु तूफान के बीच नाव में शिष्यों के साथ हैं। शांत और सामर्थी मुद्रा, रात का भयानक समुद्री तूफ़ान, बिजली की चमक और विशाल लहरें।"
  );
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("60m");
  const [storyModel, setStoryModel] = useState("Auto");
  const [videoModel, setVideoModel] = useState("Veo");
  const [artStyle, setArtStyle] = useState("Bible Art");
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const handlePresetSelect = () => {
    setDuration("60m");
    setArtStyle("Bible Art");
    setStoryModel("Auto");
    setVideoModel("Veo");
  };

  const subscriptionPlans = [
    {
      id: "starter",
      name: "Starter Creator",
      price: "$19",
      period: "/month",
      credits: "300 Credits / mo",
      features: ["720p HD Video Output", "Image + Audio Auto-Sync", "Standard Render Speed", "Up to 5 Min Films"],
      imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
      popular: false,
    },
    {
      id: "pro",
      name: "Pro Studio Director",
      price: "$49",
      period: "/month",
      credits: "1,500 Credits / mo",
      features: ["4K Ultra Cinema Engine", "Full Multimodal Mix (Image + Video + Voice)", "Ultra-Fast Priority Queue", "Up to 30 Min Full Films"],
      imgUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60",
      popular: true,
    },
    {
      id: "studio",
      name: "Master Studio (AK)",
      price: "$99",
      period: "/month",
      credits: "Unlimited Pro Credits",
      features: ["60 Min Full-Feature Movies (360 Shots)", "Deep Hindi 1.5s Voice Engine", "Veo + Kling + Sora Models", "Full Commercial License"],
      imgUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white pb-24">
      <header className="border-b border-slate-800/80 bg-[#090f1d]/90 backdrop-blur-md px-6 py-3.5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              CineFlow <span className="text-cyan-400">AI Studio</span>
            </span>
            <p className="text-[10px] text-slate-400">Autonomous Multimodal Film Pipeline (Image + Video + Voice)</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0e172a] border border-cyan-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span className="font-semibold">Unlimited Credits</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-3">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Auto Multimodal Sync: Image + Video + Ultra-Real Voice
        </div>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-snug">
          Turn One Prompt into a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
            Complete Audio-Visual Film
          </span>
        </h1>
      </div>

      <main className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-200">⭐ AK MINISTRY 60-MIN MASTER PRESET</div>
              <div className="text-[11px] text-slate-400">360 Scenes (10s each) • Auto Sync Video + Background Voice + Music</div>
            </div>
          </div>
          <button 
            onClick={handlePresetSelect}
            className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition"
          >
            Apply Preset
          </button>
        </div>

        <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white">1. Master Story / Screenplay Input</h2>
            </div>
            <span className="text-[10px] bg-cyan-950 border border-cyan-700/50 text-cyan-300 px-2 py-0.5 rounded">All-In-One (Video + Voice + SFX)</span>
          </div>

          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="पूरी कहानी यहाँ लिखें... AI दृश्य, बैकग्राउंड आवाज़ और सिनेमैटिक म्यूज़िक तीनों को एक साथ मिलाकर वीडियो बनाएगा।"
            className="w-full bg-[#070c18] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed placeholder:text-slate-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Tv className="w-4 h-4 text-cyan-400" /> 2. Aspect Ratio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "16:9", label: "16:9", sub: "YouTube" },
                { id: "9:16", label: "9:16", sub: "Shorts/Reels" },
                { id: "21:9", label: "21:9", sub: "Cinematic" },
                { id: "4:3", label: "4:3", sub: "Classic" },
                { id: "1:1", label: "1:1", sub: "Square" },
                { id: "Auto", label: "Auto", sub: "AI Smart" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setAspectRatio(r.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    aspectRatio === r.id
                      ? "bg-cyan-950/40 border-cyan-500 text-white shadow-sm"
                      : "bg-[#070c18] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{r.label}</div>
                  <div className="text-[10px] text-slate-500">{r.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> 3. Timeline & Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "3m", label: "3 Min", scenes: "18 Scenes" },
                { id: "15m", label: "15 Min", scenes: "90 Scenes" },
                { id: "20m", label: "20 Min", scenes: "120 Scenes" },
                { id: "30m", label: "30 Min", scenes: "180 Scenes" },
                { id: "60m", label: "60 Min", scenes: "360 Scenes" },
                { id: "Custom", label: "Custom", scenes: "Variable" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDuration(d.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    duration === d.id
                      ? "bg-indigo-950/50 border-indigo-500 text-white shadow-sm"
                      : "bg-[#070c18] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{d.label}</div>
                  <div className="text-[10px] text-indigo-300/80">{d.scenes}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              4. Story & Dialogue Engine
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Auto", "GPT", "Gemini", "Claude", "Fast AI", "Pro AI"].map((m) => (
                <button
                  key={m}
                  onClick={() => setStoryModel(m)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition ${
                    storyModel === m
                      ? "bg-purple-950/40 border-purple-500 text-purple-200"
                      : "bg-[#070c18] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" /> 5. Video Generation Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Veo", "Kling", "Runway", "Hailuo", "Luma", "Auto"].map((vm) => (
                <button
                  key={vm}
                  onClick={() => setVideoModel(vm)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition ${
                    videoModel === vm
                      ? "bg-cyan-950/40 border-cyan-500 text-cyan-200"
                      : "bg-[#070c18] border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {vm}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Film className="w-4 h-4 text-amber-400" /> 6. Visual Atmosphere & Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              "Bible Art", "Cinematic Epic", "Realistic 8K", "Historical Drama", 
              "Dark Cyberpunk", "3D Animation", "Anime", "Custom Style"
            ].map((st) => (
              <button
                key={st}
                onClick={() => setArtStyle(st)}
                className={`p-3 rounded-xl border text-left flex justify-between items-center transition ${
                  artStyle === st
                    ? "bg-amber-950/30 border-amber-500 text-amber-200"
                    : "bg-[#070c18] border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <span className="text-xs font-medium">{st}</span>
                {artStyle === st && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#0b1325]/90 border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Choose Subscription Plan</h2>
            </div>
            <span className="text-[11px] text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-700/50">Instant Access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
                  selectedPlan === plan.id
                    ? "border-cyan-500 bg-[#0e1933] shadow-lg shadow-cyan-950/80 scale-[1.02]"
                    : "border-slate-800 bg-[#070c18] hover:border-slate-700"
                }`}
              >
                <div 
                  className="h-28 w-full relative bg-cover bg-center"
                  style={{ backgroundImage: `url(${plan.imgUrl})` }}
                >
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1325] via-transparent to-transparent"></div>
                  {plan.popular && (
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      MOST POPULAR
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-xs font-bold text-white">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl font-extrabold text-cyan-300">{plan.price}</span>
                      <span className="text-[10px] text-slate-500">{plan.period}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-400 mt-1">{plan.credits}</div>

                    <ul className="mt-3 space-y-1.5 border-t border-slate-800/80 pt-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={`w-full py-2 rounded-xl text-xs font-bold transition mt-2 ${
                      selectedPlan === plan.id
                        ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Selected Plan" : "Select Plan"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 text-sm transition active:scale-[0.99]">
            <Play className="w-4 h-4 fill-white" /> 🚀 Generate Full Film (Image + Video + Voice Sync Mixed)
          </button>
        </div>
      </main>
    </div>
  );
                 }
                  
