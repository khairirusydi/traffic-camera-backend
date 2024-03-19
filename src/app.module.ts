import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import TrafficController from './traffic/traffic.controller';
import TrafficService from './traffic/traffic.service';

@Module({
  imports: [CacheModule.register({ isGlobal: true })],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class AppModule {}
