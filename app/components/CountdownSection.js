"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-07-27T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, reached: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    reached: false,
  };
}

function TimeUnit({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 400,
          color: "#f3efe8",
          lineHeight: 1,
          minWidth: "clamp(50px, 10vw, 80px)",
          padding: "0.3em 0",
          background: "rgba(201,169,110,0.04)",
          border: "1px solid rgba(201,169,110,0.08)",
          borderRadius: 4,
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <p
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(0.45rem, 0.8vw, 0.55rem)",
          letterSpacing: "0.25em",
          color: "rgba(201,169,110,0.5)",
          marginTop: "0.6em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="countdown"
      style={{
        position: "relative",
        width: "100%",
        background: "#070707",
        padding: "6rem 1.5rem",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40vw",
          height: "40vh",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(212,160,160,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.48rem, 0.85vw, 0.6rem)",
            letterSpacing: "0.35em",
            color: "#d4af6a",
            opacity: 0.5,
            textTransform: "uppercase",
            marginBottom: "0.7rem",
          }}
        >
          Counting Every Second
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 400,
            color: "#f3efe8",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
          }}
        >
          Until Our Next Month
        </h2>

        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
            fontWeight: 300,
            color: "rgba(243,239,232,0.4)",
            marginBottom: "3rem",
          }}
        >
          July 27, 2026
        </p>

        {/* Countdown grid */}
        {time.reached ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#d4af6a",
              lineHeight: 1.6,
            }}
          >
            Happy Two Months, my love 🖤
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(0.8rem, 2vw, 1.5rem)",
            }}
          >
            <TimeUnit value={time.days} label="Days" />
            <TimeUnit value={time.hours} label="Hours" />
            <TimeUnit value={time.minutes} label="Minutes" />
            <TimeUnit value={time.seconds} label="Seconds" />
          </motion.div>
        )}

        {/* Decorative line */}
        <div
          style={{
            width: 50,
            height: 1,
            margin: "3rem auto 0",
            background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)",
          }}
        />
      </motion.div>

      {/* Corner accents */}
      <div style={{ position: "absolute", top: "2.5rem", left: "2.5rem", width: 36, height: 36, borderTop: "1px solid rgba(201,169,110,0.1)", borderLeft: "1px solid rgba(201,169,110,0.1)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", width: 36, height: 36, borderBottom: "1px solid rgba(201,169,110,0.1)", borderRight: "1px solid rgba(201,169,110,0.1)", pointerEvents: "none" }} />
    </section>
  );
}
