import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class AnalyzePlaceDto {
  @ApiProperty({ example: 'Hopital Charles Nicolle' })
  @IsString()
  place_name: string;

  @ApiProperty({ example: 36.8028 })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ example: 10.1748 })
  @IsLongitude()
  longitude: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  wheelchair_access?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  elevator?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  braille?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  audio_assistance?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  accessible_toilets?: boolean;

  @ApiPropertyOptional({ type: [String], default: [] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  user_comments?: string[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  has_community_data?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  community_posts_count?: number;
}
