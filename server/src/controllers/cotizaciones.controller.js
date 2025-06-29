import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.TWELVE_DATA_API_KEY;

export const obtenerCotizaciones = (req, res) => {
  let { symbols } = req.body;

  if (!Array.isArray(symbols) || symbols.length === 0) {
    return res.status(400).json({ error: 'Debes enviar un array de símbolos.' });
  }

  if (symbols.length > 8) {
    console.warn("⚠️ Recibidos más de 8 símbolos. Solo se consultarán los primeros 8.");
    symbols = symbols.slice(0, 8);
  }

  const joinedSymbols = symbols.join(",");
  const url = `https://api.twelvedata.com/quote?symbol=${joinedSymbols}&apikey=${API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      const resultadosRaw = Array.isArray(data) ? data : Object.values(data);

      const resultados = resultadosRaw.map((stock) => {
        if (stock.status === "error") {
          console.warn(`⚠️ Error con ${stock.symbol}: ${stock.message}`);
          return {
            simbolo: stock.symbol || "N/A",
            nombre: stock.symbol || "No disponible",
            precio_actual: 0,
            variacion_diaria: 0,
            pico_dia: 0,
            piso_dia: 0
          };
        }

        return {
          simbolo: stock.symbol,
          nombre: stock.name || stock.symbol,
          precio_actual: parseFloat(stock.close),
          variacion_diaria: parseFloat(stock.percent_change) || 0,
          pico_dia: parseFloat(stock.high) || 0,
          piso_dia: parseFloat(stock.low) || 0
        };
      });

      res.json(resultados);
    })
    .catch((error) => {
      console.error("❌ Error al obtener cotizaciones:", error.message);
      res.status(500).json({ error: 'No se pudieron obtener los datos.' });
    });
};
