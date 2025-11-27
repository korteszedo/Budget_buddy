import { Router } from "express";
import authRoutes from "../auth/authroutes";


const router = Router();

router.use("/auth", authRoutes);
router.get("/",(req,res)=>{res.send("futbazdmeg")})



export default router;

