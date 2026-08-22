"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Vault() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = localStorage.getItem("vault");
    if (d) setData(JSON.parse(d));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">VAULT</h1>
        <Link href="/" className="bg-gray-700 px-3 py-1 rounded">Back</Link>
      </div>
      {data.map(i => (
        <div key={i.id} className="bg-gray-900 p-3 mb-2 rounded border border-gray-700">
          <p className="text-sm">{i.text}</p>
        </div>
      ))}
    </div>
  );
}
