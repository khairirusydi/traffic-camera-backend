import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateQueryRequest, CreateQueryResponse } from './queries.dto';

@Injectable()
export default class QueriesRepository {
  logger: Logger;

  constructor(private prisma: PrismaService) {
    this.logger = new Logger(QueriesRepository.name);
  }

  async CreateQueryRequest(
    createQueryRequest: CreateQueryRequest,
  ): Promise<CreateQueryResponse> {
    return await this.prisma.searchQuery.create({ data: createQueryRequest });
  }
}
