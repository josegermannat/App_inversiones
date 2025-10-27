import React from "react";
import { Button } from "./Button";
import "../../styles/components/ui/FiltrosCotizaciones.css";
const FiltrosCotizaciones = ({ filtro, setFiltro }) => {
  return (
    <div className="cotizaciones__filtros">
      <Button
        onClick={() => setFiltro("todos")}
        contenido="Todas"
        variant={filtro === "todos" ? "primary" : "secundary"}
      />
      <Button
        onClick={() => setFiltro("positivos")}
        contenido="Solo en verde"
        variant={filtro === "positivos" ? "primary" : "secundary"}
      />
      <Button
        onClick={() => setFiltro("negativos")}
        contenido="Solo en rojo"
        variant={filtro === "negativos" ? "primary" : "secundary"}
      />
    </div>
  );
};

export default FiltrosCotizaciones; 