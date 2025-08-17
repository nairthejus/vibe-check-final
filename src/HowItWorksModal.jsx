// src/HowItWorksModal.jsx
import React from 'react';

export default function HowItWorksModal({ onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 text-center text-black shadow-2xl">
        <h2 className="mb-3 text-2xl font-bold">What is VibeCheck?</h2>

        <p className="mb-4 text-sm leading-relaxed text-gray-700">
          VibeCheck lets you pick a spot in a two-dimensional space using{" "}
          <strong>Valence</strong> (how positive/cheerful the music feels) and{" "}
          <strong>Energy</strong> (how intense or mellow it feels). We then
          assemble a playlist that matches your chosen vibe. Drag on the grid or
          tweak the sliders for precise control.
        </p>

        <div className="mb-5 rounded-xl bg-gradient-to-br from-emerald-100 via-pink-100 to-purple-100 p-4 text-left text-sm text-gray-800">
          <div className="mb-1 font-semibold">Quick guide</div>
          <ul className="list-inside list-disc space-y-1">
            <li><span className="font-medium">High Valence</span>: brighter, happier feel</li>
            <li><span className="font-medium">Low Valence</span>: moodier, somber feel</li>
            <li><span className="font-medium">High Energy</span>: intense, driving, lively</li>
            <li><span className="font-medium">Low Energy</span>: calm, gentle, relaxed</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2.5 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Let’s Vibe!
        </button>
      </div>
    </div>
  );
}
