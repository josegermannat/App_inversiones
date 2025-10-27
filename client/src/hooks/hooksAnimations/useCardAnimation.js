import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function useCardAnimation(direction = "up", delay = 0) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Configurar estado inicial - usar opacity en lugar de autoAlpha
    const initialState = {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: 0.8,
      rotation: direction === "rotate" ? -5 : 0
    };

    gsap.set(cardRef.current, initialState);

    // Animación de entrada
    const animation = gsap.to(cardRef.current, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      delay: delay,
      ease: "power2.out"
    });

    return () => {
      animation.kill();
    };
  }, []);

  return cardRef;
} 