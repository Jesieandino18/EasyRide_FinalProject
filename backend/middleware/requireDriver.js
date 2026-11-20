import { getCurrentDriver } from "../services/driverService.js";

const requireDriver = async (req, res, next) => {
  try {
    if (!req.session?.driverId) {
      return res.status(401).json({
        message: "Please log in to your driver account.",
      });
    }
    req.driver = await getCurrentDriver(req.session.driverId);
    return next();
  } catch (error) {
    return next(error);
  }
};

export default requireDriver;