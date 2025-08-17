import React, { useEffect, useState } from "react";
import ValenceEnergyPicker from "./ValenceEnergyPicker";
import Playlist from "./Playlist";
import HowItWorksModal from "./HowItWorksModal";

export default function App() {
  // UI flow: landing → pick → playlist
  const [step, setStep] = useState("landing");

  // Modal
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Vibe state
  const [vals, setVals] = useState({ valence: 0.6, energy: 0.6 });

  // Activity state (e.g., "Workout", "Focus", etc.)
  const [activity, setActivity] = useState(null);

  // Nice keyboard shortcuts: P = pick, H = how it works
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === "p") setStep("pick");
      if (k === "h") setShowHowItWorks(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-6 bg-animated">
      {/* ---------------- Landing Page ---------------- */}
      {step === "landing" && (
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center">
            🎵 VibeCheck
            {/* tiny visualizer */}
            <div className="viz ml-3">
              <span></span><span></span><span></span><span></span>
            </div>
          </h1>

          <p className="text-lg text-white/90 mb-6">
            Music that matches how you feel, using{" "}
            <span className="font-semibold">Valence</span> (positiveness) and{" "}
            <span className="font-semibold">Energy</span> (intensity).
          </p>

          {/* How it works stepper */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/85 mb-10">
            <li className="flex items-center gap-2">
              <span className="text-pink-300">①</span> Pick Valence & Energy
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-300">②</span> Choose Activity
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-300">③</span> Tune Exploration
            </li>
            <li className="flex items-center gap-2">
              <span className="text-violet-300">④</span> Save what you like
            </li>
          </ul>

          {/* Main CTAs */}
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

          {/* Contact (inline) */}
          <div className="mt-6 text-sm text-white/80 space-y-2">
            <p className="uppercase tracking-wide text-white/60">Contact</p>
            <p>
              <a
                href="https://www.linkedin.com/in/thejus-nair/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white hover:underline"
              >
                LinkedIn: Thejus Nair
              </a>
            </p>
            <p>
              📞{" "}
              <a href="tel:+918147886408" className="hover:underline">
                +91 8147886408
              </a>
            </p>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-xs text-white/75">
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/thejus-nair/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Thejus Nair
            </a>
          </footer>

          {/* Floating PRD / Contact bar */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            <a
              href="https://drive.google.com/file/d/1jzhsSrR1W9dJavEUhSIF5IlFdPuxsES4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-600/90 px-4 py-2 text-sm hover:scale-105 transition shadow"
            >
              PRD
            </a>
            <a
              href="https://www.linkedin.com/in/thejus-nair/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/15 px-4 py-2 text-sm hover:scale-105 transition shadow"
            >
              LinkedIn
            </a>
            <a
              href="tel:+918147886408"
              className="rounded-full bg-white/15 px-4 py-2 text-sm hover:scale-105 transition shadow"
            >
              +91 8147886408
            </a>
          </div>

          {/* Shortcut hint */}
          <p className="mt-3 text-xs text-white/70">
            Shortcuts: <span className="px-2 py-1 rounded bg-white/10">P</span> Pick vibe ·{" "}
            <span className="px-2 py-1 rounded bg-white/10">H</span> How it works
          </p>
        </div>
      )}

      {/* ---------------- How It Works Modal ---------------- */}
      {showHowItWorks && (
        <HowItWorksModal
          onStart={() => {
            setShowHowItWorks(false);
            setStep("pick");
          }}
        />
      )}

      {/* ---------------- Valence/Energy Picker ---------------- */}
      {step === "pick" && (
        <ValenceEnergyPicker
          initial={vals}
          initialActivity={activity}
          onBack={() => setStep("landing")}
          onConfirm={({ valence, energy, activity: act }) => {
            setVals({ valence, energy });
            setActivity(act || null);
            setStep("playlist");
          }}
        />
      )}

      {/* ---------------- Playlist (dynamic activity) ---------------- */}
      {step === "playlist" && (
        <Playlist
          vals={vals}
          activity={activity}
          setActivity={setActivity}   // allow changing activity live on playlist screen
          onBack={() => setStep("pick")}
        />
      )}
    </div>
  );
}
