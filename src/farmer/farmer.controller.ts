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
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { ApiPaginationQuery, Paginate, PaginateQuery } from 'nestjs-paginate';
import { ImageFieldsInterceptor } from '@core/core.interceptors';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FARMER_PAGINATION_CONFIG } from '@farmer/farmer.pagination.config';
import { UploadFarmerPhotosDto } from '@farmer/dto/upload-farmer-photos.dto';

@ApiTags('Farmers')
@Controller('farmers')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @ApiCreatedResponse({ description: 'Farmer has been created successfully' })
  @ApiBadRequestResponse({
    description: 'Farmer creation  due to validation errors',
  })
  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmerService.create(createFarmerDto);
  }

  @ApiPaginationQuery(FARMER_PAGINATION_CONFIG)
  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.farmerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(+id);
  }

  @ApiBadRequestResponse({
    description: "Farmer's photos upload failed due to validation errors",
  })
  @ApiOkResponse({
    description: "Farmer's photo(s) have been uploaded successfully",
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFarmerPhotosDto })
  @Patch(':id/photos')
  @UseInterceptors(
    ImageFieldsInterceptor([
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
    return this.farmerService.uploadPhotos(+id, {
      coverPhoto: files.coverPhoto?.at(0),
      profilePhoto: files.profilePhoto?.at(0),
    });
  }

  @ApiBadRequestResponse({
    description: 'Farmer update failed due to validation errors',
  })
  @ApiOkResponse({
    description: 'Farmer has been updated successfully',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmerService.update(+id, updateFarmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmerService.remove(+id);
  }
}
