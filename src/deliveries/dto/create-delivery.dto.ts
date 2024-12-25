import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({ description: 'Dirección para la entrega' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'ID de la transacción asociada' })
  @IsNotEmpty()
  transactionId: number;
}
