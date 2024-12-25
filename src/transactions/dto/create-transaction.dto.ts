import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'ID del producto asociado a la transacción' })
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ description: 'ID del cliente asociado a la transacción' })
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({ description: 'Monto de la transacción', example: 100.5 })
  @IsPositive()
  amount: number;
}
