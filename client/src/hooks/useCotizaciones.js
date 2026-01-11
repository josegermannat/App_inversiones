import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { accionesUSA } from "../constants/symbols";
import { useUsuario } from "../context/usuarioContext/useUsuarioContext.js";
import { usePortfolioContext } from "../context/portfolioContext/PortfolioContext";
import { API_URL } from "../config/api";

export function useCotizaciones() {
  const location = useLocation();
  const [cotizaciones, setCotizaciones] = useState(() => {
    const datosGuardados = localStorage.getItem("cotizacionesCache");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const { usuario } = useUsuario() ?? {};
  const { notificarActualizacionPortfolio } = usePortfolioContext();

  // -----------------------------
  // 1️⃣ Fetch de cotizaciones siempre
  // -----------------------------
  useEffect(() => {
    console.log('🔄 Cambio de ruta detectado:', location.pathname);
    
    const fetchCotizaciones = async () => {
    console.log('ejecutando hook')
      try {
        const ahora = Date.now();
        const ultimoFetch = localStorage.getItem("ultimoFetchCotizaciones");

        if (ultimoFetch && ahora - parseInt(ultimoFetch, 10) < 60000) {
          console.log("⚡ Usando cotizaciones cacheadas.");
          return;
        }

        const res = await fetch(`${API_URL}/cotizaciones`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbols: accionesUSA }),
        });
        const data = await res.json();
        console.log("✅ Cotizaciones actualizadas:", data);
        setCotizaciones(data);

        localStorage.setItem("cotizacionesCache", JSON.stringify(data));
        localStorage.setItem("ultimoFetchCotizaciones", ahora.toString());
      } catch (err) {
        console.error("❌ Error al obtener cotizaciones:", err);
      }
    };

    fetchCotizaciones();
  }, [location.pathname]); // Se ejecuta cuando cambia la ruta

  // -----------------------------
  // 2️⃣ Actualizar portafolio solo si hay usuario
  // -----------------------------
  useEffect(() => {
    if (!usuario?.id || cotizaciones.length === 0) return;

    // Delay para evitar actualización inmediata después de transacciones
    const timeoutId = setTimeout(() => {
      const actualizarPortafolio = async () => {
        console.log('entramos a actulizar porfolio')
        try {
          const precios = cotizaciones.map(c => ({
            simbolo: c.simbolo,
            precio: c.precio_actual,
          }));

          const response = await fetch(`${API_URL}/portafolio/actualizar-valores`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario_id: usuario.id, precios }),
          });

          const result = await response.json();
          console.log("📊 Portafolio actualizado:", result);
          
          // Notificar que el portafolio fue actualizado para que se refresque
          if (result.success) {
            notificarActualizacionPortfolio();
          }
        } catch (err) {
          console.error("❌ Error al actualizar portafolio:", err);
        }
      };

      actualizarPortafolio();
    }, 2000); // Delay de 2 segundos para evitar actualización inmediata

    // Cleanup del timeout
    return () => clearTimeout(timeoutId);
  }, [usuario, cotizaciones, notificarActualizacionPortfolio]); // Se ejecuta cuando usuario o cotizaciones cambian

  return cotizaciones;
}
