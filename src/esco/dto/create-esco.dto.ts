import {
  IsEmail,
  IsFQDN,
  IsInt,
  IsISO8601,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import {
  IsStrongPassword,
  IsUGPhoneNumber,
  IsUnique,
} from '@core/core.validators';
import { Esco } from '@esco/entities/esco.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEscoDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsFQDN({ require_tld: true })
  website: string;

  @ApiProperty()
  @IsUnique<Esco>({ entityClass: Esco, findByColumnName: 'phoneNumber' })
  @IsUGPhoneNumber()
  phoneNumber: string;

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

  @ApiProperty()
  @IsInt()
  numEmployees: number;

  @ApiProperty()
  @IsISO8601()
  incorporationDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  specialization: string;
}
