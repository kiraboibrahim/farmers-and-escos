import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InstallationService } from './installation.service';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Installations')
@Controller('installations')
export class InstallationController {
  constructor(private readonly installationService: InstallationService) {}

  @Post()
  create(@Body() createInstallationDto: CreateInstallationDto) {
    return this.installationService.create(createInstallationDto);
  }

  @Get()
  findAll() {
    return this.installationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.installationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstallationDto: UpdateInstallationDto,
  ) {
    return this.installationService.update(+id, updateInstallationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.installationService.remove(+id);
  }
}
