import React, { useState } from 'react';
import HowItWorksModal from './HowItWorksModal';
import MoodSelection from './MoodSelection';
import Playlist from './Playlist';

function App() {
  const [currentStep, setCurrentStep] = useState('landing'); // landing | mood | playlist
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState([]);

  const handleMoodSelectionComplete = (moods) => {
    setSelectedMoods(moods);
    setCurrentStep('playlist');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {currentStep === 'landing' && (
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-6">🎵 VibeCheck</h1>
          <p className="text-lg mb-8">Find music that matches your mood.</p>
          <button
            onClick={() => setShowHowItWorks(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-full 
                       shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 active:scale-95"
          >
            How It Works
          </button>
        </div>
      )}

      {showHowItWorks && (
        <HowItWorksModal
          onStart={() => {
            setShowHowItWorks(false);
            setCurrentStep('mood');
          }}
        />
      )}

      {currentStep === 'mood' && (
        <MoodSelection onConfirm={handleMoodSelectionComplete} />
      )}

      {currentStep === 'playlist' && <Playlist moods={selectedMoods} />}
    </div>
  );
}

export default App;
