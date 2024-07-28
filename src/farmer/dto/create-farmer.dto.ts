import {
  IsAlpha,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumberString,
  IsString,
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
  @IsNotEmpty()
  @IsString()
  farmName: string;

  @ApiProperty()
  @MaxLength(500)
  @IsNotEmpty()
  @IsString()
  farmDescription: string;

  @ApiProperty()
  @IsNumberString()
  farmSize: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsLatitude()
  latitude: string;

  @ApiProperty()
  @IsLongitude()
  longitude: string;
}
