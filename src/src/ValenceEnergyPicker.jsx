import React, { useMemo, useRef, useState } from 'react';

const clamp01 = (n) => Math.max(0, Math.min(1, n));

export default function ValenceEnergyPicker({ initial = { valence: 0.6, energy: 0.6 }, onBack, onConfirm }) {
  const [valence, setValence] = useState(initial.valence ?? 0.6);
  const [energy, setEnergy] = useState(initial.energy ?? 0.6);
  const boardRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // Pretty label for the quadrant
  const quadrant = useMemo(() => {
    if (energy >= 0.5 && valence >= 0.5) return '✨ Uplifting / High Energy';
    if (energy >= 0.5 && valence < 0.5) return '⚡ Intense / Moody';
    if (energy < 0.5 && valence >= 0.5) return '🌤️ Chill / Feel-Good';
    return '🌙 Calm / Somber';
  }, [energy, valence]);

  const handlePoint = (clientX, clientY) => {
    const el = boardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp01((clientX - rect.left) / rect.width);      // 0..1 left->right = valence
    const y = clamp01((clientY - rect.top) / rect.height);      // 0..1 top->bottom
    setValence(x);
    setEnergy(1 - y); // top = high energy
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-sm px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Set your Vibe</h2>
        <div className="w-24" />
      </div>

      {/* 2D board */}
      <div
        ref={boardRef}
        className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-xl cursor-crosshair select-none"
        onMouseDown={(e) => { setDragging(true); handlePoint(e.clientX, e.clientY); }}
        onMouseMove={(e) => dragging && handlePoint(e.clientX, e.clientY)}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={(e) => { const t = e.touches[0]; handlePoint(t.clientX, t.clientY); }}
        onTouchMove={(e) => { const t = e.touches[0]; handlePoint(t.clientX, t.clientY); }}
      >
        {/* colorful gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#22c55e,transparent_40%),radial-gradient(circle_at_80%_20%,#ef4444,transparent_40%),radial-gradient(circle_at_20%_80%,#60a5fa,transparent_40%),radial-gradient(circle_at_80%_80%,#f472b6,transparent_40%)] bg-opacity-70" />
        {/* grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>
        {/* axes labels */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 rotate-[-90deg] text-xs text-white/80 tracking-wide">ENERGY → HIGH</div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 rotate-[90deg] text-xs text-white/40 tracking-wide">LOW</div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/80 tracking-wide">VALENCE → POSITIVE</div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-wide">NEGATIVE</div>

        {/* thumb */}
        <div
          className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full ring-4 ring-white/80 shadow-xl transition-transform"
          style={{
            left: `${valence * 100}%`,
            top: `${(1 - energy) * 100}%`,
            background:
              'conic-gradient(from 0deg, #22c55e, #ef4444, #f472b6, #60a5fa, #22c55e)'
          }}
        />
      </div>

      {/* readouts + sliders */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="sm:col-span-2 bg-gray-800/60 rounded-xl p-4">
          <div className="text-sm text-gray-300">{quadrant}</div>
          <div className="mt-1 text-xs text-gray-400">Valence: {valence.toFixed(2)} · Energy: {energy.toFixed(2)}</div>
        </div>

        <button
          onClick={() => onConfirm({ valence, energy })}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl py-3 font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Generate Playlist
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-800/60 rounded-xl p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Valence (positiveness)</span>
            <span className="text-gray-300">{valence.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0" max="1" step="0.01"
            value={valence}
            onChange={(e) => setValence(parseFloat(e.target.value))}
            className="w-full accent-pink-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Negative</span><span>Positive</span>
          </div>
        </div>

        <div className="bg-gray-800/60 rounded-xl p-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Energy (intensity)</span>
            <span className="text-gray-300">{energy.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0" max="1" step="0.01"
            value={energy}
            onChange={(e) => setEnergy(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Low</span><span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
