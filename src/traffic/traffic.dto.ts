import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class LongLat {
  @ApiProperty()
  longitude: number;

  @ApiProperty()
  latitude: number;
}

export class AreaMetadata {
  @ApiProperty()
  name: string;

  @ApiProperty()
  label_location: LongLat;
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

export class LocationWithForecast {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: LongLat;

  @ApiProperty()
  forecast: string;
}

export class AreaMetadataAndForecast {
  @ApiProperty({ type: [LocationWithForecast] })
  @IsArray()
  @ValidateNested()
  locations: LocationWithForecast[];
}

export class ImageMetadata {
  @ApiProperty()
  height: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  md5: string; // checksum
}

export class CameraRawResponse {
  @ApiProperty()
  @IsDateString()
  timestamp: Date;

  @ApiProperty()
  image: string;

  @ApiProperty()
  location: LongLat;

  @ApiProperty()
  camera_id: string;

  @ApiProperty()
  image_metadata: ImageMetadata;
}

export class CameraResponse {
  @ApiProperty()
  @IsDateString()
  timestamp: Date;

  @ApiProperty()
  image: string;

  @ApiProperty()
  location: LongLat;

  @ApiProperty()
  cameraId: string;

  @ApiProperty()
  imageMetadata: ImageMetadata;

  @ApiProperty()
  name: string;

  @ApiProperty()
  forecast: string;
}

export class TrafficImagesItem {
  @ApiProperty()
  @IsDateString()
  timestamp: Date;

  @ApiProperty({ type: [CameraRawResponse] })
  @IsArray()
  @ValidateNested()
  cameras: CameraRawResponse[];
}

export class GetTrafficImagesRawResponse {
  @ApiProperty()
  api_info: ApiInfoResponse;

  @ApiProperty({ type: [TrafficImagesItem] })
  @IsArray()
  @ValidateNested()
  items: TrafficImagesItem[];
}

export class GetTrafficCamerasResponse {
  @ApiProperty({ type: [CameraResponse] })
  @IsArray()
  @ValidateNested()
  cameras: CameraResponse[];
}
