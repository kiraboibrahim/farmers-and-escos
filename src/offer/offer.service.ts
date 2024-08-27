import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { AcceptOrRejectOfferDto, UpdateOfferDto } from './dto/update-offer.dto';
import { BaseService } from '@core/core.base';
import { Product } from '@product/entities/product.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Esco } from '@esco/entities/esco.entity';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Role } from '@role/role.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '@offer/entities/offer.entity';
import { Repository } from 'typeorm';
import {
  getEscoOffersPaginationConfig,
  getFarmerOffersPaginationConfig,
  OFFER_PAGINATION_CONFIG,
} from '@offer/offer.pagination.config';
import { StorageService } from '@storage/storage.service';
import { Resource } from '@core/core.constants';

@Injectable()
export class OfferService extends BaseService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private storageService: StorageService,
  ) {
    super();
  }

  async create(createOfferDto: CreateOfferDto) {
    const {
      product,
      farmer,
      esco,
    }: { product: Product; farmer: Farmer; esco: Esco } = createOfferDto as any;
    const _createOfferDto = { ...createOfferDto, product, farmer, esco };
    const offer = this.offerRepository.create(_createOfferDto);
    if (!offer.isStartDateBeforeExpiryDate()) {
      throw new BadRequestException(
        'The start date should be before the expiry date or today',
      );
    }
    if (offer.isExpired()) {
      throw new BadRequestException(
        'The expiry date should be a future date or today',
      );
    }
    return await Offer.save(offer);
  }

  async findAll(query: PaginateQuery) {
    const { id: userId, role: userRole } = this.user;
    switch (userRole) {
      case Role.SUPER_USER:
        return await paginate(
          query,
          this.offerRepository,
          OFFER_PAGINATION_CONFIG,
        );
      case Role.ESCO:
        return await paginate(
          query,
          this.offerRepository,
          getEscoOffersPaginationConfig(userId),
        );
      case Role.FARMER:
        return await paginate(
          query,
          this.offerRepository,
          getFarmerOffersPaginationConfig(userId),
        );
      default:
        throw new BadRequestException('Unknown User');
    }
  }

  async findOne(id: number) {
    return await Offer.findById(id, this.user);
  }

  async acceptOrRejectOffer(
    id: number,
    { isAccepted }: AcceptOrRejectOfferDto,
  ) {
    const { id: farmerId } = this.user;
    const offer = await Offer.preload({
      id,
      farmer: { id: farmerId },
      isAccepted: null,
    });

    if (!!offer && offer.isExpired()) {
      throw new BadRequestException('Offer is already expired');
    }
    isAccepted
      ? await Offer.acceptOffer(id, farmerId)
      : await Offer.rejectOffer(id, farmerId);
  }

  async uploadInvoice(id: number, invoice: Express.Multer.File) {
    const invoiceURL = await this.storageService.upload(
      invoice,
      Resource.OFFER,
      id,
    );
    const uploadOfferInvoiceDto = { invoice: invoiceURL };
    this.handleMissingUpdateValues(uploadOfferInvoiceDto);
    return await Offer.update({ id }, uploadOfferInvoiceDto);
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    const { product, farmer }: { product: Product; farmer: Farmer } =
      updateOfferDto as any;
    const _updateOfferDto = { ...updateOfferDto, product, farmer };
    this.handleMissingUpdateValues(_updateOfferDto);
    return await Offer.update({ id }, _updateOfferDto);
  }

  async remove(id: number) {
    return await Offer.delete({ id });
  }
}
