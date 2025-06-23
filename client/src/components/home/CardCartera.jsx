import "../../styles/components/CardCartera.css";
import { Button } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Card3DEffect } from "../ui/Card3DEffect";
export default function CardCartera({dineroUsuario,rentabilidadPorcentaje,rentabilidadDinero}) {
  return (
    <div className="home__cartera">
  
  <Card3DEffect className="card-home cartera__dinero">
  
    <h2>Saldo</h2>
        <div>
          <div className="dinero__container">
             <span><FontAwesomeIcon className="dinero-icon" icon={faSackDollar} /></span>
             <span>{dineroUsuario}1.000.000...</span>
          </div>
        <div className="dinero__buttons">
            <Button icon={<FontAwesomeIcon icon={faArrowDown} />} variant="primary">
              Ingresar
            </Button>
            <Button icon={<FontAwesomeIcon icon={faArrowUp} />} variant="secundary">
             Retirar
             </Button>
          </div>
         </div>
       </Card3DEffect>

     


         <Card3DEffect className="card-home cartera__rentabilidad">
         
          <h2>Rentabilidad</h2>
               <div className="container__rentabilidades">
              <span>+{rentabilidadPorcentaje}25.70%</span>
               <span className="rentabilidad__dinero">+{rentabilidadDinero}$25.000</span>
               </div>
   
         </Card3DEffect>
    </div>
  );
}
