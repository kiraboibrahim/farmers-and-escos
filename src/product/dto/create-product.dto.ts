import {
  IsBoolean,
  isInt,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { LoadEntities, LoadEntity } from '@core/core.validators';
import { ProductCategory } from '@product-category/entities/product-category.entity';
import { Esco } from '@esco/entities/esco.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(500)
  description: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @ApiProperty({
    description:
      'For existing categories, specify their IDs and for non-existing categories, specify their names and they will be automatically created',
  })
  @LoadEntities<ProductCategory>({
    entityClass: ProductCategory,
    accessEntityByProperty: 'categories',
    allowMissing: true,
    filter: isInt,
  })
  categoriesIds: number[] | string[];

  @ApiProperty()
  @LoadEntity<Esco>({ entityClass: Esco, accessEntityByProperty: 'esco' })
  escoId: number;
}
