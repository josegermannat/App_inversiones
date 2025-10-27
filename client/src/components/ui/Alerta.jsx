import React from "react";
import "../../styles/components/ui/Alerta.css";

export function Alerta({ tipo = "info", mensaje }) {
  if (!mensaje) return null;
  return <div className={`alerta alerta-${tipo}`}>{mensaje}</div>;
}
