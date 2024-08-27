import {
  Column,
  Entity,
  IsNull,
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

  @Column({ type: 'boolean', nullable: true, default: null })
  isAccepted: boolean;

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

  getIOTData() {
    const getRandomNum = (max: number = 2000000) =>
      Math.ceil(Math.random() * max);
    return {
      totalEnergyConsumed: getRandomNum(),
      totalEnergyGenerate: getRandomNum(),
      avgPowerConsumed: getRandomNum(),
      totalWaterPumped: getRandomNum(),
      totalRuntime: getRandomNum(),
      avgDailyEnergyGenerated: getRandomNum(),
      avgDailyEnergyConsumed: getRandomNum(),
    };
  }

  static async acceptInstallation(installationId: number, farmerId: number) {
    return await Installation.update(
      { id: installationId, farmer: { id: farmerId }, isAccepted: IsNull() },
      { isAccepted: true },
    );
  }

  static async rejectInstallation(installationId: number, farmerId: number) {
    return await Installation.update(
      { id: installationId, farmer: { id: farmerId }, isAccepted: IsNull() },
      { isAccepted: false },
    );
  }

  isForFarmer(farmerId: number) {
    return this.farmer.id === farmerId;
  }

  canBeReviewed(farmerId: number) {
    return this.isAccepted && !this.isReviewed && this.isForFarmer(farmerId);
  }

  hasIOT() {
    return this.IOT !== null;
  }
}
