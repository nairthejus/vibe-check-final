import React, { useEffect, useState } from "react";
import Landing from "./Landing.jsx";
import VibeCheckMVP from "./VibeCheckMVP.jsx";

export default function App() {
  // Parse URL
  const url = typeof window !== "undefined" ? new URL(window.location.href) : null;
  const forceIntro = url?.searchParams.get("intro") === "1" || url?.hash === "#how-it-works";
  const urlStart = url?.searchParams.get("start") === "1";

  // Determine start state
  const [started, setStarted] = useState(() => {
    if (forceIntro) return false;
    if (urlStart) return true;
    return typeof window !== "undefined" && sessionStorage.getItem("vibecheck-started") === "1";
  });

  // Save session flag
  useEffect(() => {
    if (started) sessionStorage.setItem("vibecheck-started", "1");
  }, [started]);

  if (!started) return <Landing onStart={() => setStarted(true)} />;
  return <VibeCheckMVP />;
}
