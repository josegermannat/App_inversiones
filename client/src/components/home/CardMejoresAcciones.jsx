import "../../styles/components/CardMejoresAcciones.css";
import { Card3DEffect } from "../ui/Card3DEffect";
import { ItemCotizando } from "../ui/ItemCotizando";

export default function CardMejoresAcciones({ cotizaciones }) {
  const topAcciones = [...cotizaciones]
    .filter((accion) => accion.variacion_diaria !== null)
    .sort((a, b) => b.variacion_diaria - a.variacion_diaria)
    .slice(0, 3);

  return (
    <Card3DEffect className="card-home home__mejores-acciones">
      <h2>Mejores Acciones del Día</h2>
<div className="top-cotizaciones-scroll">
      <table className="tabla-mejores">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rendimiento</th>
            <th>PD</th>
          </tr>
        </thead>
        <tbody>
          {topAcciones.map((accion) => (
            <ItemCotizando
              key={accion.simbolo}
              nombre={accion.nombre}
              rendimiento={accion.variacion_diaria}
              picoDePrecio={accion.pico_dia}
            />
          ))}
        </tbody>
      </table>
</div>

    </Card3DEffect>
  );
}
