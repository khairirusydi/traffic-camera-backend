import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AreaMetadataAndForecast, SelectedDateQuery } from './traffic.dto';
import TrafficService from './traffic.service';

@Controller('traffic')
@ApiTags('Traffic')
export default class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get()
  @ApiOkResponse({ type: AreaMetadataAndForecast })
  getAreaMetadataAndForecast(
    @Query('selectedDate') selectedDate?: SelectedDateQuery,
  ): Promise<AreaMetadataAndForecast> {
    return this.trafficService.fetchAreaMetadataAndForecast(selectedDate);
  }
}
