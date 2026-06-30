"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const FULL_TEXT = `My Sweetest Michael🖤

Happy one-month anniversary, baby🥹🤍

Can you actually believe we're here already? Our very first anniversary. Thirty beautiful days of choosing each other, learning each other, praying together, growing together, and loving each other. God has been so incredibly good to us, and today my heart is simply overflowing with gratitude.

Sometimes I think back to that pool party where we met, and it amazes me that what seemed like an ordinary day was actually God's beautiful way of bringing two people together. We had no idea that He was writing the beginning of our story, but He did. Looking back now, I can't help but smile because I know this wasn't coincidence, it was grace.

Michael, to know you is truly to love you.

You have one of the most beautiful hearts I've ever encountered. The way you care so deeply for the people around you, the way you're intentional with your words and your actions, the way you love God so sincerely, and the way you're constantly striving to become a better man inspire me every single day. You're not only an amazing partner, you are a wonderful son, brother, friend, and simply a genuinely beautiful soul. Thinking about you still makes my heart race.

I admire how hardworking you are, how dedicated you are to everything you do, how punctual and dependable you are, how confidently you carry yourself, and how quickly your mind works. I love watching you plan things so thoughtfully, and I love that you're always willing to help the people around you. You make excellence look effortless, yet you remain humble through it all.

Then there are the little things that have quietly become some of my favorite memories.

The way you cook for me. The way you always pay attention. The way you pull me close without hesitation. The excitement in your eyes whenever you're playing basketball. The joy music brings you, and I'm proud of you for releasing "Dance" this year. The way you agree to take me for my dance shoots, making my favorite meals, adding me to your Spotify and Netflix because you wanted me to be part of your everyday life.

Those moments may seem small, but to me they speak the loudest. They remind me that love isn't only found in grand gestures, it's found in consistency, thoughtfulness, and showing up every single day.

This month hasn't been perfect, and I'm grateful for that too. We faced moments where we saw things differently, but instead of letting those moments pull us apart, we chose to understand each other better. We listened. We learned. We grew. We came out stronger, and I believe God used even those moments to strengthen what we're building together.

One of my favorite memories isn't just one memory, it's all of them. From the day you asked me to be your girlfriend, to surprising me with the exact phone I wanted, going to the gym together, praying together, having honest conversations about our future, encouraging each other, laughing together, and simply enjoying being in each other's presence. Even playing basketball with you for that short time became a memory I'll always treasure because I got to experience something you love alongside you.

Baby, loving you has changed me.

You've taught me to be more considerate, to see situations from different perspectives, to be more open, and yes… even to be more punctual. But more than that, you've helped heal parts of the little girl inside me that I didn't even realize still needed healing. Loving you has reminded me that God still writes beautiful stories and that He still answers prayers in ways we never expect.

You told me this morning that I'm God's intentional gift to you. The truth is, I feel incredibly blessed too.

Thank you for seeing me. Thank you for appreciating the little parts of me that I sometimes overlook. Thank you for making me feel safe, deeply loved, and completely accepted.

I knew I loved you when I realized you treated me the way someone treats their favorite football team. You learned me, my strengths, my flaws, my little quirks. You showed up and stayed committed even when things weren't easy. You celebrated my victories like they were your own, encouraged me when I couldn't see clearly, and even on my worst days, you never stopped speaking life into me. With you, I've never had to question whether I'm loved. That's one of the greatest gifts you've given me.

Our relationship has shown me what it looks like to put God at the center. Every prayer we've shared has drawn me closer to Him, made me more self-aware, and reminded me that love grows best when He remains at the heart of it.

As we celebrate this first month together, my prayer is simple: may God continue to guide us, teach us, protect what we're building, and help us keep choosing each other with grace, patience, understanding, and love.

If this is what one month feels like, then I'm excited to see what God writes in the chapters ahead. There is no place I'd rather be than right here with you.

Thank you for loving me so gently, so intentionally, and so wholeheartedly.

Happy one-month anniversary, Obim

I love you more than words will ever be able to hold.

Always yours,
Your Afomachukwu🤍

P.S. I'm glad I came to the pool party`;

const TYPING_SPEED = 22;

export default function LoveLetterSection() {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });

  const startedRef = useRef(false);
  const inViewRef = useRef(false);

  // Keep inViewRef in sync with inView without being a dep of the interval effect
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  const done = displayed.length >= FULL_TEXT.length;

  useEffect(() => {
    const id = setInterval(() => {
      // Wait until the letter is in view for the first time
      if (!inViewRef.current && !startedRef.current) return;

      // Once in view, mark as started and never stop
      if (inViewRef.current && !startedRef.current) {
        startedRef.current = true;
      }

      // Only advance if we've started
      if (!startedRef.current) return;

      setDisplayed((prev) => {
        if (prev.length >= FULL_TEXT.length) {
          clearInterval(id);
          return prev;
        }
        return FULL_TEXT.slice(0, prev.length + 1);
      });
    }, TYPING_SPEED);

    return () => clearInterval(id);
  }, []); // ← empty: interval is created once and runs for the component lifetime

  const renderText = () => {
    const lines = displayed.split("\n");
    return lines.map((line, i) => {
      const isGreeting = i === 0 && line.startsWith("My Sweetest");
      const isBoldLine = line.startsWith("Michael, to know you");
      const isSignature = line === "Your Afomachukwu🤍";
      const isPS = line.startsWith("P.S.");
      const isClosing = line.startsWith("Always yours");

      if (line === "") {
        return <div key={i} style={{ height: "0.9em" }} />;
      }

      let fontSize = "clamp(0.68rem, 1.2vw, 0.78rem)";
      let fontWeight = 400;
      let fontStyle = "normal";
      let fontFamily = "'Poppins', sans-serif";
      let color = "#5c4f3f";
      let extraStyle = {};

      if (isGreeting) {
        fontSize = "clamp(0.9rem, 1.8vw, 1.1rem)";
        fontStyle = "italic";
      } else if (isBoldLine) {
        fontSize = "clamp(0.75rem, 1.4vw, 0.88rem)";
        fontWeight = 700;
        fontStyle = "italic";
      } else if (isSignature) {
        fontFamily = "'Playfair Display', serif";
        fontSize = "clamp(1.2rem, 2.5vw, 1.5rem)";
        fontWeight = 700;
        color = "#3a2a1a";
      } else if (isClosing) {
        fontStyle = "italic";
        fontSize = "clamp(0.7rem, 1.3vw, 0.82rem)";
      } else if (isPS) {
        fontStyle = "italic";
        fontSize = "clamp(0.65rem, 1.1vw, 0.75rem)";
        extraStyle = { marginTop: "1.5em" };
      }

      return (
        <span key={i} style={{ display: "block" }}>
          <span
            style={{
              fontFamily,
              fontSize,
              fontWeight,
              fontStyle,
              color,
              lineHeight: 1.85,
              letterSpacing: "0.01em",
              ...extraStyle,
            }}
          >
            {line}
          </span>
        </span>
      );
    });
  };

  return (
    <section
      ref={ref}
      id="letter"
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
            "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 60%)",
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
          From My Heart To Yours
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
          Afomachukwu&apos;s Letter
        </h2>
      </motion.div>

      {/* Letter paper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        style={{
          position: "relative",
          width: "min(560px, 90vw)",
          background:
            "linear-gradient(175deg, #faf6ef 0%, #f2eadc 40%, #e8dece 100%)",
          borderRadius: "2px",
          padding: "clamp(2.5rem, 6vw, 3.5rem) clamp(2rem, 5vw, 3rem)",
          boxShadow:
            "0 24px 70px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
          zIndex: 1,
        }}
      >
        {/* Ruled lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 1.75em, rgba(160,145,125,0.12) 1.75em, rgba(160,145,125,0.12) calc(1.75em + 1px))",
            pointerEvents: "none",
          }}
        />

        {/* Red margin */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "clamp(2.5rem, 5vw, 3rem)",
            width: "1px",
            background: "rgba(180,80,80,0.1)",
            pointerEvents: "none",
          }}
        />

        {/* Text */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {renderText()}
          {/* Cursor */}
          {!done && (
            <span
              style={{
                display: "inline-block",
                width: "0.55em",
                height: "1.1em",
                background: "#5c4f3f",
                marginLeft: "1px",
                verticalAlign: "text-bottom",
                animation: "blink 0.7s step-end infinite",
              }}
            />
          )}
        </div>

        {/* Corner fold */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 28,
            height: 28,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -14,
              right: -14,
              width: 28,
              height: 28,
              transform: "rotate(45deg)",
              background: "linear-gradient(135deg, #e0d5c2, #d5c8b4)",
              boxShadow: "-1px 1px 3px rgba(0,0,0,0.08)",
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

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