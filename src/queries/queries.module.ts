import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { QueriesController } from './queries.controller';
import QueriesRepository from './queries.repository';
import { QueriesService } from './queries.service';

@Module({
  controllers: [QueriesController],
  providers: [QueriesService, QueriesRepository],
  imports: [PrismaModule],
})
export class QueriesModule {}
