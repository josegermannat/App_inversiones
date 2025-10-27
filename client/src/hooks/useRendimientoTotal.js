export function useRendimientoTotal(portafolio) {
  if (!portafolio || portafolio.length === 0) {
    return {
      rentabilidad_dinero: 0,
      rentabilidad_porcentaje: 0,
      valor_actual: 0,
      monto_invertido: 0
    };
  }

  const resultado = portafolio.reduce((acc, accion) => {
    return {
      rentabilidad_dinero: acc.rentabilidad_dinero + parseFloat(accion.rendimiento_dinero || 0),
      valor_actual: acc.valor_actual + parseFloat(accion.valor_actual || 0),
      monto_invertido: acc.monto_invertido + parseFloat(accion.monto_invertido || 0)
    };
  }, { rentabilidad_dinero: 0, valor_actual: 0, monto_invertido: 0 });

  if (resultado.monto_invertido > 0) {
    resultado.rentabilidad_porcentaje = 
      ((resultado.valor_actual - resultado.monto_invertido) / resultado.monto_invertido) * 100;
  } else {
    resultado.rentabilidad_porcentaje = 0;
  }

  const { rentabilidad_dinero, rentabilidad_porcentaje, valor_actual, monto_invertido } = resultado;

  return { rentabilidad_dinero, rentabilidad_porcentaje, valor_actual, monto_invertido };
}
