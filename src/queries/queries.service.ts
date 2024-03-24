import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import {
  CreateQueryRequest,
  CreateQueryResponse,
  GetRecentQueriesResponse,
} from './queries.dto';
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
    try {
      const searchQuery =
        await this.queriesRepository.CreateQueryRequest(createQueryRequest);

      return searchQuery;
    } catch (error) {
      this.logger.error('Something went wrong adding search query', error);
      throw new BadRequestException('Something went wrong');
    }
  }

  async fetchRecentQueries(): Promise<GetRecentQueriesResponse> {
    try {
      const recentQueries = await this.queriesRepository.fetchRecentQueries();

      return { queries: recentQueries || [] };
    } catch (error) {
      this.logger.error('Something went wrong fetching recent queries', error);
      throw new BadRequestException('Something went wrong');
    }
  }
}
