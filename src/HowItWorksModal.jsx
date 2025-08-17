import React from 'react';

function HowItWorksModal({ onStart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-xl p-6 max-w-md mx-4 text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">What is VibeCheck?</h2>
        <p className="mb-6">
          VibeCheck helps you find songs that <strong>match your mood</strong>.
          Pick how you're feeling, and we’ll create a playlist tailored to your vibe.
        </p>
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-2 px-5 rounded-full 
                     hover:shadow-lg transition-transform transform hover:scale-105 active:scale-95"
        >
          Let's Vibe!
        </button>
      </div>
    </div>
  );
}

export default HowItWorksModal;
