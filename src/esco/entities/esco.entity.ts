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
import { Role } from '@role/role.constants';

@Entity()
export class Esco extends BaseEntity {
  static USERNAME_FIELD = 'phoneNumber' as const;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  phoneNumber: string;

  // TODO: Remove nullable after all records have been updated to have an address. It has been done like this for now because existing records will raise errors for a non nullable field without a default
  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column()
  numEmployees: number;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ nullable: true })
  coverPhoto: string;

  @Column({ type: 'date' })
  incorporationDate: string;

  @Column()
  registrationNumber: string;

  @Column()
  specialization: string;

  get role() {
    return Role.ESCO;
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
