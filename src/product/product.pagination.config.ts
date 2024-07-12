import { MAX_ITEMS_PER_PAGE } from '@core/core.constants';
import { PaginateConfig, PaginationType } from 'nestjs-paginate';
import { Product } from '@product/entities/product.entity';

export const PRODUCT_PAGINATION_CONFIG: PaginateConfig<Product> = {
  sortableColumns: ['id', 'name', 'createdAt'],
  defaultSortBy: [['createdAt', 'DESC']],
  searchableColumns: ['name', 'description'],
  maxLimit: 0,
  defaultLimit: MAX_ITEMS_PER_PAGE,
  paginationType: PaginationType.TAKE_AND_SKIP,
  loadEagerRelations: true,
};
