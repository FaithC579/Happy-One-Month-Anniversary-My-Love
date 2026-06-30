"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Placeholder sounds via Web Audio API ─────────────────── */
function playBounceSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch {}
}

function playPaperSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    }
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = "highpass";
    filter.frequency.value = 2000;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch {}
}

/* ── Basketball SVG ──────────────────────────────────────── */
function Basketball({ style }) {
  return (
    <svg viewBox="0 0 120 120" style={style}>
      {/* Ball body */}
      <circle cx="60" cy="60" r="58" fill="#c67a2e" stroke="#a0591a" strokeWidth="2" />
      {/* Seams */}
      <path
        d="M60 2 Q60 60 60 118"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.8"
        opacity="0.5"
      />
      <path
        d="M2 60 Q60 60 118 60"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.8"
        opacity="0.5"
      />
      <path
        d="M18 18 Q60 45 102 18"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path
        d="M18 102 Q60 75 102 102"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        opacity="0.4"
      />
      {/* Highlight */}
      <ellipse cx="42" cy="38" rx="16" ry="10" fill="rgba(255,255,255,0.12)" transform="rotate(-30 42 38)" />
    </svg>
  );
}

/* ── Envelope SVG ────────────────────────────────────────── */
function Envelope({ isOpen, style }) {
  return (
    <svg viewBox="0 0 200 140" style={style}>
      {/* Envelope body */}
      <rect x="2" y="30" width="196" height="108" rx="4" fill="#c67a2e" stroke="#a0591a" strokeWidth="2" />
      {/* Basketball texture on body */}
      <path d="M100 30 Q100 85 100 138" fill="none" stroke="#1a1a1a" strokeWidth="1" opacity="0.25" />
      <path d="M2 84 Q100 84 198 84" fill="none" stroke="#1a1a1a" strokeWidth="1" opacity="0.25" />
      <path d="M30 45 Q100 65 170 45" fill="none" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.2" />
      <path d="M30 120 Q100 100 170 120" fill="none" stroke="#1a1a1a" strokeWidth="0.8" opacity="0.2" />
      {/* Flap - closed points DOWN into envelope, open points UP */}
      <motion.path
        fill="#b56d24"
        stroke="#a0591a"
        strokeWidth="2"
        initial={{ d: "M2 30 L100 85 L198 30" }}
        animate={isOpen ? { d: "M2 30 L100 -50 L198 30" } : { d: "M2 30 L100 85 L198 30" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      {/* Inner shadow when open */}
      {isOpen && (
        <motion.rect
          x="10"
          y="32"
          width="180"
          height="20"
          rx="2"
          fill="rgba(0,0,0,0.2)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      )}
      {/* Seam lines on flap */}
      <motion.path
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="0.8"
        initial={{ d: "M50 50 L100 75 L150 50", opacity: 0.2 }}
        animate={isOpen ? { opacity: 0 } : { d: "M50 50 L100 75 L150 50", opacity: 0.2 }}
      />
    </svg>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function BasketballReveal({ onComplete }) {
  const [stage, setStage] = useState("bounce"); // bounce -> settle -> morph -> ready -> open -> unfold -> done
  const bounceCount = useRef(0);
  const audioPlayed = useRef(false);

  // Bounce sequence
  useEffect(() => {
    if (stage !== "bounce") return;

    const bounceTimings = [0, 400, 700, 950, 1150, 1300];
    const timers = bounceTimings.map((delay, i) =>
      setTimeout(() => {
        if (!audioPlayed.current) {
          playBounceSound();
          audioPlayed.current = true;
        }
        bounceCount.current = i;
        if (i === bounceTimings.length - 1) {
          setTimeout(() => setStage("settle"), 300);
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  // Settle -> morph -> ready
  useEffect(() => {
    if (stage !== "settle") return;
    const t1 = setTimeout(() => setStage("morph"), 700);
    const t2 = setTimeout(() => setStage("ready"), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stage]);

  const handleEnvelopeClick = useCallback(() => {
    if (stage === "ready") {
      setStage("open");
      playPaperSound();
      setTimeout(() => {
        setStage("unfold");
        setTimeout(() => {
          setStage("done");
          onComplete?.();
        }, 1200);
      }, 800);
    }
  }, [stage, onComplete]);

  if (stage === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="gate"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#050508",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: stage === "ready" ? "pointer" : "default",
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Basketball bouncing in */}
        {(stage === "bounce" || stage === "settle") && (
          <motion.div
            initial={{ x: "40vw", y: "-40vh", scale: 0.6, rotate: 0 }}
            animate={
              stage === "settle"
                ? { x: 0, y: 0, scale: 1, rotate: 360 }
                : {
                    x: [
                      "30vw", "-8vw", "15vw", "-4vw", "8vw", "0vw",
                    ],
                    y: [
                      "-30vh", "10vh", "-5vh", "3vh", "-1vh", "0vh",
                    ],
                    scale: [0.6, 1, 0.85, 0.95, 0.9, 1],
                    rotate: [0, 180, 360, 540, 720, 900],
                  }
            }
            transition={
              stage === "settle"
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 1.6, times: [0, 0.25, 0.5, 0.7, 0.85, 1], ease: "easeOut" }
            }
          >
            <Basketball
              style={{
                width: "clamp(100px, 20vw, 160px)",
                height: "clamp(100px, 20vw, 160px)",
                filter: "drop-shadow(0 8px 30px rgba(198,122,46,0.3))",
              }}
            />
          </motion.div>
        )}

        {/* Morph: ball -> envelope */}
        {stage === "morph" && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => setStage("ready")}
          >
            <Basketball
              style={{
                width: "clamp(100px, 20vw, 160px)",
                height: "clamp(100px, 20vw, 160px)",
              }}
            />
          </motion.div>
        )}

        {/* Ready: envelope with tap prompt */}
        {stage === "ready" && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={handleEnvelopeClick}
            style={{ textAlign: "center" }}
          >
            <Envelope
              isOpen={false}
              style={{
                width: "clamp(180px, 35vw, 300px)",
                height: "auto",
                filter: "drop-shadow(0 12px 40px rgba(198,122,46,0.25))",
              }}
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
                letterSpacing: "0.3em",
                color: "rgba(201,169,110,0.6)",
                marginTop: "2rem",
                textTransform: "uppercase",
              }}
            >
              Tap to open
            </motion.p>
          </motion.div>
        )}

        {/* Opening + unfold */}
        {(stage === "open" || stage === "unfold") && (
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={
              stage === "unfold"
                ? { scale: 15, opacity: 0 }
                : { scale: 1.1, y: -20 }
            }
            transition={
              stage === "unfold"
                ? { duration: 1.2, ease: "easeIn" }
                : { duration: 0.6, ease: "easeOut" }
            }
          >
            <Envelope
              isOpen={true}
              style={{
                width: "clamp(180px, 35vw, 300px)",
                height: "auto",
                filter: "drop-shadow(0 12px 40px rgba(198,122,46,0.25))",
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
