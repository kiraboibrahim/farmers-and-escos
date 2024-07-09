import { Injectable } from '@nestjs/common';
import { CreateEscoDto } from './dto/create-esco.dto';
import { UpdateEscoDto } from './dto/update-esco.dto';

@Injectable()
export class EscoService {
  create(createEscoDto: CreateEscoDto) {
    return 'This action adds a new esco';
  }

  findAll() {
    return `This action returns all esco`;
  }

  findOne(id: number) {
    return `This action returns a #${id} esco`;
  }

  update(id: number, updateEscoDto: UpdateEscoDto) {
    return `This action updates a #${id} esco`;
  }

  remove(id: number) {
    return `This action removes a #${id} esco`;
  }
}
