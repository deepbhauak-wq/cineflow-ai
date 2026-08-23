"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ExportHub() {
  const [selectedThumbnail, setSelectedThumbnail] = useState(1);
  const [quality, setQuality] = useState("4k");
  const [includeCertificate, setIncludeCertificate] = useState(true);

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 md:p-8 font-sans">
      {/* Top Bar Navigation */}
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl">
            📦
          </div>
          <div>
            <h1 className="text-lg font-bold">Export & YouTube Publishing Center</h1>
            <p className="text-xs text-slate-400">100% Commercial License • Dual Thumbnails • SEO Package</p>
          </div>
        </div>

        <Link href="/studio/editor" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs hover:bg-slate-800 transition">
          ← Back to Editor
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: AI Dual Thumbnails Selector */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">1. High-CTR AI Thumbnails</h2>
          <p className="text-xs text-slate-400">System generated 2 viral variations based on visual tension:</p>

          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => setSelectedThumbnail(1)}
              className={`p-3 rounded-xl border cursor-pointer transition ${
                selectedThumbnail === 1 ? "bg-cyan-500/10 border-cyan-500" : "bg-[#141b2d] border-slate-800"
              }`}
            >
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-xs text-slate-500 mb-2">
                Thumbnail Variant A
              </div>
              <p className="text-[11px] font-semibold text-center text-white">Dramatic Close-Up</p>
            </div>

            <div 
              onClick={() => setSelectedThumbnail(2)}
              className={`p-3 rounded-xl border cursor-pointer transition ${
                selectedThumbnail === 2 ? "bg-cyan-500/10 border-cyan-500" : "bg-[#141b2d] border-slate-800"
              }`}
            >
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center text-xs text-slate-500 mb-2">
                Thumbnail Variant B
              </div>
              <p className="text-[11px] font-semibold text-center text-white">Wide Cinematic Landscape</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-cyan-300">✓ 100% Commercial Copyright-Free</p>
              <p className="text-[11px] text-slate-400">YouTube Monetization Safe Certificate Included</p>
            </div>
            <input 
              type="checkbox" 
              checked={includeCertificate} 
              onChange={() => setIncludeCertificate(!includeCertificate)}
              className="w-4 h-4 accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right: YouTube Packaging & Export Actions */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">2. YouTube SEO Package</h2>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Optimized Title</label>
            <input 
              type="text" 
              readOnly 
              value="Mastering Courage in Times of Doubt | CineFlow AI Cinema"
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Viral Hashtags</label>
            <input 
              type="text" 
              readOnly 
              value="#AIStorytelling #CinematicAI #YouthGuidance #CineFlow"
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Resolution Engine</label>
            <div className="grid grid-cols-3 gap-2">
              {["1080p", "4k", "8k"].map((res) => (
                <button
                  key={res}
                  onClick={() => setQuality(res)}
                  className={`py-2 text-xs rounded-xl uppercase font-semibold border transition ${
                    quality === res ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-[#141b2d] border-slate-800 text-slate-400"
                  }`}
                >
                  {res} Ultra
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition">
            🚀 Download Master MP4 ({quality.toUpperCase()}) & Metadata Zip
          </button>
        </div>
      </div>
    </div>
  );
}

