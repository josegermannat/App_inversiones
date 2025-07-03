import React, { useState } from "react";
import "../../styles/components/CardMejoresAcciones.css";
import { ItemCotizando } from "../ui/ItemCotizando";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function CardMejoresAcciones({ cotizaciones }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const topAcciones = [...cotizaciones]
    .filter((accion) => accion.variacion_diaria !== null)
    .sort((a, b) => b.variacion_diaria - a.variacion_diaria)
    .slice(0, 3);

  const worstAcciones = [...cotizaciones]
    .filter((accion) => accion.variacion_diaria !== null)
    .sort((a, b) => a.variacion_diaria - b.variacion_diaria)
    .slice(0, 3);

  return (
    <div
      className={`card-home home__mejores-acciones ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-content">
        {!isFlipped ? (
          <>
            <h2>Mejores Acciones</h2>
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
                      precio={accion.precio}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          <div className='flip-indicator indicador-rojo'> 
  {"Mostrar Peores acciones"}
  <FontAwesomeIcon icon={faArrowRight} />
</div> 
          </>
        ) : (
          <>
            <h2 className="indicador-rojo">Peores Acciones</h2>
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
                  {worstAcciones.map((accion) => (
                    <ItemCotizando
                      key={accion.simbolo}
                      nombre={accion.nombre}
                      rendimiento={accion.variacion_diaria}
                      picoDePrecio={accion.pico_dia}
                      precio={accion.precio}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          <div className={'flip-indicator indicador-verde'}> 
  {"Mostrar mejores acciones"}
  <FontAwesomeIcon icon={faArrowRight} />
</div>
          </>
        )}
      </div>
    </div>
  );
}
