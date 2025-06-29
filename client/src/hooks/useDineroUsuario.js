// src/hooks/useDineroUsuario.js
import { useState } from "react";

export function useDineroUsuario() {
  const [dinero, setDinero] = useState(0);

  const ingresarDinero = (monto) => {
    setDinero((prev) => Math.min(prev + monto));
  };

  const retirarDinero = (monto) => {
    setDinero((prev) => Math.max(prev - monto, 0));
  };

  return { dinero, ingresarDinero, retirarDinero };
}
