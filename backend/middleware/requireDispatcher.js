import { getCurrentDispatcher } from "../services/dispatcherService.js";

const requireDispatcher = async (req, res, next) => {
  try {
    if (!req.session?.dispatcherId) {
      return res.status(401).json({
        message: "Please log in to your dispatcher account.",
      });
    }

    req.dispatcher = await getCurrentDispatcher(
      req.session.dispatcherId
    );

    return next();
  } catch (error) {
    return next(error);
  }
};

export default requireDispatcher;