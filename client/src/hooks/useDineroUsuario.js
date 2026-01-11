import { useState, useEffect } from "react";
import { useSaldo } from "./useSaldo.js"; // Hook que maneja el back
import { useUsuario } from "../context/usuarioContext/useUsuarioContext.js"; // 🔹 tu custom hook

export function useDineroUsuario() {
  const { usuario } = useUsuario(); // 👉 ya accedemos al usuario desde tu contexto
  const {
    saldo,
    consultarSaldo,
    ingresarDinero: ingresarDineroBack,
    retirarDinero: retirarDineroBack,
    invertirDinero: invertirDineroBack,
    desinvertirDinero: desinvertirDineroBack,
  } = useSaldo();

  const [dinero, setDinero] = useState(0);

  // 🔹 Cada vez que el usuario cambia → consultamos saldo real en el back
  useEffect(() => {
    if (usuario?.id){
      consultarSaldo(usuario.id).then((data) => {        
        setDinero(data.saldo_disponible || 0);
      })
    }else{
      setDinero(0)
    }
  }, [usuario]);


  // 🔹 Ingresar dinero
  const ingresarDinero = (monto) => {
    console.log(usuario)
    console.log(monto)
    if (!usuario?.id) return;
     ingresarDineroBack(usuario.id, monto).then((nuevoSaldo) => {
      console.log(nuevoSaldo)
      setDinero(nuevoSaldo.saldo_disponible);
     
    });
  };

  // 🔹 Retirar dinero
  const retirarDinero = (monto) => {
    if (!usuario?.id) return;
    return retirarDineroBack(usuario.id, monto).then((nuevoSaldo) => {
      setDinero(nuevoSaldo.saldo_disponible);
      return nuevoSaldo;
    });
  };

  // 🔹 Retirar todo el dinero
  const retirarTodoElDinero = () => {
    if (!usuario?.id) return;
    return retirarDineroBack(usuario.id, dinero).then((nuevoSaldo) => {
      setDinero(0);
      return nuevoSaldo;
    });
  };

  // 🔹 Invertir dinero (cuando compras una acción)
  const invertirDinero = (monto) => {
    if (!usuario?.id) return;

    return invertirDineroBack(usuario.id, monto).then((nuevoSaldo) => {
      setDinero(nuevoSaldo.saldo_disponible);
      return nuevoSaldo;
    });
  };

  // 🔹 Desinvertir dinero (cuando vendes una acción)
  // monto_original: dinero original invertido (se resta del saldo_invertido)
  // monto_total: valor actual con ganancias/pérdidas (se suma al saldo_disponible)
  const desinvertirDinero = (monto_original, monto_total) => {
    if (!usuario?.id) return;

    return desinvertirDineroBack(usuario.id, monto_original, monto_total).then((nuevoSaldo) => {
      setDinero(nuevoSaldo.saldo_disponible);
      return nuevoSaldo;
    });
  };

  return {
    dinero, // 💵 disponible en frontend (sincronizado con back)
    saldo,  // 📊 objeto completo: disponible, invertido, total
    ingresarDinero,
    retirarDinero,
    retirarTodoElDinero,
    invertirDinero,
    desinvertirDinero,
  };
}
