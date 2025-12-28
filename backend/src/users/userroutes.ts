import { Router } from "express";
import { deleteUserController, updateUserController } from "./userController";

const router = Router();

router.put("/:userId", updateUserController);
router.delete("/:userId", deleteUserController);

export default router;
