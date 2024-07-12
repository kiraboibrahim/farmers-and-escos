import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@product/entities/product.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { PRODUCT_PAGINATION_CONFIG } from '@product/product.pagination.config';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { Esco } from '@esco/entities/esco.entity';
import { BaseService } from '@core/core.base';
import { StorageService } from '@storage/storage.service';
import { Resource } from '@core/core.constants';

@Injectable()
export class ProductService extends BaseService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private storageService: StorageService,
  ) {
    super();
  }

  async create(createProductDto: CreateProductDto) {
    const { categories, esco }: { categories: ProductCategory[]; esco: Esco } =
      createProductDto as any;
    const { categoriesIds } = createProductDto;
    const product = this.productRepository.create({
      ...createProductDto,
      esco,
    });
    product.categories = this.fillMissingCategories(categoriesIds, categories);
    return this.productRepository.save(product);
  }

  private fillMissingCategories(
    categoriesIds: any[],
    categories: ProductCategory[],
  ) {
    return categoriesIds.map((categoryId: any) => {
      let foundCategory = categories.find(
        (category) => category.id === +categoryId,
      );
      if (!foundCategory) {
        foundCategory = this.productRepository.create({ name: categoryId });
      }
      return foundCategory;
    });
  }

  async findAll(query: PaginateQuery) {
    return await paginate(
      query,
      this.productRepository,
      PRODUCT_PAGINATION_CONFIG,
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
      product.categories = this.fillMissingCategories(
        categoriesIds,
        categories,
      );
      return await Product.save(product);
    }
  }

  async remove(id: number) {
    return await Product.delete({ id });
  }

  async favoriteProduct(id: number) {}

  async unfavoriteProduct(id: number) {}
}
