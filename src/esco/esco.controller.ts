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
import { EscoService } from './esco.service';
import { CreateEscoDto } from './dto/create-esco.dto';
import { UpdateEscoDto } from './dto/update-esco.dto';
import { ApiPaginationQuery, Paginate, PaginateQuery } from 'nestjs-paginate';
import { PhotoUploadsInterceptor } from '@core/core.interceptors';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ESCO_PAGINATION_CONFIG } from '@esco/esco.pagination.config';
import { UploadEscoPhotosDto } from '@esco/dto/upload-esco-photos.dto';
import { PRODUCT_PAGINATION_CONFIG } from '@product/product.pagination.config';

@ApiTags('Escos')
@Controller('escos')
export class EscoController {
  constructor(private readonly escoService: EscoService) {}

  @ApiCreatedResponse({ description: 'Esco has been created successfully' })
  @ApiBadRequestResponse({
    description: 'Esco creation failed due to validation errors',
  })
  @Post()
  create(@Body() createEscoDto: CreateEscoDto) {
    return this.escoService.create(createEscoDto);
  }

  @ApiPaginationQuery(ESCO_PAGINATION_CONFIG)
  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.escoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escoService.findOne(+id);
  }

  @ApiPaginationQuery(PRODUCT_PAGINATION_CONFIG)
  @Get(':id/products')
  findEscoProducts(@Param('id') id: string, @Paginate() query: PaginateQuery) {
    return this.escoService.findEscoProducts(+id, query);
  }

  @ApiBadRequestResponse({
    description: 'Esco photos upload failed due to validation errors',
  })
  @ApiOkResponse({ description: 'Esco photos have been uploaded successfully' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadEscoPhotosDto })
  @Patch(':id/photos')
  @UseInterceptors(
    PhotoUploadsInterceptor([
      { name: 'coverPhoto', maxCount: 1 },
      { name: 'profilePhoto', maxCount: 1 },
    ]),
  )
  uploadPhotos(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      coverPhoto?: Express.Multer.File[];
      profilePhoto?: Express.Multer.File[];
    },
  ) {
    return this.escoService.uploadPhotos(+id, {
      coverPhoto: files?.coverPhoto?.at(0),
      profilePhoto: files?.profilePhoto?.at(0),
    });
  }

  @ApiBadRequestResponse({
    description: 'Esco update failed due to validation errors',
  })
  @ApiOkResponse({ description: 'Esco has been updated successfully' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEscoDto: UpdateEscoDto) {
    return this.escoService.update(+id, updateEscoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escoService.remove(+id);
  }
}
