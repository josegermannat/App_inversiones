import { ItemCotizando } from "../ui/ItemCotizando";
import { Card3DEffect } from "../ui/Card3DEffect";
import "../../styles/components/CardCotizaciones.css";

export default function CardCotizaciones({cotizaciones}) {


  return (
    <Card3DEffect className="card-home home__cotizaciones ">
<h2>Preview De Cotizaciones</h2>
<div className="cotizaciones-scroll">
  <table className="tabla-cotizaciones">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Rendimiento</th>
         <th>Precio</th>
        <th>Pico del Día</th>
      </tr>
    </thead>
    <tbody>
      {cotizaciones.map((accion) => (
        <ItemCotizando
          key={accion.simbolo}
          nombre={accion.nombre}
          rendimiento={accion.variacion_diaria}
          precio={accion.precio_actual}
          picoDePrecio={accion.pico_dia}
        />
      ))}
    </tbody>
  </table>
</div>

    </Card3DEffect>
  );
}
