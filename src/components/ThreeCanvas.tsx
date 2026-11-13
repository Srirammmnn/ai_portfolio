import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { soundManager } from "../utils/audio";
import { Sparkles, Orbit, Layers, RefreshCw, UserCheck } from "lucide-react";

export type VisualMode = "hologram" | "neural" | "swarm" | "quantum";

interface ThreeCanvasProps {
  className?: string;
  interactive?: boolean;
}

export default function ThreeCanvas({ className = "", interactive = true }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<VisualMode>("hologram");
  const [isRotating, setIsRotating] = useState(true);
  const [stats, setStats] = useState({ nodes: 380, fps: 60 });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isMouseDownRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const pulseRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f5d4, 4, 60);
    pointLight1.position.set(12, 12, 18);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 4, 60);
    pointLight2.position.set(-12, -12, 14);
    scene.add(pointLight2);

    // Glowing point texture helper
    const createPointTexture = (color1: string, color2: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.25, color1);
      grad.addColorStop(0.65, color2);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    let particlesMesh: THREE.Points | null = null;
    let linesMesh: THREE.LineSegments | null = null;
    let coreMesh: THREE.Mesh | null = null;
    let innerCore: THREE.Mesh | null = null;
    let torusMesh: THREE.Mesh | null = null;
    let ringsGroup: THREE.Group | null = null;
    let scanlineMesh: THREE.Mesh | null = null;
    let eyesGroup: THREE.Group | null = null;

    const buildMode = (currentMode: VisualMode) => {
      while (mainGroup.children.length > 0) {
        const obj = mainGroup.children[0];
        mainGroup.remove(obj);
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      }

      if (currentMode === "hologram") {
        // Mode: Cyber Holographic AI Persona / Head Silhouette & Neural Cortex
        const headPoints: number[] = [];
        const cortexPoints: number[] = [];

        // 1. Biometric Humanoid Head Contours
        for (let i = 0; i < 480; i++) {
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);

          // Head profile deformation
          let rx = 5.2;
          let ry = 6.6;
          let rz = 5.6;

          // Chin narrowing & jaw definition
          const y = ry * Math.cos(phi);
          let scaleFactor = 1.0;
          if (y < 0) {
            scaleFactor = 1.0 + (y / ry) * 0.35; // tapers to chin
          }
          // Brow & forehead curvature
          if (y > 2.0) {
            scaleFactor = 1.0 + (y / ry) * 0.1;
          }

          const x = rx * Math.sin(phi) * Math.sin(theta) * scaleFactor;
          const z = rz * Math.sin(phi) * Math.cos(theta) * (zCoord(y) * 0.95);

          headPoints.push(x, y, z);
        }

        function zCoord(yVal: number) {
          return yVal < -2 ? 0.75 : 1.0;
        }

        // 2. Inner Neural Cortex (Brain Synapses)
        for (let j = 0; j < 240; j++) {
          const u = Math.random();
          const v = Math.random();
          const theta = u * 2.0 * Math.PI;
          const phi = Math.acos(2.0 * v - 1.0);
          const r = 2.4 + Math.random() * 1.6;

          const cx = r * Math.sin(phi) * Math.sin(theta);
          const cy = 1.8 + r * Math.cos(phi) * 0.85; // positioned in upper cranium
          const cz = r * Math.sin(phi) * Math.cos(theta) * 0.9;

          cortexPoints.push(cx, cy, cz);
        }

        const headGeom = new THREE.BufferGeometry();
        headGeom.setAttribute("position", new THREE.Float32BufferAttribute(headPoints, 3));
        const headTexture = createPointTexture("rgba(0,245,212,0.9)", "rgba(56,189,248,0.4)");
        const headMat = new THREE.PointsMaterial({
          size: 0.65,
          map: headTexture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const headPointsMesh = new THREE.Points(headGeom, headMat);
        mainGroup.add(headPointsMesh);

        // Cortex points
        const cortexGeom = new THREE.BufferGeometry();
        cortexGeom.setAttribute("position", new THREE.Float32BufferAttribute(cortexPoints, 3));
        const cortexTexture = createPointTexture("rgba(139,92,246,1)", "rgba(192,132,252,0.5)");
        const cortexMat = new THREE.PointsMaterial({
          size: 0.75,
          map: cortexTexture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        particlesMesh = new THREE.Points(cortexGeom, cortexMat);
        mainGroup.add(particlesMesh);

        // Interactive Glowing Ocular Focus Points (Eyes)
        eyesGroup = new THREE.Group();
        [-1.75, 1.75].forEach((xOffset) => {
          const eyeGeom = new THREE.SphereGeometry(0.38, 16, 16);
          const eyeMat = new THREE.MeshBasicMaterial({
            color: 0x00f5d4,
            transparent: true,
            opacity: 0.95,
          });
          const eye = new THREE.Mesh(eyeGeom, eyeMat);
          eye.position.set(xOffset, 1.2, 4.8);
          eyesGroup!.add(eye);

          // Eye pupil ring
          const irisGeom = new THREE.RingGeometry(0.42, 0.58, 24);
          const irisMat = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
          });
          const iris = new THREE.Mesh(irisGeom, irisMat);
          iris.position.set(xOffset, 1.2, 4.85);
          eyesGroup!.add(iris);
        });
        mainGroup.add(eyesGroup);

        // Holographic Cylindrical Vertical Scan Beam
        const scanGeom = new THREE.CylinderGeometry(6.4, 6.4, 0.15, 64, 1, true);
        const scanMat = new THREE.MeshBasicMaterial({
          color: 0x00f5d4,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        });
        scanlineMesh = new THREE.Mesh(scanGeom, scanMat);
        mainGroup.add(scanlineMesh);

        // Orbiting Cybernetic Data Ring
        ringsGroup = new THREE.Group();
        const baseRingGeom = new THREE.TorusGeometry(8.2, 0.04, 16, 100);
        const baseRingMat = new THREE.MeshBasicMaterial({
          color: 0x8b5cf6,
          transparent: true,
          opacity: 0.35,
        });
        const baseRing = new THREE.Mesh(baseRingGeom, baseRingMat);
        baseRing.rotation.x = Math.PI / 2.3;
        ringsGroup.add(baseRing);
        mainGroup.add(ringsGroup);

        setStats({ nodes: 720, fps: 60 });
      } else if (currentMode === "neural") {
        // Mode: Geodesic Neural Lattice with Inner Nucleus
        const icosaGeometry = new THREE.IcosahedronGeometry(7, 2);
        const wireframeMat = new THREE.MeshStandardMaterial({
          color: 0x00f5d4,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
          roughness: 0.2,
          metalness: 0.8,
        });
        coreMesh = new THREE.Mesh(icosaGeometry, wireframeMat);
        mainGroup.add(coreMesh);

        const nucleusGeom = new THREE.SphereGeometry(3.2, 32, 32);
        const nucleusMat = new THREE.MeshStandardMaterial({
          color: 0x8b5cf6,
          roughness: 0.1,
          metalness: 0.9,
          emissive: 0x7c3aed,
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.85,
        });
        innerCore = new THREE.Mesh(nucleusGeom, nucleusMat);
        mainGroup.add(innerCore);

        const positions = icosaGeometry.attributes.position.array;
        const nodeGeometry = new THREE.BufferGeometry();
        nodeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const pointTexture = createPointTexture("rgba(0,245,212,0.9)", "rgba(139,92,246,0.3)");
        const nodeMaterial = new THREE.PointsMaterial({
          size: 0.9,
          map: pointTexture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        particlesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
        mainGroup.add(particlesMesh);

        ringsGroup = new THREE.Group();
        [9.5, 11.5, 13.5].forEach((radius, i) => {
          const ringGeom = new THREE.TorusGeometry(radius, 0.04, 16, 100);
          const ringMat = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x00f5d4 : 0x8b5cf6,
            transparent: true,
            opacity: 0.35 - i * 0.08,
          });
          const ring = new THREE.Mesh(ringGeom, ringMat);
          ring.rotation.x = (i * Math.PI) / 3;
          ring.rotation.y = (i * Math.PI) / 4;
          ringsGroup!.add(ring);
        });
        mainGroup.add(ringsGroup);
        setStats({ nodes: positions.length / 3, fps: 60 });
      } else if (currentMode === "swarm") {
        // Mode: Swarm Proximity Particles
        const particleCount = 240;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          const r = 4 + Math.random() * 8;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = r * Math.cos(phi);
        }

        const particleGeom = new THREE.BufferGeometry();
        particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const pointTexture = createPointTexture("rgba(0,245,212,0.9)", "rgba(139,92,246,0.3)");
        const particleMat = new THREE.PointsMaterial({
          size: 0.65,
          map: pointTexture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        particlesMesh = new THREE.Points(particleGeom, particleMat);
        mainGroup.add(particlesMesh);

        const maxLines = 360;
        const linePositions = new Float32Array(maxLines * 6);
        const lineColors = new Float32Array(maxLines * 6);
        const linesGeom = new THREE.BufferGeometry();
        linesGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
        linesGeom.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
        const linesMat = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.45,
          blending: THREE.AdditiveBlending,
        });
        linesMesh = new THREE.LineSegments(linesGeom, linesMat);
        mainGroup.add(linesMesh);

        setStats({ nodes: particleCount, fps: 60 });
      } else {
        // Mode: Quantum Torus Knot
        const torusGeom = new THREE.TorusKnotGeometry(6, 1.8, 140, 24, 2, 3);
        const torusMat = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          roughness: 0.2,
          metalness: 0.9,
          wireframe: true,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.2,
        });
        torusMesh = new THREE.Mesh(torusGeom, torusMat);
        mainGroup.add(torusMesh);

        const dustCount = 300;
        const dustPos = new Float32Array(dustCount * 3);
        for (let i = 0; i < dustCount * 3; i++) {
          dustPos[i] = (Math.random() - 0.5) * 28;
        }
        const dustGeom = new THREE.BufferGeometry();
        dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
          size: 0.35,
          color: 0x8b5cf6,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
        });
        particlesMesh = new THREE.Points(dustGeom, dustMat);
        mainGroup.add(particlesMesh);

        setStats({ nodes: dustCount, fps: 60 });
      }
    };

    buildMode(mode);

    // Animation Loop
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setStats((prev) => ({ ...prev, fps: Math.round((frameCount * 1000) / (now - lastFpsTime)) }));
        frameCount = 0;
        lastFpsTime = now;
      }

      // Smooth mouse parallax damping
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05;

      if (mode === "hologram") {
        // Holographic persona looks directly at user's cursor with subtle natural breathing
        const lookTargetY = mousePosRef.current.x * 0.75;
        const lookTargetX = -mousePosRef.current.y * 0.55;
        const breathing = Math.sin(elapsedTime * 1.8) * 0.04;

        if (isRotating && !isMouseDownRef.current) {
          mainGroup.rotation.y = lookTargetY + Math.sin(elapsedTime * 0.6) * 0.12;
          mainGroup.rotation.x = lookTargetX + breathing;
        } else {
          mainGroup.rotation.y += (mousePosRef.current.x * 0.8 - mainGroup.rotation.y) * 0.05;
          mainGroup.rotation.x += (mousePosRef.current.y * 0.8 - mainGroup.rotation.x) * 0.05;
        }

        // Vertical scanline animation
        if (scanlineMesh) {
          scanlineMesh.position.y = Math.sin(elapsedTime * 2.2) * 5.8;
          scanlineMesh.rotation.y = elapsedTime * 0.5;
        }

        // Inner cortex synaptic breathing
        if (particlesMesh) {
          const breath = 1.0 + Math.sin(elapsedTime * 3.0) * 0.05 + pulseRef.current * 0.2;
          particlesMesh.scale.setScalar(breath);
        }

        // Orbital data ring
        if (ringsGroup) {
          ringsGroup.rotation.z = elapsedTime * 0.2;
        }
      } else {
        if (isRotating && !isMouseDownRef.current) {
          mainGroup.rotation.y += 0.005;
          mainGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15 + mousePosRef.current.y * 0.4;
          mainGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.1;
        } else {
          mainGroup.rotation.y += (mousePosRef.current.x * 0.8 - mainGroup.rotation.y) * 0.05;
          mainGroup.rotation.x += (mousePosRef.current.y * 0.8 - mainGroup.rotation.x) * 0.05;
        }
      }

      // Pulse damping
      if (pulseRef.current > 0) {
        pulseRef.current *= 0.94;
        if (innerCore) {
          innerCore.scale.setScalar(1 + pulseRef.current * 0.35);
        }
      }

      if (mode === "neural") {
        if (coreMesh) {
          coreMesh.rotation.y = -elapsedTime * 0.1;
          coreMesh.rotation.x = elapsedTime * 0.05;
        }
        if (innerCore) {
          const breath = 1 + Math.sin(elapsedTime * 2.5) * 0.08 + pulseRef.current * 0.3;
          innerCore.scale.setScalar(breath);
        }
      } else if (mode === "swarm" && linesMesh && particlesMesh) {
        const positions = particlesMesh.geometry.attributes.position.array as Float32Array;
        const linePositions = linesMesh.geometry.attributes.position.array as Float32Array;
        const lineColors = linesMesh.geometry.attributes.color.array as Float32Array;
        let lineIdx = 0;
        const maxDist = 4.2;

        for (let i = 0; i < 80; i++) {
          for (let j = i + 1; j < 80; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist && lineIdx < 360) {
              const alpha = 1.0 - dist / maxDist;
              const pIdx = lineIdx * 6;

              linePositions[pIdx] = positions[i * 3];
              linePositions[pIdx + 1] = positions[i * 3 + 1];
              linePositions[pIdx + 2] = positions[i * 3 + 2];
              linePositions[pIdx + 3] = positions[j * 3];
              linePositions[pIdx + 4] = positions[j * 3 + 1];
              linePositions[pIdx + 5] = positions[j * 3 + 2];

              lineColors[pIdx] = 0;
              lineColors[pIdx + 1] = 0.96 * alpha;
              lineColors[pIdx + 2] = 0.83 * alpha;
              lineColors[pIdx + 3] = 0.54 * alpha;
              lineColors[pIdx + 4] = 0.36 * alpha;
              lineColors[pIdx + 5] = 0.96 * alpha;

              lineIdx++;
            }
          }
        }
        linesMesh.geometry.setDrawRange(0, lineIdx * 2);
        linesMesh.geometry.attributes.position.needsUpdate = true;
        linesMesh.geometry.attributes.color.needsUpdate = true;
      } else if (mode === "quantum" && torusMesh) {
        torusMesh.rotation.x = elapsedTime * 0.2;
        torusMesh.rotation.y = elapsedTime * 0.3;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mousePosRef.current.targetX = (clientX / rect.width) * 2 - 1;
      mousePosRef.current.targetY = -(clientY / rect.height) * 2 + 1;

      if (isMouseDownRef.current) {
        const deltaX = e.clientX - prevMouseRef.current.x;
        const deltaY = e.clientY - prevMouseRef.current.y;
        mainGroup.rotation.y += deltaX * 0.008;
        mainGroup.rotation.x += deltaY * 0.008;
        prevMouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const handleClick = () => {
      pulseRef.current = 1.0;
      soundManager.playPulse();
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("click", handleClick);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mode, isRotating, interactive]);

  const handleModeChange = (newMode: VisualMode) => {
    soundManager.playClick();
    setMode(newMode);
  };

  const toggleRotation = () => {
    soundManager.playClick();
    setIsRotating(!isRotating);
  };

  const triggerPulse = () => {
    pulseRef.current = 1.2;
    soundManager.playPulse();
  };

  return (
    <div className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}>
      <div ref={containerRef} className="w-full h-full" />

      {/* 3D Interactive Floating HUD Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/10 shadow-2xl">
          <button
            onClick={() => handleModeChange("hologram")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs transition-all ${
              mode === "hologram"
                ? "bg-[var(--signal)] text-slate-950 font-semibold shadow-[0_0_12px_rgba(0,245,212,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
            title="3D Cyber Holographic Persona"
          >
            <UserCheck size={12} />
            <span className="hidden sm:inline">AI Persona</span>
          </button>

          <button
            onClick={() => handleModeChange("neural")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs transition-all ${
              mode === "neural"
                ? "bg-[var(--signal)] text-slate-950 font-semibold shadow-[0_0_12px_rgba(0,245,212,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
            title="Neural Agent Lattice"
          >
            <Sparkles size={12} />
            <span className="hidden sm:inline">Neural Core</span>
          </button>

          <button
            onClick={() => handleModeChange("swarm")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs transition-all ${
              mode === "swarm"
                ? "bg-[var(--signal)] text-slate-950 font-semibold shadow-[0_0_12px_rgba(0,245,212,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
            title="Multi-Agent Swarm"
          >
            <Layers size={12} />
            <span className="hidden sm:inline">Swarm</span>
          </button>

          <button
            onClick={() => handleModeChange("quantum")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs transition-all ${
              mode === "quantum"
                ? "bg-[var(--signal)] text-slate-950 font-semibold shadow-[0_0_12px_rgba(0,245,212,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
            title="Quantum Geometry"
          >
            <Orbit size={12} />
            <span className="hidden sm:inline">Quantum</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleRotation}
            className={`p-2 rounded-full backdrop-blur-md border border-white/10 text-xs transition-all ${
              isRotating
                ? "bg-slate-900/80 text-[var(--signal)] hover:bg-slate-800"
                : "bg-slate-900/50 text-slate-400 hover:text-white"
            }`}
            title={isRotating ? "Pause tracking" : "Enable tracking"}
          >
            <RefreshCw size={13} className={isRotating ? "animate-spin" : ""} style={{ animationDuration: "6s" }} />
          </button>

          <button
            onClick={triggerPulse}
            className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 font-mono text-[11px] text-[var(--signal)] hover:border-[var(--signal)]/50 transition-all shadow-md active:scale-95"
            title="Emit synaptic pulse"
          >
            ⚡ Pulse
          </button>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/5 font-mono text-[10px] text-slate-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{stats.nodes} Nodes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
