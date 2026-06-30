"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function PrayerSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      id="prayer"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#070707",
        padding: "6rem 1.5rem",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(212,160,160,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          position: "relative",
          zIndex: 1,
        }}
      >
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
          Lifted Up In Faith
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 400,
            color: "#f3efe8",
            lineHeight: 1.15,
          }}
        >
          A Prayer for You and Us{" "}
          <span style={{ color: "#e8c4c4" }}>🤍</span>
        </h2>
      </motion.div>

      {/* Prayer card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        style={{
          position: "relative",
          width: "min(640px, 92vw)",
          background:
            "linear-gradient(175deg, rgba(250,246,239,0.04) 0%, rgba(242,234,220,0.02) 100%)",
          border: "1px solid rgba(201,169,110,0.08)",
          borderRadius: "4px",
          padding: "clamp(2.5rem, 6vw, 3.5rem) clamp(2rem, 5vw, 3rem)",
          boxShadow:
            "0 24px 70px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)",
          zIndex: 1,
        }}
      >
        {/* Decorative cross */}
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(201,169,110,0.3), transparent)",
          }}
        />

        {/* Text content */}
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.78rem, 1.3vw, 0.9rem)",
            color: "rgba(243,239,232,0.7)",
            lineHeight: 2,
            textAlign: "center",
          }}
        >
          <p style={{ fontStyle: "italic", color: "#f3efe8", marginBottom: "1.5em", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)" }}>
            Heavenly Father,
          </p>

          <p style={{ marginBottom: "1.2em" }}>
            Today, my heart is filled with gratitude. Thank You for Michael. Thank You for the man he is, the kindness in his heart, the wisdom he seeks, the love he gives so freely, and the way he reflects your goodness in so many little ways. Continue to strengthen him, protect him, and bless the work of his hands. May he continue to walk boldly in the purpose You have prepared for him, and may his heart always remain soft toward You.
          </p>

          <p style={{ marginBottom: "1.2em" }}>
            Lord, thank You for bringing us together in a way only You could. What seemed like an ordinary day became the beginning of one of the greatest blessings of my life. Thank You for every laugh, every conversation, every prayer, every lesson, and every moment that has brought us closer to each other and closer to You.
          </p>

          <p style={{ marginBottom: "1.2em" }}>
            As we continue this journey, teach us to love the way You love, with patience, grace, kindness, humility, honesty, and forgiveness. Help us always choose understanding over pride, peace over anger, and unity over division.
          </p>

          <p style={{ marginBottom: "1.2em" }}>
            May our relationship always point back to You. Be the foundation we stand on, the voice that guides us, and the peace that keeps us. Protect what we&apos;re building from anything that doesn&apos;t come from You, and help us become the people You&apos;ve called us to be, both individually and together.
          </p>

          <p style={{ marginBottom: "1.2em" }}>
            May we celebrate many more anniversaries by Your grace. May we laugh together, pray together, grow together, overcome every challenge together, and never lose sight of the reason You brought us into each other&apos;s lives.
          </p>

          <p style={{ marginBottom: "1.5em", fontStyle: "italic", color: "#f3efe8" }}>
            Above all, may our love glorify You.
          </p>

          <p style={{ marginBottom: "2em" }}>
            Thank You for being everything I prayed for and so much more than I ever imagined. I love you, my sweetness
            <span style={{ color: "#d4af6a" }}>🖤🖤🖤</span>
          </p>

          {/* Divider */}
          <div
            style={{
              width: 60,
              height: 1,
              margin: "0 auto 2em",
              background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)",
            }}
          />

          <p style={{ marginBottom: "0.5em", fontStyle: "italic", color: "rgba(243,239,232,0.6)" }}>
            May we always remain a cord of three strands...you, me, and God woven together by His love and strengthened by His grace.
          </p>

          <p style={{ marginBottom: "0.4em", fontStyle: "italic", color: "rgba(243,239,232,0.5)", fontSize: "clamp(0.7rem, 1.1vw, 0.8rem)" }}>
            &ldquo;A cord of three strands is not quickly broken.&rdquo;
          </p>

          <p style={{ marginBottom: "2em", fontStyle: "italic", color: "rgba(201,169,110,0.5)", fontSize: "clamp(0.65rem, 1vw, 0.75rem)", letterSpacing: "0.1em" }}>
            Ecclesiastes 4:12
          </p>

          <p style={{ marginBottom: "1.5em", fontStyle: "italic", color: "#f3efe8", fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)" }}>
            In Jesus name, Amen
            <span style={{ color: "#d4af6a" }}> 🙏</span>
          </p>

          <div
            style={{
              width: 40,
              height: 1,
              margin: "0 auto 1.5em",
              background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)",
            }}
          />

          <p style={{ fontStyle: "italic", color: "rgba(243,239,232,0.5)", fontSize: "clamp(0.7rem, 1.1vw, 0.8rem)" }}>
            Here&apos;s to our first month and to every chapter God has already written for us
            <span style={{ fontSize: "1em" }}> 🥹</span>
            <br />
            Happy One Month, my love
            <span style={{ color: "#d4af6a" }}>🖤🖤</span>
          </p>
        </div>
      </motion.div>

      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: "2.5rem",
          left: "2.5rem",
          width: 36,
          height: 36,
          borderTop: "1px solid rgba(201,169,110,0.1)",
          borderLeft: "1px solid rgba(201,169,110,0.1)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2.5rem",
          width: 36,
          height: 36,
          borderBottom: "1px solid rgba(201,169,110,0.1)",
          borderRight: "1px solid rgba(201,169,110,0.1)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
