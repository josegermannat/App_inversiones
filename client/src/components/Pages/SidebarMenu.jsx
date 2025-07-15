import "../../styles/components/SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faWallet,
  faChartLine,
  faRankingStar,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";

import { SidebarButton } from "../ui/SidebarButton";
import { useCardAnimation } from "../../hooks/hooksAnimations/useCardAnimation";

export default function SidebarMenu() {
  const cardRef = useCardAnimation("left", 0.0);

  return (
    <div ref={cardRef} className="card-home home__menu">
      <div className="menu__titulo">
        <h2>Menu</h2>
      </div>
      <div>
        <SidebarButton ruta="/home" icon={<FontAwesomeIcon icon={faHouse} />} texto="Inicio" />
        <SidebarButton ruta="/cotizaciones" icon={<FontAwesomeIcon icon={faChartLine} />} texto="Cotizaciones" />
        <SidebarButton ruta="/cartera" icon={<FontAwesomeIcon icon={faWallet} />} texto="Cartera" />
        <SidebarButton ruta="/mejores-acciones" icon={<FontAwesomeIcon icon={faRankingStar} />} texto="Mejores Acciones" />
        <SidebarButton ruta="/movimientos" icon={<FontAwesomeIcon icon={faRightLeft} />} texto="Movimientos" />
      </div>
    </div>
  );
}
