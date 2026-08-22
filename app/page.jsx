"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function VaultPage() {
  const [mounted, setMounted] = useState(false);
  
  // Credit & 4 Tier Subscription Logic (50 Daily Free Credits)
  const [credits, setCredits] = useState(50);
  const [userPlan, setUserPlan] = useState("Free");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanToBuy, setSelectedPlanToBuy] = useState(null);
  const [payMethod, setPayMethod] = useState("upi");
  const [statusMsg, setStatusMsg] = useState("");

  // Master Director Toggles (100% Watermark Free)
  const [characterLock, setCharacterLock] = useState(true);
  const [voiceClone, setVoiceClone] = useState(true);
  const [autoFoley, setAutoFoley] = useState(true);
  const [hdrGrade, setHdrGrade] = useState(true);
  const [anim3D, setAnim3D] = useState(true);
  const [autoSubtitles, setAutoSubtitles] = useState(true);

  // Vault Projects State
  const [vaultProjects, setVaultProjects] = useState([]);
  const [selectedVaultProj, setSelectedVaultProj] = useState(null);

  // 4 Subscription Plans Definition
  const plans = [
    {
      id: "Free",
      name: "Free Tier",
      price: "₹0",
      period: "Daily Auto-Refill",
      credits: "50 Credits / Day",
      quality: "720p HD",
      badge: "Active by Default",
      features: ["50 Daily Free Credits", "Standard Video Engine", "Auto-Scene Decomposition"]
    },
    {
      id: "Starter",
      name: "Starter Creator",
      price: "₹199",
      period: "/ Month",
      credits: "150 Credits / Mo",
      quality: "1080p Full HD",
      badge: "Popular for Beginners",
      features: ["150 Fast Credits", "1080p FHD Quality", "100% No Watermark", "Email Support"]
    },
    {
      id: "Pro",
      name: "Pro Creator",
      price: "₹499",
      period: "/ Month",
      credits: "500 Credits / Mo",
      quality: "4K UHD Clean",
      badge: "Best Value ⭐",
      features: ["500 High-Speed Credits", "4K UHD Clean Cinema", "Character Lock & Voice Clone", "All AI Engines Unlocked"]
    },
    {
      id: "Studio",
      name: "Studio Master",
      price: "₹999",
      period: "/ Month",
      credits: "Unlimited",
      quality: "4K Cinema HDR",
      badge: "Full Power 🚀",
      features: ["Unlimited 4K Renders", "Priority Fast-Track GPU", "Full Multi-Track Controls", "YouTube SEO Engine"]
    }
  ];

  useEffect(() => {
    setMounted(true);
    // 50 Daily Free Credits Refill Logic
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
    setTimeout(() => setStatusMsg(""), 2500);
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
    notify(`🎉 Success! Upgraded to ${selectedPlanToBuy.name} (${selectedPlanToBuy.quality})!`);
  };

  const updateSceneInVault = (sceneId, field, value) => {
    if (!selectedVaultProj) return;
    const updatedScenes = selectedVaultProj.scenes.map((s) =>
      s.id === sceneId ? { ...s, [field]: value } : s
    );
    const updatedProj = { ...selectedVaultProj, scenes: updatedScenes };
    const updatedList = vaultProjects.map((p) =>
      p.id === selectedVaultProj.id ? updatedProj : p
    );
    setSelectedVaultProj(updatedProj);
    setVaultProjects(updatedList);
    localStorage.setItem("cf_master_archive", JSON.stringify(updatedList));
    notify(`✅ Scene 0${sceneId} ${field.toUpperCase()} Updated!`);
  };

  const deleteVaultProj = (id) => {
    const filtered = vaultProjects.filter((p) => p.id !== id);
    setVaultProjects(filtered);
    localStorage.setItem("cf_master_archive", JSON.stringify(filtered));
    if (selectedVaultProj?.id === id) setSelectedVaultProj(filtered[0] || null);
    notify("🗑️ Film Archive Deleted!");
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
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-xl font-black text-[10px] bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-1 shadow-md"
          >
            🎬 Studio
          </Link>
        </div>
      </header>

      {statusMsg && (
        <div className="bg-cyan-950/90 border border-cyan-500 text-cyan-300 p-2 rounded-xl text-center font-bold text-xs shadow-lg">
          {statusMsg}
        </div>
      )}

      {/* Active Plan & 50 Daily Credits Status Banner */}
      <div className="bg-gradient-to-r from-purple-950/50 via-indigo-950/50 to-slate-900 border border-purple-500/40 p-3.5 rounded-2xl flex justify-between items-center">
        <div>
          <span className="text-[9px] font-black text-purple-400 block uppercase">
            Active Plan: {userPlan} Tier
          </span>
          <h3 className="text-xs font-black text-white">
            {userPlan === "Free" ? `⚡ Daily Free: ${credits}/50 Credits` : `👑 ${userPlan} Plan: Unlimited 4K Active`}
          </h3>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById("subscription-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="bg-purple-600 text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase shadow-lg hover:bg-purple-500"
        >
          Plans 💎
        </button>
      </div>

      {/* Master Director Controls */}
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

      {/* 4 Subscription Plans Grid */}
      <div id="subscription-section" className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-3 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-black text-amber-400 text-xs uppercase">💎 4 Subscription Plans</h2>
            <p className="text-[8px] text-slate-400">50 Free Daily Credits or Pro Ultra Access</p>
          </div>
          <span className="text-[9px] bg-amber-950 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
            UPI / Cards
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`p-2.5 rounded-2xl border flex flex-col justify-between space-y-2 transition ${
                userPlan === p.id
                  ? "bg-purple-950/60 border-purple-500 shadow-md shadow-purple-500/20"
                  : "bg-[#050811] border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-black text-white">{p.name}</span>
                  {userPlan === p.id && (
                    <span className="text-[7px] bg-purple-600 text-white px-1.5 py-0.5 rounded-full font-bold">Current</span>
                  )}
                </div>
                <div className="mt-1">
                  <span className="text-sm font-black text-amber-300">{p.price}</span>
                  <span className="text-[8px] text-slate-500">{p.period}</span>
                </div>
                <p className="text-[8px] text-cyan-400 font-bold mt-0.5">{p.credits}</p>
                <p className="text-[7px] text-slate-400">{p.quality}</p>
              </div>

              <button
                onClick={() => handlePlanPurchase(p)}
                disabled={userPlan === p.id}
                className={`w-full py-1.5 rounded-xl font-black text-[9px] uppercase tracking-wider transition ${
                  userPlan === p.id
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md"
                }`}
              >
                {userPlan === p.id ? "Active Plan" : `Select ${p.price}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Vault Archives */}
      {vaultProjects.length === 0 ? (
        <div className="bg-[#0a101f] border border-slate-800/80 p-8 rounded-3xl text-center space-y-3 shadow-xl">
          <div className="text-3xl">📂</div>
          <h3 className="text-sm font-bold text-slate-200">वॉल्ट खाली है</h3>
          <p className="text-[11px] text-slate-400">Studio में अपनी फिल्म जनरेट करें, वह यहाँ आर्काइव होगी।</p>
          <Link
            href="/"
            className="inline-block py-2.5 px-5 bg-cyan-600 rounded-xl text-xs font-bold text-white uppercase shadow-lg"
          >
            Go to Studio
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-[#0a101f] border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
            <span className="font-black text-purple-400 text-[10px] block uppercase">📁 Production Archives</span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {vaultProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedVaultProj(p)}
                  className={`p-2 rounded-xl border text-left shrink-0 min-w-[130px] transition ${
                    selectedVaultProj?.id === p.id
                      ? "bg-purple-950/80 border-purple-500 text-purple-200"
                      : "bg-[#050811] border-slate-800 text-slate-400"
                  }`}
                >
                  <div className="font-bold text-[10px] truncate">{p.name}</div>
                  <div className="text-[8px] text-slate-500">{p.date} • {p.style}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedVaultProj && (
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center bg-[#0a101f] p-3.5 rounded-2xl border border-slate-800">
                <div>
                  <h2 className="text-xs font-bold text-cyan-400 truncate max-w-[200px]">{selectedVaultProj.name}</h2>
                  <p className="text-[9px] text-emerald-400 font-bold">{selectedVaultProj.seoTags || "✅ 100% Watermark Free"}</p>
                </div>
                <button
                  onClick={() => deleteVaultProj(selectedVaultProj.id)}
                  className="text-[10px] bg-red-950 text-red-400 border border-red-900 px-3 py-1 rounded-lg font-bold"
                >
                  Delete
                </button>
              </div>

              {/* Multi-Track Scene Cards */}
              {selectedVaultProj.scenes?.map((sc) => (
                <div key={sc.id} className="bg-[#0a101f] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl space-y-3 pb-3.5">
                  <div className="relative h-36 w-full bg-slate-900">
                    <img src={sc.img} alt={sc.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-md border border-cyan-500/60 px-2 py-0.5 rounded text-[9px] font-black text-cyan-300">
                      {sc.title}
                    </span>
                    <span className="absolute top-2 right-2 bg-emerald-950/90 border border-emerald-500 px-2 py-0.5 rounded text-[8px] font-bold text-emerald-300">
                      100% Watermark Free ✔
                    </span>
                  </div>

                  <div className="px-3 space-y-2">
                    <p className="text-xs text-slate-300 bg-[#050811] p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                      {sc.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                      <div className="bg-[#050811] p-2 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block">🎙️ Voice Track:</span>
                        <span className="text-slate-200 font-medium truncate block">{sc.voice}</span>
                      </div>
                      <div className="bg-[#050811] p-2 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block">🎵 Audio Foley:</span>
                        <span className="text-slate-200 font-medium truncate block">{sc.bgm}</span>
                      </div>
                      <div className="bg-[#050811] p-2 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block">🎥 Camera Rig:</span>
                        <span className="text-cyan-300 font-medium truncate block">{sc.camera}</span>
                      </div>
                      <div className="bg-[#050811] p-2 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block">🎨 Color LUT:</span>
                        <span className="text-amber-300 font-medium truncate block">{sc.lut}</span>
                      </div>
                    </div>

                    {/* Dedicated Track Edit Buttons */}
                    <div className="pt-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1.5">🎬 Multi-Track Controls:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => {
                            const newPrompt = prompt("नया विजुअल प्रॉम्प्ट लिखें:", sc.desc);
                            if (newPrompt) updateSceneInVault(sc.id, "desc", newPrompt);
                          }}
                          className="py-1.5 bg-[#050811] hover:bg-slate-800 border border-slate-700 text-cyan-300 rounded-xl text-[9px] font-bold"
                        >
                          🖼️ Edit Image
                        </button>

                        <button
                          onClick={() => {
                            const newVoice = prompt("नया वॉइसओवर डायलॉग लिखें:", sc.voice);
                            if (newVoice) updateSceneInVault(sc.id, "voice", newVoice);
                          }}
                          className="py-1.5 bg-[#050811] hover:bg-slate-800 border border-slate-700 text-purple-300 rounded-xl text-[9px] font-bold"
                        >
                          🎙️ Edit Audio
                        </button>

                        <button
                          onClick={() => {
                            const newCam = prompt("कैमरा मोशन लिखें:", sc.camera);
                            if (newCam) updateSceneInVault(sc.id, "camera", newCam);
                          }}
                          className="py-1.5 bg-[#050811] hover:bg-slate-800 border border-slate-700 text-amber-300 rounded-xl text-[9px] font-bold"
                        >
                          🎥 Edit Video
                        </button>

                        <button
                          onClick={() => {
                            const newAnim = prompt("एनिमेशन इफ़ेक्ट लिखें:", sc.animation);
                            if (newAnim) updateSceneInVault(sc.id, "animati
