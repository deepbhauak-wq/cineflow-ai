"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ProCharacterVault() {
  const [activeTab, setActiveTab] = useState("bible");
  const [activeId, setActiveId] = useState("C01");

  const [characters, setCharacters] = useState([
    {
      id: "C01",
      name: "Jesus (Main)",
      role: "Central Figure / Teacher",
      gender: "Male",
      age: 33,
      locked: true,
      desc: "Calm spiritual authority, serene expression, radiant aura.",
      referenceType: "Front + Side + Full Body",
      refImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300",
      faceConsistency: "100% Locked",
      hairStyle: "Wavy Shoulder Length Brown",
      costume: "Ivory Linen Robe (Costume A)",
      costumeLock: true,
      headCovering: "White Shawl",
      footwear: "Leather Strap Sandals",
      accessories: "Wooden Staff",
      voiceId: "V01-DeepSerene",
      voiceLang: "Hindi (Pure Shuddh)",
      voiceType: "Calm & Resonant",
      speed: 1.0,
      pitch: 0.95,
      emotion: "Calm",
      emotionStrength: "Medium",
      currentAction: "Praying",
      relationship: "Teacher to Disciples",
      scenePosition: "Center (Middleground)",
      cameraAngle: "Medium Shot (Eye Level)",
      continuityScore: "100%"
    },
    {
      id: "C02",
      name: "Peter (Lead Disciple)",
      role: "Disciple / Protagonist",
      gender: "Male",
      age: 40,
      locked: true,
      desc: "Strong-willed, weathered fisherman, determined gaze.",
      referenceType: "Front Reference Loaded",
      refImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      faceConsistency: "100% Locked",
      hairStyle: "Short Curly Grey-Beard",
      costume: "Brown Woolen Tunic",
      costumeLock: true,
      headCovering: "None",
      footwear: "Worn Leather Sandals",
      accessories: "Fisherman Rope Belt",
      voiceId: "V02-DeepGravel",
      voiceLang: "Hindi (Pure Shuddh)",
      voiceType: "Bold & Earnest",
      speed: 1.05,
      pitch: 0.9,
      emotion: "Hopeful",
      emotionStrength: "High",
      currentAction: "Listening",
      relationship: "Disciple to Jesus",
      scenePosition: "Left (Foreground)",
      cameraAngle: "Over-the-Shoulder",
      continuityScore: "100%"
    }
  ]);

  const activeChar = characters.find(c => c.id === activeId) || characters[0];

  const updateActiveChar = (field, value) => {
    setCharacters(prev => prev.map(c => c.id === activeId ? { ...c, [field]: value } : c));
  };

  const handleAddNewCharacter = () => {
    const newId = "C0" + (characters.length + 1);
    const newChar = {
      id: newId,
      name: "New Character",
      role: "Supporting Role",
      gender: "Male",
      age: 28,
      locked: true,
      desc: "Custom created persona with strict visual locks.",
      referenceType: "Front Reference",
      refImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300",
      faceConsistency: "100% Locked",
      hairStyle: "Straight Dark Hair",
      costume: "Classic Robe",
      costumeLock: true,
      headCovering: "None",
      footwear: "Sandals",
      accessories: "None",
      voiceId: "V03-DynamicVoice",
      voiceLang: "Hindi (Pure Shuddh)",
      voiceType: "Balanced",
      speed: 1.0,
      pitch: 1.0,
      emotion: "Calm",
      emotionStrength: "Medium",
      currentAction: "Standing",
      relationship: "Friend",
      scenePosition: "Right (Middleground)",
      cameraAngle: "Full Shot",
      continuityScore: "100%"
    };
    setCharacters([...characters, newChar]);
    setActiveId(newId);
  };

  const handleDelete = (id) => {
    if (characters.length <= 1) {
      alert("At least 1 character must remain in the cast engine.");
      return;
    }
    const filtered = characters.filter(c => c.id !== id);
    setCharacters(filtered);
    setActiveId(filtered[0].id);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white p-4 font-sans pb-28 relative">
      
      {/* Top Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
            <span>👤</span> PRO CHARACTER CONTINUITY ENGINE
          </h1>
          <p className="text-[10px] text-slate-400">100% Strict Visual, Face, Voice, Action & Costume Persistence</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleAddNewCharacter} className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold shadow-md cursor-pointer">
            + Create Character
          </button>
          <Link href="/" className="px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold border border-slate-700">
            ← Home
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-4">
        
        {/* Active Cast Selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-cyan-400 uppercase">Active Cast Pipeline ({characters.length})</label>
            <span className="text-[10px] text-green-400 font-mono">🔒 Continuity Engine: Active</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {characters.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`rounded-2xl p-2.5 border cursor-pointer relative transition ${
                  activeId === c.id ? "bg-slate-800 border-cyan-400 ring-2 ring-cyan-500/30" : "bg-slate-950 border-slate-800 opacity-70"
                }`}
              >
                <div className="relative">
                  <img src={c.refImage} alt={c.name} className="w-full h-24 object-cover rounded-xl mb-2"/>
                  <span className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-cyan-300">
                    {c.locked ? "🔒 LOCKED" : "UNLOCKED"}
                  </span>
                </div>
                <p className="text-xs font-bold text-white truncate">{c.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{c.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Master Control Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {[
            { key: "bible", label: "🔥 Character Bible" },
            { key: "identity", label: "1. Identity & Ref" },
            { key: "costume", label: "2. Costume & Hair" },
            { key: "voice", label: "3. Voice & Tone" },
            { key: "action", label: "4. Action & Emotion" },
            { key: "scene", label: "5. Scene & Camera" }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                activeTab === tab.key ? "bg-cyan-500 text-black shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: CHARACTER BIBLE */}
        {activeTab === "bible" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-bold text-cyan-400 uppercase">Automated AI Character Bible</h3>
                <p className="text-[10px] text-slate-400">Fixed reference metadata passed to each scene render</p>
              </div>
              <button
                onClick={() => updateActiveChar("locked", !activeChar.locked)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                  activeChar.locked ? "bg-cyan-500/20 border border-cyan-500 text-cyan-300" : "bg-slate-800 text-slate-400"
                }`}
              >
                {activeChar.locked ? "🔒 CHARACTER IS 100% LOCKED" : "🔓 UNLOCKED"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Character ID</span>
                <span className="text-xs font-mono font-bold text-cyan-300">{activeChar.id}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Voice Model</span>
                <span className="text-xs font-mono font-bold text-purple-300">{activeChar.voiceId}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Costume ID</span>
                <span className="text-xs font-mono font-bold text-yellow-300">{activeChar.costume}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Continuity Lock</span>
                <span className="text-xs font-mono font-bold text-green-400">{activeChar.continuityScore} Guaranteed</span>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
              [BIBLE_LOCK_PAYLOAD]: Character ID ({activeChar.id}) • Face ({activeChar.faceConsistency}) • Hair ({activeChar.hairStyle}) • Outfit ({activeChar.costume}) • Voice ({activeChar.voiceId}) • Age ({activeChar.age}y) • Relationship ({activeChar.relationship})
            </div>
          </div>
        )}

        {/* TAB 2: IDENTITY & REFERENCES */}
        {activeTab === "identity" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Character Name & Tag</label>
                <input
                  type="text"
                  value={activeChar.name}
                  onChange={(e) => updateActiveChar("name", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Role / Persona</label>
                <input
                  type="text"
                  value={activeChar.role}
                  onChange={(e) => updateActiveChar("role", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Character Description & Prompt Anchor</label>
              <textarea
                rows={2}
                value={activeChar.desc}
                onChange={(e) => updateActiveChar("desc", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="border-t border-slate-800 pt-3">
              <label className="text-xs font-semibold text-cyan-400 uppercase block mb-2">3. Reference Upload / Angles</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {["Front Reference", "Side Reference", "Full-body", "Expressions"].map(ref => (
                  <button
                    key={ref}
                    onClick={() => updateActiveChar("referenceType", ref)}
                    className={`py-1.5 px-2 rounded-xl border text-[11px] font-semibold cursor-pointer ${
                      activeChar.referenceType === ref ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    {ref}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COSTUME & HAIR */}
        {activeTab === "costume" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <label className="text-xs font-semibold text-purple-400 uppercase">Wardrobe & Hair Continuity</label>
              <span className="text-[10px] text-green-400">🔒 Outfit Locked Across All Scenes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Hairstyle & Beard</label>
                <input
                  type="text"
                  value={activeChar.hairStyle}
                  onChange={(e) => updateActiveChar("hairStyle", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Costume / Robe Preset</label>
                <input
                  type="text"
                  value={activeChar.costume}
                  onChange={(e) => updateActiveChar("costume", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Head Covering</label>
                <input
                  type="text"
                  value={activeChar.headCovering}
                  onChange={(e) => updateActiveChar("headCovering", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Footwear</label>
                <input
                  type="text"
                  value={activeChar.footwear}
                  onChange={(e) => updateActiveChar("footwear", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Accessories</label>
                <input
                  type="text"
                  value={activeChar.accessories}
                  onChange={(e) => updateActiveChar("accessories", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VOICE & EMOTION */}
        {activeTab === "voice" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <label className="text-xs font-semibold text-cyan-400 uppercase">Voice ID & Lip-Sync Consistency</label>
              <span className="text-[10px] text-purple-300">{activeChar.voiceId} (Locked)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Voice Profile Model</label>
                <select
                  value={activeChar.voiceType}
                  onChange={(e) => updateActiveChar("voiceType", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option>Calm & Resonant (Jesus Profile)</option>
                  <option>Bold & Earnest (Peter Profile)</option>
                  <option>Gentle Compassionate (Mary Profile)</option>
                  <option>Cinematic Deep Narrator</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Language</label>
                <input
                  type="text"
                  value={activeChar.voiceLang}
                  onChange={(e) => updateActiveChar("voiceLang", e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Speed Multiplier ({activeChar.speed}x)</label>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  value={activeChar.speed}
                  onChange={(e) => updateActiveChar("speed", parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Pitch Multiplier ({activeChar.pitch})</label>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  value={activeChar.pitch}
                  onChange={(e) => updateActiveChar("pitch", parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ACTION & EMOTION */}
        {activeTab === "action" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
            <div>
              <label className="text-xs font-semibold text-cyan-400 uppercase block mb-2">4. Character Actions</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {["Walking", "Running", "Sitting", "Standing", "Talking", "Praying", "Working", "Reacting", "Entering", "Leaving"].map(act => (
                  <button
                    key={act}
                    onClick={() => updateActiveChar("currentAction", act)}
                    className={`py-1.5 rounded-xl border text-[11px] font-semibold cursor-pointer ${
                      activeChar.currentAction === act ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-red-400 uppercase">5. Emotion & Strength ({
