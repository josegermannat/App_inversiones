import express from "express";
import SaldosController from "../controllers/saldosController.js";

const router = express.Router();

router.get("/:usuario_id", SaldosController.obtenerSaldo);
router.post("/ingresar", SaldosController.ingresarDinero);
router.post("/retirar", SaldosController.retirarDinero);
router.post("/invertir", SaldosController.invertirDinero);
router.post("/desinvertir", SaldosController.desinvertirDinero);

export default router;
