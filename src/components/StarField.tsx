"use client";

import { useEffect, useRef } from "react";

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars: HTMLDivElement[] = [];
    const count = window.innerWidth < 768 ? 60 : 120;

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2.5 + 0.5;
      star.className = "star";
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --duration: ${1.5 + Math.random() * 3}s;
        --delay: ${Math.random() * 3}s;
        opacity: ${0.3 + Math.random() * 0.7};
      `;
      container.appendChild(star);
      stars.push(star);
    }

    return () => {
      stars.forEach((s) => s.remove());
    };
  }, []);

  return <div ref={containerRef} className="star-field" />;
}
