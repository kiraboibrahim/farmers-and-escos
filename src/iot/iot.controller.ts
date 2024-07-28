import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IotService } from './iot.service';
import { CreateIotDto } from './dto/create-iot.dto';
import { UpdateIotDto } from './dto/update-iot.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '@auth/auth.decorators';
import { Role } from '@role/role.constants';
import { ApiPaginationQuery, Paginate, PaginateQuery } from 'nestjs-paginate';
import { IOT_PAGINATION_CONFIG } from '@iot/iot.pagination.config';
import { User } from '@auth/auth.types';

@Auth(Role.SUPER_USER, Role.ESCO)
@ApiTags('IOTs')
@Controller('iots')
export class IotController {
  constructor(private readonly iotService: IotService) {}

  @Post()
  create(@Body() createIotDto: CreateIotDto) {
    return this.iotService.create(createIotDto);
  }

  @ApiPaginationQuery(IOT_PAGINATION_CONFIG)
  @Get()
  findAll(@Paginate() query: PaginateQuery, @GetUser() user: User) {
    this.iotService.setUser(user);
    return this.iotService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIotDto: UpdateIotDto) {
    return this.iotService.update(+id, updateIotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iotService.remove(+id);
  }
}
