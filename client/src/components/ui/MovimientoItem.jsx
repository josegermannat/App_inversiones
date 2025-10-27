// src/components/ui/MovimientoItem.jsx
import React from "react";
import "../../styles/components/ui/MovimientoItem.css";

export default function MovimientoItem({ movimiento }) {
  const { tipo, accion, cantidad, precio_unitario, fecha_hora } = movimiento;

  return (
    <div className="movimiento-item">
      <div className="movimiento-item__info">
        <span className="movimiento-item__tipo">{tipo}</span>
        <span className="movimiento-item__simbolo">{accion}</span>
        <span className="movimiento-item__cantidad">{cantidad}</span>
        <span className="movimiento-item__monto">${precio_unitario.toLocaleString("es-AR")}</span>
      </div>
      <span className="movimiento-item__fecha">{fecha_hora}</span>
    </div>
  );
}