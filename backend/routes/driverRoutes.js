import express from "express";
import * as driverController from "../controllers/driverController.js";
import requireDriver from "../middleware/requireDriver.js";

const router = express.Router();

const requireRequestHeader = (req, res, next) => {
  if (req.get("X-EasyRide-Request") !== "1") {
    return res.status(403).json({
      message: "Invalid request.",
    });
  }

  return next();
};

router.post(
  "/register",
  driverController.createDriver
);

router.post(
  "/login",
  requireRequestHeader,
  driverController.loginDriver
);

router.get(
  "/session",
  requireDriver,
  driverController.getDriverSession
);

router.post(
  "/logout",
  requireRequestHeader,
  driverController.logoutDriver
);

export default router;