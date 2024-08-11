import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from '@core/core.utils';
import { Exclude } from 'class-transformer';
import * as argon2 from 'argon2';
import { Role } from '@role/role.constants';
import { GalleryPhoto } from '../../gallery/entities/gallery-photo.entity';
import { MAX_GALLERY_PHOTOS_PER_FARMER } from '@core/core.constants';

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

  // TODO: Remove nullable after all records have been updated to have a value for this field. It has been done like this for now because existing records will raise errors for a non nullable field
  @Column({ nullable: true })
  farmName: string;

  @Column()
  farmDescription: string;

  @Column()
  farmSize: string;

  // TODO: Remove nullable after all records have been updated to have a value for this field. It has been done like this for now because existing records will raise errors for a non nullable field
  @Column({ nullable: true })
  farmEstablishedOn: string;

  // TODO: Remove nullable after all records have been updated to have a value for this field. It has been done like this for now because existing records will raise errors for a non nullable field
  @Column({ nullable: true })
  cropsGrown: string;

  @Column({ nullable: true })
  acreagePerCrop: string;

  // TODO: Remove nullable after all records have been updated to have a value for this field. It has been done like this for now because existing records will raise errors for a non nullable field
  @Column({ nullable: true })
  animalsKept: string;

  // TODO: Remove nullable after all records have been updated to have a value for this field. It has been done like this for now because existing records will raise errors for a non nullable field
  @Column({ nullable: true })
  animalsPerType: string;

  // TODO: Remove nullable after all records have been updated to have a value for this field. It has been done like this for now because existing records will raise errors for a non nullable field
  @Column({ nullable: true })
  address: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @OneToMany(() => GalleryPhoto, (photo) => photo.farmer)
  photos: GalleryPhoto[];

  get role() {
    return Role.FARMER;
  }

  static async findByUsername(username: string) {
    return await this.findOneBy({ [this.USERNAME_FIELD]: username });
  }

  async getUnusedGallerySpace() {
    return MAX_GALLERY_PHOTOS_PER_FARMER - (await this.getUsedGallerySpace());
  }

  async getUsedGallerySpace() {
    return await GalleryPhoto.countBy({ farmer: { id: this.id } });
  }

  async hasSpaceForPhotos(numIncomingPhotos: number) {
    const usedGallerySpace = await this.getUsedGallerySpace();
    const toBeUsedGallerySpace = usedGallerySpace + numIncomingPhotos;
    return toBeUsedGallerySpace < MAX_GALLERY_PHOTOS_PER_FARMER;
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
