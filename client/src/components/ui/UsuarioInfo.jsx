// src/components/ui/UsuarioInfo.jsx
import { useUsuario } from "../../context/usuarioContext/useUsuarioContext";
import "../../styles/components/ui/UsuarioInfo.css"
export function UsuarioInfo() {
    const { usuario } = useUsuario();
  
    if (!usuario) return null;
  
    const nombreMostrado = usuario.nombre || usuario.email;
  
    return (
      <span className="usuario-nombre">
        Bienvenido  <span className="usuario-nombre-destacado">{nombreMostrado}</span>
      </span>
    );
  }