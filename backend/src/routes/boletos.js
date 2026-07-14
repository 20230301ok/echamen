import express from "express";
import boletosController from "../controller/boletosController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
.get(validateAuthCookie(["Admin"]), boletosController.getBoleto)
.post(validateAuthCookie(["Customer"]), boletosController.insertBoleto);

router.route("/:id")
.put(validateAuthCookie(["Admin", "Customer"]),boletosController.updateBoleto)
.delete(validateAuthCookie(["Admin"]),boletosController.deleteBoleto);

export default router;