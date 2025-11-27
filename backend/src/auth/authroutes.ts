import { Router } from "express";
import { loginController } from "./authController";


const router = Router();

router.post("/login", loginController);



export default router;

