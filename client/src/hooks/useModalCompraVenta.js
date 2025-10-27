import { useState } from "react";

const useModalCompraVenta = () => {
  const [isOpen, setIsOpen] = useState(false);
const [tipoDeTransaccion,setTipoTransaccion] = useState()

const openModal = (tipo) => { 

  setTipoTransaccion(tipo); // 👈 Guarda el tipo
  setIsOpen(true);
};
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal , tipoDeTransaccion };
};

export default useModalCompraVenta;
