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
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold text-purple-400">VAULT</h1>
        <Link href="/" className="bg-gray-800 px-3 py-1 rounded text-sm">Back</Link>
      </div>
      <div className="space-y-3">
        {data.map((i) => (
          <div key={i.id} className="bg-gray-900 p-4 rounded border border-gray-700">
            <p className="text-sm">{i.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
