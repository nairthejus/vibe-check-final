import React, { useEffect, useState } from "react";
import Landing from "./Landing.jsx";
import VibeCheckMVP from "./VibeCheckMVP.jsx";

export default function App() {
  // Start directly if the URL has ?start=1 (handy for demos)
  const urlStart = typeof window !== "undefined" && new URLSearchParams(location.search).get("start") === "1";
  const [started, setStarted] = useState(urlStart || false);

  // Remember if user already started (so refresh stays in demo)
  useEffect(() => {
    if (started) sessionStorage.setItem("vibecheck-started", "1");
  }, [started]);

  useEffect(() => {
    const seen = sessionStorage.getItem("vibecheck-started") === "1";
    if (seen) setStarted(true);
  }, []);

  if (!started) return <Landing onStart={() => setStarted(true)} />;
  return <VibeCheckMVP />;
}

