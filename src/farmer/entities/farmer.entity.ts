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

  // TODO: Remove nullable after all records have been updated to have an address. It has been done like this for now because existing records will raise errors for a non nullable field without a default
  @Column({ nullable: true })
  farmName: string;

  @Column()
  farmDescription: string;

  @Column()
  farmSize: string;

  // TODO: Remove nullable after all records have been updated to have an address. It has been done like this for now because existing records will raise errors for a non nullable field without a default
  @Column({ nullable: true })
  address: string;

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
