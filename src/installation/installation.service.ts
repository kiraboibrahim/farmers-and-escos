import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
import { BaseService } from '@core/core.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Installation } from '@installation/entities/installation.entity';
import { Repository } from 'typeorm';
import { Product } from '@product/entities/product.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Esco } from '@esco/entities/esco.entity';
import { Resource } from '@core/core.constants';
import { StorageService } from '@storage/storage.service';
import { CreateInstallationReviewDto } from '@installation/dto/create-installation-review.dto';
import { InstallationReview } from '@installation/entities/installation-review.entity';
import { UpdateInstallationReviewDto } from '@installation/dto/update-installation-review.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { INSTALLATION_PAGINATION_CONFIG } from '@installation/installation.pagination.config';

@Injectable()
export class InstallationService extends BaseService {
  constructor(
    @InjectRepository(Installation)
    private installationRepository: Repository<Installation>,
    @InjectRepository(InstallationReview)
    private installationReviewRepository: Repository<InstallationReview>,
    private storageService: StorageService,
  ) {
    super();
  }

  async create(createInstallationDto: CreateInstallationDto) {
    const {
      product,
      farmer,
      esco,
    }: { product: Product; farmer: Farmer; esco: Esco } =
      createInstallationDto as any;
    const installation = this.installationRepository.create({
      ...createInstallationDto,
      product,
      farmer,
      esco,
    });
    return Installation.save(installation);
  }

  async createInstallationReview(
    id: number,
    createInstallationReviewDto: CreateInstallationReviewDto,
  ) {
    const { id: farmerId } = this.user;
    const farmer = await Farmer.preload({ id: farmerId });
    const installation = await Installation.preload({
      id,
      farmer: { id: farmerId },
    });
    if (!installation.canBeReviewed(farmerId)) {
      throw new BadRequestException(
        'Installation confirmation is still pending or is already reviewed',
      );
    }
    const installationReview = this.installationReviewRepository.create({
      ...createInstallationReviewDto,
      installation,
      farmer,
    });
    return await InstallationReview.save(installationReview);
  }

  async findAll(query: PaginateQuery) {
    return await paginate(
      query,
      this.installationRepository,
      INSTALLATION_PAGINATION_CONFIG,
    );
  }

  async findInstallationReviews(installationId: number) {
    return await InstallationReview.findBy({
      installation: { id: installationId },
    });
  }

  async findOne(id: number) {
    return await Installation.findOneBy({ id });
  }

  async updateInstallationReview(
    id: number,
    updateInstallationReviewDto: UpdateInstallationReviewDto,
  ) {
    const { id: farmerId } = this.user;
    this.handleMissingUpdateValues(updateInstallationReviewDto);
    return await InstallationReview.update(
      { id, farmer: { id: farmerId } },
      updateInstallationReviewDto,
    );
  }

  async uploadPhotos(
    id: number,
    { coverPhoto, photo1, photo2, photo3, photo4 },
  ) {
    const [coverPhotoUrl, photo1Url, photo2Url, photo3Url, photo4Url] =
      await this.storageService.uploadBatch(
        [coverPhoto, photo1, photo2, photo3, photo4],
        Resource.INSTALLATION,
        id,
      );
    const installationPhotoUploadDto = {
      coverPhoto: coverPhotoUrl,
      photo1: photo1Url,
      photo2: photo2Url,
      photo3: photo3Url,
      photo4: photo4Url,
    };
    this.handleMissingUpdateValues(installationPhotoUploadDto);
    return await Installation.update({ id }, installationPhotoUploadDto);
  }

  async confirmInstallation(id: number) {
    const { id: farmerId } = this.user;
    return await Installation.update(
      { id, farmer: { id: farmerId } },
      { isConfirmed: true },
    );
  }

  async update(id: number, updateInstallationDto: UpdateInstallationDto) {
    const { product, farmer }: { product: Product; farmer: Farmer } =
      updateInstallationDto as any;
    const _updateInstallationDto = {
      ...updateInstallationDto,
      product,
      farmer,
    };
    this.handleMissingUpdateValues(_updateInstallationDto);
    return await Installation.update({ id }, _updateInstallationDto);
  }

  async remove(id: number) {
    return await this.installationRepository.delete({ id });
  }
}
