import React, { useEffect, useState } from "react";
import "../../styles/components/ui/Toast.css";
import { useToastAnimation } from "../../hooks/hooksAnimations/useToastAnimation";

export function Toast({ tipo = "info", mensaje, duracion = 3000, onClose }) {
  const [visible, setVisible] = useState(false);
  const toastRef = useToastAnimation(visible);

  useEffect(() => {
    if (mensaje) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duracion);

      return () => clearTimeout(timer);
    }
  }, [mensaje, duracion, onClose]);

  if (!mensaje) return null;

  return (
    <div ref={toastRef} className={`toast toast-${tipo}`}>
      {mensaje}
    </div>
  );
}
