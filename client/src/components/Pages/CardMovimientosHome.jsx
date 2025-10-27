// src/components/home/CardMovimientos.jsx
import "../../styles/components/CardMovimientosHome.css";
import MovimientoItem from "../ui/MovimientoItem";
import React from "react";
import { useCardAnimation } from "../../hooks/hooksAnimations/useCardAnimation";

export default function CardMovimientosHome({ movimientos = [] }) {
  const cardRef = useCardAnimation("right", 0.5);

  return (
    <div ref={cardRef} className="card-home home__movimientos">
      <h2 className="card-movimientos__titulo">Movimientos recientes</h2>
      <div className="card-movimientos__lista">
        {movimientos.length === 0 ? (
          <p className="card-movimientos__vacio">No hay movimientos aún.</p>
        ) : (
          movimientos.map((mov, index) => (
            <MovimientoItem key={index} movimiento={mov} />
          ))
        )}
      </div>
    </div>
  );
}
