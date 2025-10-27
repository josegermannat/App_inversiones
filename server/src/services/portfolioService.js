// services/portafolioService.mjs
import pool from '../config/database.js';

/**
 * Actualiza el portafolio después de una transacción
 * Recalcula: cantidad_total, precio_promedio, monto_invertido
 */
export const actualizarPortafolioDespuesTransaccion = async (usuarioId, simbolo) => {
  try {
    // Obtener todas las transacciones de esta acción
    const transaccionesQuery = `
      SELECT tipo, cantidad, precio_unitario 
      FROM transacciones 
      WHERE usuario_id = $1 AND accion = $2
      ORDER BY fecha_hora ASC
    `;
    
    const result = await pool.query(transaccionesQuery, [usuarioId, simbolo]);
    const transacciones = result.rows;
    
    if (transacciones.length === 0) {
      await pool.query(
        'DELETE FROM portafolio_usuarios WHERE usuario_id = $1 AND acciones = $2',
        [usuarioId, simbolo]
      );
      return null;
    }
    
    // Calcular totales usando el método FIFO (First In, First Out)
    let cantidadTotal = 0;
    let sumaPrecios = 0;
    let totalCompras = 0;
    
    transacciones.forEach(t => {
      if (t.tipo === 'compra') {
        cantidadTotal += t.cantidad;
        sumaPrecios += parseFloat(t.precio_unitario) * t.cantidad;
        totalCompras += t.cantidad;
      } else if (t.tipo === 'venta') {
        cantidadTotal -= t.cantidad;
      }
    });
    
    // Si la cantidad es 0 o negativa, eliminar del portafolio
    if (cantidadTotal <= 0) {
      await pool.query(
        'DELETE FROM portafolio_usuarios WHERE usuario_id = $1 AND acciones = $2',
        [usuarioId, simbolo]
      );
      return null;
    }
    
    // Calcular precio promedio de compra
    const precioPromedio = totalCompras > 0 ? sumaPrecios / totalCompras : 0;
    
    // El monto invertido es simplemente: cantidad actual × precio promedio
    const montoTotalInvertido = cantidadTotal * precioPromedio;
    
    // Calcular valor actual inicial basado en el precio promedio de compra
    const valorActualInicial = cantidadTotal * precioPromedio;
    const rendimientoDineroInicial = valorActualInicial - montoTotalInvertido;
    const rendimientoPorcentajeInicial = montoTotalInvertido > 0 
      ? (rendimientoDineroInicial / montoTotalInvertido) * 100 
      : 0;

    // Insertar o actualizar con valores iniciales basados en precio de compra
    const upsertQuery = `
      INSERT INTO portafolio_usuarios 
        (usuario_id, acciones, cantidad_total, precio_promedio, monto_invertido, 
         valor_actual, rendimiento_porcentaje, rendimiento_dinero)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (usuario_id, acciones) 
      DO UPDATE SET
        cantidad_total = $3,
        precio_promedio = $4,
        monto_invertido = $5,
        valor_actual = $6,
        rendimiento_porcentaje = $7,
        rendimiento_dinero = $8
      RETURNING *
    `;
    
    const portafolioResult = await pool.query(upsertQuery, [
      usuarioId,
      simbolo,
      cantidadTotal,
      precioPromedio,
      montoTotalInvertido,
      valorActualInicial,
      rendimientoPorcentajeInicial,
      rendimientoDineroInicial
    ]);
    
    return portafolioResult.rows[0];
    
  } catch (error) {
    throw new Error(`Error al actualizar portafolio: ${error.message}`);
  }
};

/**
 * Actualiza valores actuales y rendimientos desde el frontend
 * Recibe array de precios: [{ simbolo: 'AAPL', precio: 175.50 }, ...]
 */
export const actualizarValoresActuales = async (usuarioId, preciosActuales) => {
  try {
    // Obtener todas las acciones del portafolio del usuario
    const portafolioQuery = `
      SELECT acciones, cantidad_total, monto_invertido 
      FROM portafolio_usuarios 
      WHERE usuario_id = $1
    `;
    
    const result = await pool.query(portafolioQuery, [usuarioId]);
    const accionesPortafolio = result.rows;
    
    // Crear un mapa de precios para búsqueda rápida
    const mapPrecios = {};
    preciosActuales.forEach(item => {
      mapPrecios[item.simbolo.toUpperCase()] = parseFloat(item.precio);
    });
    
    // Actualizar solo las acciones que están en el portafolio Y tienen precio
    const actualizaciones = [];
    
    for (const accion of accionesPortafolio) {
    const precioActual = mapPrecios[accion.acciones];
      
      if (precioActual) {
        const valorActual = accion.cantidad_total * precioActual;
        const montoInvertido = parseFloat(accion.monto_invertido);
        const rendimientoDinero = valorActual - montoInvertido;
        const rendimientoPorcentaje = montoInvertido > 0 
          ? (rendimientoDinero / montoInvertido) * 100 
          : 0;
        
        const updateQuery = `
          UPDATE portafolio_usuarios 
          SET 
            valor_actual = $1,
            rendimiento_dinero = $2,
            rendimiento_porcentaje = $3
          WHERE usuario_id = $4 AND acciones = $5
          RETURNING *
        `;
        
        const updateResult = await pool.query(updateQuery, [
          valorActual,
          rendimientoDinero,
          rendimientoPorcentaje,
          usuarioId,
          accion.acciones
        ]);
        
        actualizaciones.push(updateResult.rows[0]);
      }
    }
    
    return actualizaciones;
    
  } catch (error) {
    throw new Error(`Error al actualizar valores actuales: ${error.message}`);
  }
};

/**
 * Obtiene el portafolio completo del usuario
 */
export const obtenerPortafolio = async (usuarioId) => {
  const query = `
    SELECT * FROM portafolio_usuarios 
    WHERE usuario_id = $1
    ORDER BY acciones ASC
  `;
  
  const result = await pool.query(query, [usuarioId]);
  return result.rows;
};

/**
 * Obtiene una acción específica del portafolio
 */
export const obtenerAccionPortafolio = async (usuarioId, simbolo) => {
  const query = `
    SELECT * FROM portafolio_usuarios 
    WHERE usuario_id = $1 AND acciones = $2
  `;
  
  const result = await pool.query(query, [usuarioId, simbolo]);
  return result.rows[0];
};