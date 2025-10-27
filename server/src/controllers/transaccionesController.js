// controllers/transaccionesController.mjs
import * as transaccionesService from '../services/transaccionesService.js';
import * as portafolioService from '../services/portfolioService.js';

class TransaccionesController {
  
  /**
   * POST /api/transacciones
   * Registra una nueva transacción (compra o venta)
   */
  async crearTransaccion(req, res) {
    try {
      const { usuario_id, accion, tipo, cantidad, precio_unitario } = req.body;
      
      // Validaciones básicas
      if (!usuario_id || !accion || !tipo || !cantidad || !precio_unitario) {
        return res.status(400).json({
          error: 'Faltan datos requeridos',
          campos_requeridos: ['usuario_id', 'accion', 'tipo', 'cantidad', 'precio_unitario']
        });
      }
      
      if (tipo !== 'compra' && tipo !== 'venta') {
        return res.status(400).json({
          error: 'El tipo debe ser "compra" o "venta"'
        });
      }
      
      if (cantidad <= 0 || precio_unitario <= 0) {
        return res.status(400).json({
          error: 'La cantidad y el precio deben ser mayores a 0'
        });
      }
      
      // Registrar la transacción
      const transaccion = await transaccionesService.registrarTransaccion(
        usuario_id,
        accion.toUpperCase(),
        tipo,
        cantidad,
        precio_unitario
      );
      
      // Actualizar el portafolio después de la transacción
      await portafolioService.actualizarPortafolioDespuesTransaccion(
        usuario_id,
        accion.toUpperCase()
      );
      
      res.status(201).json({
        success: true,
        mensaje: `${tipo === 'compra' ? 'Compra' : 'Venta'} registrada exitosamente`,
        transaccion
      });
      
    } catch (error) {
      console.error('Error en crearTransaccion:', error);
      res.status(500).json({
        success: false,
        error: 'Error al registrar la transacción',
        detalle: error.message
      });
    }
  }

  /**
   * GET /api/transacciones/usuario/:usuario_id
   * Obtiene todas las transacciones de un usuario
   */
  async obtenerTransacciones(req, res) {
    try {
      const { usuario_id } = req.params;
      
      const transacciones = await transaccionesService.obtenerTransaccionesPorUsuario(
        parseInt(usuario_id)
      );
      
      res.status(200).json({
        success: true,
        cantidad: transacciones.length,
        transacciones
      });
      
    } catch (error) {
      console.error('Error en obtenerTransacciones:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener transacciones',
        detalle: error.message
      });
    }
  }

  /**
   * GET /api/transacciones/usuario/:usuario_id/accion/:simbolo
   * Obtiene transacciones de una acción específica
   */
  async obtenerTransaccionesPorAccion(req, res) {
    try {
      const { usuario_id, simbolo } = req.params;
      
      const transacciones = await transaccionesService.obtenerTransaccionesPorAccion(
        parseInt(usuario_id),
        simbolo.toUpperCase()
      );
      
      res.status(200).json({
        success: true,
        accion: simbolo.toUpperCase(),
        cantidad: transacciones.length,
        transacciones
      });
      
    } catch (error) {
      console.error('Error en obtenerTransaccionesPorAccion:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener transacciones',
        detalle: error.message
      });
    }
  }
}

export default new TransaccionesController();