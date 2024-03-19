import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import TrafficController from './traffic/traffic.controller';
import TrafficService from './traffic/traffic.service';

@Module({
  imports: [HttpModule],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class AppModule {}
