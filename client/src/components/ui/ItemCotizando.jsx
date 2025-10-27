import React from "react";
import "../../styles/components/ui/ItemCotizando.css";
import { Button } from "./Button";
import useModalCompraVenta from "../../hooks/useModalCompraVenta";
import ModalCompraVenta from "../ui/ModalCompraVenta";
export function ItemCotizando({ 
  nombre, 
  rendimiento, 
  precio, 
  picoDePrecio, 
  mostrarOptions = false ,
  simbolo
  
 
}) {
  
  const  { isOpen,closeModal,openModal,tipoDeTransaccion} = useModalCompraVenta()

   

  const isPositive = rendimiento >= 0;
 
  return (
    <>
       <tr className="item-cotizando">
      <td>{nombre}</td>
      <td className={isPositive ? "positivo" : "negativo"}>
        {isPositive ? "▲" : "▼"} {Math.abs(rendimiento).toFixed(2)} %
      </td>
      {(precio !== undefined && precio !== null) && (
        <td>{precio > 0 ? `$${Math.floor(precio)}` : "—"}</td>
      )}
      <td>${Math.floor(picoDePrecio)}</td>

      {mostrarOptions && (
        <>
          <td>
  
            <Button variant="primary" contenido={'Comprar'} onClick={() => openModal('compra')} />
          </td>
          <td>
            <Button variant="secundary" contenido={'Vender'} onClick={() => openModal('venta')} />
          </td>
        </>
      )}
    </tr>
    <ModalCompraVenta isOpen={isOpen} onClose={closeModal} tipo={tipoDeTransaccion} simbolo={simbolo} precio={precio}  />
    </>
 

  );
}
