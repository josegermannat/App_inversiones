import React, { useState } from "react";
import "../../styles/components/ui/ModalIngresoDinero.css";

export default function ModalDinero({ onClose, onConfirmar,onRetirar, modo = "ingresar" }) {
  const montos = [1000, 5000, 10000];
  const [montoManual, setMontoManual] = useState("");

  const handleManualConfirmar = () => {
    const valor = parseInt(montoManual);
    if (!isNaN(valor) && valor > 0) {
      onConfirmar(valor);
      onClose();
    }
  };


  const textos = {
    ingresar: {
      titulo: "Ingresar dinero",
      prefijo: "+",
      botonConfirmar: "Ingresar"
    },
    retirar: {
      titulo: "Retirar dinero", 
      prefijo: "-",
      botonConfirmar: "Retirar"
    }
  };

  const config = textos[modo];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">{config.titulo}</h3>

        <div className="modal-options">
          {montos.map((monto,i) => (
            <button
              key={i}
              onClick={() => {
                onConfirmar(monto);
                onClose();
              }}
            >
              {config.prefijo}{monto.toLocaleString("es-AR")}
            </button>
          ))}
        </div>

        <input
          className="modal-input"
          type="number"
          placeholder="Otro monto..."
          value={montoManual}
          onChange={(e) => setMontoManual(e.target.value)}
        />

        <div className="modal-actions">
        {modo === 'retirar' &&   <button onClick={() => {
            onRetirar() 
            onClose() }}>
              Retirar Todo
              
              </button>}
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleManualConfirmar}>{config.botonConfirmar}</button>
        </div>
      </div>
    </div>
  );
}