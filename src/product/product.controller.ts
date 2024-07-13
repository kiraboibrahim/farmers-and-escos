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
import { Auth, GetUser, IsPublic } from '@auth/auth.decorators';
import { Role } from '../role/role.constants';
import { AllowOnly } from '../role/roles.decorators';
import { User } from '@auth/auth.types';

@Auth(Role.SUPER_USER, Role.ESCO)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @AllowOnly(Role.FARMER)
  @Get('favorites')
  findFavoriteProducts(
    @GetUser() user: User,
    @Paginate() query: PaginateQuery,
  ) {
    this.productService.setUser(user);
    return this.productService.findFavoriteProducts(query);
  }

  @AllowOnly(Role.FARMER)
  @Post(':id/favorites')
  favoriteProduct(@Param('id') id: number, @GetUser() user: User) {
    this.productService.setUser(user);
    return this.productService.favoriteProduct(id);
  }

  @AllowOnly(Role.FARMER)
  @Delete('favorites/:id')
  unfavoriteProduct(@Param('id') id: number, @GetUser() user: User) {
    this.productService.setUser(user);
    return this.productService.unfavoriteProduct(id);
  }

  @IsPublic()
  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productService.findAll(query);
  }

  @IsPublic()
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
