import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import TrafficController from './traffic/traffic.controller';
import TrafficService from './traffic/traffic.service';

@Module({
  imports: [HttpModule, CacheModule.register({ isGlobal: true })],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class AppModule {}
