import "./styles/main.css";
import "./styles/reset.css";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { Routes, Route, Navigate } from "react-router-dom";
import PageCotizaciones from "./pages/PageCotizaciones";
import PageMovimientos from "./pages/PageMovimientos";

function App() {
  return (
   
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/cartera" element={<DashboardPage />} />
      <Route path="/cotizaciones" element={<PageCotizaciones />} />
      <Route path="/movimientos" element={<PageMovimientos />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
 