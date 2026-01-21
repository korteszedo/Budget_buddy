import { Router } from "express";
import { deleteUserController, getUsersController, updateUserController } from "./userController";

const router = Router();

router.get("/", getUsersController);
router.put("/:userId", updateUserController);
router.delete("/:userId", deleteUserController);

export default router;
