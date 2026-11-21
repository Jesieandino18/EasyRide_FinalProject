import express from "express";
import * as dispatcherController from "../controllers/dispatcherController.js";
import requireDispatcher from "../middleware/requireDispatcher.js";

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
  "/login",
  requireRequestHeader,
  dispatcherController.loginDispatcher
);

router.get(
  "/session",
  requireDispatcher,
  dispatcherController.getDispatcherSession
);

router.get(
  "/dashboard",
  requireDispatcher,
  dispatcherController.getDispatcherDashboard
);

router.post(
  "/logout",
  requireRequestHeader,
  dispatcherController.logoutDispatcher
);

export default router;