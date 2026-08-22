"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Vault() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("my_vault");
    if (saved) setData(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-6 max-w-lg mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-black text-purple-400">PROJECT VAULT</h1>
        <Link href="/" className="text-xs bg-slate-800 px-4 py-2 rounded-lg font-bold">← Back to Studio</Link>
      </div>
      
      <div className="space-y-4">
        {data.length === 0 && <p className="text-slate-500 text-sm">No projects saved yet.</p>}
        {data.map((item) => (
          <div key={item.id} className="bg-[#0b1222] p-4 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-300">{item.text}</p>
            <p className="text-[10px] text-slate-500 mt-2">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

