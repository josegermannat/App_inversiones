
import { Button } from "./Button";
import { Toast } from "./Toast";
import '../../styles/components/ui/ModalCompraVenta.css'
import { useTransacciones } from "../../hooks/useTransacciones.js"
import { useUsuario } from "../../context/usuarioContext/useUsuarioContext.js";
import { createPortal } from "react-dom";
import { useState } from "react";
import { useDineroUsuario } from "../../hooks/useDineroUsuario";
import { usePortafolio } from "../../hooks/usePortfolio.js";
const ModalCompraVenta = ({ isOpen, onClose, tipo, simbolo,precio}) => {

  const [cantidad, setCantidad] = useState(0)
  const [toast, setToast] = useState({ mensaje: '', tipo: '' });
  const { loading, error, registrarTransaccion, obtenerTransacciones } = useTransacciones();

  const {usuario} = useUsuario()
  const {dinero, invertirDinero, desinvertirDinero} = useDineroUsuario()
  const {portafolio} = usePortafolio(usuario?.id)
const handleTransaccion = async () => {
  // Validaciones técnicas (no son errores del usuario)
  if (!usuario) {
    console.error('No se pudo obtener el usuario');
    setToast({ mensaje: 'Necesitas iniciar sesión para empezar a comprar', tipo: 'error' });
    return;
  }

  if (!simbolo || simbolo.trim() === '') {
    console.error('Símbolo de acción no disponible');
    setToast({ mensaje: 'Error: Los datos de la acción no se cargaron correctamente.', tipo: 'error' });
    return;
  }

  if (!tipo || (tipo !== 'compra' && tipo !== 'venta') ) {
    console.error('Tipo de transacción inválido');
    setToast({ mensaje: 'Error: Ocurrió un problema con el tipo de operación.', tipo: 'error' });
    return;
  }

  if (!cantidad || cantidad <= 0) {
    console.error('Cantidad no válida');
    setToast({ mensaje: 'Por favor, ingresa una cantidad válida.', tipo: 'error' });
    return;
  }

  if (!precio || precio <= 0) {
    console.error('Precio no disponible');
    setToast({ mensaje: 'Error: El precio de la acción no está disponible. Intenta nuevamente.', tipo: 'error' });
    return;
  }

  // Calcular el monto total de la transacción
  const montoTotal = precio * cantidad;

  // Validar que el usuario tenga dinero suficiente para comprar
  if (tipo === 'compra' && montoTotal > dinero) {
    setToast({ 
      mensaje: `No tienes suficiente dinero disponible. Necesitas $${montoTotal} pero solo tienes $${dinero}`, 
      tipo: 'error' 
    });
    return;
  }

  // Validar que el usuario tenga suficientes acciones para vender
  if (tipo === 'venta') {
    console.log(portafolio)
    const accionEnPortafolio = portafolio.find(item => item.acciones === simbolo);
    const cantidadDisponible = accionEnPortafolio?.cantidad_total || 0;

    if (cantidad > cantidadDisponible) {
      setToast({ 
        mensaje: `No tienes suficientes acciones para vender. Quieres vender ${cantidad} pero solo tienes ${cantidadDisponible}`, 
        tipo: 'error' 
      });
      return;
    }
  }

  console.log(usuario.id, simbolo, tipo, cantidad, precio)
  // Si pasa todas las validaciones, ejecutar
  try {
    await registrarTransaccion(usuario.id, simbolo, tipo, cantidad, precio);

    // Si es compra, invertir dinero (disponible → invertido)
    if (tipo === 'compra') {
      await invertirDinero(montoTotal);
    } 
    // Si es venta: desinvertir el valor actual de las acciones vendidas
    else if (tipo === 'venta') {
      const accionEnPortafolio = portafolio.find(item => item.acciones === simbolo);
      
      if (accionEnPortafolio) {
        // Verificar que el valor_actual esté disponible y sea mayor a 0
        if (!accionEnPortafolio.valor_actual || accionEnPortafolio.valor_actual <= 0) {
          setToast({ 
            mensaje: 'Error: No se pudo obtener el valor actual de la acción. Intenta nuevamente.', 
            tipo: 'error' 
          });
          return;
        }
        
        // Calcular el monto original invertido proporcional a las acciones que vendes
        const proporcionVenta = cantidad / accionEnPortafolio.cantidad_total;
        const montoOriginalProporcional = accionEnPortafolio.monto_invertido * proporcionVenta;
        const valorActualProporcional = accionEnPortafolio.valor_actual * proporcionVenta;
        
        // Desinvertir: monto original se resta del saldo_invertido, valor actual se suma al saldo_disponible
        await desinvertirDinero(montoOriginalProporcional, valorActualProporcional);
      }
    }

    console.log('✅ Transacción registrada exitosamente');
    setToast({ mensaje: 'Transacción registrada exitosamente', tipo: 'success' });
    setCantidad('');
    setTimeout(() => onClose(), 1500); // Cerrar después de mostrar el toast
  } catch (error) {
    console.error('❌ Error al registrar transacción:', error);
    setToast({ mensaje: 'Error al procesar la transacción. Por favor, intenta nuevamente.', tipo: 'error' });
  }
};


  if (!isOpen) return null;

  return  createPortal(
  <div className="modal-overlay" onClick={() => {
    setCantidad(0) 
    onClose()
    }}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <Toast 
      mensaje={toast.mensaje} 
      tipo={toast.tipo} 
      onClose={() => setToast({ mensaje: '', tipo: '' })} 
    />
    <h3 className="modal-title">{tipo === "compra" ? "Comprar" : "Vender"} {simbolo}</h3>

    <div className="modal-options">
    
       
        
        <input
          type="number"
          min="1"
          className="modal-input"
         value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
        />
      
    </div>

    <div className="modal-actions">
      <button onClick={() => {
    setCantidad(0) 
    onClose()
    }}>Cancelar</button>
      <Button
        type="button"
        variant="primary"
       contenido={tipo === 'compra'? 'Comprar': 'Vender'}
         onClick={handleTransaccion}
      />
     
    </div>
  </div>
</div>,
document.body 
    )
};

export default ModalCompraVenta;
