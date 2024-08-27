import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { AcceptOrRejectOfferDto, UpdateOfferDto } from './dto/update-offer.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '@auth/auth.decorators';
import { Role } from '@role/role.constants';
import { User } from '@auth/auth.types';
import { ApiPaginationQuery, Paginate, PaginateQuery } from 'nestjs-paginate';
import { OFFER_PAGINATION_CONFIG } from '@offer/offer.pagination.config';
import { AllowOnly, AlsoAllow } from '@role/roles.decorators';
import { UploadOfferInvoiceDtoDto } from '@offer/dto/upload-offer-invoice.dto';
import { PDFFieldInterceptor } from '@core/core.interceptors';

@Auth(Role.SUPER_USER, Role.ESCO)
@ApiTags('Offers')
@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @ApiPaginationQuery(OFFER_PAGINATION_CONFIG)
  @AlsoAllow(Role.FARMER)
  @Get()
  findAll(@GetUser() user: User, @Paginate() query: PaginateQuery) {
    this.offerService.setUser(user);
    return this.offerService.findAll(query);
  }

  @AlsoAllow(Role.FARMER)
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    this.offerService.setUser(user);
    return this.offerService.findOne(+id);
  }

  @AllowOnly(Role.FARMER)
  @Patch(':id/response')
  acceptOrRejectOffer(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() acceptOrRejectOfferDto: AcceptOrRejectOfferDto,
  ) {
    this.offerService.setUser(user);
    return this.offerService.acceptOrRejectOffer(+id, acceptOrRejectOfferDto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadOfferInvoiceDtoDto })
  @UseInterceptors(PDFFieldInterceptor('invoice'))
  @Patch(':id/invoices')
  uploadInvoice(
    @Param('id') id: string,
    @UploadedFile() invoice: Express.Multer.File,
  ) {
    return this.offerService.uploadInvoice(+id, invoice);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
