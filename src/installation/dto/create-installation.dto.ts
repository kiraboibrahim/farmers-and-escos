import { CreateIotDto } from '@iot/dto/create-iot.dto';
import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { LoadEntity } from '@core/core.validators';
import { Product } from '@product/entities/product.entity';
import { Esco } from '@esco/entities/esco.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstallationDto {
  @ApiProperty()
  @MaxLength(500)
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsLatitude()
  latitude: string;

  @ApiProperty()
  @IsLongitude()
  longitude: string;

  @LoadEntity({ entityClass: Product, accessEntityByProperty: 'product' })
  productId: number;

  @ApiProperty()
  @LoadEntity({ entityClass: Farmer, accessEntityByProperty: 'farmer' })
  @IsInt()
  farmerId: number;

  @ApiProperty()
  @LoadEntity({ entityClass: Esco, accessEntityByProperty: 'esco' })
  @IsInt()
  escoId: number;

  @ApiProperty()
  @Type(() => CreateIotDto)
  @ValidateNested()
  @IsOptional()
  IOT: CreateIotDto;
}
