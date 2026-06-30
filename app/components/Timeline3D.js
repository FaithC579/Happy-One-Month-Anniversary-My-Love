"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

const CHAPTERS = [
  {
    year: "2025",
    dateStamp: "US 🖤💜 \u2022 24/12/2025",
    title: "The Beginning",
    text: "How two strangers, unaware that one moment would change everything.",
    image: "/images/AFOMA 2.png",
  },
  {
    year: "2026",
    dateStamp: "US 🖤💜",
    title: "Our First Movie Date",
    text: "The day the butterflies were real, we played games, watched Michael Jackson, and simply enjoyed each other's company.",
    image: "/videos/posters/Video 5.png",
  },
  {
    year: "2026",
    dateStamp: "US 🖤💜",
    title: "Falling in love",
    text: "From late-night conversations to shared laughter, our feelings grew into something beautiful",
    image: "/videos/posters/Video 1.png",
  },
  {
    year: "2026",
    dateStamp: "US 🖤💜",
    title: "Growing Together",
    text: "Learning each other, navigating challenges, celebrating wins, and choosing each other every day.",
    image: "/videos/posters/Video 3.png",
  },
  {
    year: "2026",
    dateStamp: "US 🖤💜",
    title: "Making Memories",
    text: "The adventures, inside jokes, special moments, and little memories that became our favourite stories.",
    image: "/videos/posters/Video 4.png",
  },
];

function seededRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ── Camera Rig ─────────────────────────────────────────────── */
function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const smoothPos = useRef(new THREE.Vector3());
  const smoothLookAt = useRef(new THREE.Vector3());

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      CHAPTERS.map((_, i) => {
        const t = i / (CHAPTERS.length - 1);
        const x = Math.sin(t * Math.PI * 2) * 3.5;
        const y = Math.cos(t * Math.PI * 3) * 0.8;
        const z = 14 - t * 28;
        return new THREE.Vector3(x, y, z);
      }),
      false,
      "catmullrom",
      0.5
    );
  }, []);

  useFrame(() => {
    const t = progressRef.current;

    const target = curve.getPointAt(t);
    const lookT = Math.min(t + 0.03, 1);
    const lookTarget = curve.getPointAt(lookT);

    const lerp = 0.06;
    smoothPos.current.lerp(target, lerp);
    smoothLookAt.current.lerp(lookTarget, lerp);

    camera.position.copy(smoothPos.current);
    camera.lookAt(smoothLookAt.current);
  });

  return null;
}

/* ── Photo Plane ────────────────────────────────────────────── */
function PhotoPlane({ chapter, index, total }) {
  const ref = useRef();
  const glowRef = useRef();

  const position = useMemo(() => {
    const t = (index + 0.8) / total;
    const x = Math.sin(t * Math.PI * 2) * 3.5;
    const y = Math.cos(t * Math.PI * 3) * 0.8;
    const z = 14 - t * 28;
    return [x, y, z];
  }, [index, total]);

  const rotation = useMemo(() => {
    return [0, 0, (index % 2 === 0 ? 1 : -1) * 0.06];
  }, [index]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y =
      position[1] + Math.sin(t * 0.5 + index * 1.8) * 0.12;
    ref.current.rotation.z =
      rotation[2] + Math.sin(t * 0.3 + index * 2) * 0.02;

    if (glowRef.current) {
      glowRef.current.material.opacity =
        0.08 + Math.sin(t * 0.7 + index) * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={ref} position={position} rotation={rotation}>
        {/* Ambient glow behind frame */}
        <mesh ref={glowRef} position={[0, 0, -0.2]}>
          <planeGeometry args={[3.2, 4.2]} />
          <meshBasicMaterial
            color="#c9a96e"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Gold frame outer */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2.7, 3.5]} />
          <meshBasicMaterial
            color="#c9a96e"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Dark inset */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.55, 3.35]} />
          <meshBasicMaterial color="#0a0a0f" side={THREE.DoubleSide} />
        </mesh>

        {/* Photo */}
        <Image
          url={chapter.image}
          alt={chapter.title}
          scale={[2.45, 3.25, 1]}
          position={[0, 0, 0.01]}
          toneMapped={false}
        />

        {/* Inner gold accent line */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[2.5, 3.3]} />
          <meshBasicMaterial
            color="#c9a96e"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Gold Ember Particles ───────────────────────────────────── */
function GoldEmbers() {
  const ref = useRef();
  const count = 300;

  const [positions, sizes, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3) - 0.5) * 24;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 14;
      pos[i * 3 + 2] = 16 - seededRandom(i * 3 + 2) * 44;
      sz[i] = 0.02 + seededRandom(i * 4) * 0.04;
      vel.push({
        x: (seededRandom(i * 5) - 0.5) * 0.002,
        y: 0.003 + seededRandom(i * 6) * 0.005,
        z: (seededRandom(i * 7) - 0.5) * 0.001,
        flicker: seededRandom(i * 8) * Math.PI * 2,
      });
    }
    return [pos, sz, vel];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.getAttribute("position").array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const v = velocities[i];
      posArr[i * 3] += v.x + Math.sin(t * 0.5 + v.flicker) * 0.001;
      posArr[i * 3 + 1] += v.y;
      posArr[i * 3 + 2] += v.z;

      if (posArr[i * 3 + 1] > 8) {
        posArr[i * 3 + 1] = -8;
        posArr[i * 3] = (seededRandom(i + t) - 0.5) * 24;
        posArr[i * 3 + 2] = 16 - seededRandom(i * 2 + t) * 44;
      }
    }
    ref.current.geometry.getAttribute("position").needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#d4af6a"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Ambient Dust ────────────────────────────────────────────── */
function AmbientDust() {
  const ref = useRef();
  const count = 150;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seededRandom(i * 10) - 0.5) * 20;
      arr[i * 3 + 1] = (seededRandom(i * 11) - 0.5) * 10;
      arr[i * 3 + 2] = 14 - seededRandom(i * 12) * 36;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.getAttribute("position").array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += 0.002;
      if (posArr[i * 3 + 1] > 6) posArr[i * 3 + 1] = -6;
    }
    ref.current.geometry.getAttribute("position").needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#f3efe8"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Light Beams ────────────────────────────────────────────── */
function LightBeams() {
  const beams = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        position: [
          (seededRandom(i * 20) - 0.5) * 10,
          4 + seededRandom(i * 21) * 3,
          10 - i * 7,
        ],
        rotation: [0, 0, (seededRandom(i * 22) - 0.5) * 0.3],
        scale: [0.02 + seededRandom(i * 23) * 0.03, 8 + seededRandom(i * 24) * 6, 1],
        opacity: 0.03 + seededRandom(i * 25) * 0.02,
      })),
    []
  );

  return (
    <>
      {beams.map((b, i) => (
        <mesh key={i} position={b.position} rotation={b.rotation}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#d4af6a"
            transparent
            opacity={b.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

/* ── Scene ────────────────────────────────────────────────────── */
function Scene({ progressRef }) {
  return (
    <>
      <color attach="background" args={["#070707"]} />
      <fog attach="fog" args={["#070707", 12, 40]} />

      <ambientLight intensity={0.25} />
      <pointLight position={[6, 6, 8]} intensity={0.9} color="#fff5e6" />
      <pointLight position={[-5, 4, -4]} intensity={0.6} color="#c9a96e" />
      <pointLight position={[0, -3, -12]} intensity={0.4} color="#d4a0a0" />

      <Stars
        radius={60}
        depth={80}
        count={2000}
        factor={2.5}
        saturation={0}
        fade
        speed={0.4}
      />

      <CameraRig progressRef={progressRef} />

      {CHAPTERS.map((chapter, i) => (
        <PhotoPlane
          key={i}
          chapter={chapter}
          index={i}
          total={CHAPTERS.length}
        />
      ))}

      <GoldEmbers />
      <AmbientDust />
      <LightBeams />
    </>
  );
}

/* ── HUD Overlay ─────────────────────────────────────────────── */
function HUDOverlay({ progress }) {
  const { activeIndex, opacity } = useMemo(() => {
    const segmentSize = 1 / CHAPTERS.length;
    const rawIndex = Math.floor(progress / segmentSize);
    const index = Math.min(rawIndex, CHAPTERS.length - 1);

    const segmentProgress = (progress % segmentSize) / segmentSize;
    const fadeIn = Math.min(segmentProgress / 0.15, 1);
    const fadeOut = Math.max(1 - (segmentProgress - 0.8) / 0.2, 0);
    const fade = segmentProgress < 0.8 ? fadeIn : fadeOut;

    if (index >= 0 && progress > 0.01) {
      return { activeIndex: index, opacity: fade };
    }
    return { activeIndex: -1, opacity: 0 };
  }, [progress]);

  if (activeIndex < 0 || opacity <= 0) return null;

  const chapter = CHAPTERS[activeIndex];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
        opacity,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Top-left year + title block */}
      <div
        style={{
          position: "absolute",
          top: "8vh",
          left: "6vw",
          maxWidth: "400px",
        }}
      >
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.55rem, 1vw, 0.7rem)",
            letterSpacing: "0.25em",
            color: "#d4af6a",
            opacity: 0.7,
            marginBottom: "0.5rem",
          }}
        >
          {chapter.dateStamp}
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "#f3efe8",
            lineHeight: 1.15,
            textShadow: "0 0 40px rgba(7,7,7,0.9)",
          }}
        >
          {chapter.title}
        </h2>
      </div>

      {/* Bottom-right description block */}
      <div
        style={{
          position: "absolute",
          bottom: "10vh",
          right: "6vw",
          maxWidth: "360px",
          textAlign: "right",
        }}
      >
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
            color: "rgba(243,239,232,0.65)",
            lineHeight: 1.9,
            fontWeight: 300,
            textShadow: "0 0 30px rgba(7,7,7,0.95)",
          }}
        >
          {chapter.text}
        </p>
      </div>

      {/* Year watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "50%",
          right: "8vw",
          transform: "translateY(50%)",
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(6rem, 14vw, 12rem)",
          fontWeight: 900,
          color: "rgba(201,169,110,0.04)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {chapter.year}
      </div>
    </div>
  );
}

/* ── Progress Dots ───────────────────────────────────────────── */
function ProgressDots({ progress }) {
  const activeIndex = useMemo(() => {
    const segmentSize = 1 / CHAPTERS.length;
    return Math.min(Math.floor(progress / segmentSize), CHAPTERS.length - 1);
  }, [progress]);

  return (
    <div
      style={{
        position: "absolute",
        right: "2.5vw",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {CHAPTERS.map((ch, i) => {
        const isActive = i === activeIndex && progress > 0.01;
        const isPast = i < activeIndex;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            {/* Year label */}
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.5rem",
                letterSpacing: "0.1em",
                color: isActive
                  ? "#d4af6a"
                  : isPast
                    ? "rgba(201,169,110,0.4)"
                    : "rgba(201,169,110,0.15)",
                opacity: isActive ? 1 : 0.7,
                transition: "all 0.5s ease",
              }}
            >
              {ch.year}
            </span>

            {/* Dot */}
            <div
              style={{
                width: isActive ? "10px" : "5px",
                height: isActive ? "10px" : "5px",
                borderRadius: "50%",
                background: isActive
                  ? "#d4af6a"
                  : isPast
                    ? "rgba(201,169,110,0.5)"
                    : "rgba(201,169,110,0.2)",
                boxShadow: isActive ? "0 0 12px #d4af6a" : "none",
                transition: "all 0.5s ease",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ── Scroll Hint ─────────────────────────────────────────────── */
function ScrollHint({ progress }) {
  const visible = progress < 0.05;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "4vh",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        zIndex: 20,
        opacity: visible ? 0.6 : 0,
        transition: "opacity 0.8s ease",
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
          color: "#d4af6a",
        }}
      >
        SCROLL TO EXPLORE
      </span>
      <div
        style={{
          width: "1px",
          height: "32px",
          background: "linear-gradient(to bottom, #d4af6a, transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.3); }
        }
      `}</style>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────── */
export default function Timeline3D() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const [inView, setInView] = useState(false);
  const rafId = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const raw = Math.max(0, Math.min(1, scrolled / sectionHeight));
      progressRef.current = raw;
    }

    function tick() {
      // Only update state if progress changed meaningfully (avoid unnecessary re-renders)
      const current = progressRef.current;
      setProgress((prev) => {
        if (Math.abs(current - prev) > 0.001) return current;
        return prev;
      });
      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const scrollPages = CHAPTERS.length;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${scrollPages * 100}vh`,
        background: "#070707",
        touchAction: "pan-y",
      }}
      id="story"
    >
      {/* Sticky canvas container — fills viewport only while section is scrolled through */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: 1,
          touchAction: "pan-y",
        }}
      >
        {/* Loading fade-in */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#070707",
            zIndex: 100,
            opacity: isLoaded ? 0 : 1,
            pointerEvents: isLoaded ? "none" : "auto",
            transition: "opacity 1.2s ease",
          }}
        />

        <Canvas
          camera={{ fov: 55, near: 0.1, far: 120 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#070707",
            touchAction: "pan-y",
          }}
        >
          <Scene progressRef={progressRef} />
        </Canvas>

        {inView && (
          <>
            <HUDOverlay progress={progress} />
            <ProgressDots progress={progress} />
            <ScrollHint progress={progress} />
          </>
        )}
      </div>
    </section>
  );
}
