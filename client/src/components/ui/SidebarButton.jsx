import { NavLink } from "react-router-dom";
import "../../styles/components/ui/SidebarButton.css";

export function SidebarButton({ ruta, texto, icon = null }) {
  return (
    <NavLink
      to={ruta}
      className={({ isActive }) =>
        isActive ? "sidebar-btn sidebar-btn--active" : "sidebar-btn"
      }
    >
      {icon && <span className="sidebar-btn__icon">{icon}</span>}
      <span className="sidebar-btn__label">{texto}</span>
    </NavLink>
  );
}