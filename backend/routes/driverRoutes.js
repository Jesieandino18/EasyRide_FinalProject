import express from "express";
import * as driverController from "../controllers/driverController.js";

const router = express.Router();

router.post("/register", driverController.createDriver);

export default router;