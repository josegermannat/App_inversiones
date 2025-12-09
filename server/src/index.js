import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import pool from './config/database.js';
import cors from 'cors';

//IMPORTACION DE RUTAS
import cotizacionesRoutes from './routes/cotizaciones.route.js';
import usuariosRoutes from "./routes/manejoDeUsuarios.js";
import saldosRoutes from "./routes/saldos.js";   
import transaccionesRoutes from './routes/transacciones.js';
import portafolioRoutes from './routes/portfolioRutes.js';
const app = express();
app.use(cors());
app.use(express.json());


pool.connect()
  .then(client => {
     
    console.log("✅ Conectado a PostgreSQL");
    client.release();
  })
  .catch(err => console.error("❌ Error de conexión a la base de datos", err));


app.use('/api/cotizaciones', cotizacionesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/saldos", saldosRoutes);
app.use('/api/transacciones', transaccionesRoutes);
app.use('/api/portafolio', portafolioRoutes);





// Código opcional solo para desarrollo local:
if (process.env.NODE_ENV !== 'production') {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🟢 Servidor activo en http://localhost:${PORT}`);
    });
}

export default app;