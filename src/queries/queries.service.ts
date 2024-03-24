import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { CreateQueryRequest, CreateQueryResponse } from './queries.dto';
import QueriesRepository from './queries.repository';

@Injectable()
export class QueriesService {
  logger: Logger;

  constructor(private queriesRepository: QueriesRepository) {
    this.logger = new Logger(QueriesService.name);
  }

  async createQuery(
    createQueryRequest: CreateQueryRequest,
  ): Promise<CreateQueryResponse> {
    let searchQuery: CreateQueryResponse;

    try {
      searchQuery =
        await this.queriesRepository.CreateQueryRequest(createQueryRequest);
    } catch (error) {
      this.logger.error('Something went wrong adding search query', error);
      throw new BadRequestException('Something went wrong');
    }

    return searchQuery;
  }
}
