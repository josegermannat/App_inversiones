import "../styles/pages-styles/HomePage.css";
import {
  Menu,
  CardAppTitulo,
  CardCartera,
  CardCotizaciones,
  CardMejoresAcciones,
  CardMovimientos,
} from "../components/home";
import { useCotizaciones } from "../hooks/useCotizaciones";



export function HomePage() {
  const cotizaciones = useCotizaciones()

  return (
    <div className="home__layout">
      <Menu />
      <CardAppTitulo />
      <CardCartera />
      <CardCotizaciones cotizaciones={cotizaciones} />
      <CardMejoresAcciones cotizaciones={cotizaciones} />
      <CardMovimientos />
    </div>
  );
}