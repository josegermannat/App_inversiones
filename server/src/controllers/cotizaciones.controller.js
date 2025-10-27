import { obtenerCotizaciones } from "../services/serviceCotizaciones.js";


export class MyControladorDeCotizaciones {
  constructor() {}

 getCotizaciones(req, res) {
  const { symbols } = req.body;

  obtenerCotizaciones(symbols)
    .then((resultados) => {
      res.json(resultados);
    })
    .catch((error) => {
      console.error("❌ Error en controlador:", error.message);
      res.status(500).json({ error: "No se pudieron obtener las cotizaciones." });
    });
}
}