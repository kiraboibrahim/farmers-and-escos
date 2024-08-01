import { IsInt, IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { LoadEntity } from '@core/core.validators';
import { Esco } from '@esco/entities/esco.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Product } from '@product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsISO8601()
  startDate: string;

  @ApiProperty()
  @IsISO8601()
  expiryDate: string;

  @ApiProperty()
  @LoadEntity({ entityClass: Esco, accessEntityByProperty: 'esco' })
  escoId: number;

  @ApiProperty()
  @LoadEntity({ entityClass: Farmer, accessEntityByProperty: 'farmer' })
  @IsInt()
  farmerId: number;

  @ApiProperty()
  @LoadEntity({ entityClass: Product, accessEntityByProperty: 'product' })
  @IsInt()
  productId: number;
}
