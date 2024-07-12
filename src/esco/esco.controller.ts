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
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ImageFieldsInterceptor } from '@core/core.interceptors';

@Controller('escos')
export class EscoController {
  constructor(private readonly escoService: EscoService) {}

  @Post()
  create(@Body() createEscoDto: CreateEscoDto) {
    return this.escoService.create(createEscoDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.escoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escoService.findOne(+id);
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
    return this.escoService.uploadPhotos(+id, {
      coverPhoto: files.coverPhoto?.at(0),
      profilePhoto: files.profilePhoto?.at(0),
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEscoDto: UpdateEscoDto) {
    return this.escoService.update(+id, updateEscoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.escoService.remove(+id);
  }
}
