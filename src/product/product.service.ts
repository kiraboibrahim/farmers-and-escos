import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@product/entities/product.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import {
  getEscoFavoriteProductsPaginationConfig,
  getFarmerFavoriteProductsPaginationConfig,
  PRODUCT_PAGINATION_CONFIG,
} from '@product/product.pagination.config';
import { ProductCategory } from '@product-category/entities/product-category.entity';
import { Esco } from '@esco/entities/esco.entity';
import { BaseService } from '@core/core.base';
import { StorageService } from '@storage/storage.service';
import { Resource } from '@core/core.constants';
import { FavoriteProduct } from '@product/entities/favorite-product.entity';
import { Installation } from '@installation/entities/installation.entity';
import { getProductInstallationsPaginationConfig } from '@installation/installation.pagination.config';
import { Role } from '@role/role.constants';

@Injectable()
export class ProductService extends BaseService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(FavoriteProduct)
    private favoriteProductRepository: Repository<FavoriteProduct>,
    @InjectRepository(Installation)
    private installationRepository: Repository<Installation>,
    private storageService: StorageService,
  ) {
    super();
  }

  async create(createProductDto: CreateProductDto) {
    const { categories, esco }: { categories: ProductCategory[]; esco: Esco } =
      createProductDto as any;
    const product = this.productRepository.create({
      ...createProductDto,
      categories,
      esco,
    });
    return Product.save(product);
  }

  async findRecommendations() {
    return await Product.find({ take: 10, skip: 0 });
  }

  async findAll(query: PaginateQuery) {
    return await paginate(
      query,
      this.productRepository,
      PRODUCT_PAGINATION_CONFIG,
    );
  }

  async findProductInstallations(id: number, query: PaginateQuery) {
    return await paginate(
      query,
      this.installationRepository,
      getProductInstallationsPaginationConfig(id),
    );
  }

  async findOne(id: number) {
    return await Product.findOne({
      where: { id },
      relations: { categories: true, esco: true },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    this.handleMissingUpdateValues(updateProductDto);
    await this.updateProductCategories(id, updateProductDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoriesIds, ...productData } = updateProductDto;
    return await Product.update({ id }, productData);
  }

  async uploadPhotos(
    id: number,
    { coverPhoto, photo1, photo2, photo3, photo4 },
  ) {
    const [coverPhotoUrl, photo1Url, photo2Url, photo3Url, photo4Url] =
      await this.storageService.uploadBatch(
        [coverPhoto, photo1, photo2, photo3, photo4],
        Resource.PRODUCT,
        id,
      );
    const productPhotoUploadDto = {
      coverPhoto: coverPhotoUrl,
      photo1: photo1Url,
      photo2: photo2Url,
      photo3: photo3Url,
      photo4: photo4Url,
    };
    this.handleMissingUpdateValues(productPhotoUploadDto);
    return await Product.update({ id }, productPhotoUploadDto);
  }

  private async updateProductCategories(
    id: number,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await Product.findOneOrFail({
      where: { id },
      relations: { categories: true },
    });
    const { categories }: { categories: ProductCategory[] } =
      updateProductDto as any;
    const { categoriesIds } = updateProductDto;
    if (categoriesIds) {
      product.categories = categories;
      return await Product.save(product);
    }
  }

  async remove(id: number) {
    return await Product.delete({ id });
  }

  async findFavoriteProducts(query: PaginateQuery) {
    const { id: userId, role: userRole } = this.user;
    switch (userRole) {
      case Role.ESCO:
        return await paginate(
          query,
          this.favoriteProductRepository,
          getEscoFavoriteProductsPaginationConfig(userId),
        );
      case Role.FARMER:
        return await paginate(
          query,
          this.favoriteProductRepository,
          getFarmerFavoriteProductsPaginationConfig(userId),
        );
      default:
        throw new BadRequestException('Unknown user');
    }
  }

  async favoriteProduct(id: number) {
    const { id: farmerId } = this.user;
    const isProductFavorited = !!(await FavoriteProduct.findOneBy({
      farmer: { id: farmerId },
      product: { id },
    }));
    if (isProductFavorited) {
      throw new BadRequestException('Product is already in your favorites');
    }
    const favoriteProduct = this.favoriteProductRepository.create({
      farmer: { id: farmerId },
      product: { id },
    });
    return await this.favoriteProductRepository.save(favoriteProduct);
  }

  async unfavoriteProduct(id: number) {
    const { id: farmerId } = this.user;
    return await FavoriteProduct.delete({
      farmer: { id: farmerId },
      product: { id },
    });
  }
}
