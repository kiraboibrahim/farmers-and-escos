import { PartialType } from '@nestjs/mapped-types';
import { CreateEscoDto } from './create-esco.dto';
import { Equals, IsOptional } from 'class-validator';

export class UpdateEscoDto extends PartialType(CreateEscoDto) {
  /*
   * This field will be used for removing the cover photo of a given esco,
   * and that's why only null values are accepted
   * */
  @Equals(null)
  @IsOptional()
  coverPhoto: null;

  /*
   * This field will be used for removing the profile photo of a given esco,
   * and that's why only null values are accepted
   * */
  @Equals(null)
  @IsOptional()
  profilePhoto: null;
}
