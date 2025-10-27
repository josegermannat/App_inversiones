import {
    servicioObtenerSaldo,
    servicioIngresarDinero,
    servicioRetirarDinero,
    servicioInvertirDinero,
    servicioDesinvertirDinero,
  } from "../services/saldosServices.js";
  
  class SaldosController {
    // 🔹 GET /saldos/:usuario_id
    obtenerSaldo(req, res) {
      const { usuario_id } = req.params;
  
      servicioObtenerSaldo(usuario_id)
        .then((saldo) => {
          if (!saldo) {
            return res.status(404).json({ error: "Saldo no encontrado" });
          }
          res.json(saldo);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  
    // 🔹 POST /saldos/ingresar
    ingresarDinero(req, res) {
      const { usuario_id, monto } = req.body;
  
      servicioIngresarDinero(usuario_id, monto)
        .then((saldo) => res.json(saldo))
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  
    // 🔹 POST /saldos/retirar
    retirarDinero(req, res) {
      const { usuario_id, monto } = req.body;
  
      servicioRetirarDinero(usuario_id, monto)
        .then((saldo) => res.json(saldo))
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  
    // 🔹 POST /saldos/invertir
    invertirDinero(req, res) {
    
      const { usuario_id, monto } = req.body;
  
      servicioInvertirDinero(usuario_id, monto)
        .then((saldo) => res.json(saldo))
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  
    // 🔹 POST /saldos/desinvertir
    desinvertirDinero(req, res) {
      const { usuario_id, monto_original, monto_total } = req.body;
  
      // Validar que se envíen ambos parámetros
      if (monto_original === undefined || monto_total === undefined) {
        return res.status(400).json({ 
          error: "Se requieren monto_original y monto_total en el body" 
        });
      }
  
      servicioDesinvertirDinero(usuario_id, monto_original, monto_total)
        .then((saldo) => res.json(saldo))
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  }
  
  // Exportamos una instancia lista para usar en las rutas
  export default new SaldosController();