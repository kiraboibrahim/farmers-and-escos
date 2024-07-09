import { PartialType } from '@nestjs/mapped-types';
import { CreateEscoDto } from './create-esco.dto';

export class UpdateEscoDto extends PartialType(CreateEscoDto) {}
