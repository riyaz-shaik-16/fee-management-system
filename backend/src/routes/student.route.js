import express from "express";
import { getAllStudents, payFee, updateStudentProfile } from "../controllers/student.controller.js";
import {requireAuth} from "../middlewares/auth.middleware.js"
import { getProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/v1/students",getAllStudents);
router.post("/v1/update-profile",requireAuth,updateStudentProfile);
router.post("/v1/pay-fee",requireAuth,payFee);


export default router;
