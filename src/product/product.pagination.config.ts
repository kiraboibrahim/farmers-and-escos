import { MAX_ITEMS_PER_PAGE } from '@core/core.constants';
import { PaginateConfig, PaginationType } from 'nestjs-paginate';
import { Product } from '@product/entities/product.entity';
import { FavoriteProduct } from '@product/entities/favorite-product.entity';

export const PRODUCT_PAGINATION_CONFIG: PaginateConfig<Product> = {
  sortableColumns: ['id', 'name', 'createdAt'],
  defaultSortBy: [['createdAt', 'DESC']],
  searchableColumns: ['name', 'description'],
  maxLimit: 0,
  defaultLimit: MAX_ITEMS_PER_PAGE,
  paginationType: PaginationType.TAKE_AND_SKIP,
  loadEagerRelations: true,
};

export const getEscoProductsPaginationConfig = (escoId: number) => {
  return { ...PRODUCT_PAGINATION_CONFIG, where: { esco: { id: escoId } } };
};

export const getFarmerFavoriteProductsPaginationConfig = (
  farmerId: number,
): PaginateConfig<FavoriteProduct> => {
  return {
    sortableColumns: ['id'],
    defaultSortBy: [['id', 'DESC']],
    where: { farmer: { id: farmerId } },
    maxLimit: 0,
    defaultLimit: MAX_ITEMS_PER_PAGE,
    paginationType: PaginationType.TAKE_AND_SKIP,
    loadEagerRelations: true,
  };
};

export const getEscoFavoriteProductsPaginationConfig = (
  escoId: number,
): PaginateConfig<FavoriteProduct> => {
  return {
    sortableColumns: ['id'],
    defaultSortBy: [['id', 'DESC']],
    where: { product: { esco: { id: escoId } } },
    maxLimit: 0,
    defaultLimit: MAX_ITEMS_PER_PAGE,
    paginationType: PaginationType.TAKE_AND_SKIP,
    loadEagerRelations: false,
    relations: {
      farmer: true,
      product: {
        categories: true,
      },
    },
  };
};
