import "../styles/pages-styles/HomePage.css";
import {
  Menu,
  CardAppTitulo,
  CardCartera,
  CardCotizaciones,
  CardMejoresAcciones,
  CardMovimientos,
} from "../components/home";



export function HomePage() {
  return (
    <div className="home__layout">
      <Menu />
      <CardAppTitulo />
      <CardCartera />
      <CardCotizaciones />
      <CardMejoresAcciones />
      <CardMovimientos />
    </div>
  );
}