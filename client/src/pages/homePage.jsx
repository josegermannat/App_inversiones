import "../styles/pages-styles/HomePage.css";
import {
  Menu,
  CardHeader,
  CardCartera,
  CardCotizaciones,
  CardMejoresAcciones,
  CardMovimientos,
} from "../components/Pages";

import useCotizacionesContext from "../context/cotizaciones/useCotizacionesContext.js";
import { useUsuario } from "../context/usuarioContext/useUsuarioContext";
import { usePortafolio } from "../hooks/usePortfolio.js";

export function HomePage() {
   const {cotizaciones} = useCotizacionesContext()
   const { usuario } = useUsuario() ?? {};
   const { portafolio } = usePortafolio(usuario?.id);

  return (
    <div className="home__layout">
      <Menu />  
      <CardHeader titulo="Simulador De Inversiones" />
      <CardCartera portafolio={portafolio} />
      <CardCotizaciones cotizaciones={cotizaciones} className=" home__cotizaciones" title="Preview De Cotizaciones"/>
      <CardMejoresAcciones cotizaciones={cotizaciones} />
      <CardMovimientos />
    </div>
  )
}