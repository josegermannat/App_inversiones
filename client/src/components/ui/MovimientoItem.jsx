// src/components/ui/MovimientoItem.jsx
import React from "react";
import "../../styles/components/ui/MovimientoItem.css";

export default function MovimientoItem({ movimiento }) {
  const { tipo, simbolo, cantidad, monto, fecha } = movimiento;

  return (
    <div className="movimiento-item">
      <div className="movimiento-item__info">
        <span className="movimiento-item__tipo">{tipo}</span>
        <span className="movimiento-item__simbolo">{simbolo}</span>
        <span className="movimiento-item__cantidad">{cantidad}</span>
        <span className="movimiento-item__monto">${monto.toLocaleString("es-AR")}</span>
      </div>
      <span className="movimiento-item__fecha">{fecha}</span>
    </div>
  );
}