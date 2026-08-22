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
    <div className="min-h-screen bg-black text-white p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-purple-400">VAULT</h1>
        <Link href="/" className="bg-gray-800 px-3 py-1 rounded text-sm font-bold">Back</Link>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center mt-8 text-xs">No projects saved yet.</p>
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.id} className="bg-gray-900 p-4 rounded-xl border border-gray-800">
              <p className="text-xs text-gray-200">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
