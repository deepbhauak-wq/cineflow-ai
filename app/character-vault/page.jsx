
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CharacterVault() {
  const [characterName, setCharacterName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(25);
  const [attire, setAttire] = useState({
    top: "T-Shirt",
    bottom: "Jeans",
    footwear: "Sneakers / Boots",
    accessories: "Smartwatch, Leather Bracelet",
    traditional: "None"
  });
  const [characterLocked, setCharacterLocked] = useState(true);

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-6 md:p-10 font-sans">
      
      {/* Top Bar Navigation */}
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl">
            🔒
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Character & Wardrobe Consistency Vault</h1>
            <p className="text-xs text-slate-400">Lock faces, clothing, accessories across 100+ AI scenes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs hover:bg-slate-800 transition">
            ← Studio Hub
          </Link>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-xs shadow-lg shadow-cyan-500/20">
            + Save Master Preset
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form: Identity & Basic Consistency */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">1. Core Character DNA</h2>
          
          <div>
            <label className="text-xs text-slate-400 block mb-2">Character / Role Name</label>
            <input 
              type="text" 
              placeholder="e.g. Kabir / Mentor" 
              value={characterName} 
              onChange={(e) => setCharacterName(e.target.value)}
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-2">Category / Type</label>
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Father/Mother">Parents / Elder</option>
                <option value="Cartoon/Mickey">Cartoon / 3D Style</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-2">Age Locked ({age} Yrs)</label>
              <input 
                type="range" 
                min="5" 
                max="80" 
                value={age} 
                onChange={(e) => setAge(e.target.value)}
                className="w-full accent-cyan-500 mt-2"
              />
            </div>
          </div>

          {/* Character Lock Status */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Face & Age Lock 🔒</p>
              <p className="text-[11px] text-slate-400">Maintains 100% face likeness in every shot</p>
            </div>
            <input 
              type="checkbox" 
              checked={characterLocked} 
              onChange={() => setCharacterLocked(!characterLocked)}
              className="w-5 h-5 accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Center: Wardrobe & Outfit Configuration */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">2. Wardrobe & Accessories</h2>

          <div>
            <label className="text-xs text-slate-400 block mb-2">Upper Wear (Top / Shirt / Saree)</label>
            <input 
              type="text" 
              value={attire.top} 
              onChange={(e) => setAttire({...attire, top: e.target.value})}
              placeholder="e.g. Pure Ivory Silk Robe / Red Saree / White T-Shirt" 
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-2">Lower Wear (Pants / Jeans / Bottom)</label>
            <input 
              type="text" 
              value={attire.bottom} 
              onChange={(e) => setAttire({...attire, bottom: e.target.value})}
              placeholder="e.g. Slim Denim / Formal Trousers" 
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-2">Shoes & Footwear</label>
            <input 
              type="text" 
              value={attire.footwear} 
              onChange={(e) => setAttire({...attire, footwear: e.target.value})}
              placeholder="e.g. Leather Boots / Sandals / Sneakers" 
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-2">Accessories (Watch, Bracelet, Glasses)</label>
            <input 
              type="text" 
              value={attire.accessories} 
              onChange={(e) => setAttire({...attire, accessories: e.target.value})}
              placeholder="e.g. Gold Watch, Black Wristband" 
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Live Prompt Synthesis Preview */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">3. Consistency Prompt Payload</h2>
            <p className="text-xs text-slate-400 mb-3">Auto-injected into Flux/Veo generator for every scene:</p>
            
            <div className="bg-[#07090e] border border-slate-800 p-4 rounded-xl text-xs font-mono text-cyan-300/90 leading-relaxed break-words">
              {`[CHARACTER_LOCK: ${characterName || "Protagonist"}, Age: ${age}, Gender: ${gender}, Wearing: ${attire.top}, ${attire.bottom}, Shoes: ${attire.footwear}, Details: ${attire.accessories}, High consistency seed]`}
            </div>
          </div>

          <button className="w-full mt-6 py-3 rounded-xl bg-[#141b2d] hover:bg-[#1a233a] border border-slate-700 text-xs font-medium text-slate-300">
            Upload Reference Face Photo (Optional)
          </button>
        </div>

      </div>
    </div>
  );
}
