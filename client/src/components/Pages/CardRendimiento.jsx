import { Card } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCardAnimation } from "../../hooks/hooksAnimations/useCardAnimation";
import { useRendimientoTotal } from "../../hooks/useRendimientoTotal";
import { useUsuario } from "../../context/usuarioContext/useUsuarioContext";

export default function CardRendimiento({className, portafolio = []}) {
  const cardRef = useCardAnimation("up", 0.1);
  const { usuario } = useUsuario();
  
  // Calcular rendimiento total del portfolio
  const { rentabilidad_porcentaje } = useRendimientoTotal(portafolio);
  
  // Datos de ejemplo para el gráfico (simulando variaciones de rendimiento)
  const data = [
    { punto: "1", rendimiento: Math.max(0, rentabilidad_porcentaje - 5) },
    { punto: "2", rendimiento: Math.max(0, rentabilidad_porcentaje - 3) },
    { punto: "3", rendimiento: Math.max(0, rentabilidad_porcentaje - 8) },
    { punto: "4", rendimiento: Math.max(0, rentabilidad_porcentaje - 2) },
    { punto: "5", rendimiento: Math.max(0, rentabilidad_porcentaje - 6) },
    { punto: "6", rendimiento: Math.max(0, rentabilidad_porcentaje - 1) },
    { punto: "7", rendimiento: rentabilidad_porcentaje },
  ];
  
  // Si no hay usuario o portfolio, mostrar mensaje
  if (!usuario || !portafolio || portafolio.length === 0) {
    return (
      <div className={className} ref={cardRef}>
        <Card style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
          <h2 style={{ textAlign: "center", color: "#fff" }}>
            No hay datos de rendimiento disponibles
          </h2>
        </Card>
      </div>
    );
  }

  return (
    <div className={className} ref={cardRef}>
      <Card style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "20px 30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2>Rendimiento de la Cartera</h2>
          <div style={{ 
            fontSize: "1.5rem", 
            fontWeight: "bold", 
            color: rentabilidad_porcentaje >= 0 ? "#10b981" : "#ef4444" 
          }}>
            {rentabilidad_porcentaje >= 0 ? "+" : ""}{rentabilidad_porcentaje.toFixed(2)}%
          </div>
        </div>
        <div style={{ flex: 1, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="punto" hide />
              <YAxis 
                label={{ value: 'Rendimiento (%)', angle: -90, position: 'insideLeft' }}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(2)}%`, 'Rendimiento']}
                labelStyle={{ color: '#000' }}
                contentStyle={{ backgroundColor: '#f8f9fa', border: '1px solid #ccc' }}
              />
              <Line 
                type="monotone" 
                dataKey="rendimiento" 
                stroke={rentabilidad_porcentaje >= 0 ? "#10b981" : "#ef4444"} 
                strokeWidth={3}
                dot={{ fill: rentabilidad_porcentaje >= 0 ? "#10b981" : "#ef4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: rentabilidad_porcentaje >= 0 ? "#10b981" : "#ef4444", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
