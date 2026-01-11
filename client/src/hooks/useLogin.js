import { useState } from "react";
import { API_URL } from "../config/api";

export function useLogin() {
    const [datosLogin, setDatosLogin] = useState(null);
    const [cargandoLogin, setCargandoLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState(null);
  
    const iniciarSesion = (credenciales) => {
      setCargandoLogin(true);
      setErrorLogin(null);
      setDatosLogin(null);
  
      return fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credenciales),
      })
        .then((respuestaHttp) =>
          respuestaHttp.json().then((cuerpoParseado) => {
            if (!respuestaHttp.ok) {
              throw new Error(cuerpoParseado.error || "Error al iniciar sesión");
            }
            return cuerpoParseado;
          })
        )
        .then((cuerpoParseado) => {
          setDatosLogin(cuerpoParseado);
          return cuerpoParseado;
        })
        .catch((errorCapturado) => {
          setErrorLogin(errorCapturado.message);
          throw errorCapturado;
        })
        .finally(() => setCargandoLogin(false));
    };
  
    const resetearLogin = () => {
      setDatosLogin(null);
      setCargandoLogin(false);
      setErrorLogin(null);
    };
  
    return { iniciarSesion, datosLogin, cargandoLogin, errorLogin, resetearLogin };
  }
  