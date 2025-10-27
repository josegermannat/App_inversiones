import { useContext } from "react";
import UsuarioContext from "./UsuarioContext";

export function useUsuario() {
  return useContext(UsuarioContext);
}