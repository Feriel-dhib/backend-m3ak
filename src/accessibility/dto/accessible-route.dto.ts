import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsLatitude, IsLongitude, Min } from 'class-validator';

export class NearestNodeDto {
  @ApiProperty({ example: 36.8 })
  @IsLatitude()
  lat: number;

  @ApiProperty({ example: 10.18 })
  @IsLongitude()
  lon: number;
}

export class AccessibleRouteDto {
  @ApiProperty({ example: 4560018000001 })
  @IsInt()
  @Min(0)
  start_node: number;

  @ApiProperty({ example: 4560018000002 })
  @IsInt()
  @Min(0)
  end_node: number;
}
