import { ItemCotizando } from "../ui/ItemCotizando";
import "../../styles/components/CardCotizaciones.css";
import { useCardAnimation } from "../../hooks/hooksAnimations/useCardAnimation";


export default function CardCotizaciones({ cotizaciones, className = "", style = {}, filtrosComponent = null, title = "Preview De Cotizaciones", mostrarOptions = false,  }) {
  const cardRef = useCardAnimation("up", 0.4);

  return (
  <>
    <div
      ref={cardRef}
      className={`card-home ${className}`.trim()}
      style={style}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
        <h2>{title}</h2>
        {filtrosComponent && (
          <div style={{ marginLeft: 'auto', minWidth: 220 }}>{filtrosComponent}</div>
        )}
      </div>
      <div className="cotizaciones-scroll">
        <table className="tabla-cotizaciones">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rendimiento</th>
              <th>Precio</th>
              <th>Pico del Día</th>
              {mostrarOptions && (
                <>
                  <th>Comprar</th>
                  <th>Vender</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {(cotizaciones).map((accion, id) => (
              <ItemCotizando
                key={accion.simbolo || id}
                nombre={accion.nombre}
                rendimiento={accion.variacion_diaria}
                precio={accion.precio_actual}
                picoDePrecio={accion.pico_dia}
                mostrarOptions={mostrarOptions}
                simbolo={accion.simbolo}
               
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>

     
    </>
  );
}
