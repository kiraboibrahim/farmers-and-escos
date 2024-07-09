import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from '@core/core.utils';
import { Exclude } from 'class-transformer';

@Entity()
export class Esco extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  website: string;

  @Column()
  phoneNumber: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  numEmployees: number;

  @Column()
  profilePhoto: string;

  @Column()
  coverPhoto: string;

  @Column({ type: 'date' })
  incorporationDate: string;

  @Column()
  registrationNumber: string;

  @Column()
  specialization: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
