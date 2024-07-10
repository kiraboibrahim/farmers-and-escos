import { Esco } from '@esco/entities/esco.entity';
import { MAX_ITEMS_PER_PAGE } from '@core/core.constants';
import { PaginateConfig, PaginationType } from 'nestjs-paginate';

export const ESCO_PAGINATION_CONFIG: PaginateConfig<Esco> = {
  sortableColumns: ['id', 'name'],
  defaultSortBy: [['name', 'DESC']],
  searchableColumns: ['name', 'registrationNumber'],
  maxLimit: 0,
  defaultLimit: MAX_ITEMS_PER_PAGE,
  paginationType: PaginationType.TAKE_AND_SKIP,
};
