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
import { Installation } from '@installation/entities/installation.entity';
import { getFarmerInstallationsPaginationConfig } from '@installation/installation.pagination.config';
import { getFarmerFavoriteProductsPaginationConfig } from '@product/product.pagination.config';
import { FavoriteProduct } from '@product/entities/favorite-product.entity';
import { CreateProductRecommendationsDto } from '@product/dto/create-product-recommendations.dto';
import { Product } from '@product/entities/product.entity';
import { RecommendedProduct } from '@product/entities/recommended-product.entity';

@Injectable()
export class FarmerService extends BaseService {
  constructor(
    @InjectRepository(Farmer) private farmerRepository: Repository<Farmer>,
    @InjectRepository(Installation)
    private installationRepository: Repository<Installation>,
    @InjectRepository(FavoriteProduct)
    private favoriteProductRepository: Repository<FavoriteProduct>,
    @InjectRepository(RecommendedProduct)
    private storageService: StorageService,
  ) {
    super();
  }

  async create(createFarmerDto: CreateFarmerDto) {
    const farmer = this.farmerRepository.create(createFarmerDto);
    return await Farmer.save(farmer);
  }

  async createProductRecommendations(
    farmerId: number,
    createProductRecommendationsDto: CreateProductRecommendationsDto,
  ) {
    const farmer = await Farmer.findOneOrFail({ where: { id: farmerId } });
    const { products }: { products: Product[] } =
      createProductRecommendationsDto as any;
    return await RecommendedProduct.createFarmerRecommendations(
      farmer,
      products,
    );
  }

  async findAll(query: PaginateQuery) {
    return await paginate(
      query,
      this.farmerRepository,
      FARMER_PAGINATION_CONFIG,
    );
  }

  async findFarmerFavoriteProducts(farmerId: number, query: PaginateQuery) {
    return await paginate(
      query,
      this.favoriteProductRepository,
      getFarmerFavoriteProductsPaginationConfig(farmerId),
    );
  }

  async findFarmerInstallations(farmerId: number, query: PaginateQuery) {
    return await paginate(
      query,
      this.installationRepository,
      getFarmerInstallationsPaginationConfig(farmerId),
    );
  }

  async findOne(id: number) {
    return await Farmer.findOne({ where: { id }, relations: { photos: true } });
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
