import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MAX_RATING, MIN_RATING } from '@core/core.constants';

export class CreateInstallationReviewDto {
  @ApiProperty()
  @Min(MIN_RATING)
  @Max(MAX_RATING)
  @IsInt()
  rating: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  comment: string;
}
