"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Vault() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = localStorage.getItem("vault");
    if (d) {
      try {
        setData(JSON.parse(d));
      } catch (e) {
        setData([]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-md mx-auto space-y-4">
      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
        <h1 className="text-base font-bold text-purple-400">VAULT</h1>
        <Link
          href="/"
          className="text-xs bg-gray-800 px-3 py-1 rounded font-bold text-gray-200"
        >
          ← Studio
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center text-xs mt-8">
          No projects saved yet.
        </p>
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 p-3 rounded-xl space-y-1"
            >
              <p className="text-xs text-gray-200">{item.text}</p>
              <p className="text-[10px] text-gray-500">{item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
