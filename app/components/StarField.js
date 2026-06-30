"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 2500;
const SPHERE_RADIUS = 500;

function seededRandom(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function Stars() {
  const pointsRef = useRef();

  const { positions, colors, sizes, twinkleOffsets, twinkleSpeeds } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const twinkleOffsets = new Float32Array(STAR_COUNT);
    const twinkleSpeeds = new Float32Array(STAR_COUNT);

    const colorPalette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#fff8f0"),
      new THREE.Color("#f0f4ff"),
      new THREE.Color("#ffe8d0"),
      new THREE.Color("#d0e8ff"),
      new THREE.Color("#fffaf5"),
      new THREE.Color("#e8f0ff"),
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = seededRandom(i * 3) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
      const r = SPHERE_RADIUS * (0.3 + seededRandom(i * 3 + 2) * 0.7);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const color = colorPalette[Math.floor(seededRandom(i * 4) * colorPalette.length)];
      const brightness = 0.4 + seededRandom(i * 5) * 0.6;
      colors[i * 3] = color.r * brightness;
      colors[i * 3 + 1] = color.g * brightness;
      colors[i * 3 + 2] = color.b * brightness;

      sizes[i] = 0.5 + seededRandom(i * 6) * 2.0;

      twinkleOffsets[i] = seededRandom(i * 7) * Math.PI * 2;
      twinkleSpeeds[i] = 0.3 + seededRandom(i * 8) * 0.7;
    }

    return { positions, colors, sizes, twinkleOffsets, twinkleSpeeds };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const sizeAttr = pointsRef.current.geometry.getAttribute("size");

    for (let i = 0; i < STAR_COUNT; i++) {
      const base = sizes[i];
      const twinkle =
        Math.sin(t * twinkleSpeeds[i] + twinkleOffsets[i]) * 0.3 + 0.7;
      sizeAttr.array[i] = base * twinkle;
    }
    sizeAttr.needsUpdate = true;

    pointsRef.current.rotation.y = t * 0.003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={STAR_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={STAR_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float alpha = 1.0 - smoothstep(0.0, 0.5, d);
            alpha = pow(alpha, 1.5);
            gl_FragColor = vec4(vColor, alpha);
          }
        `}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function StarField() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 2000 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
      >
        <Stars />
      </Canvas>
    </div>
  );
}
