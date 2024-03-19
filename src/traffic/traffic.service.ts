import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DataGovApiEndpoints } from 'src/constants/api';

import {
  AreaMetadataAndForecast,
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

      // expire cache after 30 mins
      await this.cacheService.set(cacheName, mappedData, 1800);

      return mappedData;
    } catch (error) {
      this.logger.error(
        'failed to fetch two-hour forecast',
        error.response.data,
      );
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
