import { PartialType } from '@nestjs/mapped-types';
import { CreateEscoDto } from './create-esco.dto';
import { Equals, IsOptional } from 'class-validator';

export class UpdateEscoDto extends PartialType(CreateEscoDto) {
  /*
   * We are only allowing null values because this field will be used for
   * removing the cover photo from a given esco
   * */
  @Equals(null)
  @IsOptional()
  coverPhoto: null;

  /*
   * We are only allowing null values because this field will be used for
   * removing the profile photo from a given esco
   * */
  @Equals(null)
  @IsOptional()
  profilePhoto: null;
}
