import React, { useState } from "react";
import "../../styles/components/ui/ModalAuth.css";
import { useLogin } from "../../hooks/useLogin.js"; // 🔹 importamos el hook
import { Alerta } from "./Alerta.jsx";
import { useUsuario } from "../../context/usuarioContext/useUsuarioContext.js";

export function LoginFormModal({ visible, onClose,onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { iniciarSesion: guardarUsuario } = useUsuario();

  // 🔹 Hook para manejar login
  const { iniciarSesion, cargandoLogin, errorLogin, resetearLogin } = useLogin();

  const limpiarForm = () => {
    setEmail("");
    setPassword("");
  }
  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    iniciarSesion({ email, password })
      .then((respuesta) => {
         limpiarForm()
        resetearLogin();
        guardarUsuario({id:respuesta.userId, email: respuesta.email, nombre: respuesta.nombre })
        onClose();
        onSuccess("Inicio de sesión exitoso")
      })
      .catch((error) => {
        limpiarForm()
        console.error("❌ Error al iniciar sesión:", error.message);
      });
  };
  
  const handleClose = () => {
    setEmail("");
    setPassword("");
    resetearLogin(); // 🔹 limpia error también
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

          <button type="submit" disabled={cargandoLogin}>
            {cargandoLogin ? "Cargando..." : "Iniciar sesión"}
          </button>
          <button type="button" onClick={handleClose}>
            Cancelar
          </button>
        </form>

        {/* 🔹 Mostramos mensajes según estado */}
        {errorLogin && <Alerta tipo="error" mensaje={errorLogin} />}
      </div>
    </div>
  );
}
