import React, { useState } from "react";
import "../../styles/components/ui/ModalAuth.css";

export function LoginFormModal({ visible, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
    onClose();
  };

  return (
    <div className="modal-auth-overlay">
      <div className="modal-auth">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Inciar Seccion</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}
