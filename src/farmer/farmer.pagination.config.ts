import { MAX_ITEMS_PER_PAGE } from '@core/core.constants';
import { PaginateConfig, PaginationType } from 'nestjs-paginate';
import { Farmer } from '@farmer/entities/farmer.entity';

export const FARMER_PAGINATION_CONFIG: PaginateConfig<Farmer> = {
  sortableColumns: ['id', 'firstName', 'lastName'],
  defaultSortBy: [['firstName', 'DESC']],
  searchableColumns: ['firstName', 'lastName', 'phoneNumber'],
  maxLimit: 0,
  defaultLimit: MAX_ITEMS_PER_PAGE,
  paginationType: PaginationType.TAKE_AND_SKIP,
};
