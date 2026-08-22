"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Studio() {
  const [prompt, setPrompt] = useState("");

  const saveToVault = () => {
    if (!prompt) return;
    const existing = JSON.parse(localStorage.getItem("my_vault") || "[]");
    const newEntry = { id: Date.now(), text: prompt, date: new Date().toLocaleDateString() };
    localStorage.setItem("my_vault", JSON.stringify([newEntry, ...existing]));
    setPrompt("");
    alert("✅ Project Saved to Vault!");
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-6 max-w-lg mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-black text-cyan-400">STUDIO</h1>
        <Link href="/vault" className="text-xs bg-slate-800 px-4 py-2 rounded-lg font-bold">View Vault 📂</Link>
      </div>
      <textarea 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Write your story here..." 
        className="w-full h-40 bg-[#0b1222] p-4 rounded-xl border border-slate-700 outline-none text-sm"
      />
      <button onClick={saveToVault} className="w-full py-3 bg-cyan-600 rounded-xl font-bold uppercase text-xs">Save Project</button>
    </div>
  );
}
