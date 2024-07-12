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
import * as argon2 from 'argon2';
import { Role } from '../../role/role.constants';

@Entity()
export class Farmer extends BaseEntity {
  static USERNAME_FIELD = 'phoneNumber' as const;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  coverPhoto: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column()
  farmDescription: string;

  @Column()
  farmSize: number;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  get role() {
    return Role.FARMER;
  }

  static async findByUsername(username: string) {
    return await this.findOneBy({ [this.USERNAME_FIELD]: username });
  }

  async hasPassword(password: string) {
    return await argon2.verify(this.password, password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password);
    }
  }
}
