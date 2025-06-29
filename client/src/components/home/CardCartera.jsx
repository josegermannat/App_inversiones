import "../../styles/components/CardCartera.css";
import { Button } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Card3DEffect } from "../ui/Card3DEffect";
import { useDineroUsuario } from "../../hooks/useDineroUsuario";
import { useModalDinero } from "../../hooks/useModalConfig";
import ModalDinero from "../ui/ModalIngresoDinero";

export default function CardCartera({
  rentabilidadDinero = 0,
  rentabilidadPorcentaje = 0
}) {
  const { dinero, ingresarDinero, retirarDinero } = useDineroUsuario();
  const { modalConfig, abrirModalIngresar, abrirModalRetirar, cerrarModal, crearHandleConfirmar } = useModalDinero();
  
  const handleConfirmarTransaccion = crearHandleConfirmar(ingresarDinero, retirarDinero);

  return (
    <>
      <div className="home__cartera">
        <Card3DEffect className="card-home cartera__dinero">
          <h2>Saldo</h2>
          <div>
            <div className="dinero__container">
              <span>
                <FontAwesomeIcon className="dinero-icon" icon={faSackDollar} />
              </span>
              <span>${dinero.toLocaleString("es-AR")}</span>
            </div>
            <div className="dinero__buttons">
              <Button 
                contenido={'Ingresar'}
                icon={<FontAwesomeIcon icon={faArrowDown} />} 
                variant="primary"
                onClick={abrirModalIngresar}
              />
              
              <Button 
                contenido={'Retirar'}
                icon={<FontAwesomeIcon icon={faArrowUp} />} 
                variant="secundary"
                onClick={abrirModalRetirar}
              />
            </div>
          </div>
        </Card3DEffect>

        <Card3DEffect className="card-home cartera__rentabilidad">
          <h2>Rentabilidad</h2>
          <div className="container__rentabilidades">
            <span>+{rentabilidadPorcentaje}%</span>
            <span className="rentabilidad__dinero">+${rentabilidadDinero}</span>
          </div>
        </Card3DEffect>
      </div>

      {modalConfig.mostrar && (
        <ModalDinero 
          onClose={cerrarModal} 
          onConfirmar={handleConfirmarTransaccion}
          modo={modalConfig.modo}
        />
      )}
    </>
  );
}