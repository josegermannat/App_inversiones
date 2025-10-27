import React from "react";
import "../../styles/components/CardRendimientoAcciones.css";

export default function RendimientoDeAccion({ accion }) {
  if (!accion) return null;
  return (
    <div className="rendimiento-accion">
      <h3>Rendimiento de {accion.name || accion.nombre}</h3>
      <div className="rendimiento-info">
        <div>
          <span className="label">Variación diaria:</span>
          <span className={Number(accion.percent_change) >= 0 ? "positivo" : "negativo"}>
            {accion.percent_change}%
          </span>
        </div>
        <div>
          <span className="label">Cambio:</span>
          <span>{accion.change}</span>
        </div>
        <div>
          <span className="label">Precio actual:</span>
          <span>{accion.close || accion.precio_actual}</span>
        </div>
        <div>
          <span className="label">Pico del día:</span>
          <span>{accion.high || accion.pico_dia}</span>
        </div>
      </div>
    </div>
  );
} 