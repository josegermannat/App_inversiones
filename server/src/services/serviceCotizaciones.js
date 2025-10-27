import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.TWELVE_DATA_API_KEY;

export function obtenerCotizaciones(symbols) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(symbols) || symbols.length === 0) {
      return reject(new Error("Debes enviar un array de símbolos."));
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
            exchange: stock.exchange,
            mic_code: stock.mic_code,
            moneda: stock.currency,
            fecha: stock.datetime,
            precio_apertura: parseFloat(stock.open),
            precio_maximo: parseFloat(stock.high),
            precio_minimo: parseFloat(stock.low),
            precio_actual: parseFloat(stock.close),
            volumen: parseInt(stock.volume),
            cierre_anterior: parseFloat(stock.previous_close),
            cambio: parseFloat(stock.change),
            variacion_diaria: parseFloat(stock.percent_change) || 0,
            volumen_promedio: parseInt(stock.average_volume),
            mercado_abierto: stock.is_market_open,
            cincuenta_dos_semanas: stock.fifty_two_week,
            // Para compatibilidad con componentes existentes:
            pico_dia: parseFloat(stock.high) || 0,
            piso_dia: parseFloat(stock.low) || 0
          };
        });

        resolve(resultados);
      })
      .catch((error) => {
        console.error("❌ Error en fetch del service:", error.message);
        reject(error);
      });
  });
}
