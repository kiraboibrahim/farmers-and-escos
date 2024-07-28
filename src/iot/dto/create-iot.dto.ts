import { IsNotEmpty, IsString } from 'class-validator';
import { LoadEntity } from '@core/core.validators';
import { Esco } from '@esco/entities/esco.entity';
import { Installation } from '@installation/entities/installation.entity';

export class CreateIotDto {
  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @LoadEntity({ entityClass: Esco, accessEntityByProperty: 'esco' })
  escoId: number;

  @LoadEntity<Installation>({
    entityClass: Installation,
    accessEntityByProperty: 'installation',
    relations: { IOT: true },
  })
  installationId: number;
}
