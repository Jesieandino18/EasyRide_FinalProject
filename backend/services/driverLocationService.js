import * as driverLocationModel from "../models/driverLocationModel.js";
import ValidationError from "../utils/ValidationError.js";

export const updateLocation = async (driverId, body) => {
  const { latitude, longitude, accuracy } = body || {};

  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new ValidationError(
      400,
      "Valid latitude and longitude are required."
    );
  }

  if (
    !Number.isFinite(accuracy) ||
    accuracy < 0
  ) {
    throw new ValidationError(
      400,
      "A valid non-negative GPS accuracy is required."
    );
  }

  await driverLocationModel.saveLocation(driverId, {
    latitude,
    longitude,
    accuracy,
  });

  return driverLocationModel.findLocation(driverId);
};

export const getLocation = async (driverId) => {
  return driverLocationModel.findLocation(driverId);
};