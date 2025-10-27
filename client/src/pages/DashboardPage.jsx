import "../styles/pages-styles/DashboardPage.css";
import CardCartera from "../components/Pages/CardCartera";
import { Menu } from "../components/Pages";
import CardHeader from "../components/Pages/CardHeader";
import CardRendimiento from "../components/Pages/CardRendimiento";
import CardRendimientoAcciones from "../components/Pages/CardRendimientoAcciones";
import { useUsuario } from "../context/usuarioContext/useUsuarioContext";
import { usePortafolio } from "../hooks/usePortfolio.js";

export function DashboardPage() {
  const { usuario } = useUsuario() ?? {};
  const { portafolio } = usePortafolio(usuario?.id);

  return (
    <div className="cartera__layout">
       <Menu />
       <CardHeader titulo="Your Dashboard" />
       <CardCartera portafolio={portafolio}/>
       <CardRendimiento className="card-rendimiento card-home" portafolio={portafolio}/>
       <CardRendimientoAcciones className="card-rendimiento-acciones card-home" portafolio={portafolio} />
    </div>
  );
}