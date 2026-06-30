"use client";

import DiagonalMarquee from "./DiagonalMarquee";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <DiagonalMarquee />

      {/* Dark overlay — dim the photo wall but keep outlines visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.45) 50%, rgba(5,5,8,0.3) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Radial vignette for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 10%, rgba(5,5,8,0.5) 70%, rgba(5,5,8,0.8) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Text overlay — no card, directly on the dark overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "2rem",
        }}
      >
        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
            fontWeight: 400,
            color: "var(--accent-gold)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Two Hearts, One Story
        </p>

        {/* Names */}
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            fontWeight: 400,
            color: "var(--foreground)",
            letterSpacing: "0.03em",
            lineHeight: 1,
            marginBottom: "1.5rem",
          }}
        >
          Mike
          <span
            style={{
              display: "inline-block",
              margin: "0 0.3em",
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.65em",
              color: "var(--accent-gold)",
              fontWeight: 400,
              verticalAlign: "middle",
            }}
          >
            &amp;
          </span>
          Afoma
        </h1>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 1,
            margin: "0 auto 1.5rem",
            background:
              "linear-gradient(to right, transparent, var(--accent-gold), transparent)",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
            fontWeight: 300,
            color: "var(--muted)",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
          }}
        >
          Celebrating Our First Month
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            fontWeight: 400,
            color: "var(--foreground)",
            letterSpacing: "0.05em",
            marginBottom: "1rem",
          }}
        >
          Together🖤💜
        </p>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)",
            fontWeight: 300,
            color: "var(--muted)",
            letterSpacing: "0.06em",
            marginBottom: "2.5rem",
          }}
        >
          The first of many beautiful memories, by God&apos;s grace🙏
        </p>

        {/* CTA Button */}
        <button
          onClick={() => {
            document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--background)",
            background: "var(--accent-gold)",
            border: "none",
            padding: "1rem 2.5rem",
            borderRadius: 0,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "var(--accent-gold-light)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "var(--accent-gold)";
          }}
        >
          Begin Our Story &darr;
        </button>

        {/* Date */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
            fontWeight: 400,
            color: "var(--accent-gold)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: "3rem",
            opacity: 0.6,
          }}
        >
          May 27, 2026
        </p>
      </div>
    </section>
  );
}
