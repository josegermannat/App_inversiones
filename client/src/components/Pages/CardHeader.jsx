import "../../styles/components/CardHeader.css";
import { Button } from "../ui/Button";
import { useState } from "react";
import { LoginFormModal } from "../ui/LoginFormModal";
import { RegistroFormModal } from "../ui/RegistroFormModal";
import { Toast } from "../ui/Toast";
import { useAnimationChars } from "../../hooks/hooksAnimations/useAnimationChars";
import { useUsuario } from "../../context/usuarioContext/useUsuarioContext.js"; // 🔹 importamos contexto
import { UsuarioInfo } from "../ui/UsuarioInfo";
export default function CardHeader({ titulo }) {
  useAnimationChars(".title");

  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);

  // 🔹 Estado del toast
  const [toastMensaje, setToastMensaje] = useState(null);
  const [toastTipo, setToastTipo] = useState("info");

  // 🔹 Contexto de usuario
  const { usuario, cerrarSesion } = useUsuario();

  return (
    <div className="home__title">
      <div className="container__title">
        <h1 className="title">{titulo}</h1>
      </div>

      <div className="container__login">
        {!usuario ? (
          <>
            <Button onClick={() => setShowLogin(true)} contenido={"Iniciar sesión"} />
            <Button
              onClick={() => setShowRegistro(true)}
              contenido={"Registrarse"}
              variant="secundary"
            />

            <LoginFormModal
              visible={showLogin}
              onClose={() => setShowLogin(false)}
              onSuccess={(msg) => {
                setToastTipo("success");
                setToastMensaje(msg);
              }}
            />

            <RegistroFormModal
              visible={showRegistro}
              onClose={() => setShowRegistro(false)}
              onSuccess={(msg) => {
                setToastTipo("success");
                setToastMensaje(msg);
              }}
            />
          </>
        ) : (
          <>
          <div className="container__usuario-logeado">
          <UsuarioInfo />

<Button
  onClick={() => {
    cerrarSesion();
    setToastTipo("info");
    setToastMensaje("Sesión cerrada correctamente");
  }}
  contenido={"Cerrar sesión"}
/>
          </div>
   
          </>
        )}
      </div>

      {/* 🔹 Toast global */}
      {toastMensaje && (
        <Toast
          tipo={toastTipo}
          mensaje={toastMensaje}
          duracion={3000}
          onClose={() => setToastMensaje(null)}
        />
      )}
    </div>
  );
}
