import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '@product/entities/product.entity';
import { Iot } from '@iot/entities/iot.entity';
import { Esco } from '@esco/entities/esco.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { DateTimeFormatter, ZonedDateTime, ZoneId } from '@js-joda/core';

require('@js-joda/timezone');

@Entity()
export class Installation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'boolean', default: false })
  isReviewed: boolean;

  @Column({ type: 'boolean', default: false })
  isConfirmed: boolean;

  @Column({ nullable: true })
  coverPhoto: string;

  @Column({ nullable: true })
  photo1: string;

  @Column({ nullable: true })
  photo2: string;

  @Column({ nullable: true })
  photo3: string;

  @Column({ nullable: true })
  photo4: string;

  @ManyToOne(() => Farmer, { onDelete: 'SET NULL', nullable: true })
  farmer: Farmer;

  @ManyToOne(() => Esco, { eager: true, onDelete: 'CASCADE' })
  esco: Esco;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  product: Product;

  @OneToOne(() => Iot, (iot) => iot.installation, {
    cascade: ['insert'],
  })
  IOT: Iot;

  @BeforeInsert()
  setCreatedAt() {
    const timezone = process.env.TZ;
    const now = ZonedDateTime.now(ZoneId.of(timezone));
    this.createdAt = now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
  }

  isForFarmer(farmerId: number) {
    return this.farmer.id === farmerId;
  }

  canBeReviewed(farmerId: number) {
    return this.isConfirmed && !this.isReviewed && this.isForFarmer(farmerId);
  }

  hasIOT() {
    return this.IOT !== null;
  }
}
