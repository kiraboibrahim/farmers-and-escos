import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';
import { LoadEntity } from '@core/core.validators';
import { Esco } from '@esco/entities/esco.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Product } from '@product/entities/product.entity';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsISO8601()
  startDate: string;
  
  @IsISO8601()
  expiryDate: string;

  @LoadEntity({ entityClass: Esco, accessEntityByProperty: 'esco' })
  escoId: number;

  @LoadEntity({ entityClass: Farmer, accessEntityByProperty: 'farmer' })
  farmerId: number;

  @LoadEntity({ entityClass: Product, accessEntityByProperty: 'product' })
  productId: number;
}
