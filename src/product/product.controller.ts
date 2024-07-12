import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ImageFieldsInterceptor } from '@core/core.interceptors';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post(':id/favorites')
  favoriteProduct(@Param('id') id: number) {
    return this.productService.favoriteProduct(id);
  }

  @Delete(':id/favorites')
  unfavoriteProduct(@Param('id') id: number) {
    return this.productService.unfavoriteProduct(id);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id/photos')
  @UseInterceptors(
    ImageFieldsInterceptor([
      { name: 'coverPhoto', maxCount: 1 },
      { name: 'photo1', maxCount: 1 },
      { name: 'photo2', maxCount: 1 },
      { name: 'photo3', maxCount: 1 },
      { name: 'photo4', maxCount: 1 },
    ]),
  )
  uploadPhotos(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      coverPhoto?: Express.Multer.File[];
      photo1?: Express.Multer.File[];
      photo2?: Express.Multer.File[];
      photo3?: Express.Multer.File[];
      photo4?: Express.Multer.File[];
    },
  ) {
    const productPhotoUploadDto = {
      coverPhoto: files?.coverPhoto?.at(0),
      photo1: files?.photo1?.at(0),
      photo2: files?.photo2?.at(0),
      photo3: files?.photo3?.at(0),
      photo4: files?.photo4?.at(0),
    };
    return this.productService.uploadPhotos(+id, productPhotoUploadDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
