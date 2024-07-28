import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductCategoryDto } from '@product-category/dto/create-product-category.dto';
import { Auth, IsPublic } from '@auth/auth.decorators';
import { Role } from '@role/role.constants';

@Auth(Role.SUPER_USER, Role.ESCO)
@ApiTags('Product Categories')
@Controller('product-categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @IsPublic()
  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productCategoryService.findAll(query);
  }

  @IsPublic()
  @Get(':id/products')
  findOne(@Param('id') id: string, @Paginate() query: PaginateQuery) {
    return this.productCategoryService.findCategoryProducts(+id, query);
  }

  @ApiOkResponse({
    description: 'Product category has been updated successfully',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
