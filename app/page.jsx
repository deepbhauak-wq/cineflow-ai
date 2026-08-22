"use client";
import React, { useState } from "react";
export default function CineFlowProStudio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [prompt, setPrompt] = useState("एक योद्धा घने जंगल में प्राचीन रहस्य की खोज कर रहा है। 8K रियलिस्टिक विजुअल्स।");
  const [ratio, setRatio] = useState("16:9");
  const [duration, setDuration] = useState("3 Min");
  const [storyModel, setStoryModel] = useState("Auto");
  const [videoModel, setVideoModel] = useState("Veo");
  const [style, setStyle] = useState("Cinematic Epic");
  const [plan, setPlan] = useState("free");
  const [credits, setCredits] = useState(50);
  const [statusMsg, setStatusMsg] = useState("");
  const [pipelineState, setPipelineState] = useState("idle");
  const [editingSceneId, setEditingSceneId] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [scenes, setScenes] = useState([]);
    const notify = (msg) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(""), 3000); };
  const handleAuth = (e) => { e.preventDefault(); setIsLoggedIn(true); notify("लॉगिन सफल!"); };
  const handleGenerate = () => {
    if (credits < 10) return notify("⚠️ क्रेडिट्स समाप्त!");
    setPipelineState("generating");
    notify("🚀 रेंडरिंग शुरू...");
    setTimeout(() => {
      setCredits(prev => prev - 10);
      setScenes([{id: 1, title: "Scene 1", desc: "योद्धा जंगल में चलता हुआ।", status: "Ready"}, {id: 2, title: "Scene 2", desc: "मंदिर का द्वार खुलना।", status: "Ready"}]);
      setPipelineState("completed");
      notify("✅ रेंडरिंग पूरी!");
    }, 2000);
  };
    if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 text-center space-y-4">
          <h2 className="text-xl font-black">Studio Login</h2>
          <input type="email" placeholder="Email" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
          <input type="password" placeholder="Password" className="w-full bg-[#060a14] border border-slate-700 p-3 rounded-xl text-xs" />
          <button onClick={handleAuth} className="w-full py-3 bg-cyan-600 rounded-xl font-bold text-xs uppercase">Enter</button>
        </div>
      </div>
    );
    }
    return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xs font-black text-cyan-400">CINEFLOW PRO</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-[10px] bg-red-950 px-3 py-1 rounded">Logout</button>
      </header>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-[#0b1222] border border-slate-800 p-3 rounded-xl text-xs" rows={3} />
      <button onClick={handleGenerate} className="w-full py-3 bg-cyan-600 rounded-xl font-black text-xs uppercase my-4">Generate Package</button>
      {pipelineState === "completed" && scenes.map(sc => (
        <div key={sc.id} className="bg-[#0b1222] border border-slate-800 p-4 rounded-xl space-y-2 mb-3">
          <p className="text-xs font-bold text-cyan-400">{sc.title}</p>
          {editingSceneId === sc.id ? (
            <div className="space-y-2"><textarea value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} className="w-full bg-[#060a14] p-2 text-xs border border-cyan-500 rounded" />
            <button onClick={() => { setScenes(scenes.map(s => s.id === sc.id ? {...s, desc: editPrompt} : s)); setEditingSceneId(null); }} className="w-full py-2 bg-emerald-600 text-[10px] font-bold rounded">SAVE</button></div>
          ) : (
            <><p className="text-[11px] text-slate-300">{sc.desc}</p>
            <button onClick={() => { setEditingSceneId(sc.id); setEditPrompt(sc.desc); }} className="w-full py-2 bg-slate-800 text-[10px] font-bold rounded">✏️ EDIT</button></>
          )}
        </div>
      ))}
    </div>
  );
}
