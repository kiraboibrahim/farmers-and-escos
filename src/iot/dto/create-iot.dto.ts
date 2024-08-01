import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { LoadEntity } from '@core/core.validators';
import { Esco } from '@esco/entities/esco.entity';
import { Installation } from '@installation/entities/installation.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIotDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @LoadEntity({ entityClass: Esco, accessEntityByProperty: 'esco' })
  @IsInt()
  escoId: number;

  @ApiProperty()
  @LoadEntity<Installation>({
    entityClass: Installation,
    accessEntityByProperty: 'installation',
    relations: { IOT: true },
  })
  @IsInt()
  installationId: number;
}
