import React, { useRef, useState } from "react";
import { soundManager } from "../utils/audio";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );

    if (glare) {
      setGlareStyle({
        opacity: 0.15,
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }
  };

  const handleMouseEnter = () => {
    soundManager.playHover();
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    soundManager.playClick();
    if (onClick) onClick();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: transformStyle,
        transition: "transform 0.18s cubic-bezier(0.2, 0, 0, 1)",
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl will-change-transform ${className}`}
    >
      {/* Specular Glare Layer */}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle 320px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.4), transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
