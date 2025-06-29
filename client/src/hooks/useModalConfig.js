// src/hooks/useModalDinero.js
import { useState } from "react";

export function useModalDinero() {
  const [modalConfig, setModalConfig] = useState({ mostrar: false, modo: null });

  const abrirModalIngresar = () => {
    setModalConfig({ mostrar: true, modo: "ingresar" });
  };

  const abrirModalRetirar = () => {
    setModalConfig({ mostrar: true, modo: "retirar" });
  };

  const cerrarModal = () => {
    setModalConfig({ mostrar: false, modo: null });
  };

  const crearHandleConfirmar = (ingresarDinero, retirarDinero) => {
    return (monto) => {
      if (modalConfig.modo === "ingresar") {
        ingresarDinero(monto);
      } else if (modalConfig.modo === "retirar") {
        retirarDinero(monto);
      }
    };
  };

  return {
    modalConfig,
    abrirModalIngresar,
    abrirModalRetirar,
    cerrarModal,
    crearHandleConfirmar
  };
}