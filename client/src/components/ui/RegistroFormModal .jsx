import React, { useState } from "react";
import "../../styles/components/ui/ModalAuth.css";

export function RegistroFormModal({ visible, onClose, onRegister }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ nombre, email, password });
    onClose();
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
          <button type="submit">Crear cuenta</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}
