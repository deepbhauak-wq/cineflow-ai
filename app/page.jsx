"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-sm bg-[#0b1222] p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black shadow-lg shadow-cyan-500/20">
            🎬
          </div>
          <h1 className="text-base font-black text-white tracking-wider">CineFlow AI Pro Studio</h1>
          <p className="text-[10px] text-slate-400">Google Flow-Grade Autonomous Cinema Engine</p>
        </div>

        <div className="space-y-3">
          <button onClick={() => router.push("/")} className="w-full py-2.5 bg-[#141d33] border border-slate-700 rounded-xl text-xs font-bold text-white transition active:scale-95">
            🔴 Continue with Google / Gmail
          </button>
          <button onClick={() => router.push("/")} className="w-full py-2.5 bg-[#1877F2]/10 border border-slate-700 rounded-xl text-xs font-bold text-blue-400 transition active:scale-95">
            🔵 Continue with Facebook
          </button>
          <button onClick={() => router.push("/")} className="w-full py-2.5 bg-pink-500/10 border border-slate-700 rounded-xl text-xs font-bold text-pink-300 transition active:scale-95">
            🟣 Continue with Instagram
          </button>
        </div>

        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-[9px] text-slate-500 font-bold uppercase">OR CREDENTIALS</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="name@email.com" 
            className="w-full bg-[#060a14] p-3 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500" 
          />
          
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className="w-full bg-[#060a14] p-3 pr-14 rounded-xl border border-slate-800 text-xs text-white outline-none focus:border-cyan-500" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-white"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <button 
            onClick={() => router.push("/")} 
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs uppercase text-white shadow-lg active:scale-95 transition"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
}
