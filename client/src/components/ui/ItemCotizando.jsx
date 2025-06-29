import React from "react";
import "../../styles/components/ui/ItemCotizando.css";

export function ItemCotizando({ nombre, rendimiento, precio,picoDePrecio }) {
  const isPositive = rendimiento >= 0;

    return (
    <tr>
      <td>{nombre}</td>
      <td className={isPositive ? "positivo" : "negativo"}>
        {isPositive ? "▲" : "▼"} {Math.abs(rendimiento).toFixed(2)} %
      </td>
     {(precio !== undefined && precio !== null) && (
  <td>{precio > 0 ? `$${Math.floor(precio)}` : "—"}</td>
)}
      <td>${Math.floor(picoDePrecio)}</td>
    </tr>
  );
}
