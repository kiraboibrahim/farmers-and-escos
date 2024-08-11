import { BadRequestException, Injectable } from '@nestjs/common';
import { StorageService } from '@storage/storage.service';
import { MAX_GALLERY_PHOTOS_PER_FARMER, Resource } from '@core/core.constants';
import { BaseService } from '@core/core.base';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryPhoto } from './entities/gallery-photo.entity';
import { Repository } from 'typeorm';
import { Farmer } from '@farmer/entities/farmer.entity';

@Injectable()
export class GalleryService extends BaseService {
  constructor(
    private storageService: StorageService,
    @InjectRepository(GalleryPhoto)
    private galleryRepository: Repository<GalleryPhoto>,
  ) {
    super();
  }

  async create(photos: Express.Multer.File[]) {
    const { id: farmerId } = this.user;
    const farmer = await Farmer.preload({ id: farmerId });
    const numPhotos = photos?.length;
    if (!numPhotos) throw new BadRequestException('No files chosen for upload');

    if (!(await farmer.hasSpaceForPhotos(numPhotos))) {
      const unusedGallerySpace = await farmer.getUnusedGallerySpace();
      throw new BadRequestException(
        `You have exceeded your gallery limit: ${MAX_GALLERY_PHOTOS_PER_FARMER} photos. You have only ${unusedGallerySpace} photo spaces left`,
      );
    }
    const photosUrls = await this.storageService.uploadBatch(
      photos,
      Resource.FARMER,
      farmerId,
    );
    const galleryPhotos = photosUrls.map((url) =>
      this.galleryRepository.create({ photo: url, farmer }),
    );
    return await GalleryPhoto.save(galleryPhotos);
  }

  async remove(id: number) {
    return await GalleryPhoto.delete({ id });
  }
}
