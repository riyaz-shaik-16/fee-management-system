import express from "express";
import { login, logout, signup, getProfile } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/v1/login",login);
router.post("/v1/signup",signup);
router.post("/v1/logout",logout);
router.get("/v1/get-profile",requireAuth,getProfile);

export default router;