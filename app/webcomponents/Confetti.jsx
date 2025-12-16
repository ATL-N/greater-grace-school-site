"use client";

import { useEffect } from "react";

const Confetti = () => {
  useEffect(() => {
    const container = document.getElementById("confetti-container");
    if (container) {
      // Clear existing confetti to avoid duplicates on navigation
      container.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(confetti);
      }
    }
  }, []);

  return <div id="confetti-container" className="confetti-container"></div>;
};

export default Confetti;
