import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@product/entities/product.entity';
import { Farmer } from '@farmer/entities/farmer.entity';

@Entity()
export class FavoriteProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { eager: true, onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Farmer, { onDelete: 'CASCADE' })
  farmer: Farmer;
}
