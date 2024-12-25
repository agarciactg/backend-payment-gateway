import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  transactionId: number;
}
