import {
  IsEmail,
  IsFQDN,
  IsInt,
  IsISO8601,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
} from 'class-validator';
import {
  IsStrongPassword,
  IsUGPhoneNumber,
  IsUnique,
} from '@core/core.validators';
import { Esco } from '@esco/entities/esco.entity';

export class CreateEscoDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsFQDN({ require_tld: true })
  website: string;

  @IsUnique<Esco>({ entityClass: Esco, findByColumnName: 'phoneNumber' })
  @IsUGPhoneNumber()
  phoneNumber: string;

  @IsLatitude()
  latitude: string;

  @IsLongitude()
  longitude: string;

  @IsInt()
  numEmployees: number;

  @IsISO8601()
  incorporationDate: string;

  @IsNotEmpty()
  registrationNumber: string;

  @IsNotEmpty()
  specialization: string;
}
