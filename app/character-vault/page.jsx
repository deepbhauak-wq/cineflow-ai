"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function CharacterVault() {
  // Multi-character list support (Default 3 characters for a story)
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "Aarav (Lead)",
      gender: "Male",
      age: 24,
      role: "Main Protagonist",
      top: "Ivory Silk Kurta / Black Shirt",
      bottom: "Slim Denim / Dhoti",
      footwear: "Leather Sandals",
      accessories: "Smartwatch, Sacred Kada",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Sunita (Mother)",
      gender: "Female",
      age: 50,
      role: "Wisdom Elder / Mentor",
      top: "Red Banarasi Saree",
      bottom: "Matching Petticoat",
      footwear: "Traditional Mojari",
      accessories: "Gold Bangles, Eyeglasses",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Rohan (Friend)",
      gender: "Male",
      age: 22,
      role: "Supporting Youth",
      top: "Casual Hoodie / Tee",
      bottom: "Cargo Pants",
      footwear: "Sneakers",
      accessories: "Headphones, Watch",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=60"
    }
  ]);

  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const activeChar = characters[activeCharIndex];

  const updateActiveChar = (field, value) => {
    setCharacters(prev => {
      const updated = [...prev];
      updated[activeCharIndex] = { ...updated[activeCharIndex], [field]: value };
      return updated;
    });
  };

  const addNewCharacter = () => {
    const newId = characters.length + 1;
    const newChar = {
      id: newId,
      name: `Character ${newId}`,
      gender: "Male",
      age: 25,
      role: "Supporting Cast",
      top: "Classic Shirt",
      bottom: "Trousers",
      footwear: "Shoes",
      accessories: "Watch",
      image: null
    };
    setCharacters([...characters, newChar]);
    setActiveCharIndex(characters.length);
  };

  const handleVaultPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateActiveChar("image", URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 sm:p-6 md:p-8 font-sans pb-28">
      
      {/* Top Header (Without Lock Sign) */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <h1 className="text-base sm:text-lg font-bold">Multi-Character Cast Studio</h1>
          <p className="text-[11px] text-slate-400">Manage 3+ characters for your story pipeline</p>
        </div>
        <Link href="/" className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
          ← Studio Hub
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Saved Cast Gallery Overview */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
              Active Story Cast ({characters.length} Characters)
            </label>
            <button onClick={addNewCharacter} className="px-2.5 py-1 rounded-lg bg-cyan-500 text-black font-bold text-[11px] hover:bg-cyan-400">
              + Add Character
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {characters.map((char, idx) => (
              <div
                key={char.id}
                onClick={() => setActiveCharIndex(idx)}
                className={`relative rounded-xl overflow-hidden border p-1.5 cursor-pointer transition flex flex-col items-center ${
                  activeCharIndex === idx ? "border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/20" : "border-slate-800 bg-slate-950"
                }`}
              >
                {char.image ? (
                  <img src={char.image} alt={char.name} className="w-full h-16 object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-16 rounded-lg bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                    No Photo
                  </div>
                )}
                <p className="text-[11px] font-semibold text-white mt-1 truncate w-full text-center">{char.name}</p>
                <span className="text-[9px] text-slate-400 truncate">{char.age} Yrs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Character Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {characters.map((char, idx) => (
            <button
              key={char.id}
              onClick={() => setActiveCharIndex(idx)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition ${
                activeCharIndex === idx ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              Slot {idx + 1}: {char.name}
            </button>
          ))}
        </div>

        {/* 1. Core DNA */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            1. Character Identity ({activeChar.name})
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Character Name & Role</label>
              <input type="text" value={activeChar.name} onChange={(e) => updateActiveChar("name", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Gender / Type</label>
              <select value={activeChar.gender} onChange={(e) => updateActiveChar("gender", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Elder">Elder / Parent</option>
                <option value="Youth">Youth / Teen</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Age ({activeChar.age} Yrs)</label>
              <input type="range" min="5" max="80" value={activeChar.age} onChange={(e) => updateActiveChar("age", e.target.value)} className="w-full accent-cyan-500 mt-2"/>
            </div>
          </div>
        </div>

        {/* 2. Wardrobe */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">2. Wardrobe Details</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Top Wear</label>
              <input type="text" value={activeChar.top} onChange={(e) => updateActiveChar("top", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Bottom Wear</label>
              <input type="text" value={activeChar.bottom} onChange={(e) => updateActiveChar("bottom", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Footwear</label>
              <input type="text" value={activeChar.footwear} onChange={(e) => updateActiveChar("footwear", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Accessories</label>
              <input type="text" value={activeChar.accessories} onChange={(e) => updateActiveChar("accessories", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"/>
            </div>
          </div>
        </div>

        {/* 3. Reference Photo & Save */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">3. Character Reference Photo</label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-cyan-300 cursor-pointer flex items-center justify-center gap-2">
              <span>🖼️ Upload {activeChar.name}&apos;s Photo</span>
              <input type="file" accept="image/*" onChange={handleVaultPhotoUpload} className="hidden" />
            </label>
            {activeChar.image && (
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 p-2 rounded-xl w-full sm:w-auto">
                <img src={activeChar.image} alt={activeChar.name} className="w-12 h-12 rounded-lg object-cover border border-cyan-500/40" />
                <div className="text-xs">
                  <p className="font-semibold text-cyan-300">{activeChar.name} Reference Loaded ✓</p>
                  <button onClick={() => updateActiveChar("image", null)} className="text-[10px] text-red-400 hover:underline">Clear Photo</button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-[11px] font-mono text-cyan-300">
            {`[CAST_PAYLOAD: ${characters.map(c => `(${c.name}, ${c.gender}, ${c.age}y, ${c.top}, ${c.bottom})`).join(" + ")}]`}
          </div>

          <button onClick={() => window.location.href = "/"} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-xs text-white shadow-lg">
            Save All {characters.length} Characters to Story Project →
          </button>
        </div>

      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-4 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="bg-slate-900/95 border border-slate-700 rounded-full px-5 py-2 shadow-2xl flex items-center gap-6 pointer-events-auto">
          <Link href="/" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 text-xs">
            ←
          </Link>
          <span className="text-xs text-slate-400 font-medium">Cast Flow</span>
          <Link href="/studio/editor" className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-xs font-bold">
            →
          </Link>
        </div>
      </div>

    </div>
  );
}
