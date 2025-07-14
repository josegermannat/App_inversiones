import "./styles/main.css";
import "./styles/reset.css";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/cartera" element={<DashboardPage />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
 