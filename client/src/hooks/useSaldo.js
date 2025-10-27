import { useState } from "react";

const API_URL = "http://localhost:3000/saldos"; // Ajusta al puerto/back que uses

export function useSaldo() {
  const [saldo, setSaldo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Consultar saldo actual
  const consultarSaldo = (usuario_id) => {
    setCargando(true);
    setError(null);
    return fetch(`${API_URL}/${usuario_id}`)
      .then((res) =>
        res.json().then((body) => {
          if (!res.ok) throw new Error(body.error || "Error al consultar saldo");
          return body;
        })
      )
      .then((data) => {
        setSaldo(data);
        return data;
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setCargando(false));
  };

  // 🔹 Ingresar dinero
  const ingresarDinero = (usuario_id, monto) => {
    setCargando(true);
    setError(null);
    return fetch(`${API_URL}/ingresar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id, monto }),
    })
      .then((res) =>
        res.json().then((body) => {
          if (!res.ok) throw new Error(body.error || "Error al ingresar dinero");
          return body;
        })
      )
      .then((data) => {
        setSaldo(data);
        return data;
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setCargando(false));
  };

  // 🔹 Retirar dinero
  const retirarDinero = (usuario_id, monto) => {
    setCargando(true);
    setError(null);
    return fetch(`${API_URL}/retirar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id, monto }),
    })
      .then((res) =>
        res.json().then((body) => {
          if (!res.ok) throw new Error(body.error || "Error al retirar dinero");
          return body;
        })
      )
      .then((data) => {
        setSaldo(data);
        return data;
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setCargando(false));
  };

  // 🔹 Invertir dinero (disponible → invertido)
  const invertirDinero = (usuario_id, monto) => {
    console.log(usuario_id,monto)
    setCargando(true);
    setError(null);
    return fetch(`${API_URL}/invertir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id, monto }),
    })
      .then((res) =>
        res.json().then((body) => {
          if (!res.ok) throw new Error(body.error || "Error al invertir dinero");
          return body;
        })
      )
      .then((data) => {
        setSaldo(data);
        return data;
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setCargando(false));
  };

  // 🔹 Desinvertir dinero (invertido → disponible)
  // monto_original: dinero original invertido (se resta del saldo_invertido)
  // monto_total: valor actual con ganancias/pérdidas (se suma al saldo_disponible)
  const desinvertirDinero = (usuario_id, monto_original, monto_total) => {
    setCargando(true);
    setError(null);
    return fetch(`${API_URL}/desinvertir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario_id, monto_original, monto_total }),
    })
      .then((res) =>
        res.json().then((body) => {
          if (!res.ok) throw new Error(body.error || "Error al desinvertir dinero");
          return body;
        })
      )
      .then((data) => {
        setSaldo(data);
        return data;
      })
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setCargando(false));
  };

  return {
    saldo,
    cargando,
    error,
    consultarSaldo,
    ingresarDinero,
    retirarDinero,
    invertirDinero,
    desinvertirDinero, // 🔹 opcional
  };
}
