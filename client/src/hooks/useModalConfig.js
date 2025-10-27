// src/hooks/useModalDinero.js
import {  useCallback, useState } from "react";

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

  const handleConfirmar = useCallback(
    (ingresarDinero, retirarDinero) => (monto) => {
      console.log("Entramos a la función");
      console.log("monto:", monto);

      if (modalConfig.modo === "ingresar") {

        ingresarDinero(monto);
      } else if (modalConfig.modo === "retirar") {
        retirarDinero(monto);
      }
    },
    [modalConfig] // 🔹 se actualiza cada vez que cambie modalConfig
  );
  return {
    modalConfig,
    abrirModalIngresar,
    abrirModalRetirar,
    cerrarModal,
    handleConfirmar
  };
}