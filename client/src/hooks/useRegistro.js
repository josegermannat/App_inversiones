import { useState } from "react";

const URL_API = "http://localhost:3000/usuarios"; // ajusta según tu backend

export function useRegistro() {
  const [datosRegistro, setDatosRegistro] = useState(null);
  const [cargandoRegistro, setCargandoRegistro] = useState(false);
  const [errorRegistro, setErrorRegistro] = useState(null);

  // 🔹 Función principal: registrar usuario
  const registrarUsuario = (nuevoUsuario) => {
    setCargandoRegistro(true);
    setErrorRegistro(null);
    setDatosRegistro(null);

    return fetch(`${URL_API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((respuestaHttp) =>
        respuestaHttp.json().then((cuerpoParseado) => {
          if (!respuestaHttp.ok) {
            throw new Error(cuerpoParseado.error || "Error al registrar usuario");
          }
          return cuerpoParseado;
        })
      )
      .then((cuerpoParseado) => {
        setDatosRegistro(cuerpoParseado);
        return cuerpoParseado;
      })
      .catch((errorCapturado) => {
        setErrorRegistro(errorCapturado.message);
        throw errorCapturado;
      })
      .finally(() => setCargandoRegistro(false));
  };

  // 🔹 Nueva función: resetear estados
  const resetearRegistro = () => {
    setDatosRegistro(null);
    setCargandoRegistro(false);
    setErrorRegistro(null);
  };

  return {
    registrarUsuario,
    datosRegistro,
    cargandoRegistro,
    errorRegistro,
    resetearRegistro,
  };
}
