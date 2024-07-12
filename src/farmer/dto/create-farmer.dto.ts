import {
  IsAlpha,
  IsLatitude,
  IsLongitude,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { IsStrongPassword, IsUGPhoneNumber } from '@core/core.validators';

export class CreateFarmerDto {
  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;

  @IsUGPhoneNumber()
  phoneNumber: string;

  @IsStrongPassword()
  password: string;

  @MaxLength(100)
  farmDescription: string;

  @IsNumber()
  farmSize: number;

  @IsLatitude()
  latitude: string;

  @IsLongitude()
  longitude: string;
}
