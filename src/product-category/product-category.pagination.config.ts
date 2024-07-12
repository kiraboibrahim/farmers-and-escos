import { PRODUCT_PAGINATION_CONFIG } from '@product/product.pagination.config';
import { PaginateConfig, PaginationType } from 'nestjs-paginate';
import { ProductCategory } from './entities/product-category.entity';
import { MAX_ITEMS_PER_PAGE } from '@core/core.constants';

export const getCategoryProductsPaginationConfig = (categoryId: number) => {
  return {
    ...PRODUCT_PAGINATION_CONFIG,
    where: { categories: { id: categoryId } },
  };
};
export const PRODUCT_CATEGORY_PAGINATION_CONFIG: PaginateConfig<ProductCategory> =
  {
    sortableColumns: ['id', 'name'],
    defaultSortBy: [['name', 'DESC']],
    searchableColumns: ['name'],
    maxLimit: 0,
    defaultLimit: MAX_ITEMS_PER_PAGE,
    paginationType: PaginationType.TAKE_AND_SKIP,
  };
