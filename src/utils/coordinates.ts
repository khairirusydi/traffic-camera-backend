import { LocationWithForecast } from 'src/traffic/traffic.dto';

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const r = 6371; // earth radius in km
  const p = Math.PI / 180;

  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;

  return 2 * r * Math.asin(Math.sqrt(a));
};

export const getNearestArea = (
  latitude: number,
  longitude: number,
  areas: LocationWithForecast[],
): LocationWithForecast => {
  let minDiff = 99999;
  let closest: number;

  for (let i = 0; i < areas.length; i++) {
    const diff = getDistanceFromLatLonInKm(
      latitude,
      longitude,
      areas[i].location.latitude,
      areas[i].location.longitude,
    );
    if (diff < minDiff) {
      closest = i;
      minDiff = diff;
    }
  }

  return areas[closest];
};
