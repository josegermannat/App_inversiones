import express from 'express';
import { MyControladorDeCotizaciones } from '../controllers/cotizaciones.controller.js';

const router = express.Router();
const controlador = new MyControladorDeCotizaciones();
// POST /api/cotizaciones
router.post('/', (req,res) => controlador.getCotizaciones(req,res));
// POST /api/cotizaciones/time_series


export default router;