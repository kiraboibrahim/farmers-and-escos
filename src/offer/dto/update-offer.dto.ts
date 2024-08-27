import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateOfferDto } from './create-offer.dto';
import { Equals, IsBoolean, IsOptional } from 'class-validator';

export class UpdateOfferDto extends PartialType(
  OmitType(CreateOfferDto, ['escoId', 'startDate', 'expiryDate']),
) {
  // Remove invoice from Offer
  @Equals(null)
  @IsOptional()
  invoice: any;
}

export class AcceptOrRejectOfferDto {
  @IsBoolean()
  isAccepted: boolean;
}
