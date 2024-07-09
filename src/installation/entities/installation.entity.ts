import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '@product/entities/product.entity';
import { Iot } from '@iot/entities/iot.entity';
import { Esco } from '@esco/entities/esco.entity';

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

  @ManyToOne(() => Esco, { eager: true })
  esco: Esco;

  @OneToOne(() => Product, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn()
  product: Product;

  @OneToMany(() => Iot, (iot) => iot.installation, { eager: true })
  IOTs: Iot[];
}
