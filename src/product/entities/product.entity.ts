import { ProductCategory } from '@product-category/entities/product-category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Esco } from '@esco/entities/esco.entity';
import { AutoCreatedDateTime } from '@core/core.base';

@Entity()
export class Product extends AutoCreatedDateTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isFeatured: boolean;

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
}
