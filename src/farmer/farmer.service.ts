import { Injectable } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { FARMER_PAGINATION_CONFIG } from '@farmer/farmer.pagination.config';
import { Resource } from '@core/core.constants';
import { StorageService } from '@storage/storage.service';
import { BaseService } from '@core/core.base';

@Injectable()
export class FarmerService extends BaseService {
  constructor(
    @InjectRepository(Farmer) private farmerRepository: Repository<Farmer>,
    private storageService: StorageService,
  ) {
    super();
  }

  async create(createFarmerDto: CreateFarmerDto) {
    const farmer = this.farmerRepository.create(createFarmerDto);
    return await this.farmerRepository.save(farmer);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(
      query,
      this.farmerRepository,
      FARMER_PAGINATION_CONFIG,
    );
  }

  async findOne(id: number) {
    return await Farmer.findOneBy({ id });
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto) {
    this.handleMissingUpdateValues(updateFarmerDto);
    return await Farmer.update({ id }, updateFarmerDto);
  }

  async uploadPhotos(id: number, { coverPhoto, profilePhoto }) {
    const [coverPhotoUrl, profilePhotoUrl] =
      await this.storageService.uploadBatch(
        [coverPhoto, profilePhoto],
        Resource.FARMER,
        id,
      );
    const photoUpdateDto = {
      coverPhoto: coverPhotoUrl,
      profilePhoto: profilePhotoUrl,
    };
    this.handleMissingUpdateValues(photoUpdateDto);
    return await Farmer.update({ id }, photoUpdateDto);
  }

  async remove(id: number) {
    return await Farmer.delete({ id });
  }
}
