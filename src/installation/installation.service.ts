import { Injectable } from '@nestjs/common';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';

@Injectable()
export class InstallationService {
  create(createInstallationDto: CreateInstallationDto) {
    return 'This action adds a new installation';
  }

  findAll() {
    return `This action returns all installation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} installation`;
  }

  update(id: number, updateInstallationDto: UpdateInstallationDto) {
    return `This action updates a #${id} installation`;
  }

  remove(id: number) {
    return `This action removes a #${id} installation`;
  }
}
