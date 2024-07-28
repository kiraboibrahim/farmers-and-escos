import { PaginateConfig, PaginationType } from 'nestjs-paginate';
import { MAX_ITEMS_PER_PAGE } from '@core/core.constants';
import { Iot } from '@iot/entities/iot.entity';

export const IOT_PAGINATION_CONFIG: PaginateConfig<Iot> = {
  sortableColumns: ['id'],
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: ['serialNumber'],
  maxLimit: 0,
  defaultLimit: MAX_ITEMS_PER_PAGE,
  paginationType: PaginationType.TAKE_AND_SKIP,
  loadEagerRelations: true,
};

export const getEscoIotPaginationConfig = (escoId: number) => {
  return { ...IOT_PAGINATION_CONFIG, where: { esco: { id: escoId } } };
};
