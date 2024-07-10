import {
  IsAlpha,
  IsEmail,
  IsInt,
  IsISO8601,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
import {
  IsStrongPassword,
  IsUGPhoneNumber,
  IsUnique,
} from '@core/core.validators';
import { Esco } from '@esco/entities/esco.entity';

export class CreateEscoDto {
  @IsAlpha()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsUrl({
    require_host: true,
    require_tld: true,
    protocols: ['https'],
    require_protocol: true,
    allow_query_components: false,
    allow_fragments: false,
  })
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
  specialization: string;
}
