"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const REASONS = [
  { num: "01", title: "I love how deeply you love God", text: "Your relationship with God isn't just something you talk about, it's something you live. It inspires me and constantly reminds me to grow closer to Him too." },
  { num: "02", title: "I love how intentional you are", text: "Nothing ever feels random with you. Whether it's planning a date, making my favorite meal, giving intentional advice, constantly wanting to spend time with me or simply checking in on me, you love with purpose." },
  { num: "03", title: "I love how safe you make me feel", text: "With you, I've never had to question whether I'm loved. You see me, you hear me, and you make my heart feel at home." },
  { num: "04", title: "I love your kindness and tender heart", text: "The way you care for your family, your friends, and even strangers is one of the most beautiful things about you. Your heart is truly rare." },
  { num: "05", title: "I love how you choose me loudly", text: "You're never afraid to show your love. The way you pull me close, celebrate me, and proudly love me makes me feel incredibly cherished." },
  { num: "06", title: "I love that you pay attention", text: "You remember the little things, the meals I love, the phone I wanted, the small details I casually mention. You make me feel important in the most effortless way." },
  { num: "07", title: "I love that you make me want to become a better woman", text: "Loving you has challenged me to be more considerate, more open, more punctual, and more intentional. You inspire growth without ever forcing it." },
  { num: "08", title: "I love the joy you bring into every room", text: "Whether you're playing basketball, making music, cooking, or simply laughing, your happiness is contagious. Seeing you happy has become one of my favorite things." },
  { num: "09", title: "I love the life we're building together", text: "Praying together, having honest conversations, dreaming about the future, supporting each other, and growing through every challenge, we're already building something beautiful." },
  { num: "10", title: "I love you because you're you", text: "Your heart, Your mind, Your strength, Your gentleness, Your confidence, Your faith, Your smile, Your love, Every version of you has become one of my favorite parts of my life, and I thank God every day for bringing you to me Michael Chukwudozie Obiagwu." },
];

function ReasonCard({ reason, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      style={{
        display: "flex",
        gap: "clamp(1rem, 2vw, 1.5rem)",
        alignItems: "flex-start",
        padding: "1.5rem 0",
        borderBottom: "1px solid rgba(201,169,110,0.07)",
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(0.6rem, 1vw, 0.7rem)",
          letterSpacing: "0.1em",
          color: "#d4af6a",
          opacity: 0.5,
          flexShrink: 0,
          paddingTop: "0.15em",
        }}
      >
        {reason.num}
      </span>

      {/* Content */}
      <div>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#f3efe8",
            lineHeight: 1.7,
            marginBottom: "0.4rem",
          }}
        >
          {reason.title}
          <span style={{ color: "#d4af6a" }}>🖤</span>
        </p>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
            fontWeight: 300,
            color: "rgba(243,239,232,0.55)",
            lineHeight: 1.8,
          }}
        >
          {reason.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ReasonsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      id="reasons"
      style={{
        position: "relative",
        width: "100%",
        background: "#070707",
        padding: "8rem 1.5rem",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          height: "50vh",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 700,
          margin: "0 auto 4rem",
          textAlign: "center",
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
          In No Particular Order
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 400,
            color: "#f3efe8",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}
        >
          Reasons I Love You
        </h2>
        <div
          style={{
            width: 50,
            height: 1,
            margin: "0 auto",
            background: "linear-gradient(to right, transparent, #d4af6a, transparent)",
          }}
        />
      </motion.div>

      {/* List */}
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        {REASONS.map((reason, i) => (
          <ReasonCard key={reason.num} reason={reason} index={i} />
        ))}
      </div>

      {/* Closing line */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          textAlign: "center",
          marginTop: "4rem",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
          letterSpacing: "0.15em",
          color: "#9a948a",
        }}
      >
        ...and a thousand more I haven&apos;t found the words for yet.
      </motion.p>

      {/* Corner accents */}
      <div style={{ position: "absolute", top: "2.5rem", left: "2.5rem", width: 36, height: 36, borderTop: "1px solid rgba(201,169,110,0.1)", borderLeft: "1px solid rgba(201,169,110,0.1)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", width: 36, height: 36, borderBottom: "1px solid rgba(201,169,110,0.1)", borderRight: "1px solid rgba(201,169,110,0.1)", pointerEvents: "none" }} />
    </section>
  );
}
