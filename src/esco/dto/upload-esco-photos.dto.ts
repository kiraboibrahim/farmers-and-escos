import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadEscoPhotosDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  coverPhoto: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  profilePhoto: any;
}
