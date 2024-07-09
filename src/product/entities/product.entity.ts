import { ProductCategory } from './product-category.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Esco } from '@esco/entities/esco.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  isFeatured: boolean;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  coverPhoto: string;

  @Column()
  photo1: string;

  @Column()
  photo2: string;

  @Column()
  photo3: string;

  @Column()
  photo4: string;

  @ManyToMany(() => ProductCategory)
  @JoinTable()
  categories: ProductCategory[];

  @ManyToOne(() => Esco, { eager: true, onDelete: 'CASCADE' })
  esco: Esco;
}
