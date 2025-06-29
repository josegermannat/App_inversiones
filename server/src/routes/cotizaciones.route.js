import express from 'express';
import { obtenerCotizaciones } from '../controllers/cotizaciones.controller.js';

const router = express.Router();

// POST /api/cotizaciones
router.post('/', obtenerCotizaciones);

export default router;