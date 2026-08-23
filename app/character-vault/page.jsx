"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CharacterVault() {
  const [characterName, setCharacterName] = useState("Kabir");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(25);
  const [attire, setAttire] = useState({
    top: "Pure Ivory Silk Robe / White Kurta",
    bottom: "Slim Denim / Traditional Dhoti",
    footwear: "Leather Sandals / Boots",
    accessories: "Gold Smartwatch, Sacred Wristband"
  });
  const [characterLocked, setCharacterLocked] = useState(true);
  const [vaultImage, setVaultImage] = useState(null);

  // 6 Guide Archetype Cards
  const characterGuides = [
    { name: "Indian Elder / Father", role: "Wisdom Mentor", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=60", outfit: "White Kurta, Shawl, Eyeglasses" },
    { name: "Young Indian Protagonist", role: "Youth Lead", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=60", outfit: "Black Casual Shirt, Denim, Smartwatch" },
    { name: "Traditional Mother / Woman", role: "Matriarch", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=60", outfit: "Red Silk Saree, Gold Bangles" },
    { name: "Modern Creator / Youth", role: "Gen-Z", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=60", outfit: "Oversized Hoodie, Sneakers, Headphones" },
    { name: "3D Animation Hero", role: "Animated", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=60", outfit: "Stylized Armor, Vibrant Colors" },
    { name: "Classical Sage / Guide", role: "Philosopher", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=60", outfit: "Saffron Robe, Wooden Beads Bracelet" }
  ];

  const handleVaultPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVaultImage(URL.createObjectURL(file));
    }
  };

  const applyPreset = (guide) => {
    setCharacterName(guide.name.split(" ")[0]);
    setAttire(prev => ({ ...prev, top: guide.outfit }));
    setVaultImage(guide.img);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 md:p-10 font-sans overflow-x-hidden">
      
      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-slate-800 pb-5 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl">
            🔒
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">Character & Wardrobe Consistency Vault</h1>
            <p className="text-xs text-slate-400">Lock face, clothes, accessories across 100+ AI scenes</p>
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

      {/* Guide Visuals: Character Archetypes */}
      <div className="max-w-6xl mx-auto mb-8 bg-[#0f1422] border border-slate-800/80 rounded-2xl p-5 space-y-3">
        <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
          Character Guide Presets (Click any card to auto-load preset)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {characterGuides.map((guide, idx) => (
            <div
              key={idx}
              onClick={() => applyPreset(guide)}
              className="bg-[#141b2d] border border-slate-800 hover:border-cyan-500/60 rounded-xl overflow-hidden cursor-pointer group transition p-2 flex flex-col items-center"
            >
              <img src={guide.img} alt={guide.name} className="w-full h-24 object-cover rounded-lg group-hover:scale-105 transition" />
              <p className="text-[11px] font-semibold text-white mt-2 truncate w-full text-center">{guide.name}</p>
              <span className="text-[9px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded mt-1">{guide.role}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form: Identity */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-6 space-y-6">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">1. Core Character DNA</h2>
          
          <div>
            <label className="text-xs text-slate-400 block mb-2">Character / Role Name</label>
            <input 
              type="text" 
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
                <option value="Parents/Elder">Parents / Elder</option>
                <option value="Cartoon/3D">Cartoon / 3D Style</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-2">Age Locked ({age} Yrs)</label>
              <input 
                type="range" 
                min="5" 
                max="85" 
                value={age} 
                onChange={(e) => setAge(e.target.value)}
                className="w-full accent-cyan-500 mt-2"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Face & Likeness Lock 🔒</p>
              <p className="text-[11px] text-slate-400">Strict facial consistency payload</p>
            </div>
            <input 
              type="checkbox" 
              checked={characterLocked} 
              onChange={() => setCharacterLocked(!characterLocked)}
              className="w-5 h-5 accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Center: Wardrobe & Accessories */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">2. Wardrobe & Costumes</h2>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Upper Wear (Top / Kurta / Saree)</label>
            <input 
              type="text" 
              value={attire.top} 
              onChange={(e) => setAttire({...attire, top: e.target.value})}
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Lower Wear (Pants / Dhoti / Skirt)</label>
            <input 
              type="text" 
              value={attire.bottom} 
              onChange={(e) => setAttire({...attire, bottom: e.target.value})}
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Shoes & Footwear</label>
            <input 
              type="text" 
              value={attire.footwear} 
              onChange={(e) => setAttire({...attire, footwear: e.target.value})}
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Accessories (Watch, Sacred Bracelet, Glasses)</label>
            <input 
              type="text" 
              value={attire.accessories} 
              onChange={(e) => setAttire({...attire, accessories: e.target.value})}
              className="w-full bg-[#141b2d] border border-slate-700/60 rounded-xl px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Personal Gallery Upload & Final Prompt Preview */}
        <div className="bg-[#0f1422] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">3. Personal Gallery & Lock</h2>
            
            {/* Direct Vault Gallery Upload */}
            <label className="w-full py-3 rounded-xl bg-[#141b2d] hover:bg-[#1a233a] border border-slate-700 text-xs font-medium text-cyan-300 cursor-pointer flex items-center justify-center gap-2 transition">
              <span>🖼️ Upload Character Face from Gallery</span>
              <input type="file" accept="image/*" onChange={handleVaultPhotoUpload} className="hidden" />
            </label>

            {vaultImage && (
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                <img src={vaultImage} alt="Vault Preview" className="w-12 h-12 rounded-lg object-cover border border-cyan-500/40" />
                <div className="text-xs">
                  <p className="font-semibold text-cyan-300">Face Reference Active ✓</p>
                  <button onClick={() => setVaultImage(null)} className="text-[10px] text-red-400 hover:underline">Remove</button>
                </div>
              </div>
            )}

            <div className="bg-[#07090e] border border-slate-800 p-3.5 rounded-xl text-xs font-mono text-cyan-300/90 leading-relaxed break-words">
              {`[LOCK: ${characterName}, Age: ${age}, ${gender}, Top: ${attire.top}, Bottom: ${attire.bottom}, Shoes: ${attire.footwear}, Items: ${attire.accessories}]`}
            </div>
          </div>

          <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold shadow-lg shadow-cyan-500/20">
            Apply Locked Character to Project
          </button>
        </div>

      </div>
    </div>
  );
}
