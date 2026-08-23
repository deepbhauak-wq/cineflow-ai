"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CharacterVault() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "Aarav (Lead)", role: "Hero / Protagonist", gender: "Male", age: 24, top: "Ivory Silk Kurta", bottom: "Slim Denim", voice: "Deep Calm Hindi", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
    { id: 2, name: "Sunita (Mother)", role: "Supporting Lead", gender: "Female", age: 50, top: "Red Banarasi Saree", bottom: "Matching Petticoat", voice: "Warm Mature Tone", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300" },
    { id: 3, name: "Rohan (Friend)", role: "Sidekick / Comic", gender: "Male", age: 22, top: "Casual Hoodie", bottom: "Cargo Pants", voice: "Energetic Youth", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300" }
  ]);

  const [activeId, setActiveId] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newVoice, setNewVoice] = useState("Hindi (Pure Shuddh)");

  const activeChar = characters.find(c => c.id === activeId) || characters[0];

  const handleDelete = (id) => {
    if (characters.length <= 1) {
      alert("At least one character is required in the cast pipeline.");
      return;
    }
    const updated = characters.filter(c => c.id !== id);
    setCharacters(updated);
    setActiveId(updated[0].id);
  };

  const handleAddCustomCharacter = (e) => {
    e.preventDefault();
    if (!newName) return;
    const newChar = {
      id: Date.now(),
      name: newName,
      role: newRole || "Custom Character",
      gender: "Neutral",
      age: 25,
      top: "Custom Outfit",
      bottom: "Custom Pants",
      voice: newVoice,
      img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300"
    };
    setCharacters([...characters, newChar]);
    setActiveId(newChar.id);
    setNewName("");
    setNewRole("");
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight">Multi-Character Cast Studio</h1>
          <p className="text-[10px] text-slate-400">Manage characters, voiceovers & wardrobe pipeline</p>
        </div>
        <Link href="/" className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-semibold border border-slate-700">
          ← Studio Hub
        </Link>
      </div>

      {/* Add Custom Character Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/9oz-50 flex items-center justify-center p-4 z-50 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-cyan-400 uppercase">➕ Add Custom Animated Character</h3>
              <button onClick={() => setShowAddModal(false)} className="text-xs text-slate-400">✕</button>
            </div>
            <form onSubmit={handleAddCustomCharacter} className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Character Name</label>
                <input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Kabir (Lead)" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Role / Persona</label>
                <input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="e.g. Mentor / Villain" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"/>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Assign Voiceover Profile</label>
                <select value={newVoice} onChange={(e) => setNewVoice(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                  <option>Hindi (Pure Shuddh - Deep Calm)</option>
                  <option>English (Cinematic Narrator)</option>
                  <option>Spanish (Dynamic Expressive)</option>
                  <option>Arabic (Rich Tone)</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs cursor-pointer">Save to Character Folder 📁</button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Active Cast Carousel & Add Button */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-400 uppercase">Active Story Cast ({characters.length} Characters)</label>
            <button onClick={() => setShowAddModal(true)} className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs cursor-pointer shadow-md">
              + Add Character 📁
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {characters.map((c) => (
              <div key={c.id} onClick={() => setActiveId(c.id)} className={`rounded-2xl p-2.5 border cursor-pointer relative group transition ${activeId === c.id ? "bg-slate-800 border-cyan-400 ring-2 ring-cyan-500/30" : "bg-slate-950 border-slate-800 opacity-70"}`}>
                <img src={c.img} alt={c.name} className="w-full h-24 object-cover rounded-xl mb-2"/>
                <p className="text-xs font-bold text-white truncate">{c.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{c.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Character Inspector & Delete Option */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xs font-bold text-cyan-400 uppercase">Inspector: {activeChar.name}</h2>
              <p className="text-[10px] text-slate-400">Configure Identity, Voiceover & Wardrobe</p>
            </div>
            <button onClick={() => handleDelete(activeChar.id)} className="px-3 py-1.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 text-xs font-bold cursor-pointer transition">
              🗑️ Delete Character
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Assigned Voiceover</span>
              <p className="text-xs font-bold text-cyan-300">🎙️ {activeChar.voice}</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Wardrobe Setup</span>
              <p className="text-xs font-bold text-purple-300">👕 {activeChar.top} / {activeChar.bottom}</p>
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
