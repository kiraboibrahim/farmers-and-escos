import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Esco } from '@esco/entities/esco.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Installation } from '@installation/entities/installation.entity';
import { InstallationReview } from '@installation/entities/installation-review.entity';
import { Iot } from '@iot/entities/iot.entity';
import { Offer } from '@offer/entities/offer.entity';
import { Product } from '@product/entities/product.entity';
import { ProductCategory } from '@product-category/entities/product-category.entity';
import { FavoriteProduct } from '@product/entities/favorite-product.entity';
import { GalleryPhoto } from '../gallery/entities/gallery-photo.entity';
import { RecommendedProduct } from '@product/entities/recommended-product.entity';

const ENTITIES = [
  Esco,
  Farmer,
  Installation,
  InstallationReview,
  Iot,
  Offer,
  Product,
  RecommendedProduct,
  ProductCategory,
  FavoriteProduct,
  GalleryPhoto,
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const NODE_ENV = configService.get<string>('NODE_ENV');
        const DB_SYNC = NODE_ENV !== 'production';
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [...ENTITIES],
          synchronize: DB_SYNC,
          cache: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
