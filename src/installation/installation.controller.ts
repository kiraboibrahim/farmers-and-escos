import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { InstallationService } from './installation.service';
import { CreateInstallationDto } from './dto/create-installation.dto';
import {
  AcceptOrRejectInstallationDto,
  UpdateInstallationDto,
} from './dto/update-installation.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PhotoFieldsInterceptor } from '@core/core.interceptors';
import { UploadInstallationPhotosDto } from '@installation/dto/upload-installation-photos.dto';
import { Auth, GetUser, IsPublic } from '@auth/auth.decorators';
import { Role } from '@role/role.constants';
import { AllowOnly } from '@role/roles.decorators';
import { User } from '@auth/auth.types';
import { CreateInstallationReviewDto } from '@installation/dto/create-installation-review.dto';
import { UpdateInstallationReviewDto } from '@installation/dto/update-installation-review.dto';
import { InstallationExists } from '@installation/installation.validators';
import { ApiPaginationQuery, Paginate, PaginateQuery } from 'nestjs-paginate';
import { INSTALLATION_PAGINATION_CONFIG } from '@installation/installation.pagination.config';

@Auth(Role.SUPER_USER, Role.ESCO)
@ApiTags('Installations')
@Controller('installations')
export class InstallationController {
  constructor(private readonly installationService: InstallationService) {}

  @Post()
  create(@Body() createInstallationDto: CreateInstallationDto) {
    return this.installationService.create(createInstallationDto);
  }

  @AllowOnly(Role.FARMER)
  @Post(':id/reviews')
  createInstallationReview(
    @InstallationExists('id') id: string,
    @Body() createInstallationReviewDto: CreateInstallationReviewDto,
    @GetUser() user: User,
  ) {
    this.installationService.setUser(user);
    return this.installationService.createInstallationReview(
      +id,
      createInstallationReviewDto,
    );
  }

  @ApiPaginationQuery(INSTALLATION_PAGINATION_CONFIG)
  @IsPublic()
  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.installationService.findAll(query);
  }

  @IsPublic()
  @Get(':id/reviews')
  findInstallationReviews(@Param('id') id: string) {
    return this.installationService.findInstallationReviews(+id);
  }

  @IsPublic()
  @Get(':id/performance')
  findInstallationPerformance(@Param('id') id: string) {
    return this.installationService.findInstallationPerformance(+id);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.installationService.findOne(+id);
  }

  @AllowOnly(Role.FARMER)
  @Patch('reviews/:id')
  updateInstallationReview(
    @Param('id') id: string,
    @Body() updateInstallationReviewDto: UpdateInstallationReviewDto,
    @GetUser() user: User,
  ) {
    this.installationService.setUser(user);
    return this.installationService.updateInstallationReview(
      +id,
      updateInstallationReviewDto,
    );
  }

  @ApiBadRequestResponse({
    description: 'Installation photos upload failed due to validation errors',
  })
  @ApiOkResponse({
    description: 'Installation photos have been successfully uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadInstallationPhotosDto })
  @Patch(':id/photos')
  @UseInterceptors(
    PhotoFieldsInterceptor([
      { name: 'coverPhoto', maxCount: 1 },
      { name: 'photo1', maxCount: 1 },
      { name: 'photo2', maxCount: 1 },
      { name: 'photo3', maxCount: 1 },
      { name: 'photo4', maxCount: 1 },
    ]),
  )
  uploadPhotos(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      coverPhoto?: Express.Multer.File[];
      photo1?: Express.Multer.File[];
      photo2?: Express.Multer.File[];
      photo3?: Express.Multer.File[];
      photo4?: Express.Multer.File[];
    },
  ) {
    const installationPhotoUploadDto = {
      coverPhoto: files?.coverPhoto?.at(0),
      photo1: files?.photo1?.at(0),
      photo2: files?.photo2?.at(0),
      photo3: files?.photo3?.at(0),
      photo4: files?.photo4?.at(0),
    };
    return this.installationService.uploadPhotos(
      +id,
      installationPhotoUploadDto,
    );
  }

  @AllowOnly(Role.FARMER)
  @Patch(':id/response')
  acceptOrRejectInstallation(
    @InstallationExists('id') id: string,
    @GetUser() user: User,
    @Body() acceptOrRejectInstallationDto: AcceptOrRejectInstallationDto,
  ) {
    this.installationService.setUser(user);
    return this.installationService.acceptOrRejectInstallation(
      +id,
      acceptOrRejectInstallationDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstallationDto: UpdateInstallationDto,
  ) {
    return this.installationService.update(+id, updateInstallationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.installationService.remove(+id);
  }
}
