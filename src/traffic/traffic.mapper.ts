import { getNearestArea } from 'src/utils.ts/coordinates';

import {
  AreaMetadataAndForecast,
  GetTrafficCamerasResponse,
  GetTrafficImagesRawResponse,
  GetTwoHourForecastResponse,
  LocationWithForecast,
} from './traffic.dto';

const toAreaMetadataAndForecast = (
  data: GetTwoHourForecastResponse,
): AreaMetadataAndForecast => ({
  locations: data.area_metadata.map((metadata) => ({
    name: metadata.name,
    location: metadata.label_location,
    forecast:
      data.items?.[0].forecasts.find(
        (forecast) => forecast.area === metadata.name,
      ).forecast || '',
  })),
});

const toTrafficCamerasWithForecast = (
  trafficImages: GetTrafficImagesRawResponse,
  areas: LocationWithForecast[],
): GetTrafficCamerasResponse => ({
  cameras:
    trafficImages.items?.[0]?.cameras?.map((rawCamera) => {
      const { latitude, longitude } = rawCamera.location;
      const closestArea = getNearestArea(latitude, longitude, areas);

      return {
        timestamp: rawCamera.timestamp,
        image: rawCamera.image,
        location: rawCamera.location,
        cameraId: rawCamera.camera_id,
        imageMetadata: rawCamera.image_metadata,
        name: closestArea.name,
        forecast: closestArea.forecast,
      };
    }) || [],
});

const trafficMapper = {
  toAreaMetadataAndForecast,
  toTrafficCamerasWithForecast,
};

export default trafficMapper;