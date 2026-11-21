import * as driverLocationService from "../services/driverLocationService.js";

export const updateLocation = async (req, res, next) => {
  try {
    const location = await driverLocationService.updateLocation(
      req.session.driverId,
      req.body
    );

    return res.status(200).json({
      message: "Driver location updated successfully.",
      location,
    });
  } catch (error) {
    return next(error);
  }
};

export const getLocation = async (req, res, next) => {
  try {
    const location = await driverLocationService.getLocation(
      req.session.driverId
    );

    return res.status(200).json({
      location,
    });
  } catch (error) {
    return next(error);
  }
};