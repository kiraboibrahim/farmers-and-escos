import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmerDto } from './create-farmer.dto';
import { Equals, IsOptional } from 'class-validator';

export class UpdateFarmerDto extends PartialType(CreateFarmerDto) {
  /*
   * This field will be used for removing the cover photo of a given farmer,
   * and that's why only null values are accepted
   * */
  @Equals(null)
  @IsOptional()
  coverPhoto: null;

  /*
   * This field will be used for removing the profile photo of a given farmer,
   * and that's why only null values are accepted
   * */
  @Equals(null)
  @IsOptional()
  profilePhoto: null;
}
