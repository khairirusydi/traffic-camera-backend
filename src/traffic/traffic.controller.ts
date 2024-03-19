import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import {
  GetAreaMetadataAndForecastRequest,
  GetTwoHourForecastResponse,
} from './traffic.dto';
import TrafficService from './traffic.service';

@Controller('traffic')
@ApiTags('Traffic')
export default class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get()
  getAreaMetadataAndForecast(
    @Query('selectedDate') selectedDate: GetAreaMetadataAndForecastRequest,
  ): Observable<GetTwoHourForecastResponse> {
    return this.trafficService.fetchAreaMetadataAndForecast(selectedDate);
  }
}
