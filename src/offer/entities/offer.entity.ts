import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Esco } from '@esco/entities/esco.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Product } from '@product/entities/product.entity';
import { LocalDate, ZoneId } from '@js-joda/core';
import * as process from 'node:process';

require('@js-joda/timezone');

@Entity()
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  expiryDate: string;

  @Column({ type: 'boolean', default: false })
  isAccepted: boolean;

  @Column({ nullable: true })
  invoice: string;

  @ManyToOne(() => Esco, { onDelete: 'CASCADE', eager: true })
  esco: Esco;

  @ManyToOne(() => Farmer, { onDelete: 'CASCADE', eager: true })
  farmer: Farmer;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', eager: true })
  product: Product;

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
}
