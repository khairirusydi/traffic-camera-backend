import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export default class TrafficService {
  logger: Logger;

  constructor() {
    this.logger = new Logger(TrafficService.name);
  }

  async fetchAreaMetadataAndForecast(): Promise<string> {
    return 'Hello World!';
  }
}
