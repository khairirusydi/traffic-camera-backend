import {
  AreaMetadataAndForecast,
  GetTwoHourForecastResponse,
} from './traffic.dto';

const toAreaMetadataAndForecast = (
  data: GetTwoHourForecastResponse,
): AreaMetadataAndForecast => ({
  locations: data.area_metadata.map((metadata) => ({
    ...metadata,
    forecast: data.items[0].forecasts.find(
      (forecast) => forecast.area === metadata.name,
    ).forecast,
  })),
});

const trafficMapper = {
  toAreaMetadataAndForecast,
};

export default trafficMapper;
