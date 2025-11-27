import { Router } from "express";
 
const router = Router()

router.get("/",(req,res)=>{
    
    res.send("a szerver fut")
})

export default router