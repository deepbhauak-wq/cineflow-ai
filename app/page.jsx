
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Studio() {
  const [prompt, setPrompt] = useState("");

  const save = () => {
    if (!prompt) return;
    const items = JSON.parse(localStorage.getItem("vault") || "[]");
    localStorage.setItem("vault", JSON.stringify([{ id: Date.now(), text: prompt }, ...items]));
    setPrompt("");
    alert("Saved!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">STUDIO</h1>
        <Link href="/vault" className="bg-blue-600 px-3 py-1 rounded">Vault</Link>
      </div>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full h-32 bg-gray-900 p-2 text-sm" placeholder="Write story..." />
      <button onClick={save} className="w-full mt-4 py-2 bg-green-600 font-bold">SAVE</button>
    </div>
  );
}
