import { ProductCategory } from '../../product-category/entities/product-category.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Esco } from '@esco/entities/esco.entity';
import { DateTimeFormatter, ZonedDateTime, ZoneId } from '@js-joda/core';

require('@js-joda/timezone');

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  price: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ type: 'timestamp' })
  createdAt: string;

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

  @ManyToMany(() => ProductCategory, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable()
  categories: ProductCategory[];

  @ManyToOne(() => Esco, { eager: true, onDelete: 'CASCADE' })
  esco: Esco;

  @BeforeInsert()
  setCreatedAt() {
    const timezone = process.env.TZ;
    const now = ZonedDateTime.now(ZoneId.of(timezone));
    this.createdAt = now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
  }
}
