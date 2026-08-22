"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function SubscriptionPlansPage() {
  const [selectedPlan, setSelectedPlan] = useState("Free");

  const plans = [
    {
      name: "Free Tier",
      price: "₹0",
      period: "Daily Refill",
      credits: "50 Credits / Day",
      features: "720p HD, Standard Speed",
      btnText: "Active Plan",
      active: true,
      color: "border-slate-700 bg-[#0e1322]"
    },
    {
      name: "Starter Creator",
      price: "₹199",
      period: "/ Month",
      credits: "150 Credits / Mo",
      features: "1080p FHD, Fast Queue",
      btnText: "Select ₹199",
      active: false,
      color: "border-slate-800 bg-[#0b1222]"
    },
    {
      name: "Pro Creator",
      price: "₹499",
      period: "/ Month",
      credits: "500 Credits / Mo",
      features: "4K UHD, Priority Queue, No Watermark",
      btnText: "Select ₹499",
      active: false,
      color: "border-slate-800 bg-[#0b1222]"
    },
    {
      name: "Studio Master",
      price: "₹999",
      period: "/ Month",
      credits: "Unlimited",
      features: "8K HDR, Ultra Fast Pipeline, Full Commercial License",
      btnText: "Select ₹999",
      active: false,
      color: "border-slate-800 bg-[#0b1222]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-white font-sans text-xs p-4 pb-12 max-w-md mx-auto space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-base text-slate-400 hover:text-white">
            ←
          </Link>
          <h1 className="text-sm font-bold text-white">Subscription Plans</h1>
        </div>
        <Link
          href="/"
          className="text-[10px] bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 rounded-lg font-bold shadow-md"
        >
          🎬 Studio
        </Link>
      </div>

      {/* Current Active Plan Top Banner */}
      <div className="bg-[#0b1222] border border-cyan-500/40 rounded-2xl p-3.5 space-y-1 shadow-lg shadow-cyan-500/10">
        <div className="text-[10px] text-cyan-400 font-bold flex items-center gap-1.5">
          <span>⚡</span> CURRENT BALANCE: 50 / 50 CREDITS LEFT
        </div>
        <div className="text-xs font-black text-white">
          4K UHD Master Engine (Watermark Free Ready)
        </div>
      </div>

      <div className="text-[10px] font-bold text-cyan-400 tracking-wider uppercase">
        💎 Choose Your Production Plan
      </div>

      {/* 4 Subscription Plans Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {plans.map((p) => (
          <div
            key={p.name}
            onClick={() => setSelectedPlan(p.name)}
            className={`p-3 rounded-2xl border flex flex-col justify-between space-y-2.5 cursor-pointer transition ${
              selectedPlan === p.name
                ? "border-cyan-500 bg-[#0d2238] shadow-lg shadow-cyan-500/10"
                : p.color
            }`}
          >
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-200">{p.name}</div>
              <div className="text-base font-black text-white">
                {p.price}
                <span className="text-[9px] font-normal text-slate-400 ml-1">
                  {p.period}
                </span>
              </div>
              <div className="text-[10px] font-semibold text-cyan-400">
                {p.credits}
              </div>
              <div className="text-[8px] text-slate-400 leading-tight pt-1">
                {p.features}
              </div>
            </div>

            <button
              className={`w-full py-2 rounded-xl text-[10px] font-black uppercase transition ${
                p.active
                  ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-default"
                  : "bg-[#f59e0b] hover:bg-[#d97706] text-black shadow-md active:scale-95"
              }`}
            >
              {p.btnText}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Methods Info Footer */}
      <div className="bg-[#0b1222] border border-slate-800/80 rounded-2xl p-3 text-center space-y-1">
        <div className="text-[10px] text-slate-400 font-medium">
          Instant activation with UPI, Cards, NetBanking & Wallet
        </div>
        <div className="text-[9px] text-slate-400 font-bold">
          🔒 100% Safe & Encrypted Checkout
        </div>
      </div>
    </div>
  );
}
