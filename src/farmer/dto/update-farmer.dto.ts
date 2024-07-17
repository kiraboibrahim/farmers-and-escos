import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateFarmerDto } from './create-farmer.dto';
import { Equals, IsOptional } from 'class-validator';

export class UpdateFarmerDto extends PartialType(CreateFarmerDto) {
  /*
   * This field will be used for removing the cover photo of a given farmer,
   * and that's why only null values are accepted
   * */
  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a cover photo from a farmer. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  coverPhoto: any;

  /*
   * This field will be used for removing the profile photo of a given farmer,
   * and that's why only null values are accepted
   * */
  @ApiPropertyOptional({
    default: null,
    description:
      'This field should only be used to remove a profile photo from a farmer. Only null values are allowed',
  })
  @Equals(null)
  @IsOptional()
  profilePhoto: any;
}
