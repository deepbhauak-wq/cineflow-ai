"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CharacterVault() {
  const [characterName, setCharacterName] = useState("Aarav");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState(24);
  const [attire, setAttire] = useState({
    top: "Ivory Silk Kurta / Classic Shirt",
    bottom: "Slim Denim / Traditional Dhoti",
    footwear: "Leather Sandals / Boots",
    accessories: "Gold Watch, Sacred Wristband"
  });
  const [characterLocked, setCharacterLocked] = useState(true);
  const [vaultImage, setVaultImage] = useState(null);

  // Accurate Curated Guides
  const characterGuides = [
    { name: "Indian Elder", role: "Father / Mentor", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=60", outfit: "White Kurta, Khadi Shawl, Spectacles" },
    { name: "Youth Lead", role: "Protagonist", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=60", outfit: "Black Denim Jacket, White Tee, Watch" },
    { name: "Traditional Indian", role: "Mother / Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=60", outfit: "Red Banarasi Saree, Gold Bangles" },
    { name: "Modern Creator", role: "Youth Gen-Z", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=60", outfit: "Oversized Hoodie, Sneakers, Headphones" },
    { name: "3D Animation", role: "Stylized Avatar", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=60", outfit: "Vibrant Armor, Stylized Hair" },
    { name: "Wisdom Guide", role: "Philosopher", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=60", outfit: "Saffron Robe, Rudraksha Bracelet" }
  ];

  const handleVaultPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVaultImage(URL.createObjectURL(file));
  };

  const applyPreset = (guide) => {
    setCharacterName(guide.name);
    setAttire(prev => ({ ...prev, top: guide.outfit }));
    setVaultImage(guide.img);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 md:p-8 font-sans pb-28">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-base">
            🔒
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold">Character Consistency Vault</h1>
            <p className="text-[11px] text-slate-400">Lock face & clothing across all generated scenes</p>
          </div>
        </div>

        <Link href="/" className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
          ← Studio Hub
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Preset Cards */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Character Archetype Presets (Tap to select)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {characterGuides.map((guide, idx) => (
              <div
                key={idx}
                onClick={() => applyPreset(guide)}
                className="bg-slate-800/80 border border-slate-700 hover:border-cyan-500 rounded-xl overflow-hidden cursor-pointer p-2 flex flex-col items-center transition"
              >
                <img src={guide.img} alt={guide.name} className="w-full h-20 object-cover rounded-lg" />
                <p className="text-[11px] font-semibold text-white mt-1.5 truncate w-full text-center">{guide.name}</p>
                <span className="text-[9px] text-cyan-400">{guide.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 1. Core DNA */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">1. Core Character DNA</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Character Name</label>
              <input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Gender / Archetype</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Elder">Elder / Mentor</option>
                <option value="Youth">Youth / Child</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Locked Age ({age} Yrs)</label>
              <input type="range" min="5" max="80" value={age} onChange={(e) => setAge(e.target.value)} className="w-full accent-cyan-500 mt-2"/>
            </div>
          </div>
        </div>

        {/* 2. Wardrobe */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">2. Wardrobe & Costumes</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Upper Wear (Top / Kurta / Saree)</label>
              <input type="text" value={attire.top} onChange={(e) => setAttire({...attire, top: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Lower Wear (Pants / Dhoti)</label>
              <input type="text" value={attire.bottom} onChange={(e) => setAttire({...attire, bottom: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Footwear</label>
              <input type="text" value={attire.footwear} onChange={(e) => setAttire({...attire, footwear: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Accessories (Watch, Kada, Glasses)</label>
              <input type="text" value={attire.accessories} onChange={(e) => setAttire({...attire, accessories: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
          </div>
        </div>

        {/* 3. Personal Upload & Prompt Summary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">3. Reference Gallery & Lock State</label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-cyan-300 cursor-pointer flex items-center justify-center gap-2">
              <span>🖼️ Upload Face from Gallery</span>
              <input type="file" accept="image/*" onChange={handleVaultPhotoUpload} className="hidden" />
            </label>
            {vaultImage ? (
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 p-2 rounded-xl w-full sm:w-auto">
                <img src={vaultImage} alt="Face Reference" className="w-12 h-12 rounded-lg object-cover border border-cyan-500/40" />
                <div className="text-xs">
                  <p className="font-semibold text-cyan-300">Face Reference Locked ✓</p>
                  <button onClick={() => setVaultImage(null)} className="text-[10px] text-red-400 hover:underline">Clear</button>
                </div>
              </div>
            ) : <span className="text-[11px] text-slate-500">No custom face uploaded</span>}
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-[11px] font-mono text-cyan-300">
            {`[VAULT_LOCK: Name: ${characterName}, Age: ${age}, Gender: ${gender}, Top: ${attire.top}, Bottom: ${attire.bottom}, Shoes: ${attire.footwear}, Items: ${attire.accessories}]`}
          </div>

          <button onClick={() => window.location.href = "/"} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-xs text-white shadow-lg">
            Apply Locked Character to Studio Hub →
          </button>
        </div>

      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="bg-slate-900/95 border border-slate-700 rounded-full px-5 py-2 shadow-2xl flex items-center gap-6 pointer-events-auto">
          <Link href="/" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 text-xs">
            ←
          </Link>
          <span className="text-xs text-slate-400 font-medium">Vault Flow</span>
          <Link href="/studio/editor" className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold">
            →
          </Link>
        </div>
      </div>

    </div>
  );
              }
