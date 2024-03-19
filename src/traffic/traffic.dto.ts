import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
  OmitType,
} from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class SelectedDateQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  selectedDate?: Date;
}

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

  @ApiProperty({ type: [AreaForecast] })
  @IsArray()
  @ValidateNested()
  forecasts: AreaForecast[];
}

export class GetTwoHourForecastResponse {
  @ApiProperty()
  api_info: ApiInfoResponse;

  @ApiProperty({ type: [AreaMetadata] })
  @IsArray()
  @ValidateNested()
  area_metadata: AreaMetadata[];

  @ApiProperty({ type: [TwoHourForecast] })
  @IsArray()
  @ValidateNested()
  items: TwoHourForecast[];
}

export class Location extends IntersectionType(
  AreaMetadata,
  OmitType(AreaForecast, ['area'] as const),
) {}

export class AreaMetadataAndForecast {
  @ApiProperty({ type: [Location] })
  @IsArray()
  @ValidateNested()
  locations: Location[];
}
