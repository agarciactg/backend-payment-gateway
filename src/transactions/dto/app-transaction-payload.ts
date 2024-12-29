import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AppTransactionPayloadDto {
  @ApiProperty({ example: 1, description: 'ID del producto' })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 1, description: 'ID del cliente' })
  @IsNotEmpty()
  @IsNumber()
  customerId: number;
}
