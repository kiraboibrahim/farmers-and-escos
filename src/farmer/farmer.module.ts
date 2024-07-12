import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from '@farmer/entities/farmer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer])],
  controllers: [FarmerController],
  providers: [FarmerService],
})
export class FarmerModule {}
