import express from "express";
import { createUser, getUser, deleteUser,loginUser } from "../controllers/userController";

const router = express.Router();

router.route("/users/register").post(createUser);
router.route("/users/login").post(loginUser);
router.route("/users/:id").delete(deleteUser);

export default router;
