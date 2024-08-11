import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Auth, GetUser } from '@auth/auth.decorators';
import { User } from '@auth/auth.types';
import { Role } from '@role/role.constants';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateGalleryPhotosDto } from './dto/create-gallery-photos.dto';
import { MAX_GALLERY_PHOTOS_PER_UPLOAD } from '@core/core.constants';
import { PhotosFieldInterceptor } from '@core/core.interceptors';

@Auth(Role.FARMER)
@Controller('gallery/photos')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateGalleryPhotosDto })
  @Post()
  @UseInterceptors(
    PhotosFieldInterceptor('photos', MAX_GALLERY_PHOTOS_PER_UPLOAD),
  )
  create(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @GetUser() user: User,
  ) {
    this.galleryService.setUser(user);
    return this.galleryService.create(photos);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    this.galleryService.setUser(user);
    return this.galleryService.remove(+id);
  }
}
