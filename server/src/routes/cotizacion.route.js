import express from 'express';
import { obtenerCotizacion } from '../controllers/cotizacion.controller.js';

const router = express.Router();

router.get('/:symbol', obtenerCotizacion);

export default router;