import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateQueryRequest, CreateQueryResponse } from './queries.dto';
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
}
