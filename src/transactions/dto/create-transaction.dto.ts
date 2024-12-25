import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  customerId: number;

  @IsPositive()
  amount: number;
}
