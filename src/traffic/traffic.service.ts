import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, map, Observable } from 'rxjs';
import { DataGovApiEndpoints } from 'src/constants/api';

import {
  GetAreaMetadataAndForecastRequest,
  GetTwoHourForecastResponse,
} from './traffic.dto';

@Injectable()
export default class TrafficService {
  logger: Logger;

  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger(TrafficService.name);
  }

  fetchAreaMetadataAndForecast(
    selectedDate: GetAreaMetadataAndForecastRequest,
  ): Observable<GetTwoHourForecastResponse> {
    const data = this.httpService
      .get<GetTwoHourForecastResponse>(
        DataGovApiEndpoints.GET_TWO_HOUR_FORECAST,
        { ...(selectedDate && { params: { date_time: selectedDate } }) },
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(
            'failed to fetch two-hour forecast',
            error.response.data,
          );
          throw new HttpException(
            'Something went wrong',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );

    return data;
  }
}
