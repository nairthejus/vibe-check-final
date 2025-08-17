import React, { useMemo, useState } from 'react';

const LIB = {
  highHigh: [
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
    { title: "Blinding Lights", artist: "The Weeknd" },
  ],
  highLow: [
    { title: "bury a friend", artist: "Billie Eilish" },
    { title: "BLACK SKINHEAD", artist: "Kanye West" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana" },
  ],
  lowHigh: [
    { title: "Lovely Day", artist: "Bill Withers" },
    { title: "Put Your Records On", artist: "Corinne Bailey Rae" },
    { title: "Sunday Morning", artist: "Maroon 5" },
  ],
  lowLow: [
    { title: "Someone Like You", artist: "Adele" },
    { title: "Skinny Love", artist: "Bon Iver" },
    { title: "Holocene", artist: "Bon Iver" },
  ],
};

function pickBucket({ valence, energy }) {
  if (energy >= 0.5 && valence >= 0.5) return 'highHigh';
  if (energy >= 0.5 && valence < 0.5)  return 'highLow';
  if (energy < 0.5 && valence >= 0.5)  return 'lowHigh';
  return 'lowLow';
}

export default function Playlist({ vals, onBack }) {
  const [explore, setExplore] = useState(30); // 0..100
  const base = useMemo(() => pickBucket(vals), [vals]);

  // crude blend: as explore increases, mix in neighbors
  const tracks = useMemo(() => {
    const baseList = LIB[base];
    if (explore < 34) return baseList;
    if (explore < 67) {
      // mix with one neighbor
      const neighborKey = base === 'highHigh' ? 'lowHigh'
                        : base === 'lowHigh'  ? 'highHigh'
                        : base === 'highLow'  ? 'lowLow'
                        : 'highLow';
      return [...baseList, ...LIB[neighborKey]].slice(0, 8);
    }
    // high explore: sample across all
    return [...LIB.highHigh, ...LIB.highLow, ...LIB.lowHigh, ...LIB.lowLow].slice(0, 8);
  }, [base, explore]);

  const label =
    base === 'highHigh' ? '✨ Uplifting / High Energy' :
    base === 'highLow'  ? '⚡ Intense / Moody' :
    base === 'lowHigh'  ? '🌤️ Chill / Feel-Good' :
                          '🌙 Calm / Somber';

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-sm px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          ← Adjust vibe
        </button>
        <h2 className="text-2xl font-bold">Your Playlist</h2>
        <div className="w-28 text-right text-sm text-gray-300">{label}</div>
      </div>

      {/* Exploration control */}
      <div className="bg-gray-800/60 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Exploration</span>
          <span className="text-gray-300">{explore}</span>
        </div>
        <input
          type="range"
          min="0" max="100"
          value={explore}
          onChange={(e) => setExplore(parseInt(e.target.value, 10))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>My Zone</span><span>Surprise Me</span>
        </div>
      </div>

      <ul className="space-y-3">
        {tracks.map((t, i) => (
          <li key={`${t.title}-${i}`} className="flex items-center bg-gray-800/60 rounded-xl p-3 hover:bg-gray-800 transition">
            <div className="w-10 h-10 rounded-lg mr-3 shadow"
                 style={{ background: 'linear-gradient(135deg, #22c55e, #f472b6)' }} />
            <div className="flex-1">
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-gray-400">{t.artist}</div>
            </div>
            <button className="text-xs px-3 py-1 rounded-full bg-purple-500 hover:bg-purple-600 transition">
              Save
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
