import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateEscoDto } from './create-esco.dto';
import { Equals, IsOptional } from 'class-validator';

export class UpdateEscoDto extends PartialType(CreateEscoDto) {
  /*
   * This field will only be used for removing the cover photo of a given esco,
   * and that's why only null values are accepted
   * */
  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a cover photo from an esco. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  coverPhoto: any;

  /*
   * This field will only be used for removing the profile photo of a given esco,
   * and that's why only null values are accepted
   * */
  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a profile photo from an esco. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  profilePhoto: any;
}
