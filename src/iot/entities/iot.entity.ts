import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Installation } from '@installation/entities/installation.entity';

@Entity()
export class Iot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  accessToken: string;

  @ManyToOne(() => Installation, { onDelete: 'CASCADE' })
  installation: Installation;
}
