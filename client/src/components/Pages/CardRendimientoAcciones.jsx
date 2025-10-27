import { Card } from "../ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "../../styles/components/CardRendimientoAcciones.css";
import { useCardAnimation } from "../../hooks/hooksAnimations/useCardAnimation";
import { useUsuario } from "../../context/usuarioContext/useUsuarioContext";

const COLORS = ["#1EA392", "#38ac9c", "#725A9F", "#9AAFB8", "#2dd4bf", "#f87171"];

export default function CardRendimientoAcciones({ className, portafolio = [] }) {
  const {usuario} = useUsuario()
  const cardRef = useCardAnimation("right", 0.3);

     // Si no hay portafolio o está vacío mostramos mensaje
  if (!portafolio || portafolio.length === 0 || !usuario) {
    return (
      <div className={className} ref={cardRef}>
        <Card style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
             <h2 style={{ marginBottom: "1.2rem", textAlign: "center" }}>Tus Acciones</h2>
          <h2 style={{ textAlign: "center", color: "#fff" }}>
             No hay usuario registrado o no hay acciones en el portafolio
          </h2>
        </Card>
      </div>
    );
  }

  // Datos para el gráfico directamente del portafolio
  const data = portafolio.map(({ acciones, monto_invertido }) => ({
    name: acciones,
    value: parseFloat(monto_invertido),
  }));

  return (
    <div className={className} ref={cardRef}>
      <Card style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", padding: 20 }}>
        <h2 style={{ marginBottom: "1.2rem", textAlign: "center" }}>Tus Acciones</h2>

        <div className="acciones-scroll" style={{ width: "100%", marginBottom: 24 }}>
          <table className="tabla-acciones-usuario">
            <thead>
              <tr>
                <th>Acción</th>
                <th>Cantidad</th>
                <th>Invertido</th>
              </tr>
            </thead>
            <tbody>
              {portafolio.map(({ acciones, cantidad_total, monto_invertido }) => (
                <tr key={acciones}>
                  <td>{acciones}</td>
                  <td>{cantidad_total}</td>
                  <td>${parseFloat(monto_invertido).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ flex: 1, width: "100%", minHeight: 320, display: "flex", justifyContent: "center", alignItems: "center", padding: 10, flexDirection: "column", gap: 10, paddingTop: 20 }}>
          <ResponsiveContainer width="100%" height={320} style={{ marginTop: -30 }}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ paddingLeft: 30, lineHeight: "2.2", fontSize: 16, color: "white" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
