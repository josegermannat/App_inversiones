import React, { useState } from "react";
import "../../styles/components/ui/ModalAuth.css";
import { useRegistro } from "../../hooks/useRegistro"; // 🔹 importamos el hook
import { Alerta } from "./Alerta.jsx";

export function RegistroFormModal({ visible, onClose,onSuccess }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Hook para manejar registro
  const { registrarUsuario, cargandoRegistro, errorRegistro } = useRegistro();

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    registrarUsuario({ nombre, email, password })
      .then(() => {
        onClose();
        onSuccess('Registro realalizado con exito')

      })
      .catch((error) => {

        console.error("❌ Error al registrar:", error.message);
      });
  };

  return (
    <div className="modal-auth-overlay">
      <div className="modal-auth">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={cargandoRegistro}>
            {cargandoRegistro ? "Cargando..." : "Crear cuenta"}
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>

        {/* 🔹 Mostramos mensajes según estado */}
        {errorRegistro && <Alerta tipo="error" mensaje={errorRegistro} />}
      </div>
    </div>
  );
}
