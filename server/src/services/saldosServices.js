import pool from "../config/database.js";

// 🔹 Consultar saldo actual de un usuario
export function servicioObtenerSaldo(usuario_id) {
  return pool
    .query("SELECT * FROM saldos_usuarios WHERE usuario_id = $1", [usuario_id])
    .then((res) => res.rows[0]);
}

// 🔹 Ingresar dinero (aumenta disponible y total)
export function servicioIngresarDinero(usuario_id, monto) {
    console.log(usuario_id,monto)
  return pool
    .query(
      `UPDATE saldos_usuarios
       SET saldo_disponible = saldo_disponible + $1,
           saldo_total = saldo_total + $1
       WHERE usuario_id = $2
       RETURNING *`,
      [monto, usuario_id]
    )
    .then((res) => res.rows[0]);
}

// 🔹 Retirar dinero (disminuye disponible y total)
export function servicioRetirarDinero(usuario_id, monto) {
  return pool
    .query(
      `UPDATE saldos_usuarios
       SET saldo_disponible = GREATEST(saldo_disponible - $1, 0),
           saldo_total = GREATEST(saldo_total - $1, 0)
       WHERE usuario_id = $2
       RETURNING *`,
      [monto, usuario_id]
    )
    .then((res) => res.rows[0]);
}

// 🔹 Invertir dinero (pasa de disponible a invertido)
export function servicioInvertirDinero(usuario_id, monto) {
  return pool
    .query(
      `UPDATE saldos_usuarios
       SET saldo_disponible = saldo_disponible - $1,
           saldo_invertido = saldo_invertido + $1,
           saldo_total = saldo_disponible + saldo_invertido
       WHERE usuario_id = $2
       RETURNING *`,
      [monto, usuario_id]
    )
    .then((res) => res.rows[0]);
}

// 🔹 Desinvertir dinero (pasa de invertido a disponible - cuando vendes una acción)
// monto_original: lo que se resta del saldo_invertido (dinero original invertido)
// monto_total: lo que se suma al saldo_disponible (valor actual con ganancias/pérdidas)
export function servicioDesinvertirDinero(usuario_id, monto_original, monto_total) {
  console.log('Desinvertir:', { usuario_id, monto_original, monto_total });
  return pool
    .query(
      `UPDATE saldos_usuarios
       SET saldo_invertido = saldo_invertido - $1,
           saldo_disponible = saldo_disponible + $2,
           saldo_total = saldo_disponible + saldo_invertido
       WHERE usuario_id = $3
       RETURNING *`,
      [monto_original, monto_total, usuario_id]
    )
    .then((res) => res.rows[0]);
}
