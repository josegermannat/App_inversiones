// src/components/home/CardMovimientos.jsx
import "../../styles/components/CardMovimientos.css";
import { Card3DEffect } from "../ui/Card3DEffect";
import MovimientoItem from "../ui/MovimientoItem";
import React from "react";

export default function CardMovimientos({ movimientos = [{
  "tipo": "compra",
  "simbolo": "AAPL",
  "cantidad": 50,
  "monto": 8750.00,
  "fecha": "2025-07-02T14:30:00Z"
},{
  "tipo": "compra",
  "simbolo": "AAPL",
  "cantidad": 50,
  "monto": 8750.00,
  "fecha": "2025-07-02T14:30:00Z"
},{
  "tipo": "compra",
  "simbolo": "AAPL",
  "cantidad": 50,
  "monto": 8750.00,
  "fecha": "2025-07-02T14:30:00Z"
}] }) {
  return (
    <Card3DEffect className="card-home home__movimientos">
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
    </Card3DEffect>
  );
}
