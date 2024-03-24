import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateQueryRequest,
  CreateQueryResponse,
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
}
