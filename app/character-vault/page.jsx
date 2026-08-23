"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProCharacterVault() {
  const [activeTab, setActiveTab] = useState("bible");
  const [activeId, setActiveId] = useState("C01");

  const [characters, setCharacters] = useState([
    {
      id: "C01", name: "AUTO Jesus (Main)", role: "AUTO Protagonist", age: 33, locked: true,
      desc: "AUTO Calm aura & strict face lock.", refType: "AUTO Full Body",
      refImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300",
      face: "AUTO 100% Locked", hair: "AUTO Wavy", costume: "AUTO Ivory Robe",
      head: "AUTO Shawl", footwear: "AUTO Sandals", acc: "AUTO Staff",
      voiceId: "AUTO-V01", voiceLang: "100% Shuddh Hindi", voiceType: "AUTO Deep Calm",
      speed: 1.0, pitch: 0.95, emotion: "AUTO Calm", emoStr: "AUTO Medium",
      action: "AUTO Praying", relation: "AUTO Teacher", pos: "AUTO Center", cam: "AUTO Medium Shot",
      score: "AUTO 100%"
    }
  ]);

  const activeChar = characters.find(c => c.id === activeId) || characters[0];

  const updateChar = (k, v) => {
    setCharacters(prev => prev.map(c => c.id === activeId ? { ...c, [k]: v } : c));
  };

  const handleAddAuto = () => {
    const newId = "C0" + (characters.length + 1);
    const n = {
      id: newId, name: "AUTO Persona", role: "AUTO Supporting", age: 28, locked: true,
      desc: "AUTO Visual Continuity.", refType: "AUTO Front Ref",
      refImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300",
      face: "AUTO Locked", hair: "AUTO Standard", costume: "AUTO Robe",
      head: "AUTO None", footwear: "AUTO Sandals", acc: "AUTO None",
      voiceId: "AUTO-V02", voiceLang: "100% Shuddh Hindi", voiceType: "AUTO Balanced",
      speed: 1.0, pitch: 1.0, emotion: "AUTO Calm", emoStr: "AUTO Medium",
      action: "AUTO Standing", relation: "AUTO Friend", pos: "AUTO Right", cam: "AUTO Full Shot",
      score: "AUTO 100%"
    };
    setCharacters([...characters, n]);
    setActiveId(newId);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-sm font-bold text-cyan-400">👤 AUTO CHARACTER CONTINUITY ENGINE</h1>
          <p className="text-[10px] text-slate-400">100% Automatic Face, Voice & Outfit Persistence</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleAddAuto} className="px-3 py-1 rounded-xl bg-cyan-500 text-black text-xs font-bold shadow cursor-pointer">+ AUTO Add</button>
          <Link href="/" className="px-3 py-1 rounded-xl bg-slate-800 text-xs border border-slate-700">← Home</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-cyan-400 uppercase">AUTO Active Cast ({characters.length})</span>
            <span className="text-[10px] text-green-400">⚡ AUTO-LOCKED</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {characters.map(c => (
              <div key={c.id} onClick={() => setActiveId(c.id)} className={`p-2 rounded-xl border cursor-pointer ${activeId === c.id ? "bg-slate-800 border-cyan-400" : "bg-slate-950 border-slate-800 opacity-70"}`}>
                <img src={c.refImage} alt="" className="w-full h-20 object-cover rounded-lg mb-1"/>
                <p className="text-xs font-bold truncate">{c.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{c.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { k: "bible", l: "🔥 AUTO Bible" },
            { k: "identity", l: "1. AUTO Identity" },
            { k: "costume", l: "2. AUTO Wardrobe" },
            { k: "voice", l: "3. AUTO Voice" }
          ].map(t => (
            <button key={t.k} onClick={() => setActiveTab(t.k)} className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTab === t.k ? "bg-cyan-500 text-black" : "text-slate-400"}`}>{t.l}</button>
          ))}
        </div>

        {activeTab === "bible" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-cyan-400">AUTO Character Bible Payload</span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500">⚡ AUTO 100% LOCKED</span>
            </div>
            <p className="text-[11px] font-mono bg-slate-950 p-2.5 rounded-lg text-cyan-300">[AUTO_BIBLE]: {activeChar.id} • {activeChar.name} • 100% Shuddh Hindi Voice • Auto Continuity Active</p>
          </div>
        )}

        {activeTab === "identity" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <input type="text" value={activeChar.name} readOnly className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            <p className="text-[10px] text-cyan-400">⚡ Auto-managed by CineFlow Intelligence</p>
          </div>
        )}

        {activeTab === "costume" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <input type="text" value={activeChar.costume} readOnly className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            <p className="text-[10px] text-purple-400">⚡ Auto-synced across historical scene timeline</p>
          </div>
        )}

        {activeTab === "voice" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <input type="text" value={activeChar.voiceId + " (100% Shuddh Hindi)"} readOnly className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            <p className="text-[10px] text-green-400">⚡ Auto Ducking (-22dB) & 10-13 Words Pacing Locked</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1.5 rounded-full shadow-2xl">
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-sm">🏠</Link>
        <Link href="/character-vault" className="w-9 h-9 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold">👤</Link>
        <Link href="/studio/editor" className="w-9 h-9 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-sm">🎬</Link>
      </div>
    </div>
  );
      }
