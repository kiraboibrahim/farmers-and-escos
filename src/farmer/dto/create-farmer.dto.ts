import {
  IsAlpha,
  IsISO8601,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsStrongPIN, IsUGPhoneNumber, IsUnique } from '@core/core.validators';
import { ApiProperty } from '@nestjs/swagger';
import { Farmer } from '@farmer/entities/farmer.entity';

export class CreateFarmerDto {
  @ApiProperty()
  @IsAlpha()
  firstName: string;

  @ApiProperty()
  @IsAlpha()
  lastName: string;

  @ApiProperty()
  @IsUGPhoneNumber()
  @IsUnique<Farmer>({ entityClass: Farmer, findByColumnName: 'phoneNumber' })
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
  @IsISO8601()
  farmEstablishedOn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cropsGrown: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  acreagePerCrop: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  animalsKept: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  animalsPerType: string;

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
