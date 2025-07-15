import { Card } from "../ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import "../../styles/components/CardRendimientoAcciones.css";
import { useCardAnimation } from "../../hooks/hooksAnimations/useCardAnimation";

// Datos de prueba con acciones repetidas
const accionesUsuario = [
  { nombre: "AAPL", cantidad: 10, invertido: 4000 },
  { nombre: "TSLA", cantidad: 5, invertido: 3000 },
  { nombre: "AMZN", cantidad: 2, invertido: 2000 },
  { nombre: "MSFT", cantidad: 7, invertido: 2780 },
  { nombre: "AAPL", cantidad: 2, invertido: 800 },
  { nombre: "TSLA", cantidad: 3, invertido: 1800 },
  { nombre: "MSFT", cantidad: 7, invertido: 2780 },
  { nombre: "AAPL", cantidad: 2, invertido: 800 },
  { nombre: "TSLA", cantidad: 3, invertido: 1800 },
];

// Lógica para agrupar y sumar acciones con el mismo símbolo
const agruparAcciones = (acciones) => {
  const agrupadas = acciones.reduce((acc, curr) => {
    if (!acc[curr.nombre]) {
      // Si no existe, la agrego
      acc[curr.nombre] = { ...curr };
    } else {
      // Si ya existe, sumo cantidad e invertido
      acc[curr.nombre].cantidad += curr.cantidad;
      acc[curr.nombre].invertido += curr.invertido;
    }
    return acc;
  }, {});
  
  return Object.values(agrupadas);
};

// Aplicar la lógica de agrupación
const accionesAgrupadas = agruparAcciones(accionesUsuario);

// Datos para el gráfico (usando las acciones agrupadas)
const data = accionesAgrupadas.map(({ nombre, invertido }) => ({ name: nombre, value: invertido }));
const COLORS = ["#1EA392", "#38ac9c", "#725A9F", "#9AAFB8", "#2dd4bf", "#f87171"];

export default function CardRendimientoAcciones({className}) {
  const cardRef = useCardAnimation("right", 0.3);

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
              {accionesAgrupadas.map((accion) => (
                <tr key={accion.nombre}>
                  <td>{accion.nombre}</td>
                  <td>{accion.cantidad}</td>
                  <td>${accion.invertido.toLocaleString()}</td>
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
              <Legend layout="horizontal" align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingLeft: 30, lineHeight: '2.2', fontSize: 16, color: "white" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
} 