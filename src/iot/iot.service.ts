import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateIotDto } from './dto/update-iot.dto';
import { BaseService } from '@core/core.base';
import { Iot } from '@iot/entities/iot.entity';
import { CreateIotDto } from '@iot/dto/create-iot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Role } from '@role/role.constants';
import {
  getEscoIotPaginationConfig,
  IOT_PAGINATION_CONFIG,
} from '@iot/iot.pagination.config';
import { Installation } from '@installation/entities/installation.entity';

@Injectable()
export class IotService extends BaseService {
  constructor(@InjectRepository(Iot) private IotRepository: Repository<Iot>) {
    super();
  }

  async create(createIotDto: CreateIotDto) {
    const { installation }: { installation: Installation } =
      createIotDto as any;
    if (installation.hasIOT()) {
      throw new BadRequestException(
        `Installation already has an IOT(ID: ${installation.IOT.id})`,
      );
    }
    const _createIotDto = { ...createIotDto, installation };
    const IOT = this.IotRepository.create(_createIotDto);
    return Iot.save(IOT);
  }

  async findAll(query: PaginateQuery) {
    const { id: userId, role: userRole } = this.user;
    switch (userRole) {
      case Role.SUPER_USER:
        return await paginate(query, this.IotRepository, IOT_PAGINATION_CONFIG);
      case Role.ESCO:
        return await paginate(
          query,
          this.IotRepository,
          getEscoIotPaginationConfig(userId),
        );
      default:
        throw new BadRequestException('Invalid Role');
    }
  }

  async update(id: number, updateIotDto: UpdateIotDto) {
    const { installation }: { installation: Installation } =
      updateIotDto as any;
    const _updateIotDto = { ...updateIotDto, installation };
    this.handleMissingUpdateValues(_updateIotDto);
    return await Iot.update({ id }, _updateIotDto);
  }

  async remove(id: number) {
    return await Iot.delete({ id });
  }
}
