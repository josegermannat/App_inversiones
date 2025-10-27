import pool from '../config/database.js';

// 🔹 Registrar usuario
// Registrar usuario
export function registrarUsuario({nombre, email, password}) {
  return pool
    .query(
      "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, password]
    )
    .then((res) => {
      const usuario = res.rows[0];
      // Crear saldo inicial para el usuario
      return pool
        .query(
          "INSERT INTO saldos_usuarios (usuario_id, saldo_disponible, saldo_invertido, saldo_total) VALUES ($1, 0, 0, 0)",
          [usuario.id]
        )
        .then(() => usuario); // devolvemos el usuario
    });
}


// 🔹 Login usuario
export const logearUsuario = ({ email, password }) => {
  return pool.query("SELECT * FROM usuarios WHERE email = $1", [email])
    .then(result => {
      const user = result.rows[0];
      if (!user) throw new Error("Usuario no encontrado");

      if (user.password !== password) {
        throw new Error("Contraseña incorrecta");
      }

      return {
        message: "Login exitoso",
        userId: user.id,
        nombre: user.nombre,
        email: user.email
      };
    });
};
