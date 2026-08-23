
  
          
            { id: "timeline", label: "🎞️ Multi-Track Timeline" },
            { id: "basic", label: "✂️ Basic Edit" },
            { id: "ai", label: "🎥 AI Scene Gen" },
            { id: "character", label: "👤 Character Edit" },
            { id: "audio", label: "🔊 Audio Mix (-22dB)" },
            { id: "color", label: "🎨 Color Grade" }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${activeTab === tab.id ? "bg-cyan-500 text-black shadow-md" : "text-slate-400 hover:text-white"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "timeline" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl">
            <span className="text-xs font-semibold text-cyan-400 uppercase">Multi-Track Timeline</span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3 -slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="w-16 text-slate-400 font-semibold">🎥 Video</span>
                <div className="flex gap-2 overflow-x-auto">
                  {[1, 2, 3, 4].map(s => (
                    <button key={s} onClick={() => setActiveScene(s)} className={`px-3 py-1.5 rounded-xl border text-xs cursor-pointer ${activeScene === s ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-400"}`}>Scene {s}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="w-16 text-slate-400 font-semibold">🎙️ Voice</span>
                <span className="text-cyan-300">100% Shuddh Hindi (Deep Calm)</span>
                <span className="text-[10px] text-purple-400">1.5s Pause Locked</span>
              </div>
              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="w-16 text-slate-400 font-semibold">🎵 Music</span>
                <span className="text-yellow-300">Ambient Cinematic Pad</span>
                <span className="text-[10px] text-green-400">Ducked @ -22dB</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "basic" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl text-xs">
            <span className="font-bold text-cyan-400 uppercase">Scene {activeScene} Basic Controls</span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {["Cut", "Trim", "Split", "Crop", "Speed (1x)", "Reverse"].map(op => (
                <button key={op} onClick={() => alert(`${op} applied`)} className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-slate-300 cursor-pointer">{op}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "ai" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl text-xs">
            <span className="font-bold text-cyan-400 uppercase">Generative AI Video Operations</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Regenerate Scene", "Extend Scene", "Change Lighting", "Change Weather", "Change Background", "Image → Video", "Video → Video", "Change Camera"].map(aiOp => (
                <button key={aiOp} onClick={() => alert(`${aiOp} triggered`)} className="py-2.5 px-2 rounded-xl bg-cyan-950/50 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold cursor-pointer">✨ {aiOp}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "character" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl text-xs">
            <span className="font-bold text-purple-400 uppercase">Active Character Consistency Controls</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Face/Identity Lock", "Outfit Change", "Expression Change", "Action Change", "Position Change", "Voice Change", "Apply to All", "Character Replace"].map(charOp => (
                <button key={charOp} onClick={() => alert(`${charOp} applied`)} className="py-2.5 px-2 rounded-xl bg-purple-950/50 hover:bg-purple-900 border border-purple-500/40 text-purple-300 font-bold cursor-pointer">👤 {charOp}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "audio" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl text-xs">
            <div className="flex justify-between items-center"><span className="font-bold text-cyan-400 uppercase">Audio Levels & Auto Ducking</span><span className="text-green-400 font-mono">BGM Locked @ -22dB</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span>Voice Volume ({voiceVol}%)</span>
                <input type="range" min="0" max="100" value={voiceVol} onChange={(e) => setVoiceVol(e.target.value)} className="w-full accent-cyan-500"/>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span>Music Volume ({musicVol}%) [Ducked]</span>
                <input type="range" min="0" max="50" value={musicVol} onChange={(e) => setMusicVol(e.target.value)} className="w-full accent-yellow-500"/>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span>SFX Volume ({sfxVol}%)</span>
                <input type="range" min="0" max="100" value={sfxVol} onChange={(e) => setSfxVol(e.target.value)} className="w-full accent-purple-500"/>
              </div>
            </div>
          </div>
        )}

        {activeTab === "color" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3 shadow-xl text-xs">
            <span className="font-bold text-cyan-400 uppercase">Cinematic Grading ({colorGrade})</span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {["AK Ministry Cinematic", "Warm Biblical", "Dark Drama", "Vibrant 3D", "Documentary", "AI Auto Grade"].map(grade => (
                <button key={grade} onClick={() => setColorGrade(grade)} className={`py-2 rounded-xl border text-[11px] font-bold cursor-pointer ${colorGrade === grade ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}>{grade}</button>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="fixed bottom-4 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-slate-700 p-1.5 rounded-full shadow-2xl backdrop-blur-lg">
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-sm border border-slate-700 shadow-md" title="Home">🏠</Link>
        <Link href="/character-vault" className="w-9 h-9 rounded-full bg-slate-800 text-purple-400 flex items-center justify-center text-sm border border-slate-700 shadow-md" title="Vault">👤</Link>
        <Link href="/studio/editor" className="w-9 h-9 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm font-bold shadow-lg shadow-cyan-500/30" title="Editor">🎬</Link>
      </div>
