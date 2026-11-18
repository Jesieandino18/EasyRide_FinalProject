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

export const loginDriver = async (req, res, next) => {
  try {
    const driver = await driverService.loginDriver(req.body);

    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    req.session.driverId = driver.id;

    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    return res.status(200).json({
      message: "Login successful.",
      driver,
    });
  } catch (error) {
    return next(error);
  }
};

export const getDriverSession = (req, res) => {
  return res.status(200).json({
    driver: req.driver,
  });
};

export const logoutDriver = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);

    res.clearCookie("easyride.sid", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      message: "Logged out successfully.",
    });
  });
};