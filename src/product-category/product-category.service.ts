import { Injectable } from '@nestjs/common';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';

import {
  getCategoryProductsPaginationConfig,
  PRODUCT_CATEGORY_PAGINATION_CONFIG,
} from './product-category.pagination.config';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@core/core.base';
import { Product } from '@product/entities/product.entity';
import { CreateProductCategoryDto } from '@product-category/dto/create-product-category.dto';

@Injectable()
export class ProductCategoryService extends BaseService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {
    super();
  }

  async create(createCategoryDto: CreateProductCategoryDto) {
    const productCategory =
      this.productCategoryRepository.create(createCategoryDto);
    return ProductCategory.save(productCategory);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(
      query,
      this.productCategoryRepository,
      PRODUCT_CATEGORY_PAGINATION_CONFIG,
    );
  }

  async findCategoryProducts(id: number, query: PaginateQuery) {
    return await paginate(
      query,
      this.productRepository,
      getCategoryProductsPaginationConfig(id),
    );
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    this.handleMissingUpdateValues(updateProductCategoryDto);
    return await ProductCategory.update({ id }, updateProductCategoryDto);
  }

  async remove(id: number) {
    return await ProductCategory.delete({ id });
  }
}
