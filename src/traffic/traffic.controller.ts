import { Controller, Get } from '@nestjs/common';
import TrafficService from './traffic.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('traffic')
@ApiTags('Traffic')
export default class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Get()
  async getAreaMetadataAndForecast(): Promise<string> {
    return this.trafficService.fetchAreaMetadataAndForecast();
  }
}
