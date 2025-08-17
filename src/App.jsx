import React, { useState } from 'react';
import ValenceEnergyPicker from './ValenceEnergyPicker';
import Playlist from './Playlist';
import HowItWorksModal from './HowItWorksModal';

export default function App() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [step, setStep] = useState('landing'); // landing | pick | playlist
  const [vals, setVals] = useState({ valence: 0.6, energy: 0.6 });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      {step === 'landing' && (
        <div className="text-center max-w-xl">
          <h1 className="text-5xl font-bold mb-4">🎵 VibeCheck</h1>
          <p className="text-lg text-gray-200 mb-8">Pick a vibe using <span className="font-semibold">Valence</span> (positiveness) and <span className="font-semibold">Energy</span> (intensity). We’ll queue songs that fit.</p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowHowItWorks(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full py-3 px-6 font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              How it works
            </button>
            <button
              onClick={() => setStep('pick')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full py-3 px-6 font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Pick my vibe
            </button>
          </div>
        </div>
      )}

      {showHowItWorks && (
        <HowItWorksModal
          onStart={() => {
            setShowHowItWorks(false);
            setStep('pick');
          }}
        />
      )}

      {step === 'pick' && (
        <ValenceEnergyPicker
          initial={vals}
          onBack={() => setStep('landing')}
          onConfirm={(v) => {
            setVals(v);
            setStep('playlist');
          }}
        />
      )}

      {step === 'playlist' && (
        <Playlist vals={vals} onBack={() => setStep('pick')} />
      )}
    </div>
  );
}
