import { Module } from '@nestjs/common';
import { EscoService } from './esco.service';
import { EscoController } from './esco.controller';

@Module({
  controllers: [EscoController],
  providers: [EscoService],
})
export class EscoModule {}
