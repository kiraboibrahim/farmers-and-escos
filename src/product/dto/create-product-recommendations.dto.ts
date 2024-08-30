import { LoadEntities } from '@core/core.validators';
import { Product } from '@product/entities/product.entity';

export class CreateProductRecommendationsDto {
  @LoadEntities<Product>({
    entityClass: Product,
    accessEntityByProperty: 'products',
  })
  productIds: number[];
}
