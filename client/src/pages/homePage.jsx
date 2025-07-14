import "../styles/pages-styles/HomePage.css";
import {
  Menu,
  CardHeader,
  CardCartera,
  CardCotizaciones,
  CardMejoresAcciones,
  CardMovimientos,
} from "../components/Pages";
import { useCotizaciones } from "../hooks/useCotizaciones";



export function HomePage() {
  const cotizaciones = useCotizaciones()

  return (

    <div className="home__layout">
      <Menu />
      <CardHeader titulo="Simulador De Inveriones" />
      <CardCartera />
      <CardCotizaciones cotizaciones={cotizaciones} />
      <CardMejoresAcciones cotizaciones={cotizaciones} />
      <CardMovimientos />
    </div>
  
  )
}