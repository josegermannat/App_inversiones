// routes/transaccionesRoutes.mjs
import express from 'express';
import transaccionesController from '../controllers/transaccionesController.js';

const router = express.Router();

// POST - Registrar una nueva transacción (compra o venta)
// Body: { usuario_id, accion, tipo, cantidad, precio_unitario }
router.post('/', transaccionesController.crearTransaccion.bind(transaccionesController));

// GET - Obtener todas las transacciones de un usuario
router.get('/:usuario_id', transaccionesController.obtenerTransacciones.bind(transaccionesController));

// GET - Obtener transacciones de una acción específica de un usuario
router.get('/:usuario_id/accion/:simbolo', transaccionesController.obtenerTransaccionesPorAccion.bind(transaccionesController));

export default router;