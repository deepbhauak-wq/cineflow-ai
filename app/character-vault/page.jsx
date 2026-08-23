"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProCharacterVault() {
  const [activeTab, setActiveTab] = useState("bible");
  const [activeId, setActiveId] = useState("C01");

  const [characters, setCharacters] = useState([
    {
      id: "C01", name: "Jesus (Main)", role: "Central Figure", age: 33, locked: true,
      desc: "Calm spiritual authority, serene aura.", refType: "Front + Full Body",
      refImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300",
      face: "100% Locked", hair: "Wavy Shoulder Length", costume: "Ivory Linen Robe",
      head: "White Shawl", footwear: "Sandals", acc: "Staff",
      voiceId: "V01-DeepSerene", voiceLang: "Hindi (Pure Shuddh)", voiceType: "Calm & Resonant",
      speed: 1.0, pitch: 0.95, emotion: "Calm", emoStr: "Medium",
      action: "Praying", relation: "Teacher", pos: "Center (MG)", cam: "Medium Shot",
      score: "100%"
    }
  ]);

  const activeChar = characters.find(c => c.id === activeId) || characters[0];

  const updateChar = (k, v) => {
    setCharacters(prev => prev.map(c => c.id === activeId ? { ...c, [k]: v } : c));
  };

  const handleAdd = () => {
    const newId = "C0" + (characters.length + 1);
    const n = {
      id: newId, name: "New Persona", role: "Supporting", age: 28, locked: true,
      desc: "Strict visual continuity.", refType: "AUTO Front Ref",
      refImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300",
      face: "AUTO Locked", hair: "AUTO Standard", costume: "AUTO Robe",
      head: "AUTO None", footwear: "AUTO Sandals", acc: "AUTO None",
      voiceId: "AUTO-V02", voiceLang: "100% Shuddh Hindi", voiceType: "AUTO Balanced",
      speed: 1.0, pitch: 1.0, emotion: "AUTO Calm", emoStr: "AUTO Medium",
      action: "AUTO Standing", relation: "AUTO Friend", pos: "AUTO Right", cam: "AUTO Full Shot",
      score: "100%"
    };
    setCharacters([...characters, n]);
    setActiveId(newId);
  };

  const handleDelete = (id) => {
    if (characters.length <= 1) return;
    const f = characters.filter(c => c.id !== id);
    setCharacters(f);
    setActiveId(f[0].id);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-sm font-bold text-cyan-400">👤 PRO CHARACTER CONTINUITY ENGINE</h1>
          <p className="text-[10px] text-slate-400">Manual Controls + ⚡ AUTO Intelligence Mode</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleAdd} className="px-3 py-1 rounded-xl bg-cyan-500 text-black text-xs font-bold shadow cursor-pointer">+ Add</button>
          <Link href="/" className="px-3 py-1 rounded-xl bg-slate-800 text-xs border border-slate-700">← Home</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-cyan-400 uppercase">Active Cast ({characters.length})</span>
            <span className="text-[10px] text-green-400">🔒 Engine Active</span>
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

        {/* Navigation Tabs with AUTO option */}
        <div className="flex gap-1.5 overflow-x-auto bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { k: "bible", l: "🔥 AUTO Bible" },
            { k: "identity", l: "1. Identity" },
            { k: "costume", l: "2. Wardrobe" },
            { k: "voice", l: "3. Voice" },
            { k: "action", l: "4. Actions" },
            { k: "scene", l: "5. Camera" }
          ].map(t => (
            <button key={t.k} onClick={() => setActiveTab(t.k)} className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTab === t.k ? "bg-cyan-500 text-black" : "text-slate-400"}`}>{t.l}</button>
          ))}
        </div>

        {activeTab === "bible" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-cyan-400">Character Bible Payload</span>
              <button onClick={() => updateChar("locked", !activeChar.locked)} className={`px-2.5 py-1 rounded-lg text-xs font-bold ${activeChar.locked ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500" : "bg-slate-800 text-slate-400"}`}>{activeChar.locked ? "🔒 100% LOCKED" : "UNLOCKED"}</button>
            </div>
            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-300">Quick AUTO Optimization Mode</span>
              <button onClick={() => updateChar("score", "AUTO 100%")} className="px-3 py-1 rounded-lg bg-cyan-500 text-black text-xs font-bold">⚡ AUTO</button>
            </div>
            <p className="text-[11px] font-mono bg-slate-950 p-2.5 rounded-lg text-slate-300">[BIBLE_LOCK]: {activeChar.id} • {activeChar.name}</p>
          </div>
        )}

        {activeTab === "identity" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center"><span className="text-xs font-semibold text-cyan-400">1. Character Identity</span><button onClick={() => updateChar("name", "AUTO Hero")} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold">⚡ AUTO</button></div>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={activeChar.name} onChange={e => updateChar("name", e.target.value)} className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
              <input type="text" value={activeChar.role} onChange={e => updateChar("role", e.target.value)} className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            </div>
          </div>
        )}

        {activeTab === "costume" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center"><span className="text-xs font-semibold text-purple-400">2. Wardrobe & Hair</span><button onClick={() => updateChar("costume", "AUTO Historical Robe")} className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-bold">⚡ AUTO</button></div>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" value={activeChar.hair} onChange={e => updateChar("hair", e.target.value)} placeholder="Hairstyle" className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
              <input type="text" value={activeChar.costume} onChange={e => updateChar("costume", e.target.value)} placeholder="Outfit" className="bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"/>
            </div>
          </div>
        )}

        {activeTab === "voice" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center"><span className="text-xs font-semibold text-cyan-400">3. Voice & Tone (100% Shuddh Hindi)</span><button onClick={() => updateChar("voiceType", "AUTO Deep Calm")} className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold">⚡ AUTO</button></div>
            <select value={activeChar.voiceType} onChange={e => updateChar("voiceType", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white">
              <option>AUTO (Deep Calm Shuddh Hindi)</option>
              <option>Calm & Resonant (Male)</option>
              <option>Bold & Earnest (Male)</option>
              <option>Warm Mature Tone (Female)</option>
            </select>
          </div>
        )}

        {activeTab === "action" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center"><span className="text-xs font-semibold text-red-400">4. Actions & Emotions</span><button onClick={() => updateChar("action", "AUTO Praying")} className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 text-xs font-bold">⚡ AUTO</button></div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {["Walking", "Running", "Sitting", "Standing", "Talking", "Praying"].map(a => (
                <button key={a} onClick={() => updateChar("action", a)} className={`py-1.5 rounded-lg border text-xs ${activeChar.action === a ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{a}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "scene" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center"><span className="text-xs font-semibold text-yellow-400">5. Camera & Relationships</span><button onClick={() => updateChar("cam", "AUTO Medium Shot")} className="px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-300 text-xs font-bold">⚡ AUTO</button></div>
            <div className="grid grid-cols-3 gap-2">
              {["Close-up", "Medium Shot", "Full Shot"].map(c => (
                <button key={c} onClick={() => updateChar("cam", c)} className={`py-1.5 rounded-lg border text-xs ${activeChar.cam === c ? "bg-yellow-500/20 border-yellow-500 text-yellow-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{c}</button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button onClick={() => handleDelete(activeChar.id)} className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs cursor-pointer">🗑️ Delete Character</button>
        </div>
      </div>

      <div className="fixed bottom-4 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1.5 rounded-full shadow-2xl">
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-sm">🏠</Link>
        <Link href="/character-vault" className="w-9 h-9 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold">👤</Link>
        <Link href="/studio/editor" className="w-9 h-9 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-sm">🎬</Link>
      </div>
    </div>
  );
}
