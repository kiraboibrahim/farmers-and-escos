import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product Categories')
@Controller('product-categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productCategoryService.findAll(query);
  }

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
