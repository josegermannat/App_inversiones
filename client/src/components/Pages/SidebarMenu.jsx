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


export default function SidebarMenu() {
  

  return (
    <div className="card-home home__menu">
      <div className="menu__titulo">
        <h2>Menu</h2>
      </div>
      <div>
        <SidebarButton ruta="/home" icon={<FontAwesomeIcon icon={faHouse} />} texto="Inicio" />
        <SidebarButton ruta="/cotizaciones" icon={<FontAwesomeIcon icon={faChartLine} />} texto="Cotizaciones" />
        <SidebarButton ruta="/cartera" icon={<FontAwesomeIcon icon={faWallet} />} texto="Cartera" />
        <SidebarButton ruta="/movimientos" icon={<FontAwesomeIcon icon={faRightLeft} />} texto="Movimientos" />
      </div>
    </div>
  );
}
