import { ICoordinate } from "core/interfaces/coordinate";

export const getDistanceBetweenCoordinates = (
  from: ICoordinate,
  to: ICoordinate
) => {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  const fromRadian = (Math.PI * from.latitude) / 180;
  const toRadian = (Math.PI * to.latitude) / 180;

  const theta = from.longitude - to.longitude;
  const radTheta = (Math.PI * theta) / 180;

  let distInMeters =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);

  if (distInMeters > 1) {
    distInMeters = 1;
  }

  distInMeters = Math.acos(distInMeters);
  distInMeters = (distInMeters * 180) / Math.PI;
  distInMeters = distInMeters * 60 * 1.1515;
  distInMeters = distInMeters * 1.609344;
  distInMeters = distInMeters * 1000;

  return distInMeters;
};
