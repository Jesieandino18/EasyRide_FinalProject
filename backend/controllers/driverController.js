import * as driverService from "../services/driverService.js";

export const createDriver = async (req, res, next) => {
  try {
    const driverId = await driverService.createDriver(
      req.body
    );

    return res.status(201).json({
      message: "Driver registered successfully!",
      id: driverId,
    });
  } catch (error) {
    return next(error);
  }
};