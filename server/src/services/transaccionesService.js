// services/transaccionesService.mjs
import pool from '../config/database.js';

/**
 * Registra una nueva transacción (compra o venta)
 */
export const registrarTransaccion = async (usuarioId, simbolo, tipo, cantidad, precioUnitario) => {
  const query = `
    INSERT INTO transacciones (usuario_id, accion, tipo, cantidad, precio_unitario, fecha_hora)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING *
  `;
  
  const values = [usuarioId, simbolo, tipo,cantidad, precioUnitario];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Obtiene todas las transacciones de un usuario
 */
export const obtenerTransaccionesPorUsuario = async (usuarioId) => {
  const query = `
    SELECT * FROM transacciones 
    WHERE usuario_id = $1 
    ORDER BY fecha_hora DESC
  `;
  
  const result = await pool.query(query, [usuarioId]);
  return result.rows;
};

/**
 * Obtiene transacciones por símbolo de acción
 */
export const obtenerTransaccionesPorAccion = async (usuarioId, simbolo) => {
  const query = `
    SELECT * FROM transacciones 
    WHERE usuario_id = $1 AND accion = $2
    ORDER BY fecha_hora DESC
  `;
  
  const result = await pool.query(query, [usuarioId, simbolo]);
  return result.rows;
};