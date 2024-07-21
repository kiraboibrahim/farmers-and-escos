import {
  IsAlpha,
  IsLatitude,
  IsLongitude,
  IsNumberString,
  MaxLength,
} from 'class-validator';
import { IsStrongPIN, IsUGPhoneNumber } from '@core/core.validators';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmerDto {
  @ApiProperty()
  @IsAlpha()
  firstName: string;

  @ApiProperty()
  @IsAlpha()
  lastName: string;

  @ApiProperty()
  @IsUGPhoneNumber()
  phoneNumber: string;

  @ApiProperty()
  @IsStrongPIN()
  password: string;

  @ApiProperty()
  @MaxLength(100)
  farmDescription: string;

  @ApiProperty()
  @IsNumberString()
  farmSize: string;

  @ApiProperty()
  @IsLatitude()
  latitude: string;

  @ApiProperty()
  @IsLongitude()
  longitude: string;
}
