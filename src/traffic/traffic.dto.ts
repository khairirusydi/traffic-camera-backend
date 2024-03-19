import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class ApiInfoResponse {
  @ApiProperty()
  status: string;
}

export class DateRange {
  @ApiProperty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;
}

export class GetAreaMetadataAndForecastRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  selectedDate?: Date;
}

export class LabelLocation {
  @ApiProperty()
  longitude: number;

  @ApiProperty()
  latitude: number;
}

export class AreaMetadata {
  @ApiProperty()
  name: string;

  @ApiProperty()
  label: LabelLocation;
}

export class AreaForecast {
  @ApiProperty()
  area: string;

  @ApiProperty()
  forecast: string;
}

export class TwoHourForecast {
  @ApiProperty()
  @IsDateString()
  update_timestamp: Date;

  @ApiProperty()
  @IsDateString()
  timestamp: Date;

  @ApiProperty()
  valid_period: DateRange;

  @ApiProperty()
  @IsArray()
  @ValidateNested()
  @Type(() => AreaForecast)
  forecasts: AreaForecast[];
}

export class GetTwoHourForecastResponse {
  @ApiProperty()
  api_info: ApiInfoResponse;

  @ApiProperty()
  @IsArray()
  @ValidateNested()
  @Type(() => AreaMetadata)
  area_metadata: AreaMetadata[];

  @ApiProperty()
  @IsArray()
  @ValidateNested()
  @Type(() => TwoHourForecast)
  items: TwoHourForecast[];
}
