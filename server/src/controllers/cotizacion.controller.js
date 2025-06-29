import fetch from 'node-fetch';
const API_KEY = '1be5077d993b494f9720cbc3e9529fee';

export const obtenerCotizacion = (req, res) => {
  const { symbol } = req.params;

  if (!symbol) {
    return res.status(400).json({ error: 'Símbolo no especificado.' });
  }

  const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data || data.code === 400) {
        return res.status(404).json({ error: 'Símbolo no encontrado o inválido.' });
      }

      const resultado = {
        simbolo: data.symbol,
        nombre: data.name,
        precio_actual: parseFloat(data.close ?? 0),
        precio_compra: parseFloat(data.bid ?? 0),
        precio_venta: parseFloat(data.ask ?? 0),
        variacion_diaria: parseFloat(data.percent_change ?? 0),
        pico_dia: parseFloat(data.high ?? 0),
        piso_dia: parseFloat(data.low ?? 0)
      };

      res.json(resultado);
    })
    .catch(error => {
      console.error('Error al obtener cotización:', error.message);
      res.status(500).json({ error: 'No se pudo obtener el dato.' });
    });
};