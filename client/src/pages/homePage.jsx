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
import { useTransacciones } from "../hooks/useTransacciones";
import { useEffect,useState } from "react";
 
export function HomePage() { 
   const {cotizaciones} = useCotizacionesContext()
   const { usuario } = useUsuario() ?? {};
   const { portafolio } = usePortafolio(usuario?.id);



   const { obtenerTransacciones } = useTransacciones();
   const [transacciones, setTransacciones] = useState([]);

   useEffect(() => {
       const cargarTransacciones = async () => {
           if (usuario?.id) {
               try {
                   const data = await obtenerTransacciones(String(usuario.id));
                   setTransacciones(data);
               } catch (error) {
                   console.error('Error al cargar transacciones:', error);
               }
           }
       };

       cargarTransacciones();
   }, [usuario?.id]);


  return (
    <div className="home__layout">
      <Menu />  
      <CardHeader titulo="Simulador De Inversiones" />
      <CardCartera portafolio={portafolio} />
      <CardCotizaciones cotizaciones={cotizaciones} className=" home__cotizaciones" title="Preview De Cotizaciones"/>
      <CardMejoresAcciones cotizaciones={cotizaciones} />
      <CardMovimientos movimientos={transacciones.transacciones} />
    </div>
  )
}