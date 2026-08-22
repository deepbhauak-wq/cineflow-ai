"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Studio() {
  const [prompt, setPrompt] = useState("");

  const saveToVault = () => {
    if (!prompt.trim()) return;
    const existing = JSON.parse(localStorage.getItem("vault") || "[]");
    const newItem = {
      id: Date.now(),
      text: prompt,
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem("vault", JSON.stringify([newItem, ...existing]));
    setPrompt("");
    alert("Saved!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
        <h1 className="text-base font-bold text-cyan-400">STUDIO</h1>
        <Link
          href="/vault"
          className="text-xs bg-gray-800 px-3 py-1 rounded font-bold text-gray-200"
        >
          Vault 📂
        </Link>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your story..."
        rows={4}
        className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-xs text-white outline-none"
      />

      <button
        onClick={saveToVault}
        className="w-full py-3 bg-cyan-600 rounded-xl font-bold text-xs uppercase text-white shadow-lg"
      >
        Save Project
      </button>
    </div>
  );
}
