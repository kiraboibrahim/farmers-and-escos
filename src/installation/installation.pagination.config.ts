import {
  FilterOperator,
  PaginateConfig,
  PaginationType,
} from 'nestjs-paginate';
import { Installation } from '@installation/entities/installation.entity';
import { MAX_ITEMS_PER_PAGE } from '@core/core.constants';

export const INSTALLATION_PAGINATION_CONFIG: PaginateConfig<Installation> = {
  sortableColumns: ['createdAt'],
  defaultSortBy: [['createdAt', 'DESC']],
  searchableColumns: ['description'],
  filterableColumns: {
    isAccepted: [FilterOperator.EQ, FilterOperator.NULL],
    isReviewed: [FilterOperator.EQ],
  },
  maxLimit: 0,
  defaultLimit: MAX_ITEMS_PER_PAGE,
  paginationType: PaginationType.TAKE_AND_SKIP,
  loadEagerRelations: true,
};

export const getFarmerInstallationsPaginationConfig = (farmerId: number) => {
  return {
    ...INSTALLATION_PAGINATION_CONFIG,
    where: { farmer: { id: farmerId } },
    relations: { product: true, esco: true, IOT: true },
  };
};

export const getEscoInstallationsPaginationConfig = (escoId: number) => {
  return {
    ...INSTALLATION_PAGINATION_CONFIG,
    where: { esco: { id: escoId } },
    relations: { product: true, farmer: true, IOT: true },
  };
};

export const getProductInstallationsPaginationConfig = (productId: number) => {
  return {
    ...INSTALLATION_PAGINATION_CONFIG,
    where: { product: { id: productId } },
  };
};
