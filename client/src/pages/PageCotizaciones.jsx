import React, { useEffect, useState } from "react";
import "../styles/pages-styles/PageCotizaciones.css";
import { Menu, CardHeader, CardCotizaciones } from "../components/Pages";
import FiltrosCotizaciones from "../components/ui/FiltrosCotizaciones";

import useCotizacionesContext from "../context/cotizaciones/useCotizacionesContext";

const PageCotizaciones = () => {

    
    const {cotizaciones} = useCotizacionesContext()

  const [filtro, setFiltro] = useState("todos"); // 'todos', 'positivos', 'negativos'

  // Filtrado simple por variación
  const accionesFiltradas = cotizaciones.filter((accion) => {
    if (filtro === "positivos") return accion.variacion_diaria > 0;
    if (filtro === "negativos") return accion.variacion_diaria < 0;
    return true;
  });
  
  return (
    <div className="cotizaciones__layout">
  
      <Menu />
      <CardHeader titulo="Cotizaciones" />
      <CardCotizaciones
        title={'Acciones Disponibles'}
        cotizaciones={accionesFiltradas}
        className="cotizaciones__tabla-principal"
        filtrosComponent={<FiltrosCotizaciones filtro={filtro} setFiltro={setFiltro} />}
        mostrarOptions={true}
        
      />
     
    </div>
  );
};

export default PageCotizaciones; 