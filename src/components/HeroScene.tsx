"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ===== Floating Particles (GPU-efficient) =====
function ParticleOrb() {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const count = 600;

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const cyan = new THREE.Color("#06b6d4");
    const purple = new THREE.Color("#8b5cf6");
    const white = new THREE.Color("#e2e8f0");

    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 0.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Randomize colors between cyan, purple, and white
      const colorChoice = Math.random();
      const color = colorChoice < 0.4 ? cyan : colorChoice < 0.8 ? purple : white;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      siz[i] = Math.random() * 3 + 1;
    }

    return [pos, col, siz];
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    // Slow base rotation
    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.rotation.x += delta * 0.03;

    // Smooth mouse reactivity (lerp)
    targetRotation.current.x = mouseRef.current.y * 0.3;
    targetRotation.current.y = mouseRef.current.x * 0.3;

    pointsRef.current.rotation.x +=
      (targetRotation.current.x - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.y +=
      (targetRotation.current.y - pointsRef.current.rotation.y) * 0.02;
  });

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
    </points>
  );
}

// ===== Inner Glowing Core =====
function GlowCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

// ===== Wireframe Ring =====
function WireframeRing() {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x += delta * 0.15;
    ringRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.01, 16, 100]} />
      <meshBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

// ===== CSS Orb (imported separately for mobile) =====
import CSSOrb from "./CSSOrb";

// ===== Main Exported Component =====
export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      setIsMobile(window.innerWidth < 768 || !window.WebGLRenderingContext);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="css-orb-container">
          <div className="css-orb-glow" />
          <div className="css-orb-core" />
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CSSOrb />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <ParticleOrb />
          <GlowCore />
          <WireframeRing />
        </Suspense>
      </Canvas>
    </div>
  );
}
