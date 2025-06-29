import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import cors from 'cors';
import cotizacionesRoutes from './routes/cotizaciones.route.js';
import cotizacionRoute from './routes/cotizacion.route.js';

const app = express();
app.use(cors());
app.use(express.json());


// Montamos el router en la ruta base
app.use('/api/cotizaciones', cotizacionesRoutes);
app.use('/api/cotizacion', cotizacionRoute);
console.log("🧪 API KEY usada:", process.env.TWELVE_DATA_API_KEY);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor activo en http://localhost:${PORT}`);
});
