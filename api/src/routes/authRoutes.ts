import Router from "express";
import * as controller from "../controllers/authController.js";
import { validarBody } from "../middlewares/validarSchema.js";
import { loginSchema } from "@clinica/shared/auth";

const router = Router();

router.post("/auth/login", validarBody(loginSchema), controller.login);

export default router;
