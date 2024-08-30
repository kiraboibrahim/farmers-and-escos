import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Product } from '@product/entities/product.entity';
import { MAX_RECOMMENDATIONS_PER_FARMER } from '@core/core.constants';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class RecommendedProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Farmer)
  farmer: Farmer;

  @ManyToOne(() => Product)
  product: Product;

  static async createFarmerRecommendations(
    farmer: Farmer,
    products: Product[],
  ) {
    if (products.length > MAX_RECOMMENDATIONS_PER_FARMER) {
      throw new BadRequestException(
        'Maximum number of recommendations exceeded',
      );
    }
    const recommendedProducts = products.map((product) => {
      const recommendedProduct = new RecommendedProduct();
      recommendedProduct.product = product;
      recommendedProduct.farmer = farmer;
      return recommendedProduct;
    });
    // Delete any farmer's previous recommendations
    await RecommendedProduct.delete({ farmer });
    return await RecommendedProduct.save(recommendedProducts);
  }
}
