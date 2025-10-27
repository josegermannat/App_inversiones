import CotizacionesContext from "./cotizacionesContext";
import { useCotizaciones } from "../../hooks/useCotizaciones";

export function CotizacionesProvider({ children }) {
  const cotizaciones = useCotizaciones();

  return (
    <CotizacionesContext.Provider value={{ cotizaciones }}>
      {children}
    </CotizacionesContext.Provider>
  );
}

export default CotizacionesContext;
