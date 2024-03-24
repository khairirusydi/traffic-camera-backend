import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

import {
  CreateQueryRequest,
  CreateQueryResponse,
  GetQueriesByPeriodResponse,
  GetRecentQueriesResponse,
} from './queries.dto';
import QueriesRepository from './queries.repository';

@Injectable()
export class QueriesService {
  logger: Logger;

  constructor(private queriesRepository: QueriesRepository) {
    this.logger = new Logger(QueriesService.name);
    dayjs.extend(utc);
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

  async fetchTopQueriesByPeriod(
    startDateParam: number,
    endDateparam: number,
  ): Promise<GetQueriesByPeriodResponse> {
    // restrict length of date inputs to prevent edge case where converted timestamp may exceed year 9999
    if (
      startDateParam.toString().length > 10 ||
      endDateparam.toString().length > 10
    ) {
      throw new BadRequestException(
        'startDateTime/endDateTime should not be more than 10 digits',
      );
    }

    const startDate = dayjs.unix(startDateParam);
    const endDate = dayjs.unix(endDateparam);

    if (!dayjs(startDate).isValid() || !dayjs(endDate).isValid()) {
      throw new BadRequestException('invalid startDateTime/endDateTime');
    }
    if (endDate.isBefore(startDate)) {
      throw new BadRequestException(
        'startDateTime should be before endDateTime',
      );
    }

    try {
      const queriesByPeriod =
        await this.queriesRepository.fetchTopQueriesByPeriod(
          startDate.utc().format(),
          endDate.utc().format(),
        );

      return {
        startDateTime: startDateParam,
        endDateTime: endDateparam,
        queries: queriesByPeriod || [],
      };
    } catch (error) {
      this.logger.error(
        'Something went wrong fetching top queries by period',
        error,
      );
      throw new BadRequestException('Something went wrong');
    }
  }
}
