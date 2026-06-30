"use client";

import { useMemo } from "react";
import Image from "next/image";

const COLS = 8;
const ROWS = 6;
const ROW_DURATIONS = [25, 30, 22, 28, 26, 32];

const PHOTOS = [
  "/images/MIKE 1.jpeg",
  "/images/MIKE 2.jpeg",
  "/images/MIKE 3.jpeg",
  "/images/AFOMA 1.png",
  "/images/AFOMA 2.png",
  "/images/AFOMA 3.jpeg",
];

function ImageSlot({ src }) {
  return (
    <div
      style={{
        width: 140,
        height: 190,
        borderRadius: 4,
        border: "1px solid rgba(201, 169, 110, 0.4)",
        boxShadow:
          "0 0 8px rgba(201, 169, 110, 0.2), 0 0 20px rgba(201, 169, 110, 0.08)",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="140px"
        style={{ objectFit: "cover", filter: "brightness(0.6) saturate(0.5)" }}
      />
    </div>
  );
}

function MarqueeRow({ rowIdx, rowImages }) {
  const direction = rowIdx % 2 === 0 ? "marquee-row-left" : "marquee-row-right";
  const duration = ROW_DURATIONS[rowIdx % ROW_DURATIONS.length];

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          gap: 14,
          width: "max-content",
          animation: `${direction} ${duration}s linear infinite`,
        }}
      >
        {rowImages.map((src, i) => (
          <ImageSlot key={`a-${i}`} src={src} />
        ))}
        {rowImages.map((src, i) => (
          <ImageSlot key={`b-${i}`} src={src} />
        ))}
      </div>
    </div>
  );
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shuffledRow(rng, cols) {
  const pool = [];
  for (let i = 0; i < cols; i++) {
    pool.push(PHOTOS[i % PHOTOS.length]);
  }
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  for (let i = 1; i < pool.length; i++) {
    if (pool[i] === pool[i - 1]) {
      const swapIdx = i === 1 ? 2 : 1;
      [pool[i], pool[swapIdx]] = [pool[swapIdx], pool[i]];
    }
  }
  return pool;
}

export default function DiagonalMarquee() {
  const rowImages = useMemo(() => {
    const rng = seededRandom(42);
    return Array.from({ length: ROWS }, () => shuffledRow(rng, COLS));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-5deg)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "120vw",
        }}
      >
        {rowImages.map((images, i) => (
          <MarqueeRow key={i} rowIdx={i} rowImages={images} />
        ))}
      </div>
    </div>
  );
}
