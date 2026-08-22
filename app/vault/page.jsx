"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function VaultPage() {
  const [mounted, setMounted] = useState(false);
  const [credits, setCredits] = useState(50);
  const [userPlan, setUserPlan] = useState("Free");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanToBuy, setSelectedPlanToBuy] = useState(null);
  const [payMethod, setPayMethod] = useState("upi");
  const [statusMsg, setStatusMsg] = useState("");

  const [characterLock, setCharacterLock] = useState(true);
  const [voiceClone, setVoiceClone] = useState(true);
  const [autoFoley, setAutoFoley] = useState(true);
  const [hdrGrade, setHdrGrade] = useState(true);
  const [anim3D, setAnim3D] = useState(true);
  const [autoSubtitles, setAutoSubtitles] = useState(true);

  const [vaultProjects, setVaultProjects] = useState([]);
  const [selectedVaultProj, setSelectedVaultProj] = useState(null);

  const plans = [
    {
      id: "Free",
      name: "Free Tier",
      price: "₹0",
      period: "Daily Refill",
      credits: "50 Credits / Day",
      quality: "720p HD",
      badge: "Active"
    },
    {
      id: "Starter",
      name: "Starter Creator",
      price: "₹199",
      period: "/ Month",
      credits: "150 Credits / Mo",
      quality: "1080p Full HD",
      badge: "Popular"
    },
    {
      id: "Pro",
      name: "Pro Creator",
      price: "₹499",
      period: "/ Month",
      credits: "500 Credits / Mo",
      quality: "4K UHD Clean",
      badge: "Best Value ⭐"
    },
    {
      id: "Studio",
      name: "Studio Master",
      price: "₹999",
      period: "/ Month",
      credits: "Unlimited",
      quality: "4K Cinema HDR",
      badge: "Full Power 🚀"
    }
  ];

  useEffect(() => {
    setMounted(true);
    const lastDate = localStorage.getItem("cf_last_login_date");
    const today = new Date().toDateString();

    if (lastDate !== today) {
      setCredits(50);
      localStorage.setItem("cf_last_login_date", today);
      localStorage.setItem("cf_free_credits", "50");
    } else {
      const savedCredits = localStorage.getItem("cf_free_credits");
      setCredits(savedCredits !== null ? parseInt(savedCredits, 10) : 50);
    }

    const savedPlan = localStorage.getItem("cf_user_plan") || "Free";
    setUserPlan(savedPlan);

    try {
      const saved = JSON.parse(localStorage.getItem("cf_master_archive") || "[]");
      setVaultProjects(saved);
      if (saved.length > 0) setSelectedVaultProj(saved[0]);
    } catch (e) {
      setVaultProjects([]);
    }
  }, []);

  const notify = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2200);
  };

  const handlePlanPurchase = (plan) => {
    if (plan.id === "Free") {
      notify("ℹ️ You are already on the 50 Daily Free credits plan.");
      return;
    }
    setSelectedPlanToBuy(plan);
    setShowPaymentModal(true);
  };

  const completePayment = () => {
    if (!selectedPlanToBuy) return;
    setUserPlan(selectedPlanToBuy.id);
    localStorage.setItem("cf_user_plan", selectedPlanToBuy.id);
    setShowPaymentModal(false);
    notify(`🎉 Success! Upgraded to ${selectedPlanToBuy.name}!`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 p-4 pb-28 max-w-md mx-auto space-y-4 font-sans text-xs">
      {/* Top Header */}
      <header className="flex justify-between items-center border-b border-slate-800/80 pb-2.5 sticky top-0 bg-[#060913]/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-sm font-black shadow-md">
            📂
          </div>
          <div>
            <h1 className="text-xs font-black text-purple-400">
              CineFlow <span className="text-white">Post-Production Vault</span>
            </h1>
            <p className="text-[8px] text-slate-500">Autonomous Multi-Track Editor</p>
          </div>
        </div>
        <Link
          href="/"
          className="px-3 py-1.5 rounded-xl font-black text-[10px] bg-[#0ea5e9] hover:bg-[#0284c7] text-white transition flex items-center gap-1 shadow-md"
        >
          🎬 Studio
        </Link>
      </header>

      {statusMsg && (
        <div className="bg-cyan-950/90 border border-cyan-500 text-cyan-300 p-2 rounded-xl text-center font-bold text-xs shadow-lg">
          {statusMsg}
        </div>
      )}

      {/* Plan Status Banner (50 Credits Updated) */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-slate-900 border border-emerald-500/40 p-3.5 rounded-2xl flex justify-between items-center">
        <div>
          <span className="text-[9px] font-black text-emerald-400 block uppercase">
            ⚡ FREE PLAN ({credits}/50 CREDITS LEFT)
          </span>
          <h3 className="text-xs font-black text-white">4K UHD Master (100% Watermark Free)</h3>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById("sub-plans");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black px-2.5 py-1 rounded-lg text-[9px] uppercase shadow-lg"
        >
          Upgrade ₹199+
        </button>
      </div>

      {/* Master Production Controls */}
      <div className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
        <span className="font-black text-cyan-400 text-[10px] block uppercase">🎛️ Master Production Controls</span>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setCharacterLock(!characterLock)}
            className={`p-2 rounded-xl border text-left font-bold text-[9px] flex justify-between items-center ${
              characterLock ? "bg-cyan-950/80 border-cyan-500 text-cyan-200" : "bg-[#050811] border-slate-800 text-slate-500"
            }`}
          >
            <span>👤 Character Lock</span>
            <span>{characterLock ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setVoiceClone(!voiceClone)}
            className={`p-2 rounded-xl border text-left font-bold text-[9px] flex justify-between items-center ${
              voiceClone ? "bg-purple-950/80 border-purple-500 text-purple-200" : "bg-[#050811] border-slate-800 text-slate-500"
            }`}
          >
            <span>🎙️ Voice Clone</span>
            <span>{voiceClone ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setAutoFoley(!autoFoley)}
            className={`p-2 rounded-xl border text-left font-bold text-[9px] flex justify-between items-center ${
              autoFoley ? "bg-amber-950/80 border-amber-500 text-amber-200" : "bg-[#050811] border-slate-800 text-slate-500"
            }`}
          >
            <span>🎧 3D Sound Foley</span>
            <span>{autoFoley ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setHdrGrade(!hdrGrade)}
            className={`p-2 rounded-xl border text-left font-bold text-[9px] flex justify-between items-center ${
              hdrGrade ? "bg-emerald-950/80 border-emerald-500 text-emerald-200" : "bg-[#050811] border-slate-800 text-slate-500"
            }`}
          >
            <span>🎨 HDR Color LUT</span>
            <span>{hdrGrade ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setAnim3D(!anim3D)}
            className={`p-2 rounded-xl border text-left font-bold text-[9px] flex justify-between items-center ${
              anim3D ? "bg-indigo-950/80 border-indigo-500 text-indigo-200" : "bg-[#050811] border-slate-800 text-slate-500"
            }`}
          >
            <span>✨ 3D FX Particles</span>
            <span>{anim3D ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => setAutoSubtitles(!autoSubtitles)}
            className={`p-2 rounded-xl border text-left font-bold text-[9px] flex justify-between items-center ${
              autoSubtitles ? "bg-blue-950/80 border-blue-500 text-blue-200" : "bg-[#050811] border-slate-800 text-slate-500"
            }`}
          >
            <span>📝 Auto Subtitles</span>
            <span>{autoSubtitles ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* 4 Subscription Plans Section */}
      <div id="sub-plans" className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
        <span className="font-black text-amber-400 text-[10px] block uppercase">💎 4 Subscription Plans</span>
        <div className="grid grid-cols-2 gap-1.5">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`p-2.5 rounded-2xl border flex flex-col justify-between ${
                userPlan === p.id ? "bg-purple-950/80 border-purple-500" : "bg-[#050811] border-slate-800"
              }`}
            >
              <div>
                <span className="font-bold text-[10px] text-white block">{p.name}</span>
                <span className="text-amber-300 font-bold text-xs">{p.price} <span className="text-[7px] text-slate-400">{p.period}</span></span>
                <span className="text-cyan-400 font-bold text-[8px] block">{p.credits}</span>
              </div>
              <button
                onClick={() => handlePlanPurchase(p)}
                disabled={userPlan === p.id}
                className={`w-full mt-2 py-1 rounded-lg font-bold text-[8px] uppercase ${
                  userPlan === p.id ? "bg-slate-800 text-slate-500" : "bg-amber-500 text-slate-950 shadow"
                }`}
              >
                {userPlan === p.id ? "Active" : `Select ${p.price}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Vault Empty State */}
      <div className="bg-[#0a101f] border border-slate-800/80 p-8 rounded-3xl text-center space-y-3 shadow-xl">
        <div className="text-4xl">📁</div>
        <h3 className="text-sm font-bold text-slate-200">वॉल्ट खाली है</h3>
        <p className="text-[11px] text-slate-400">Studio में अपनी फिल्म जनरेट करें, वह यहाँ आर्काइव होगी।</p>
        <Link
          href="/"
          className="inline-block py-2.5 px-5 bg-cyan-600 rounded-xl text-xs font-bold text-white uppercase shadow-lg"
        >
          Go to Studio
        </Link>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlanToBuy && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a101f] border border-slate-800 w-full max-w-sm rounded-3xl p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-xs">{selectedPlanToBuy.name} ({selectedPlanToBuy.price})</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[{ id: "upi", label: "📱 UPI" }, { id: "card", label: "💳 Cards" }, { id: "net", label: "🏦 Bank" }].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  className={`py-1 rounded-lg text-[9px] font-bold ${payMethod === m.id ? "bg-cyan-600 text-white" : "bg-[#050811] text-slate-400 border border-slate-800"}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {payMethod === "upi" && (
              <input
                type="text"
                placeholder="Enter UPI ID (e.g. user@okhdfcbank)"
                className="w-full bg-[#050811] p-2 rounded-lg border border-slate-800 text-xs text-white outline-none"
              />
            )}
            <button
              onClick={completePayment}
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl uppercase"
            >
              Pay {selectedPlanToBuy.price} Securely
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
