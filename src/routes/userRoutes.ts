import express from "express";
import { createUser, getUser, deleteUser } from "../controllers/userController";

const router = express.Router();

router.route("/users").post(createUser).get(getUser);
router.route("/users/:id").delete(deleteUser);

export default router;
