import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { Equals, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['escoId']),
) {
  /* Use these fields for removing photos of a product and not for updating
   * product photos. That's why only null values are allowed
   */
  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a cover photo from a product. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  coverPhoto: any;

  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a photo from a product. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  photo1: any;

  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a photo from a product. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  photo2: any;

  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a photo from a product. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  photo3: any;

  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a photo from a product. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  photo4: any;
}
