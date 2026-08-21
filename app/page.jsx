"use client";

import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [prompt, setPrompt] = useState(
    "प्रभु हनुमान शांत और मनमोहक दृश्य में, चारों ओर भयानक समुद्री तूफान मंडरा रहा है..."
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
      features: [
        "720p HD Video Output",
        "Image + Audio Auto-Sync",
        "Standard Queue Processing"
      ],
      imgUrl:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      popular: false
    },
    {
      id: "pro",
      name: "Pro Studio Director",
      price: "$49",
      period: "/month",
      credits: "1,500 Credits / mo",
      features: [
        "4K Ultra Cinema Engine",
        "Full Multimodal Mix (Image + Motion)",
        "Priority Fast-Track Queue"
      ],
      imgUrl:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
      popular: true
    },
    {
      id: "studio",
      name: "Master Studio (AK)",
      price: "$99",
      period: "/month",
      credits: "Unlimited Pro Credits",
      features: [
        "60 Min Full-Feature Movies (360 Shots)",
        "Deep Hindi TTS Voice Engine",
        "Commercial Licensing Rights"
      ],
      imgUrl:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans pb-24 selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#090f1d]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-blue-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-cyan-500/20">
            CF
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              CineFlow <span className="text-cyan-400">AI Studio</span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium">
              Autonomous Multimodal Video Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0e172a] border border-cyan-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-inner">
            <span className="font-bold text-cyan-400 text-xs">PRO</span>
            <span className="font-semibold text-xs text-slate-200">
              Unlimited Credits
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8">
        {/* Top Banner Preset */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-slate-900/80 border border-cyan-500/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-2">
              Featured 1-Click Preset
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              60 Min Full Movie Preset (360 Shots + Bible Art + Veo)
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              ऑटोमैटिक 360 शॉट्स, बाइबिल आर्ट स्टाइल एवं डीप मोशन वीडियो सिंक को एक क्लिक में सेट करें।
            </p>
          </div>
          <button
            onClick={handlePresetSelect}
            className="whitespace-nowrap px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 active:scale-95 transition-all"
          >
            Apply Preset ✨
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Controls (Left Column) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Prompt Area */}
            <div className="p-6 rounded-2xl bg-[#0b1222] border border-slate-800 shadow-xl space-y-4">
              <label className="text-sm font-bold text-slate-200 flex items-center justify-between">
                <span>1. Cinema Master Prompt / Story Idea</span>
                <span className="text-[11px] font-normal text-slate-400">
                  Hindi / Multilingual Supported
                </span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full bg-[#060a14] border border-slate-700/80 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner resize-none"
              />
            </div>

            {/* Model & Ratio Configuration */}
            <div className="p-6 rounded-2xl bg-[#0b1222] border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-slate-200">
                2. Generation & Camera Dimensions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["16:9", "9:16", "1:1"].map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setAspectRatio(ratio)}
                        className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${
                          aspectRatio === ratio
                            ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-md shadow-cyan-500/10"
                            : "bg-[#060a14] border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">
                    Duration / Shots Output
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#060a14] border border-slate-700/80 rounded-lg p-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="60m">60 Minutes (360 Cinema Shots)</option>
                    <option value="30m">30 Minutes (180 Cinema Shots)</option>
                    <option value="10m">10 Minutes (60 Cinema Shots)</option>
                    <option value="1m">1 Minute (6 Cinema Shots)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">
                    Art Style
                  </label>
                  <select
                    value={artStyle}
                    onChange={(e) => setArtStyle(e.target.value)}
                    className="w-full bg-[#060a14] border border-slate-700/80 rounded-lg p-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Bible Art">Bible Art (Detailed Holy Canvas)</option>
                    <option value="Cinematic Ultra-Realistic">Cinematic 4K Realism</option>
                    <option value="3D Pixar Animation">3D Mythological Anime</option>
                    <option value="Oil Painting Classic">Oil Painting Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">
                    Story Engine
                  </label>
                  <select
                    value={storyModel}
                    onChange={(e) => setStoryModel(e.target.value)}
                    className="w-full bg-[#060a14] border border-slate-700/80 rounded-lg p-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Auto">Auto Cinematic Screenplay</option>
                    <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">
                    Video Engine
                  </label>
                  <select
                    value={videoModel}
                    onChange={(e) => setVideoModel(e.target.value)}
                    className="w-full bg-[#060a14] border border-slate-700/80 rounded-lg p-2.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Veo">Google Veo (Cinema HD)</option>
                    <option value="Kling 1.5">Kling 1.5 HD</option>
                    <option value="Runway Gen-3">Runway Gen-3 Alpha</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Master Action Button */}
            <button
              type="button"
              className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>⚡ Generate Full Movie & Multimodal Scene Package</span>
            </button>
          </div>

          {/* Subscription Plans (Right Column) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 mb-2">
              Choose Studio Membership
            </h3>

            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "border-cyan-500 shadow-xl shadow-cyan-500/20 scale-[1.02]"
                    : "border-slate-800 bg-[#0b1222]/80 hover:border-slate-700"
                }`}
              >
                {/* Visual Image Banner */}
                <div className="h-28 w-full relative overflow-hidden">
                  <img
                    src={plan.imgUrl}
                    alt={plan.name}
                    className="w-full h-full object-cover opacity-60 hover:opacity-75 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1222] via-[#0b1222]/40 to-transparent" />
                  {plan.popular && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-black">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Plan Content */}
                <div className="p-4 pt-1 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-sm text-white">{plan.name}</h4>
                    <div className="text-right">
                      <span className="text-lg font-black text-cyan-400">
                        {plan.price}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-indigo-300">
                    {plan.credits}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-800">
                    {plan.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="text-[11px] text-slate-300 flex items-center gap-1.5"
                      >
                        <span className="text-cyan-400 font-bold">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
