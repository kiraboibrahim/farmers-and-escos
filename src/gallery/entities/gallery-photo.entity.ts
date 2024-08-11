import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Farmer } from '@farmer/entities/farmer.entity';

@Entity()
export class GalleryPhoto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  photo: string;

  @ManyToOne(() => Farmer, (farmer) => farmer.photos, { onDelete: 'CASCADE' })
  farmer: Farmer;
}
