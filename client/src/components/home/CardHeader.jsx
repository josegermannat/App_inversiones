
import "../../styles/components/CardTitulo.css";
import { Button } from "../ui/Button";
import { useState } from "react";
import { LoginFormModal } from "../ui/LoginFormModal ";
import { RegistroFormModal } from "../ui/RegistroFormModal ";
import { useAnimationChars } from "../../hooks/hooksAnimations/useAnimationChars";
export default function CardAppTitulo() {
  useAnimationChars('.title')
  
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);


  return (
    <div className="home__title">
      <div className="container__title">
   <h1 className="title">Simulador de inveriones</h1>    
      </div>
        <div className="container__login">
                <Button
                 onClick={() => setShowLogin(true)}
                 contenido={'Iniciar Seccion'}
                ></Button>
                <Button
                 onClick={() => setShowRegistro(true)}
                 contenido={'Registrarse'}
                 variant="secundary"
                ></Button>


                  <LoginFormModal
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(data) => console.log("LOGIN:", data)}
      />


         <RegistroFormModal
        visible={showRegistro}
        onClose={() => setShowRegistro(false)}
        onRegister={(data) => console.log("REGISTRO:", data)}
      />
        </div>
    </div>
  );
}
