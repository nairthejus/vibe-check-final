import React, { useRef } from "react";
import { Music2, Sparkles, Play } from "lucide-react";
import { motion } from "framer-motion";

// Put your public PRD link here
const PRD_URL = "https://your-public-PRD-link.com";

export default function Landing({ onStart }) {
  const howRef = useRef(null);

  const scrollHow = () => {
    // ensure target exists, then smooth scroll
    if (howRef.current && typeof howRef.current.scrollIntoView === "function") {
      howRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // rare fallback
      window.location.hash = "#how-it-works";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Page container (top-aligned so the page can scroll) */}
      <div className="max-w-3xl mx-auto px-4">

        {/* HERO (70vh so there’s room to scroll below) */}
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-center gap-3"
          >
            <Music2 className="w-7 h-7 text-neutral-200" />
            <span className="text-xl tracking-tight">VibeCheck</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="text-4xl md:text-5xl font-semibold leading-tight"
          >
            Find music that matches your{" "}
            <span className="text-neutral-300">mood</span> &{" "}
            <span className="text-neutral-300">moment</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-neutral-300"
          >
            A portfolio MVP inspired by Spotify: adjust a Vibe Range, pick mood tags,
            and let the queue adapt. No login required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            {/* Start Demo */}
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-neutral-100 text-neutral-900 font-medium hover:bg-white transition"
              aria-label="Start VibeCheck demo"
            >
              <Play className="w-5 h-5" />
              Start Demo
            </button>

            {/* Smooth scroll to How it works */}
            <button
              onClick={scrollHow}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-neutral-900 text-neutral-100 border border-neutral-700 hover:border-neutral-500 transition"
            >
              <Sparkles className="w-5 h-5" />
              How it works
            </button>
          </motion.div>
        </section>

        {/* HOW IT WORKS (separate section below hero so scrolling actually moves) */}
        <section id="how-it-works" ref={howRef} className="pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-4 grid md:grid-cols-3 gap-4 text-left"
          >
            <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
              <div className="text-sm text-neutral-400">01</div>
              <div className="mt-2 font-medium">Set Vibe Range</div>
              <div className="text-sm text-neutral-400 mt-1">
                Slider maps to valence (sad→happy) and energy (calm→intense).
              </div>
            </div>
            <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
              <div className="text-sm text-neutral-400">02</div>
              <div className="mt-2 font-medium">Add Mood & Activity</div>
              <div className="text-sm text-neutral-400 mt-1">
                Mood chips + Focus/Commute/Workout/Relax nudge recommendations.
              </div>
            </div>
            <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
              <div className="text-sm text-neutral-400">03</div>
              <div className="mt-2 font-medium">Tune by Feedback</div>
              <div className="text-sm text-neutral-400 mt-1">
                Likes tighten the queue; skips increase exploration. Try both.
              </div>
            </div>
          </motion.div>

          <div className="mt-10 text-xs text-neutral-500">
            Built for a PM portfolio. Guest demo uses seeded catalog and audio-feature heuristics.
          </div>

          {/* Footer credit + PRD link */}
          <div className="mt-6 text-xs text-neutral-500 flex flex-col md:flex-row items-center justify-center gap-3">
            <span>Built by Thejus Nair · Portfolio MVP</span>
            <span className="hidden md:inline">•</span>
            <a
              href={PRD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-neutral-300"
            >
              View PRD
            </a>
            <span className="hidden md:inline">•</span>
            <a href="mailto:thejus@example.com" className="hover:text-neutral-300">
              Contact
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
