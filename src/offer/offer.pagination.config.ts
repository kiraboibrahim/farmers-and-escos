import {
  FilterOperator,
  PaginateConfig,
  PaginationType,
} from 'nestjs-paginate';
import { MAX_ITEMS_PER_PAGE } from '@core/core.constants';
import { Offer } from '@offer/entities/offer.entity';

export const OFFER_PAGINATION_CONFIG: PaginateConfig<Offer> = {
  sortableColumns: ['id'],
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['description'],
  filterableColumns: { isAccepted: [FilterOperator.EQ] },
  maxLimit: 0,
  defaultLimit: MAX_ITEMS_PER_PAGE,
  paginationType: PaginationType.TAKE_AND_SKIP,
  loadEagerRelations: true,
};

export const getEscoOffersPaginationConfig = (escoId: number) => {
  return { ...OFFER_PAGINATION_CONFIG, where: { esco: { id: escoId } } };
};

export const getFarmerOffersPaginationConfig = (farmerId: number) => {
  return { ...OFFER_PAGINATION_CONFIG, where: { farmer: { id: farmerId } } };
};
