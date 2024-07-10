import { Injectable } from '@nestjs/common';
import { CreateEscoDto } from './dto/create-esco.dto';
import { UpdateEscoDto } from './dto/update-esco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Esco } from '@esco/entities/esco.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { ESCO_PAGINATION_CONFIG } from '@esco/esco.pagination.config';

@Injectable()
export class EscoService {
  constructor(
    @InjectRepository(Esco) private escoRepository: Repository<Esco>,
  ) {}

  async create(createEscoDto: CreateEscoDto) {
    const esco = this.escoRepository.create(createEscoDto);
    return await this.escoRepository.save(esco);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(query, this.escoRepository, ESCO_PAGINATION_CONFIG);
  }

  async findOne(id: number) {
    return await Esco.findOneBy({ id });
  }

  async update(id: number, updateEscoDto: UpdateEscoDto) {
    return await Esco.update({ id }, updateEscoDto);
  }

  async remove(id: number) {
    return await Esco.delete({ id });
  }
}
