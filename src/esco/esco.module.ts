import { Module } from '@nestjs/common';
import { EscoService } from './esco.service';
import { EscoController } from './esco.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Esco } from '@esco/entities/esco.entity';
import { Product } from '@product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Esco, Product])],
  controllers: [EscoController],
  providers: [EscoService],
})
export class EscoModule {}
