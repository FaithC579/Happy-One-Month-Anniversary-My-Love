"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;

    const play = () => {
      audio.play().catch(() => {});
    };

    play();

    const onInteraction = () => {
      play();
      window.removeEventListener("click", onInteraction);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
    };

    window.addEventListener("click", onInteraction);
    window.addEventListener("scroll", onInteraction);
    window.addEventListener("touchstart", onInteraction);

    const onPause = () => {
      audio.pause();
    };

    const onResume = () => {
      audio.play().catch(() => {});
    };

    window.addEventListener("pause-music", onPause);
    window.addEventListener("resume-music", onResume);

    return () => {
      window.removeEventListener("click", onInteraction);
      window.removeEventListener("scroll", onInteraction);
      window.removeEventListener("touchstart", onInteraction);
      window.removeEventListener("pause-music", onPause);
      window.removeEventListener("resume-music", onResume);
    };
  }, []);

  return (
    <audio ref={audioRef} loop preload="auto">
      <source src="/audio/John Legend - All of Me (Lyrics).mp3" type="audio/mpeg" />
    </audio>
  );
}
