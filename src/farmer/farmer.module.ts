import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Installation } from '@installation/entities/installation.entity';
import { FavoriteProduct } from '@product/entities/favorite-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, Installation, FavoriteProduct])],
  controllers: [FarmerController],
  providers: [FarmerService],
})
export class FarmerModule {}
