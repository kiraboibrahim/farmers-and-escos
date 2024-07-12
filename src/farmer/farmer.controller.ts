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
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ImageFieldsInterceptor } from '@core/core.interceptors';

@Controller('farmers')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmerService.create(createFarmerDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.farmerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(+id);
  }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmerService.update(+id, updateFarmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmerService.remove(+id);
  }
}
