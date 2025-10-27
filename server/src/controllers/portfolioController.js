// controllers/portafolioController.mjs
import * as portafolioService from '../services/portfolioService.js';

class PortafolioController {
  
  /**
   * POST /api/portafolio/obtener
   * Obtiene el portafolio completo del usuario
   * Body: { usuario_id }
   */
  async obtenerPortafolio(req, res) {
    try {
      const { usuario_id } = req.body;
      
      if (!usuario_id) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere usuario_id en el body'
        });
      }
      
      const portafolio = await portafolioService.obtenerPortafolio(parseInt(usuario_id));
      
      if (portafolio.length === 0) {
        return res.status(200).json({
          success: true,
          mensaje: 'El portafolio está vacío',
          portafolio: []
        });
      }
      
      res.status(200).json({
        success: true,
        portafolio
      });
      
    } catch (error) {
      console.error('Error en obtenerPortafolio:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener portafolio',
        detalle: error.message
      });
    }
  }

  /**
   * POST /api/portafolio/obtener-accion
   * Obtiene detalle de una acción específica del portafolio
   * Body: { usuario_id, simbolo }
   */
  async obtenerDetalleAccion(req, res) {
    try {
      const { usuario_id, simbolo } = req.body;
      
      if (!usuario_id || !simbolo) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere usuario_id y simbolo en el body'
        });
      }
      
      const accion = await portafolioService.obtenerAccionPortafolio(
        parseInt(usuario_id),
        simbolo.toUpperCase()
      );
      
      if (!accion) {
        return res.status(404).json({
          success: false,
          error: 'Esta acción no está en tu portafolio'
        });
      }
      
      res.status(200).json({
        success: true,
        accion
      });
      
    } catch (error) {
      console.error('Error en obtenerDetalleAccion:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener detalle de acción',
        detalle: error.message
      });
    }
  }

  /**
   * PUT /api/portafolio/actualizar-valores
   * Actualiza valores actuales y rendimientos desde el frontend
   * Body: { usuario_id, precios: [{ simbolo: 'AAPL', precio: 175.50 }, ...] }
   */
  async actualizarValoresActuales(req, res) {
    try {
      const { usuario_id, precios } = req.body;
      
      // Validaciones
      if (!usuario_id) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere usuario_id en el body'
        });
      }
      
      if (!precios || !Array.isArray(precios)) {
        return res.status(400).json({
          success: false,
          error: 'Se requiere un array "precios" con formato [{ simbolo, precio }]'
        });
      }
      
      if (precios.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El array de precios está vacío'
        });
      }
      
      // Validar que cada precio tenga el formato correcto
      const preciosInvalidos = precios.filter(p => !p.simbolo || !p.precio || p.precio <= 0);
      if (preciosInvalidos.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Hay precios con formato inválido. Cada precio debe tener { simbolo, precio > 0 }'
        });
      }
      
      // Verificar si el usuario tiene acciones en portafolio
      const portafolio = await portafolioService.obtenerPortafolio(parseInt(usuario_id));
      
      if (portafolio.length === 0) {
        return res.status(200).json({
          success: true,
          mensaje: 'El usuario no tiene acciones en portafolio. No se actualizó nada.'
        });
      }
      
      // Actualizar valores
      await portafolioService.actualizarValoresActuales(
        parseInt(usuario_id),
        precios
      );
      
      res.status(200).json({
        success: true,
        mensaje: 'Valores actualizados correctamente'
      });
      
    } catch (error) {
      console.error('Error en actualizarValoresActuales:', error);
      res.status(500).json({
        success: false,
        error: 'Error al actualizar valores',
        detalle: error.message
      });
    }
  }
}

export default new PortafolioController();