// src/components/ui/Button.jsx
import React from "react";
import "../../styles/components/ui/Button.css";

export function Button({ contenido, icon = null, onClick, variant = "primary" }) {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {icon && <span className="button__icon">{icon}</span>}
      <span className="button__text">{contenido}</span>
    </button>
  );
}
