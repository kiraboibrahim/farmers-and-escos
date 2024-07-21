import { Injectable } from '@nestjs/common';
import { CreateEscoDto } from './dto/create-esco.dto';
import { UpdateEscoDto } from './dto/update-esco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Esco } from '@esco/entities/esco.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { ESCO_PAGINATION_CONFIG } from '@esco/esco.pagination.config';
import { StorageService } from '@storage/storage.service';
import { Resource } from '@core/core.constants';
import { BaseService } from '@core/core.base';
import { Product } from '@product/entities/product.entity';
import { getEscoProductsPaginationConfig } from '@product/product.pagination.config';

@Injectable()
export class EscoService extends BaseService {
  constructor(
    private storageService: StorageService,
    @InjectRepository(Esco) private escoRepository: Repository<Esco>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {
    super();
  }

  async create(createEscoDto: CreateEscoDto) {
    const esco = this.escoRepository.create(createEscoDto);
    return await this.escoRepository.save(esco);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.escoRepository, ESCO_PAGINATION_CONFIG);
  }

  async findOne(id: number) {
    return await Esco.findOneBy({ id });
  }

  async findEscoProducts(escoId: number, query: PaginateQuery) {
    return await paginate(
      query,
      this.productRepository,
      getEscoProductsPaginationConfig(escoId),
    );
  }

  async update(id: number, updateEscoDto: UpdateEscoDto) {
    return await Esco.update({ id }, updateEscoDto);
  }

  async uploadPhotos(id: number, { coverPhoto, profilePhoto }) {
    const [coverPhotoUrl, profilePhotoUrl] =
      await this.storageService.uploadBatch(
        [coverPhoto, profilePhoto],
        Resource.ESCO,
        id,
      );
    const photoUpdateDto = {
      coverPhoto: coverPhotoUrl,
      profilePhoto: profilePhotoUrl,
    };
    this.handleMissingUpdateValues(photoUpdateDto);
    return await Esco.update({ id }, photoUpdateDto);
  }

  async remove(id: number) {
    return await Esco.delete({ id });
  }
}
