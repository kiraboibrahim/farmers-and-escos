import { CreateIotDto } from '@iot/dto/create-iot.dto';
import {
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

export class CreateInstallationDto {
  @MaxLength(500)
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsLatitude()
  latitude: string;

  @IsLongitude()
  longitude: string;

  @LoadEntity({ entityClass: Product, accessEntityByProperty: 'product' })
  productId: number;

  @LoadEntity({ entityClass: Farmer, accessEntityByProperty: 'farmer' })
  farmerId: number;

  @LoadEntity({ entityClass: Esco, accessEntityByProperty: 'esco' })
  escoId: number;

  @Type(() => CreateIotDto)
  @ValidateNested()
  @IsOptional()
  IOT: CreateIotDto;
}
