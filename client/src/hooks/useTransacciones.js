// hooks/useTransacciones.js
import { useState } from 'react';

const API_URL = 'http://localhost:3000/api';

export const useTransacciones = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registrarTransaccion = async (usuario_id, accion, tipo, cantidad, precio_unitario) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/transacciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id,
          accion,
          tipo,
          cantidad,
          precio_unitario
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar transacción');
      }

      return data;
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obtenerTransacciones = async (usuario_id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/transacciones/${usuario_id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener transacciones');
      }

      return data;
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obtenerTransaccionesPorAccion = async (usuario_id, simbolo) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/transacciones/${usuario_id}/accion/${simbolo}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener transacciones');
      }

      return data;
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    registrarTransaccion,
    obtenerTransacciones,
    obtenerTransaccionesPorAccion
  };
};