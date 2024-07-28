import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Installation } from '@installation/entities/installation.entity';
import { Esco } from '@esco/entities/esco.entity';

@Entity()
export class Iot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  accessToken: string;

  @ManyToOne(() => Esco)
  esco: Esco;

  @OneToOne(() => Installation, { onDelete: 'CASCADE' })
  @JoinColumn()
  installation: Installation;
}
