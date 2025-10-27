import express from "express";
import usuariosController from "../controllers/usuariosController.js";
const router = express.Router();


router.post("/register", (req, res) => usuariosController.register(req, res));
router.post("/login", (req, res) => usuariosController.login(req, res));
export default router;
