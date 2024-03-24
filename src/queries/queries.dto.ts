import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, ValidateNested } from 'class-validator';

export class CreateQueryRequest {
  @ApiProperty()
  @IsDateString()
  selectedDate: Date;

  @ApiProperty()
  cameraId: string;
}

export class CreateQueryResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsDateString()
  selectedDate: Date;

  @ApiProperty()
  cameraId: string;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;
}

export class GetRecentQueriesResponse {
  @ApiProperty({ type: [CreateQueryResponse] })
  @IsArray()
  @ValidateNested()
  queries: CreateQueryResponse[];
}

export class GetQueriesByPeriodRequest {
  @ApiProperty({
    name: 'startDateTime',
    example: 1711209600,
    description: 'start datetime period in Unix timestamps in seconds',
  })
  @IsInt()
  @Type(() => Number)
  startDateTime: number;

  @ApiProperty({
    name: 'endDateTime',
    example: 1711252799,
    description: 'end datetime period in Unix timestamps in seconds',
  })
  @IsInt()
  @Type(() => Number)
  endDateTime: number;
}

export class GetQueriesByPeriodResponse extends IntersectionType(
  GetQueriesByPeriodRequest,
  GetRecentQueriesResponse,
) {}
