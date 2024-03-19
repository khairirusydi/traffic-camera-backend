import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import TrafficController from './traffic/traffic.controller';
import TrafficService from './traffic/traffic.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class AppModule {}
