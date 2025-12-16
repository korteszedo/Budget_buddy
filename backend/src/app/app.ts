import router from "../router";
import express from "express"
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors());           // ⬅ EZ HIÁNYZIK
app.use(express.json());   // ⬅ EZ IS KELLnpm
app.use("/", router);



export default app;
