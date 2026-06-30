"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const CHAPTERS = [
  {
    year: "2019",
    title: "The First Chapter",
    description: "A glance across a crowded café. Two strangers, one shared moment that redefined everything.",
    image: "/images/MIKE 1.jpeg",
    archive: "AUTHENTIC ARCHIVE \u2022 001/2019",
  },
  {
    year: "2020",
    title: "Through the Storm",
    description: "The world paused, but we didn't. Distance tested us, and we emerged unbreakable.",
    image: "/images/AFOMA 2.png",
    archive: "AUTHENTIC ARCHIVE \u2022 002/2020",
  },
  {
    year: "2021",
    title: "Building Home",
    description: "Two lives weaving into one. Every small ritual, every quiet morning \u2014 a foundation laid in love.",
    image: "/images/MIKE 2.jpeg",
    archive: "AUTHENTIC ARCHIVE \u2022 003/2021",
  },
  {
    year: "2022",
    title: "The Adventure Begins",
    description: "New cities, new memories. The world became ours to explore, hand in hand.",
    image: "/images/AFOMA 2.png",
    archive: "AUTHENTIC ARCHIVE \u2022 004/2022",
  },
  {
    year: "2023",
    title: "Deeper Roots",
    description: "Love matured into something unshakable. We learned that forever is built one day at a time.",
    image: "/images/MIKE 3.jpeg",
    archive: "AUTHENTIC ARCHIVE \u2022 005/2023",
  },
  {
    year: "2024",
    title: "Five Years of Eternity",
    description: "Half a decade, and it still feels like the beginning. Here\u2019s to every chapter yet to come.",
    image: "/images/AFOMA 3.jpeg",
    archive: "AUTHENTIC ARCHIVE \u2022 006/2024",
  },
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  left: `${(i * 37 + 13) % 100}%`,
  size: 1 + (i % 4) * 0.5,
  duration: 12 + (i % 7) * 4,
  delay: (i % 5) * 2.5,
  anim: i % 2 === 0 ? "float-up" : "float-up-alt",
  opacity: 0.15 + (i % 4) * 0.1,
}));

// Individual Chapter Card with its own local parallax
function ChapterCard({ chapter, index, scrollYProgress }) {
  // Parallax the image within its container based on overall scroll
  // The images will move at different speeds based on their index to create depth
  const yOffset = useTransform(scrollYProgress, [0, 1], [-100 + index * 10, 100 - index * 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div className="chapter-wrapper">
      {/* Background Image Container with Overflow Hidden */}
      <div className={`chapter-img-container ${index % 2 === 0 ? 'even' : 'odd'}`}>
        <motion.div
          style={{
            position: "absolute",
            inset: -40,
            y: yOffset,
            scale,
          }}
        >
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            sizes="(max-width: 768px) 90vw, 800px"
            style={{
              objectFit: "cover",
              filter: "brightness(0.65) contrast(1.1) saturate(0.8)",
            }}
          />
        </motion.div>
        
        {/* Decorative inner border */}
        <div style={{
          position: "absolute",
          inset: "1rem",
          border: "1px solid rgba(201,169,110,0.2)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Floating Glassmorphism Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px", once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`chapter-info-card ${index % 2 === 0 ? 'even' : 'odd'}`}
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(201,169,110,0.6)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(201,169,110,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <span style={{ 
            fontFamily: "'Cinzel', serif", 
            fontSize: "1.2rem", 
            color: "var(--accent-gold)",
            textShadow: "0 0 10px rgba(201,169,110,0.4)"
          }}>
            {chapter.year}
          </span>
          <div style={{ height: "1px", flex: 1, background: "linear-gradient(to right, var(--accent-gold), transparent)" }} />
        </div>
        
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2rem",
          color: "white",
          marginBottom: "1rem",
          lineHeight: 1.2
        }}>
          {chapter.title}
        </h2>
        
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.8,
          fontWeight: 300
        }}>
          {chapter.description}
        </p>

        <p style={{
          marginTop: "2rem",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          color: "var(--accent-gold)",
          opacity: 0.6,
          textTransform: "uppercase"
        }}>
          {chapter.archive}
        </p>
      </motion.div>
    </div>
  );
}

export default function TimelineSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the total width to translate. We have N chapters, each taking up width.
  // We want to translate horizontally based on vertical scroll.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(CHAPTERS.length - 1) * 100}vw`]);

  return (
    <section 
      ref={targetRef} 
      style={{ 
        position: "relative", 
        height: `${CHAPTERS.length * 100}vh`, 
        background: "#030305" 
      }}
      id="story"
    >
      {/* Sticky container that stays in view while we scroll through the tall section */}
      <div 
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient animated glows */}
        <motion.div
          style={{
            position: "absolute",
            top: "20%",
            left: "20%",
            width: "50vw",
            height: "50vh",
            background: "radial-gradient(ellipse, rgba(201,169,110,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
          animate={{ x: [0, 100, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating gold dust particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: "-5%",
              left: p.left,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "var(--accent-gold)",
              opacity: p.opacity,
              pointerEvents: "none",
              animation: `${p.anim} ${p.duration}s ${p.delay}s linear infinite`,
            }}
          />
        ))}

        {/* Global Progress Line across the screen */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.05)",
          zIndex: 0,
          pointerEvents: "none"
        }}>
          {/* Animated glowing head of the line */}
          <motion.div 
            style={{
              position: "absolute",
              top: -1,
              left: 0,
              width: "15vw",
              height: "3px",
              background: "linear-gradient(to right, transparent, var(--accent-gold))",
              boxShadow: "0 0 20px var(--accent-gold)",
              // Bind the line's position to the scroll progress so it feels like it's driving the timeline
              left: useTransform(scrollYProgress, [0, 1], ["-15vw", "100vw"])
            }}
          />
        </div>

        <motion.div 
          style={{ 
            x, 
            display: "flex",
            gap: 0,
            paddingLeft: "10vw", // Initial padding so first item isn't flush
            paddingRight: "50vw", // Padding at end to allow scrolling past
          }}
        >
          {CHAPTERS.map((chapter, index) => (
            <ChapterCard 
              key={chapter.year} 
              chapter={chapter} 
              index={index} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        .chapter-wrapper {
          position: relative;
          width: 100vw;
          max-width: 800px;
          height: 70vh;
          max-height: 800px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 1rem;
        }
        .chapter-img-container {
          position: absolute;
          top: 10%;
          left: 5%;
          width: 90%;
          height: 80%;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(201,169,110,0.15);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        }
        .chapter-info-card {
          position: relative;
          z-index: 10;
          background: rgba(10, 10, 15, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(201,169,110,0.3);
          border-top: 1px solid rgba(201,169,110,0.5);
          border-left: 1px solid rgba(201,169,110,0.5);
          border-radius: 8px;
          padding: 1.5rem;
          width: 90vw;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(201,169,110,0.05);
          margin-top: 40%;
        }
        
        @media (min-width: 768px) {
          .chapter-wrapper {
            padding: 2rem;
          }
          .chapter-img-container {
            width: 70%;
          }
          .chapter-img-container.even { left: 5%; }
          .chapter-img-container.odd { left: 25%; }
          
          .chapter-info-card {
            padding: 2.5rem;
            width: 420px;
            margin-top: 0;
          }
          .chapter-info-card.even { margin-left: 40%; margin-top: 20%; }
          .chapter-info-card.odd { margin-left: -40%; margin-top: -20%; }
        }
      `}</style>
    </section>
  );
}
