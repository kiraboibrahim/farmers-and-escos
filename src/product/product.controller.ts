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
import { ApiPaginationQuery, Paginate, PaginateQuery } from 'nestjs-paginate';
import { PhotoFieldsInterceptor } from '@core/core.interceptors';
import { Auth, GetUser, IsPublic } from '@auth/auth.decorators';
import { Role } from '../role/role.constants';
import { AllowOnly } from '../role/roles.decorators';
import { User } from '@auth/auth.types';
import { ProductExists } from '@product/product.validators';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PRODUCT_PAGINATION_CONFIG } from '@product/product.pagination.config';
import { UploadProductPhotosDto } from '@product/dto/upload-product-photos.dto';

@ApiTags('Products')
@Auth(Role.SUPER_USER, Role.ESCO)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({ description: 'Product has been created successfully' })
  @ApiBadRequestResponse({
    description: 'Product creation failed due to validation errors',
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiPaginationQuery(PRODUCT_PAGINATION_CONFIG)
  @AllowOnly(Role.ESCO, Role.FARMER)
  @Get('favorites')
  findFavoriteProducts(
    @GetUser() user: User,
    @Paginate() query: PaginateQuery,
  ) {
    this.productService.setUser(user);
    return this.productService.findFavoriteProducts(query);
  }

  @ApiBadRequestResponse({
    description:
      "Adding product to farmer's favorites has failed due to non-existent product ID or the product is already in farmer's favorites",
  })
  @ApiCreatedResponse({
    description: "Product has been successfully added to farmer's favorites",
  })
  @AllowOnly(Role.FARMER)
  @Post(':id/favorites')
  favoriteProduct(@ProductExists('id') id: number, @GetUser() user: User) {
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
  @Get(':id/installations')
  findProductInstallations(
    @Param('id') id: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.productService.findProductInstallations(+id, query);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiBadRequestResponse({
    description: 'Product photos upload failed due to validation errors',
  })
  @ApiOkResponse({
    description: 'Product photos have been successfully uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadProductPhotosDto })
  @Patch(':id/photos')
  @UseInterceptors(
    PhotoFieldsInterceptor([
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

  @ApiBadRequestResponse({
    description: 'Product update failed due to validation errors',
  })
  @ApiOkResponse({ description: 'Product has been updated successfully' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
