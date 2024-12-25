import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Transaction } from './transaction.entity';


@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @ManyToOne(() => Transaction, (transaction) => transaction.id)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;
}