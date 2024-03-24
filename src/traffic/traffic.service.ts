import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DataGovApiEndpoints } from 'src/constants/api';

import {
  AreaMetadataAndForecast,
  GetTrafficCamerasResponse,
  GetTrafficImagesRawResponse,
  GetTwoHourForecastResponse,
  SelectedDateQuery,
} from './traffic.dto';
import trafficMapper from './traffic.mapper';

@Injectable()
export default class TrafficService {
  logger: Logger;

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    this.logger = new Logger(TrafficService.name);
  }

  async fetchAreaMetadataAndForecast(
    queryDate?: SelectedDateQuery,
  ): Promise<AreaMetadataAndForecast> {
    const selectedDate = queryDate ? queryDate.toString() : '';
    const cacheName = 'fetchAreaMetadataAndForecast' + selectedDate;

    const cachedData =
      await this.cacheService.get<AreaMetadataAndForecast>(cacheName);
    if (cachedData) {
      return cachedData;
    }

    try {
      const { data } =
        await this.httpService.axiosRef.get<GetTwoHourForecastResponse>(
          DataGovApiEndpoints.GET_TWO_HOUR_FORECAST,
          { ...(selectedDate && { params: { date_time: selectedDate } }) },
        );

      const mappedData = trafficMapper.toAreaMetadataAndForecast(data);

      if (!mappedData.locations.length) {
        throw new Error('unable to map list of areas');
      }

      // expire cache after 30 mins
      await this.cacheService.set(cacheName, mappedData, 1800);

      return mappedData;
    } catch (error) {
      this.logger.error('failed to fetch two-hour forecast', error);
      throw new BadRequestException('Something went wrong');
    }
  }

  async fetchTrafficCameras(
    queryDate?: SelectedDateQuery,
  ): Promise<GetTrafficCamerasResponse> {
    const selectedDate = queryDate ? queryDate.toString() : '';
    const cacheName = 'fetchTrafficImages' + selectedDate;

    const cachedData =
      await this.cacheService.get<GetTrafficCamerasResponse>(cacheName);
    if (cachedData) {
      return cachedData;
    }

    try {
      const { data } =
        await this.httpService.axiosRef.get<GetTrafficImagesRawResponse>(
          DataGovApiEndpoints.GET_TRAFFIC_IMAGES,
          { ...(selectedDate && { params: { date_time: selectedDate } }) },
        );

      const { locations } = await this.fetchAreaMetadataAndForecast(
        selectedDate as SelectedDateQuery,
      );

      const mappedData = trafficMapper.toTrafficCamerasWithForecast(
        data,
        locations,
      );

      if (!mappedData) {
        throw new Error('unable to map list of traffic cameras');
      }

      // expire cache after 30 seconds
      await this.cacheService.set(cacheName, mappedData, 30);

      return mappedData;
    } catch (error) {
      this.logger.error('failed to fetch traffic images', error);
      throw new BadRequestException('Something went wrong');
    }
  }
}
