import { useContext } from "react";
import CotizacionesContext from "./cotizacionesContext";

export default function useCotizacionesContext() {
  return useContext(CotizacionesContext);
}