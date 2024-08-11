import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryPhotosDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  photos: any[];
}
