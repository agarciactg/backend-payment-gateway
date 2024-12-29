import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Customer } from './customer.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @Column('decimal')
  amount: number;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer;

  @Column({ nullable: true }) // Campo opcional
  wompiTransactionId?: string; // ID de la transacción en Wompi
}
