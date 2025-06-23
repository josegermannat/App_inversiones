// src/components/ui/Card3DEffect.jsx
import React, { useRef } from "react";


// Card3DEffect.jsx
export function Card3DEffect({ children, className = "" }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTransform = () => {
    const card = cardRef.current;
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      className={` ${className}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
    >
      {children}
    </div>
  );
}
