import express from "express";
import { login, logout, register , getUsers} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", register);

router.get("/login", login);

router.get("/logout", logout);

router.get("/getUsers" , getUsers);

export default router;