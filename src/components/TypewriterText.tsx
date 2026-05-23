"use client";

import { useState, useEffect, useRef } from "react";
import { useSound } from "@/hooks/useSound";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  skipAnimation?: boolean;
}

export default function TypewriterText({
  text,
  speed = 40,
  className = "",
  onComplete,
  skipAnimation = false,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState(skipAnimation ? text : "");
  const [done, setDone] = useState(skipAnimation);
  const { play } = useSound();
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundCountRef = useRef(0);

  useEffect(() => {
    if (skipAnimation) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);
    indexRef.current = 0;
    soundCountRef.current = 0;

    const type = () => {
      if (indexRef.current < text.length) {
        const char = text[indexRef.current];
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        soundCountRef.current++;
        if (soundCountRef.current % 3 === 0 && char !== " " && char !== "\n") {
          play("typing");
        }
        const delay =
          char === "。" || char === "！" || char === "？" || char === "…"
            ? speed * 8
            : char === "，" || char === "、"
            ? speed * 3
            : speed;
        timerRef.current = setTimeout(type, delay);
      } else {
        setDone(true);
        onComplete?.();
      }
    };

    timerRef.current = setTimeout(type, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, skipAnimation, play, onComplete]);

  const handleClick = () => {
    if (!done) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setDisplayed(text);
      setDone(true);
      onComplete?.();
    }
  };

  return (
    <span
      className={`${className} ${!done ? "typing-cursor" : ""} cursor-pointer`}
      onClick={handleClick}
    >
      {displayed}
    </span>
  );
}
