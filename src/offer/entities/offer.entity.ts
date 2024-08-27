import {
  Column,
  Entity,
  IsNull,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Esco } from '@esco/entities/esco.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Product } from '@product/entities/product.entity';
import { LocalDate, ZoneId } from '@js-joda/core';
import { AutoCreatedDateTime } from '@core/core.base';
import { getNow } from '@core/core.utils';
import { User } from '@auth/auth.types';
import { Role } from '@role/role.constants';

@Entity()
export class Offer extends AutoCreatedDateTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  expiryDate: string;

  @Column({ type: 'boolean', nullable: true, default: null })
  isAccepted: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  acceptedAt: string;

  @Column({ type: 'boolean', default: false })
  read: boolean;

  @Column({ nullable: true })
  invoice: string;

  @ManyToOne(() => Esco, { onDelete: 'CASCADE', eager: true })
  esco: Esco;

  @ManyToOne(() => Farmer, { onDelete: 'CASCADE', eager: true })
  farmer: Farmer;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', eager: true })
  product: Product;

  static async markAsRead(offerId: number, user: User) {
    return (
      user.isFarmer() &&
      (await Offer.update(
        { id: offerId, farmer: { id: user.id } },
        { read: true },
      ))
    );
  }

  static async findById(offerId: number, user: User) {
    await Offer.markAsRead(offerId, user);
    switch (user.role) {
      case Role.ESCO:
        return await Offer.findOneBy({ id: offerId, esco: { id: user.id } });
      case Role.FARMER:
        return await Offer.findOneBy({ id: offerId, farmer: { id: user.id } });
      default:
        throw new Error('Unknown user');
    }
  }

  static async acceptOffer(offerId: number, farmerId: number) {
    return await Offer.update(
      { id: offerId, farmer: { id: farmerId }, isAccepted: IsNull() },
      { isAccepted: true, acceptedAt: getNow() },
    );
  }

  static async rejectOffer(offerId: number, farmerId: number) {
    return await Offer.update(
      { id: offerId, farmer: { id: farmerId }, isAccepted: IsNull() },
      { isAccepted: false, acceptedAt: getNow() },
    );
  }

  isStartDateBeforeExpiryDate() {
    const startDate = LocalDate.parse(this.startDate);
    const expiryDate = LocalDate.parse(this.expiryDate);
    return startDate.isBefore(expiryDate) || startDate.isEqual(expiryDate);
  }

  isExpired() {
    const today = LocalDate.now(ZoneId.of(process.env.TZ));
    const expiryDate = LocalDate.parse(this.expiryDate);
    return today.isAfter(expiryDate);
  }

  isPending() {
    return this.isAccepted === null;
  }
}
