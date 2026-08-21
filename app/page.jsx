"use client";

import React, { useState } from "react";

export default function CineFlowProStudio() {
  const [activeTab, setActiveTab] = useState("Story");
  const [prompt, setPrompt] = useState("प्रभु हनुमान शांत दृश्य में, चारों ओर समुद्री तूफान...");
  
  const tabs = ["Story", "Visual", "Camera", "Audio"];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans pb-10">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#090f1d] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center font-bold">CF</div>
          <div>
            <h1 className="text-lg font-bold">CineFlow <span className="text-cyan-400">AI Studio</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Professional Filmmaking Platform</p>
          </div>
        </div>
        <div className="bg-cyan-950/40 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-800 font-bold">AK MINISTRY MODE: ON</div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-6">
        
        {/* AK Ministry Quick Preset */}
        <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-cyan-500/30 p-5 rounded-xl mb-8 flex justify-between items-center">
            <div>
                <h2 className="text-sm font-bold text-white">AK Ministry Preset (Active)</h2>
                <p className="text-[11px] text-slate-400">60 Min Movie | Deep Hindi TTS | Cinematic Pacing</p>
            </div>
            <button className="bg-cyan-600 text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-cyan-500">View Preset Details</button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-slate-800 mb-6">
          {tabs.map(tab => (
            <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs font-bold uppercase tracking-widest ${activeTab === tab ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}
            >
                {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-[#0b1222] p-6 rounded-xl border border-slate-800">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Master Prompt</label>
                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-transparent border border-slate-700 rounded-lg p-4 text-sm focus:border-cyan-500 outline-none" rows={4} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <select className="bg-[#0b1222] border border-slate-800 p-3 rounded-lg text-xs font-bold text-slate-300">
                        <option>Story: Auto (Recommended)</option>
                        <option>GPT-5.6</option>
                        <option>Gemini 1.5 Pro</option>
                    </select>
                    <select className="bg-[#0b1222] border border-slate-800 p-3 rounded-lg text-xs font-bold text-slate-300">
                        <option>Video: Veo (Cinema HD)</option>
                        <option>Kling 1.5</option>
                        <option>Runway Gen-3</option>
                    </select>
                </div>
            </div>

            {/* Preview & Status */}
            <div className="bg-[#060a14] border border-slate-800 rounded-xl flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-cyan-500 animate-spin mb-4"></div>
                <h3 className="font-bold text-sm">Engine Ready</h3>
                <p className="text-[11px] text-slate-500 mt-2">Waiting for Master Prompt & Scene Breakdown</p>
            </div>
        </div>

        <button className="w-full py-5 mt-10 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-xl font-black text-sm uppercase tracking-wider hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
            🚀 Generate Video Engine Package
        </button>
      </main>
    </div>
  );
}
