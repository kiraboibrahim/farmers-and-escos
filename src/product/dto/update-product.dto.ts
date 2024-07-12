import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Equals, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['escoId']),
) {
  /* Use these fields for removing photos of a product and not for updating
   * product photos. That's why only null values are allowed
   */
  @Equals(null)
  @IsOptional()
  coverPhoto: null;

  @Equals(null)
  @IsOptional()
  photo1: null;

  @Equals(null)
  @IsOptional()
  photo2: null;

  @Equals(null)
  @IsOptional()
  photo3: null;

  @Equals(null)
  @IsOptional()
  photo4: null;
}
