import bcrypt from "bcryptjs";
import * as driverModel from "../models/driverModel.js";
import ValidationError from "../utils/ValidationError.js";

const fieldRules = [
  { name: "full_name", label: "Full name", limit: 150 },
  { name: "address", label: "Address", limit: 255 },
  { name: "contact_number", label: "Contact number", limit: 20 },
  { name: "plate_number", label: "Plate number", limit: 30 },
  { name: "username", label: "Username", limit: 100 },
];

export const createDriver = async (body) => {
  const input = body || {};
  const driver = {};

  for (const field of fieldRules) {
    if (
      typeof input[field.name] !== "string" ||
      !input[field.name].trim()
    ) {
      throw new ValidationError(
        400,
        field.label + " is required."
      );
    }

    driver[field.name] = input[field.name].trim();

    if (driver[field.name].length > field.limit) {
      throw new ValidationError(
        400,
        field.label + " must not exceed " +
          field.limit + " characters."
      );
    }
  }

  if (
    typeof input.password !== "string" ||
    input.password.length < 8 ||
    input.password.length > 64
  ) {
    throw new ValidationError(
      400,
      "Password must be 8 to 64 characters."
    );
  }

  if (Buffer.byteLength(input.password, "utf8") > 72) {
    throw new ValidationError(
      400,
      "Password must not exceed 72 UTF-8 bytes."
    );
  }

  driver.username = driver.username.toLowerCase();
  driver.plate_number = driver.plate_number.toUpperCase();

  const existing = await driverModel.findDriverByUsername(
    driver.username
  );

  if (existing) {
    throw new ValidationError(
      409,
      "Username is already registered."
    );
  }

  driver.password = await bcrypt.hash(input.password, 10);

  try {
    return await driverModel.insert(driver);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new ValidationError(
        409,
        "Registration conflicts with an existing record."
      );
    }

    throw error;
  }
};

export const loginDriver = async (body) => {
  const { username, password } = body || {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    throw new ValidationError(
      400,
      "Username and password are required."
    );
  }

  if (
    username.trim().length > 100 ||
    password.length > 64 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    throw new ValidationError(
      401,
      "Invalid username or password."
    );
  }

  const driver = await driverModel.findDriverForLogin(
    username.trim().toLowerCase()
  );

  if (
    !driver ||
    !(await bcrypt.compare(password, driver.password))
  ) {
    throw new ValidationError(
      401,
      "Invalid username or password."
    );
  }

  return {
    id: driver.id,
    full_name: driver.full_name,
    address: driver.address,
    contact_number: driver.contact_number,
    plate_number: driver.plate_number,
    username: driver.username,
  };
};

export const getCurrentDriver = async (id) => {
  const driver = await driverModel.findDriverById(id);

  if (!driver) {
    throw new ValidationError(
      401,
      "Driver account not found. Please log in again."
    );
  }

  return driver;
};