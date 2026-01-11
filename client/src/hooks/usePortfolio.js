import { useEffect, useState, useCallback } from "react";
import { usePortfolioContext } from "../context/portfolioContext/PortfolioContext";
import { API_URL } from "../config/api";

export function usePortafolio(usuarioId) {
  const [portafolio, setPortafolio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { portfolioVersion } = usePortfolioContext();

  const fetchPortafolio = useCallback(async () => {
    if (!usuarioId) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/portafolio/obtener`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: usuarioId }),
      });

      if (!res.ok) throw new Error("Error al obtener portafolio");

      const data = await res.json();
      if (data.success) {
        setPortafolio(data.portafolio);
      } else {
        setError("No se pudo obtener el portafolio");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    fetchPortafolio();
  }, [fetchPortafolio, portfolioVersion]);

  return { portafolio, loading, error };
}
