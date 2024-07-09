import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscoService } from './esco.service';
import { CreateEscoDto } from './dto/create-esco.dto';
import { UpdateEscoDto } from './dto/update-esco.dto';

@Controller('esco')
export class EscoController {
  constructor(private readonly escoService: EscoService) {}

  @Post()
  create(@Body() createEscoDto: CreateEscoDto) {
    return this.escoService.create(createEscoDto);
  }

  @Get()
  findAll() {
    return this.escoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escoService.findOne(+id);
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
