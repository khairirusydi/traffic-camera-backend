import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

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
