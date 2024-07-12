import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@product/entities/product.entity';
import { FavoriteProduct } from '@product/entities/favorite-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, FavoriteProduct])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
