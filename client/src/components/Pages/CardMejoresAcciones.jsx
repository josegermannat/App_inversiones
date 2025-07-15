import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import "../../styles/components/CardMejoresAcciones.css";
import { ItemCotizando } from "../ui/ItemCotizando";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useCardAnimation } from "../../hooks/hooksAnimations/useCardAnimation";

export default function CardMejoresAcciones({ cotizaciones }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const contentRef = useRef(null);
  const cardRef = useCardAnimation("down", 0.3);

  const topAcciones = [...cotizaciones]
    .filter((accion) => accion.variacion_diaria !== null)
    .sort((a, b) => b.variacion_diaria - a.variacion_diaria)
    .slice(0, 3);

  const worstAcciones = [...cotizaciones]
    .filter((accion) => accion.variacion_diaria !== null)
    .sort((a, b) => a.variacion_diaria - b.variacion_diaria)
    .slice(0, 3);

  // Animación de cambio de contenido
  const handleContentChange = () => {
    const tl = gsap.timeline();
    
    // Fade out
    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in"
    })
    .call(() => {
      setIsFlipped(!isFlipped);
    })
    // Fade in
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={cardRef}
      className="card-home home__mejores-acciones"
      onClick={handleContentChange}
    >
      <div ref={contentRef} className="card-content">
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
              <FontAwesomeIcon icon={faArrowDown} />
            </div> 
          </>
        ) : (
          <>
            <h2 style={{color:'#ff5555'}}>Peores Acciones</h2>
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
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
