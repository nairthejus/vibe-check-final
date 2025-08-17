import React, { useState } from "react";
import ValenceEnergyPicker from "./ValenceEnergyPicker";
import Playlist from "./Playlist";
import HowItWorksModal from "./HowItWorksModal";

export default function App() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [step, setStep] = useState("landing"); // landing | pick | playlist
  const [vals, setVals] = useState({ valence: 0.6, energy: 0.6 });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      {/* Landing Page */}
      {step === "landing" && (
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-4">🎵 VibeCheck</h1>
          <p className="text-lg text-gray-200 mb-10">
            Music that matches how you feel, built with{" "}
            <span className="font-semibold">Valence</span> (positiveness) and{" "}
            <span className="font-semibold">Energy</span> (intensity).
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setShowHowItWorks(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full py-3 px-6 font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              How it works
            </button>
            <button
              onClick={() => setStep("pick")}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full py-3 px-6 font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Pick my vibe
            </button>
            <a
              href="https://drive.google.com/file/d/1jzhsSrR1W9dJavEUhSIF5IlFdPuxsES4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full py-3 px-6 font-semibold shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              View PRD
            </a>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-sm text-gray-400 space-y-2">
            <p>📌 Contact</p>
            <p>
              <a
                href="https://www.linkedin.com/in/thejus-nair/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn: Thejus Nair
              </a>
            </p>
            <p>📞 +91 8147886408</p>
          </div>
        </div>
      )}

      {/* How it Works modal */}
      {showHowItWorks && (
        <HowItWorksModal
          onStart={() => {
            setShowHowItWorks(false);
            setStep("pick");
          }}
        />
      )}

      {/* Valence/Energy Picker */}
      {step === "pick" && (
        <ValenceEnergyPicker
          initial={vals}
          onBack={() => setStep("landing")}
          onConfirm={(v) => {
            setVals(v);
            setStep("playlist");
          }}
        />
      )}

      {/* Playlist */}
      {step === "playlist" && (
        <Playlist vals={vals} onBack={() => setStep("pick")} />
      )}
    </div>
  );
}
