import bcrypt from "bcryptjs";
import * as dispatcherModel from "../models/dispatcherModel.js";

const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const loginDispatcher = async (body) => {
  const { username, password } = body || {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    throw createError(
      400,
      "Username and password are required."
    );
  }

  if (username.trim().length > 100 || password.length > 64) {
    throw createError(401, "Invalid username or password.");
  }

  const dispatcher = await dispatcherModel.findByUsername(
    username.trim().toLowerCase()
  );

  if (
    !dispatcher ||
    !(await bcrypt.compare(password, dispatcher.password))
  ) {
    throw createError(401, "Invalid username or password.");
  }

  return {
    id: dispatcher.id,
    full_name: dispatcher.full_name,
    username: dispatcher.username,
  };
};

export const getCurrentDispatcher = async (id) => {
  const dispatcher = await dispatcherModel.findById(id);

  if (!dispatcher) {
    throw createError(
      401,
      "Dispatcher account not found. Please log in again."
    );
  }

  return dispatcher;
};