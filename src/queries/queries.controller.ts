import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateQueryRequest,
  CreateQueryResponse,
  GetQueriesByPeriodRequest,
  GetQueriesByPeriodResponse,
  GetRecentQueriesResponse,
} from './queries.dto';
import { QueriesService } from './queries.service';

@Controller('queries')
@ApiTags('Queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Post()
  @ApiOkResponse({ type: CreateQueryResponse })
  createQuery(
    @Body() createQueryDto: CreateQueryRequest,
  ): Promise<CreateQueryResponse> {
    return this.queriesService.createQuery(createQueryDto);
  }

  @Get('recent-queries')
  @ApiOkResponse({ type: GetRecentQueriesResponse })
  getRecentQueries(): Promise<GetRecentQueriesResponse> {
    return this.queriesService.fetchRecentQueries();
  }

  @Get('top-queries-by-period')
  @ApiOkResponse({ type: GetRecentQueriesResponse })
  getTopQueriesByPeriod(
    @Query() { startDateTime, endDateTime }: GetQueriesByPeriodRequest,
  ): Promise<GetQueriesByPeriodResponse> {
    return this.queriesService.fetchTopQueriesByPeriod(
      startDateTime,
      endDateTime,
    );
  }
}
