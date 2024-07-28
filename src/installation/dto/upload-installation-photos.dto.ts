import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadInstallationPhotosDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  coverPhoto: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  photo1: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  photo2: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  photo3: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  photo4: any;
}
