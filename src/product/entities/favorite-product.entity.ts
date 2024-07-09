import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@product/entities/product.entity';
import { Farmer } from '@farmer/entities/farmer.entity';

@Entity()
export class FavoriteProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @ManyToOne(() => Farmer)
  farmer: Farmer;
}
