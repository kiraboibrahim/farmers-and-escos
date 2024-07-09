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
export class Farmer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  profilePhoto: string;

  @Column()
  farmDescription: string;

  @Column()
  farmSize: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
