import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useToastAnimation(visible) {
  const toastRef = useRef(null);

  useEffect(() => {
    if (visible && toastRef.current) {
      // Entrada
      gsap.fromTo(
        toastRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    } else if (!visible && toastRef.current) {
      // Salida
      gsap.to(toastRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [visible]);

  return toastRef;
}
