import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";  // 👈 ruta correcta
import { BrowserRouter } from "react-router-dom";
import { UsuarioProvider } from "./context/usuarioContext/UsuarioProvider.jsx";
import { CotizacionesProvider } from "./context/cotizaciones/CotizacionesProvider.jsx";
import { PortfolioProvider } from "./context/portfolioContext/PortfolioContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UsuarioProvider>
    <BrowserRouter>
      <PortfolioProvider>
        <CotizacionesProvider> 
          <App />
        </CotizacionesProvider>
      </PortfolioProvider>
    </BrowserRouter>
  </UsuarioProvider>
);
