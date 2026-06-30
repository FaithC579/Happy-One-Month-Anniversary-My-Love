"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";

/* ── Data ───────────────────────────────────────────────────── */
const CLIPS = [
  { id: 1,  label: "Just Us",     poster: "/videos/posters/Video 1.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772386/Video_1_cedjam.mp4" },
  { id: 2,  label: "Intentional Mirror Selfie",      poster: "/videos/posters/Video 2.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772387/Video_2_gcfc5a.mp4" },
  { id: 3,  label: "Late Nights",    poster: "/videos/posters/Video 3.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772390/Video_3_okxxck.mp4" },
  { id: 4,  label: "Together at the Gym",       poster: "/videos/posters/Video 4.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772389/Video_4_usxldn.mp4" },
  { id: 5,  label: "Movie Date",      poster: "/videos/posters/Video 5.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772386/Video_5_ocpepu.mp4" },
  { id: 6,  label: "Us Playing Baskeball Together",      poster: "/videos/posters/Video 6.png",  embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772387/Video_6_t5pece.mp4" },
  { id: 7,  label: "Finished Man",       poster: "/videos/posters/Video 7.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772394/Video_7_jajtpm.mp4" },
  { id: 8,  label: "Us being Cute",      poster: "/videos/posters/Video 8.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772400/Video_8_ftvart.mp4" },
  { id: 9,  label: "Burger King Date",     poster: "/videos/posters/Video 9.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772394/Video_9_lrqjsv.mp4" },
  { id: 10, label: "My Fine Man",  poster: "/videos/posters/Video  10.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772390/Video_10_cd3xk1.mp4" },
  { id: 11, label: "Extremely Cool", poster: "/videos/posters/Video 11.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772394/Video_11_tbvtoj.mp4" },
  { id: 12, label: "The View",       poster: "/videos/posters/Video 12.png",  embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782772389/Video_12_himths.mp4" },
  { id: 13, label: "Together",       poster: "/videos/posters/Video 13 Update.png",   embed: "https://res.cloudinary.com/dtcxudhvt/video/upload/v1782778836/Video_13_Update_zdqqrd.mp4" },
];

/* ── Seeded random for consistent rotations ────────────────── */
function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/* ── Heart position calculator (for 13 items) ──────────────── */
function getHeartPositions(count) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 - Math.PI / 2;
    const heartX = 16 * Math.pow(Math.sin(t), 3);
    const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    positions.push({ x: heartX, y: heartY });
  }
  return positions;
}

/* ── Sprocket holes ─────────────────────────────────────────── */
function Sprockets() {
  return (
    <div className="sprocket-row">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="sprocket-hole" />
      ))}
    </div>
  );
}

/* ── Reel card ──────────────────────────────────────────────── */
function Reel({ clip, index, onOpen, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [ready, setReady] = useState(false);

  const rotation = useMemo(() => seededRandom(index + 1) * 8 - 4, [index]);
  const offsetY = useMemo(() => seededRandom(index + 100) * 20 - 10, [index]);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setReady(true), index * 120);
      return () => clearTimeout(t);
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className="video-reel"
      onClick={() => onOpen(index)}
      style={{
        "--rot": `${rotation}deg`,
        "--off-y": `${offsetY}px`,
        opacity: ready ? 1 : 0,
        transform: ready
          ? `rotate(var(--rot)) translateY(0)`
          : `rotate(var(--rot)) translateY(40px)`,
        transition: `transform .6s cubic-bezier(.22,1,.36,1) ${index * 0.12}s, opacity .6s ease ${index * 0.12}s`,
      }}
    >
      <Sprockets />

      <div style={{ position: "relative" }}>
        <img
          src={clip.poster}
          alt={clip.label}
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "16 / 10",
            objectFit: "cover",
            display: "block",
            filter: "saturate(.85) brightness(.8) contrast(1.05)",
          }}
        />

        {/* Film grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "repeating-linear-gradient(0deg, rgba(0,0,0,.03) 0px, transparent 1px, transparent 3px)",
            pointerEvents: "none",
          }}
        />

        {/* Play icon */}
        <div className="play-icon">
          <svg width="16" height="18" viewBox="0 0 10 12" style={{ marginLeft: 2 }}>
            <polygon points="0,0 10,6 0,12" fill="#d4af6a" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="reel-label">{clip.label}</div>

      <Sprockets />
    </div>
  );
}

/* ── Lightbox ───────────────────────────────────────────────── */
function Lightbox({ clips, index, onClose, onPrev, onNext }) {
  const clip = clips[index];

  const embedUrl = clip.embed ? clip.embed + "?autoplay=1" : "";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="video-lightbox">
      <div className="lb-backdrop" onClick={onClose} />

      {/* Close */}
      <button onClick={onClose} aria-label="Close" className="lb-close-btn">
        &#215;
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        className="lb-arrow-btn lb-prev"
      >
        &#8249;
      </button>

      {/* Player */}
      <div className="lb-player">
        {clip.embed ? (
          <iframe
            src={embedUrl}
            title={clip.label}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              position: "absolute",
              inset: 0,
            }}
          />
        ) : (
          <div className="lb-no-video">No video link yet</div>
        )}
      </div>

      {/* Caption */}
      <div className="lb-caption">{clip.label}</div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        className="lb-arrow-btn lb-next"
      >
        &#8250;
      </button>
    </div>
  );
}

/* ── Main Section ──────────────────────────────────────────── */
export default function VideoWall() {
  const [lbIndex, setLbIndex] = useState(-1);

  const openLb = useCallback((i) => {
    setLbIndex(i);
    window.dispatchEvent(new CustomEvent("pause-music"));
  }, []);
  const closeLb = useCallback(() => {
    setLbIndex(-1);
    window.dispatchEvent(new CustomEvent("resume-music"));
  }, []);
  const nextLb = useCallback(() => setLbIndex((i) => (i + 1) % CLIPS.length), []);
  const prevLb = useCallback(() => setLbIndex((i) => (i - 1 + CLIPS.length) % CLIPS.length), []);

  const heartPositions = useMemo(() => getHeartPositions(CLIPS.length), []);

  return (
    <section id="videos" className="video-section">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="video-heading"
      >
        <h2 className="video-title">The Moments We Filmed</h2>
        <p className="video-subtitle">Tap any clip to watch in full.</p>
      </motion.div>

      {/* Scattered grid (mobile/tablet) */}
      <div className="video-scatter-grid">
        {CLIPS.map((clip, i) => (
          <Reel key={clip.id} clip={clip} index={i} onOpen={openLb} total={CLIPS.length} />
        ))}
      </div>

      {/* Heart layout (desktop 960px+) */}
      <div className="video-heart-layout">
        {CLIPS.map((clip, i) => {
          const pos = heartPositions[i];
          const rotation = seededRandom(i + 1) * 10 - 5;
          return (
            <div
              key={clip.id}
              className="video-reel heart-reel"
              onClick={() => openLb(i)}
              style={{
                left: `calc(50% + ${pos.x * 18}px)`,
                top: `calc(50% + ${pos.y * 18}px)`,
                "--rot": `${rotation}deg`,
                transform: `rotate(${rotation}deg) translate(-50%, -50%)`,
              }}
            >
              <Sprockets />
              <div style={{ position: "relative" }}>
                <img
                  src={clip.poster}
                  alt={clip.label}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "16 / 10",
                    objectFit: "cover",
                    display: "block",
                    filter: "saturate(.85) brightness(.8) contrast(1.05)",
                  }}
                />
                <div className="play-icon">
                  <svg width="16" height="18" viewBox="0 0 10 12" style={{ marginLeft: 2 }}>
                    <polygon points="0,0 10,6 0,12" fill="#d4af6a" />
                  </svg>
                </div>
              </div>
              <div className="reel-label">{clip.label}</div>
              <Sprockets />
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lbIndex >= 0 && (
        <Lightbox clips={CLIPS} index={lbIndex} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
      )}

      <style>{`
        .video-section {
          position: relative;
          width: 100%;
          background: #070707;
          padding: 6rem 1rem 4rem;
          overflow: hidden;
        }

        .video-heading {
          max-width: 600px;
          margin: 0 auto 3rem;
          text-align: center;
        }

        .video-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 400;
          color: #f3efe8;
          margin-bottom: 12px;
        }

        .video-subtitle {
          color: #9a948a;
          font-size: clamp(0.75rem, 1.2vw, 0.85rem);
          line-height: 1.7;
        }

        /* ── Scattered grid (mobile + tablet) ──────────────── */
        .video-scatter-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          padding: 0 0.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .video-reel {
          width: calc(50% - 8px);
          border-radius: 6px;
          overflow: hidden;
          background: #111;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(0,0,0,.6), 0 2px 8px rgba(0,0,0,.4);
          position: relative;
          will-change: transform, opacity;
        }

        .video-reel:hover {
          box-shadow: 0 12px 40px rgba(212,175,106,.15), 0 8px 30px rgba(0,0,0,.6);
        }

        @media (min-width: 480px) {
          .video-reel {
            width: calc(33.333% - 12px);
          }
        }

        @media (min-width: 768px) {
          .video-scatter-grid {
            gap: 18px;
          }
          .video-reel {
            width: calc(25% - 16px);
          }
        }

        /* Hide scattered grid on large screens, show heart */
        @media (min-width: 960px) {
          .video-scatter-grid {
            display: none;
          }
        }

        /* ── Heart layout (desktop) ────────────────────────── */
        .video-heart-layout {
          display: none;
          position: relative;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          height: 600px;
        }

        @media (min-width: 960px) {
          .video-heart-layout {
            display: block;
          }
        }

        .heart-reel {
          position: absolute;
          width: 140px;
          transform-origin: center center;
          z-index: 1;
          transition: transform 0.4s ease, box-shadow 0.4s ease, z-index 0s;
        }

        .heart-reel:hover {
          z-index: 10;
          transform: rotate(0deg) translate(-50%, -50%) scale(1.15) !important;
          box-shadow: 0 16px 50px rgba(212,175,106,.2), 0 8px 30px rgba(0,0,0,.6);
        }

        /* ── Sprockets ─────────────────────────────────────── */
        .sprocket-row {
          position: absolute;
          left: 0;
          right: 0;
          height: 10px;
          z-index: 3;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: #000;
        }

        .sprocket-hole {
          width: 4px;
          height: 4px;
          border-radius: 1px;
          background: #070707;
        }

        /* ── Play icon ─────────────────────────────────────── */
        .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0,0,0,.55);
          border: 1px solid rgba(212,175,106,.45);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .video-reel:hover .play-icon {
          transform: translate(-50%, -50%) scale(1.1);
          background: rgba(0,0,0,.7);
        }

        /* ── Reel label ────────────────────────────────────── */
        .reel-label {
          padding: 8px 10px;
          font-family: 'Poppins', sans-serif;
          font-size: 11px;
          color: #9a948a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Lightbox ──────────────────────────────────────── */
        .video-lightbox {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lb-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.92);
        }

        .lb-player {
          position: relative;
          z-index: 2;
          width: 95vw;
          max-width: 900px;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,.7);
          aspect-ratio: 16 / 9;
        }

        @media (min-width: 640px) {
          .lb-player {
            width: 85vw;
          }
        }

        @media (min-width: 960px) {
          .lb-player {
            width: 75vw;
          }
        }

        .lb-no-video {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9a948a;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
        }

        .lb-caption {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          color: #9a948a;
          font-family: 'Poppins', sans-serif;
          font-size: 13px;
          white-space: nowrap;
        }

        .lb-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 5;
          background: rgba(0,0,0,.5);
          border: 1px solid rgba(212,175,106,.4);
          color: #d4af6a;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 22px;
          line-height: 1;
          transition: background 0.2s;
        }

        .lb-close-btn:hover {
          background: rgba(212,175,106,.15);
        }

        .lb-arrow-btn {
          position: absolute;
          z-index: 5;
          background: rgba(0,0,0,.45);
          border: 1px solid rgba(212,175,106,.4);
          color: #d4af6a;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 24px;
          transition: background 0.2s;
        }

        .lb-arrow-btn:hover {
          background: rgba(212,175,106,.15);
        }

        .lb-prev { left: 12px; top: 50%; transform: translateY(-50%); }
        .lb-next { right: 12px; top: 50%; transform: translateY(-50%); }

        @media (max-width: 500px) {
          .lb-arrow-btn { display: none; }
          .lb-close-btn { top: 10px; right: 10px; width: 36px; height: 36px; font-size: 20px; }
        }
      `}</style>
    </section>
  );
}
