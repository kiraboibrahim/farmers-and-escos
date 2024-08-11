import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryPhoto } from './entities/gallery-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryPhoto])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
