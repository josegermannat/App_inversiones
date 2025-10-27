// routes/portafolioRoutes.mjs
import express from 'express';
import portafolioController from '../controllers/portfolioController.js';

const router = express.Router();

// POST - Obtener portafolio completo de un usuario
router.post('/obtener', portafolioController.obtenerPortafolio.bind(portafolioController));

// POST - Obtener detalle de una acción específica del portafolio
router.post('/obtener-accion', portafolioController.obtenerDetalleAccion.bind(portafolioController));

// PUT - Actualizar valores actuales desde el frontend (cada 1 minuto)
router.put('/actualizar-valores', portafolioController.actualizarValoresActuales.bind(portafolioController));

export default router;