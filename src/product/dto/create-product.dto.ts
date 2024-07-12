import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { LoadEntities, LoadEntity } from '@core/core.validators';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { Esco } from '@esco/entities/esco.entity';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @MaxLength(300)
  description: string;

  @IsInt()
  @IsOptional()
  price: number;

  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @LoadEntities<ProductCategory>({
    entityClass: ProductCategory,
    allowMissing: true,
    accessEntityByProperty: 'categories',
  })
  categoriesIds: number[] | string[];

  @LoadEntity<Esco>({ entityClass: Esco, accessEntityByProperty: 'esco' })
  escoId: number;
}
