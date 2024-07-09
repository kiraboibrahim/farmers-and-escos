import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Esco } from '@esco/entities/esco.entity';
import { Farmer } from '@farmer/entities/farmer.entity';
import { Product } from '@product/entities/product.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  expiryDate: string;

  @Column()
  invoice: string;

  @ManyToOne(() => Esco, { onDelete: 'CASCADE' })
  esco: Esco;

  @ManyToOne(() => Farmer, { onDelete: 'CASCADE' })
  farmer: Farmer;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;
}
