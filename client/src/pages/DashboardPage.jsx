import "../styles/pages-styles/DashboardPage.css";
import CardCartera from "../components/Pages/CardCartera";
import { Menu } from "../components/Pages";
import CardHeader from "../components/Pages/CardHeader";
import CardRendimiento from "../components/Pages/CardRendimiento";
import CardRendimientoAcciones from "../components/Pages/CardRendimientoAcciones";
// Importa aquí los futuros componentes cuando estén listos

export function DashboardPage() {
  return (
    <div className="cartera__layout">
       <Menu />
       <CardHeader titulo="Your Dashboard" />
       <CardCartera />
       <CardRendimiento className="card-rendimiento" />
       <CardRendimientoAcciones className="card-rendimiento-acciones" />
    </div>
  );
}