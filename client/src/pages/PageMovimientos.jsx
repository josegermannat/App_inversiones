import { Menu, CardHeader } from "../components/Pages";
import "../styles/pages-styles/PageMovimientos.css";
import CardMovimientos from "../components/Pages/CardMovimientos";
import { useTransacciones } from "../hooks/useTransacciones";
import { useUsuario } from "../context/usuarioContext/useUsuarioContext.js";
import { useState, useEffect } from "react";
function PageMovimientos() {
    const { usuario } = useUsuario();
    const { obtenerTransacciones } = useTransacciones();
    const [transacciones, setTransacciones] = useState([]);

    useEffect(() => {
        const cargarTransacciones = async () => {
            if (usuario?.id) {
                try {
                    const data = await obtenerTransacciones(String(usuario.id));
                    setTransacciones(data);
                } catch (error) {
                    console.error('Error al cargar transacciones:', error);
                }
            }
        };

        cargarTransacciones();
    }, [usuario?.id]);
   return(
    <div className="movimientos__layout">
        <Menu />
        <CardHeader titulo="Tus Movimientos" />
        <CardMovimientos title={'Tabla de Movimientos'} movimientos={transacciones.transacciones} />    
    </div>
   )



}

export default PageMovimientos;