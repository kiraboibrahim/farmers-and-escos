import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Installation } from '@installation/entities/installation.entity';

export class InstallationReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Installation)
  installation: Installation;
}
