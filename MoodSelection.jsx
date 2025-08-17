import React, { useState } from 'react';

function MoodSelection({ onConfirm }) {
  const allMoods = [
    { label: 'Happy', color: 'bg-yellow-400' },
    { label: 'Sad', color: 'bg-blue-400' },
    { label: 'Energetic', color: 'bg-red-500' },
    { label: 'Chill', color: 'bg-green-500' },
    { label: 'Romantic', color: 'bg-pink-400' },
    { label: 'Focused', color: 'bg-purple-500' },
    { label: 'Angry', color: 'bg-orange-500' },
    { label: 'Dreamy', color: 'bg-indigo-400' },
    { label: 'Melancholy', color: 'bg-gray-500' },
    { label: 'Uplifted', color: 'bg-teal-500' },
  ];

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState('');

  const filteredMoods = allMoods.filter((m) =>
    m.label.toLowerCase().includes(searchText.toLowerCase())
  );
  const visibleMoods = expanded ? filteredMoods : filteredMoods.slice(0, 6);

  const toggleMood = (label) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    );
  };

  return (
    <div className="w-full max-w-xl px-6 py-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>

      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search moods..."
        className="w-full p-3 mb-6 rounded-full text-black placeholder-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      <div className="flex flex-wrap justify-center mb-4">
        {visibleMoods.map((mood) => {
          const isSelected = selected.includes(mood.label);
          return (
            <div
              key={mood.label}
              onClick={() => toggleMood(mood.label)}
              className={`m-1 px-4 py-2 rounded-full cursor-pointer text-sm font-medium 
                         transition-transform transform hover:scale-105 
                         ${mood.color} 
                         ${isSelected ? 'ring-4 ring-offset-2 ring-white' : 'opacity-80 hover:opacity-100'}`}
            >
              {mood.label}
            </div>
          );
        })}
      </div>

      {filteredMoods.length > 6 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-gray-300 hover:text-white mb-6"
        >
          {expanded ? 'Show less...' : 'Show more...'}
        </button>
      )}

      <button
        onClick={() => selected.length && onConfirm(selected)}
        disabled={selected.length === 0}
        className={`mt-2 py-2 px-6 rounded-full font-semibold 
                    ${selected.length === 0
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg'}
                    transition-transform transform hover:scale-105 active:scale-95`}
      >
        {selected.length === 0 ? 'Select a mood' : 'Find Music'}
      </button>
    </div>
  );
}

export default MoodSelection;
