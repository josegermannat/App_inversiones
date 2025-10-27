// src/context/UsuarioProvider.jsx
import { useState } from "react";
import UsuarioContext from "./UsuarioContext";

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const iniciarSesion = (datosUsuario) => {
     console.log('cambiando el usuariio')
    setUsuario({...datosUsuario});
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  );
}
