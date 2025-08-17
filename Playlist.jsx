import React, { useState } from 'react';

function Playlist({ moods }) {
  const tracks = [
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
    { title: "Happier", artist: "Marshmello & Bastille" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran" },
    { title: "All of Me", artist: "John Legend" },
    { title: "Believer", artist: "Imagine Dragons" }
  ];

  const [vibeValue, setVibeValue] = useState(50);
  const moodLabel = moods.length > 0 ? moods.join(' + ') : 'your mood';

  return (
    <div className="w-full max-w-lg px-4 py-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Your Vibe Playlist <span className="text-base font-medium">({moodLabel})</span>
      </h2>

      <div className="mb-6 px-6">
        <input
          type="range"
          min="0"
          max="100"
          value={vibeValue}
          onChange={(e) => setVibeValue(Number(e.target.value))}
          className="w-full accent-green-500 hover:accent-green-600 cursor-pointer"
        />
        <div className="flex justify-between text-sm font-semibold text-gray-200 mt-1">
          <span>My Zone</span>
          <span>Surprise Me</span>
        </div>
      </div>

      <ul className="text-left text-gray-100">
        {tracks.map((t, i) => (
          <li key={i} className="mb-3 flex items-center">
            <div className="w-8 h-8 bg-pink-500 rounded-full mr-3"></div>
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-300">{t.artist}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
