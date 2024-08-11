import {
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
import { AutoCreatedDateTime } from '@core/core.base';

@Entity()
export class Installation extends AutoCreatedDateTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

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
