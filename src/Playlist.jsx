import React, { useMemo, useState } from 'react';

// Buckets by valence/energy quadrant
const QUAD_LIB = {
  highHigh: [
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
    { title: "Blinding Lights", artist: "The Weeknd" },
  ],
  highLow: [
    { title: "BLACK SKINHEAD", artist: "Kanye West" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana" },
    { title: "bury a friend", artist: "Billie Eilish" },
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

// Light activity-based presets to blend in
const ACTIVITY_LIB = {
  Workout: [
    { title: "POWER", artist: "Kanye West" },
    { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis" },
    { title: "Titanium", artist: "David Guetta ft. Sia" },
  ],
  Focus: [
    { title: "Weightless", artist: "Marconi Union" },
    { title: "Sunset Lover", artist: "Petit Biscuit" },
    { title: "Intro", artist: "The xx" },
  ],
  Commute: [
    { title: "Feel It Still", artist: "Portugal. The Man" },
    { title: "Electric Feel", artist: "MGMT" },
    { title: "Ocean Drive", artist: "Duke Dumont" },
  ],
  Relax: [
    { title: "Holocene", artist: "Bon Iver" },
    { title: "All We Ever Knew", artist: "The Head and the Heart" },
    { title: "Bloom", artist: "The Paper Kites" },
  ],
  Party: [
    { title: "One More Time", artist: "Daft Punk" },
    { title: "Where Them Girls At", artist: "David Guetta" },
    { title: "Don't Start Now", artist: "Dua Lipa" },
  ],
  Study: [
    { title: "Time", artist: "Hans Zimmer" },
    { title: "River Flows in You", artist: "Yiruma" },
    { title: "Experience", artist: "Ludovico Einaudi" },
  ],
};

function pickQuadrant({ valence, energy }) {
  if (energy >= 0.5 && valence >= 0.5) return 'highHigh';
  if (energy >= 0.5 && valence < 0.5)  return 'highLow';
  if (energy < 0.5 && valence >= 0.5)  return 'lowHigh';
  return 'lowLow';
}

export default function Playlist({ vals, activity, onBack }) {
  const [explore, setExplore] = useState(30); // 0..100
  const quad = useMemo(() => pickQuadrant(vals), [vals]);

  // Blend logic: base on quadrant; as exploration increases, add activity & cross-quadrant tracks
  const tracks = useMemo(() => {
    const base = QUAD_LIB[quad] ?? [];
    const act = activity ? (ACTIVITY_LIB[activity] ?? []) : [];
    if (explore < 34) return [...base, ...act].slice(0, 8);

    // medium explore: mix base + activity + one neighbor
    const neighbor = quad === 'highHigh' ? 'lowHigh'
                  : quad === 'lowHigh'  ? 'highHigh'
                  : quad === 'highLow'  ? 'lowLow'
                  : 'highLow';
    const mix = [...base, ...act, ...(QUAD_LIB[neighbor] ?? [])];
    return mix.slice(0, 8);
  }, [quad, activity, explore]);

  const label =
    quad === 'highHigh' ? '✨ Uplifting / High Energy' :
    quad === 'highLow'  ? '⚡ Intense / Moody' :
    quad === 'lowHigh'  ? '🌤️ Chill / Feel-Good' :
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
        <div className="text-right text-sm text-gray-300">
          <div>{label}</div>
          {activity && <div className="text-xs text-gray-400">for {activity}</div>}
        </div>
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
