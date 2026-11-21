import * as dispatcherService from "../services/dispatcherService.js";

export const loginDispatcher = async (req, res, next) => {
  try {
    const dispatcher = await dispatcherService.loginDispatcher(
      req.body
    );

    await new Promise((resolve, reject) => {
      req.session.regenerate((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    req.session.dispatcherId = dispatcher.id;

    await new Promise((resolve, reject) => {
      req.session.save((error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    return res.status(200).json({
      message: "Login successful.",
      dispatcher,
    });
  } catch (error) {
    return next(error);
  }
};

export const getDispatcherSession = (req, res) => {
  return res.status(200).json({
    dispatcher: req.dispatcher,
  });
};

export const getDispatcherDashboard = (req, res) => {
  return res.status(200).json({
    dispatcher: req.dispatcher,
    message: "Dispatcher dashboard access granted.",
  });
};

export const logoutDispatcher = (req, res, next) => {
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