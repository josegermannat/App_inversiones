import { registrarUsuario, logearUsuario } from "../services/usuariosService.js";

   class UsuariosController {
  register(req, res) {
    console.log("📥 Body recibido:", req.body);
    registrarUsuario(req.body)
      .then(result => res.status(201).json(result))
      .catch(err => res.status(400).json({ error: err.message }));
  }

  login(req, res) {
    logearUsuario(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(401).json({ error: err.message }));
  }
}
export default new UsuariosController()

