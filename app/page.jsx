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

  const subscriptionPlans = [
    {
      id: "starter",
      name: "Starter",
      price: "$19",
      credits: "300 Credits / mo",
      features: ["720p HD Output", "Basic Sync", "Standard Queue"],
    },
    {
      id: "pro",
      name: "Pro Studio",
      price: "$49",
      credits: "1,500 Credits / mo",
      features: ["4K Cinema Engine", "Full Multimodal", "Priority Queue"],
      popular: true,
    },
    {
      id: "studio",
      name: "Master",
      price: "$99",
      credits: "Unlimited Pro",
      features: ["60m Feature Movies", "Deep Hindi TTS", "Commercial Rights"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans pb-24">
      <header className="border-b border-slate-800 bg-[#090f1d] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white">CF</div>
          <span className="text-lg font-bold">CineFlow <span className="text-cyan-400">AI Studio</span></span>
        </div>
        <div className="text-xs font-semibold text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-900">PRO ACTIVE</div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-10 space-y-12">
        {/* Prompt Section */}
        <div className="bg-[#0b1222] p-6 rounded-xl border border-slate-800">
          <label className="text-sm font-bold block mb-3 text-slate-300">1. Master Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-[#060a14] border border-slate-700 rounded-lg p-4 text-sm focus:border-cyan-500 outline-none"
            rows={3}
          />
        </div>

        {/* Dimensions Section */}
        <div className="bg-[#0b1222] p-6 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-400 mb-3 block">Aspect Ratio</label>
            <div className="flex gap-2">
              {["16:9", "9:16", "1:1"].map((r) => (
                <button key={r} onClick={() => setAspectRatio(r)} className={`flex-1 py-2 text-xs font-bold rounded border ${aspectRatio === r ? 'bg-cyan-600 border-cyan-500' : 'border-slate-700'}`}>{r}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 mb-3 block">Duration</label>
            <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-[#060a14] border border-slate-700 rounded p-2 text-xs font-bold">
              <option value="60m">60 Minutes (360 Shots)</option>
              <option value="1m">1 Minute (6 Shots)</option>
            </select>
          </div>
        </div>

        {/* Pricing Section - Professional Look */}
        <section>
          <h3 className="text-xl font-black mb-6 text-center">Studio Membership</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id} 
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedPlan === plan.id ? 'bg-[#0f172a] border-cyan-600' : 'bg-[#0b1222] border-slate-800 hover:border-slate-700'}`}
              >
                {plan.popular && <div className="text-[10px] font-black uppercase text-cyan-400 mb-2">Recommended</div>}
                <h4 className="text-lg font-bold">{plan.name}</h4>
                <div className="text-3xl font-black my-3">{plan.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                <div className="text-xs text-cyan-400 font-bold mb-4">{plan.credits}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, i) => <li key={i} className="text-[11px] text-slate-400 flex items-center gap-2">✓ {f}</li>)}
                </ul>
                <button className={`w-full py-2 text-xs font-bold rounded ${selectedPlan === plan.id ? 'bg-cyan-600' : 'bg-slate-800'}`}>Select Plan</button>
              </div>
            ))}
          </div>
        </section>

        <button className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-black text-sm uppercase tracking-wider">Generate Movie Package</button>
      </main>
    </div>
  );
}
