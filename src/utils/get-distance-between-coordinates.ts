import { ICoordinate } from "core/interfaces/coordinate";
import { getDistance } from "geolib";

export const getDistanceBetweenCoordinates = (
  from: ICoordinate,
  to: ICoordinate
) => {
  const distanceInMeters = getDistance(
    { latitude: from.latitude, longitude: from.longitude },
    { latitude: to.latitude, longitude: to.longitude }
  );

  return distanceInMeters;
};
