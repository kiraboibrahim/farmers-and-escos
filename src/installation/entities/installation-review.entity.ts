import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Installation } from '@installation/entities/installation.entity';
import { Farmer } from '@farmer/entities/farmer.entity';

@Entity()
export class InstallationReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => Farmer, { eager: true, onDelete: 'CASCADE' })
  farmer: Farmer;

  @ManyToOne(() => Installation, { onDelete: 'CASCADE' })
  installation: Installation;

  @BeforeInsert()
  async markInstallationAsReviewed() {
    await Installation.update(
      { id: this.installation.id },
      { isReviewed: true },
    );
  }
}
