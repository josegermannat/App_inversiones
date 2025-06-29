import { useEffect, useState } from "react";
import { accionesUSA } from "../constants/symbols";

export function useCotizaciones() {
  const [cotizaciones, setCotizaciones] = useState(() => {
    // Al iniciar, intentamos cargar datos anteriores del localStorage
    const datosGuardados = localStorage.getItem("cotizacionesCache");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  useEffect(() => {
    const ahora = Date.now();
    const ultimoFetch = localStorage.getItem("ultimoFetchCotizaciones");

    // Si no pasó 1 minuto, no hacemos fetch, mantenemos datos cacheados
    if (ultimoFetch && ahora - parseInt(ultimoFetch, 10) < 60000) {
      console.log("⏳ No se hace fetch. Usando datos cacheados.");
      return;
    }

    // Si pasó 1 minuto, hacemos fetch y actualizamos todo
    fetch("http://localhost:3000/api/cotizaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symbols: accionesUSA })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Datos actualizados:", data);
        setCotizaciones(data);
        localStorage.setItem("cotizacionesCache", JSON.stringify(data));
        localStorage.setItem("ultimoFetchCotizaciones", ahora.toString());
      })
      .catch((err) => {
        console.error("❌ Error al obtener cotizaciones:", err);
      });
  }, []);

  return cotizaciones;
}
