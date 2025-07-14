import { Card } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { fecha: "Ene", rendimiento: 1200 },
  { fecha: "Feb", rendimiento: 2100 },
  { fecha: "Mar", rendimiento: 800 },
  { fecha: "Abr", rendimiento: 1600 },
  { fecha: "May", rendimiento: 900 },
  { fecha: "Jun", rendimiento: 1700 },
  { fecha: "Jul", rendimiento: 2200 },
];

export default function CardRendimiento({className}) {
  return (
    <div className={className}>
    <Card style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "20px 30px" }}>
      <h2 style={{ marginBottom: "1rem" }}>Rendimiento de la Cartera</h2>
      <div style={{ flex: 1, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rendimiento" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
