"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CharacterVault() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "Aarav (Lead)", role: "Hero / Protagonist", gender: "Male", top: "Ivory Silk Kurta", bottom: "Slim Denim", voice: "Deep Calm Hindi (Male)", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
    { id: 2, name: "Sunita (Mother)", role: "Supporting Lead", gender: "Female", top: "Red Banarasi Saree", bottom: "Matching Petticoat", voice: "Warm Mature Tone (Female)", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300" },
    { id: 3, name: "Rohan (Friend)", role: "Comic Sidekick", gender: "Male", top: "Casual Hoodie", bottom: "Cargo Pants", voice: "Energetic Youth (Male)", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300" }
  ]);

  const [activeId, setActiveId] = useState(1);
  const [showFolderModal, setShowFolderModal] = useState(false);

  // Pre-made Character Library Folder (Cartoon, Pixar, Real PNGs)
  const characterFolder = [
    { name: "Pixar Hero Boy", type: "Cartoon / 3D Animation", gender: "Male", voice: "Energetic Youth (Male)", top: "Blue Denim Jacket", bottom: "Joggers", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300" },
    { name: "Disney Princess", type: "Animation / Fantasy", gender: "Female", voice: "Soft Melodic (Female)", top: "Royal Gown", bottom: "Silk Skirt", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=300" },
    { name: "Anime Warrior", type: "Anime Style", gender: "Male", voice: "Aggressive Hero (Male)", top: "Black Combat Vest", bottom: "Tactical Pants", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300" },
    { name: "Cyberpunk Detective", type: "Realistic Cinematic", gender: "Male", voice: "Deep Calm Hindi (Male)", top: "Leather Trench Coat", bottom: "Dark Trousers", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300" },
    { name: "Elegant Lady", type: "Realistic Cinematic", gender: "Female", voice: "Warm Mature Tone (Female)", top: "Designer Blazer", bottom: "Formal Pants", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" }
  ];

  const activeChar = characters.find(c => c.id === activeId) || characters[0];

  const handleDelete = (id) => {
    if (characters.length <= 1) {
      alert("At least one character must remain in the active pipeline.");
      return;
    }
    const updated = characters.filter(c => c.id !== id);
    setCharacters(updated);
    setActiveId(updated[0].id);
  };

  const handleSelectFromFolder = (item) => {
    const newChar = {
      id: Date.now(),
      name: item.name,
      role: item.type,
      gender: item.gender,
      top: item.top,
      bottom: item.bottom,
      voice: item.voice,
      img: item.img
    };
    setCharacters([...characters, newChar]);
    setActiveId(newChar.id);
    setShowFolderModal(false);
  };

  const updateActiveChar = (field, value) => {
    setCharacters(characters.map(c => c.id === activeId ? { ...c, [field]: value } : c));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight">Multi-Character Cast Studio & Folder</h1>
          <p className="text-[10px] text-slate-400">Select, customize, assign voices & manage wardrobe</p>
        </div>
        <Link href="/" className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-semibold border border-slate-700">
          ← Studio Hub
        </Link>
      </div>

      {/* CHARACTER FOLDER MODAL (Cartoon, Pixar, Real PNG Library) */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-bold text-cyan-400 uppercase">📁 Master Character Folder (Cartoon, Pixar, Real PNGs)</h3>
                <p className="text-[10px] text-slate-400">Click any character to add to your story pipeline</p>
              </div>
              <button onClick={() => setShowFolderModal(false)} className="text-xs text-slate-400 hover:text-white">✕ Close</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
              {characterFolder.map((item, idx) => (
                <div key={idx} onClick={() => handleSelectFromFolder(item)} className="bg-slate-950 border border-slate-800 hover:border-cyan-500 rounded-2xl p-2.5 cursor-pointer group transition">
                  <img src={item.img} alt={item.name} className="w-full h-28 object-cover rounded-xl mb-2 group-hover:scale-105 transition"/>
                  <p className="text-xs font-bold text-white truncate">{item.name}</p>
                  <p className="text-[9px] text-cyan-300">{item.type}</p>
                  <p className="text-[9px] text-slate-400">🎙️ {item.voice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Active Story Cast Pipeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-400 uppercase">Active Story Cast ({characters.length} Characters)</label>
            <button onClick={() => setShowFolderModal(true)} className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs cursor-pointer shadow-lg shadow-cyan-500/20">
              📁 Open Character Folder (+ Add)
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {characters.map((c) => (
              <div key={c.id} onClick={() => setActiveId(c.id)} className={`rounded-2xl p-2.5 border cursor-pointer relative transition ${activeId === c.id ? "bg-slate-800 border-cyan-400 ring-2 ring-cyan-500/30" : "bg-slate-950 border-slate-800 opacity-70 hover:opacity-100"}`}>
                <img src={c.img} alt={c.name} className="w-full h-24 object-cover rounded-xl mb-2"/>
                <p className="text-xs font-bold text-white truncate">{c.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{c.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Character Customizer & Delete Option */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xs font-bold text-cyan-400 uppercase">Inspector: {activeChar.name}</h2>
              <p className="text-[10px] text-slate-400">Customize Voiceover, Wardrobe & Settings</p>
            </div>
            <button onClick={() => handleDelete(activeChar.id)} className="px-3 py-1.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 text-xs font-bold cursor-pointer transition">
              🗑️ Delete Character
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Voiceover Selection */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-1.5">
              <label className="text-[10px] text-cyan-400 uppercase font-semibold">🎙️ Voiceover Profile (Male / Female)</label>
              <select value={activeChar.voice} onChange={(e) => updateActiveChar("voice", e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white">
                <option>Deep Calm Hindi (Male)</option>
                <option>Warm Mature Tone (Female)</option>
                <option>Energetic Youth (Male)</option>
                <option>Soft Melodic (Female)</option>
                <option>Aggressive Hero (Male)</option>
                <option>Cinematic Narrator (Neutral)</option>
              </select>
            </div>

            {/* Wardrobe Setup */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-1.5">
              <label className="text-[10px] text-purple-400 uppercase font-semibold">👕 Wardrobe & Outfit Settings</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={activeChar.top} onChange={(e) => updateActiveChar("top", e.target.value)} placeholder="Top wear" className="bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white"/>
                <input type="text" value={activeChar.bottom} onChange={(e) => updateActiveChar("bottom", e.target.value)} placeholder="Bottom wear" className="bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white"/>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Right Side Dock */}
      <div className="fixed bottom-4 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1.5 rounded-full shadow-2xl backdrop-blur-lg">
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 flex items-center justify-center text-sm border border-slate-700 shadow-md" title="Home">🏠</Link>
        <Link href="/character-vault" className="w-9 h-9 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold shadow-lg shadow-cyan-500/30" title="Vault">👤</Link>
        <Link href="/studio/editor" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-purple-400 flex items-center justify-center text-sm border border-slate-700 shadow-md" title="Editor">🎬</Link>
      </div>
    </div>
  );
}
