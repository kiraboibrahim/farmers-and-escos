import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadOfferInvoiceDtoDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  invoice: any;
}
