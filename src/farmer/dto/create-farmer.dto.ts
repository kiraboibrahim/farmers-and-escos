import {
  IsAlpha,
  IsLatitude,
  IsLongitude,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { IsStrongPassword, IsUGPhoneNumber } from '@core/core.validators';
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
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @MaxLength(100)
  farmDescription: string;

  @ApiProperty()
  @IsNumber()
  farmSize: number;

  @ApiProperty()
  @IsLatitude()
  latitude: string;

  @ApiProperty()
  @IsLongitude()
  longitude: string;
}
