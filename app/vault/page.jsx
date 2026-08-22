"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function VaultPage() {
  const [mounted, setMounted] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setMounted(true);
    try {
      const data = JSON.parse(localStorage.getItem("cineflow_vault_data") || "[]");
      setList(data);
    } catch (e) {
      setList([]);
    }
  }, []);

  const clearAll = () => {
    localStorage.removeItem("cineflow_vault_data");
    setList([]);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
        <h1 className="text-sm font-bold text-purple-400 uppercase">Vault Library</h1>
        <Link href="/" className="text-xs bg-gray-800 px-3 py-1 rounded font-bold text-gray-200">
          Studio
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl text-center space-y-2">
          <p className="text-xs text-gray-400">No saved projects found.</p>
          <Link href="/" className="inline-block py-1 px-3 bg-cyan-600 rounded text-xs font-bold text-white">
            Create in Studio
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <button onClick={clearAll} className="w-full py-1 bg-red-950 border border-red-800 text-red-400 text-xs font-bold rounded">
            Clear All Vault
          </button>
          {list.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 p-3 rounded-xl space-y-1">
              <h2 className="text-xs font-bold text-cyan-400">{item.name || "Project"}</h2>
              <p className="text-[10px] text-gray-400">{item.scenes?.length || 0} Scenes Saved</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
