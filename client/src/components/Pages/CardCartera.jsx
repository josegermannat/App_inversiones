import "../../styles/components/CardCartera.css";
import { Button } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useDineroUsuario } from "../../hooks/useDineroUsuario";
import { useModalDinero } from "../../hooks/useModalConfig";
import ModalDinero from "../ui/ModalIngresoDinero";
import { useCardAnimation } from "../../hooks/hooksAnimations/useCardAnimation";
import { useUsuario } from "../../context/usuarioContext/useUsuarioContext.js";
import { useRendimientoTotal } from "../../hooks/useRendimientoTotal";

export default function CardCartera({
  portafolio = null,
}) {


 
      

  const {usuario} = useUsuario()
  const { dinero,saldo , ingresarDinero, retirarDinero,retirarTodoElDinero } = useDineroUsuario();
  const { modalConfig, abrirModalIngresar, abrirModalRetirar, cerrarModal, handleConfirmar } = useModalDinero();
  const cardRef = useCardAnimation("left", 0.2);
  
  // Calcular rendimiento total del portafolio
  const totales = useRendimientoTotal(portafolio);

  const handleConfirmarTransaccion = handleConfirmar(ingresarDinero, retirarDinero);

 
  return (
    <>
      <div className="home__cartera" ref={cardRef}>
        <div className="card-home cartera__dinero">
          <h2>Saldo</h2>
          <div>
            <div className="dinero__container">
              <span>
                <FontAwesomeIcon className="dinero-icon" icon={faSackDollar} />
              </span>
              <span className={usuario? 'dinero-usuario' : 'no-register'}>{usuario? `$ Saldo  ${dinero.toLocaleString("es-AR")}` : 'usuario no registrado'}</span>
             {saldo &&     <span className={'dinero-usuario'}> {usuario? `$ Saldo Invertido ${saldo.saldo_invertido.toLocaleString("es-AR")}` : ''}</span>}
            </div>
            <div className="dinero__buttons">
              <Button 
                contenido={'Ingresar'}
                icon={<FontAwesomeIcon icon={faArrowDown} />} 
                variant="primary"
                onClick={abrirModalIngresar}
                disabled={usuario? false : true}
              />
              
              <Button 
                contenido={'Retirar'}
                icon={<FontAwesomeIcon icon={faArrowUp} />} 
                variant="secundary"
                onClick={abrirModalRetirar}
                disabled={usuario? false : true}
              />
            </div>
          </div>
        </div>

        <div className="card-home cartera__rentabilidad">
          <h2>Rentabilidad</h2>
          <div className="container__rentabilidades">
            <span>{totales.rentabilidad_porcentaje && usuario ? `${totales.rentabilidad_porcentaje > 0 ? '+' : ''}${totales.rentabilidad_porcentaje.toFixed(2)}%` : '0%'}</span>
            <span className="rentabilidad__dinero">{totales.rentabilidad_dinero && usuario ? `${totales.rentabilidad_dinero > 0 ? '+' : ''}$${totales.rentabilidad_dinero.toLocaleString("es-AR")}` : '$0'}</span>
          </div>
        </div>
      </div>

      {modalConfig.mostrar && (
        <ModalDinero 
         onRetirar={retirarTodoElDinero}
          onClose={cerrarModal} 
          onConfirmar={handleConfirmarTransaccion}
          modo={modalConfig.modo}
        />
      )}
    </>
  );
}