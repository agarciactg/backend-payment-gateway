import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail, IsNotEmpty, Min, Max } from 'class-validator';


export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    reference: string;

    @IsNumber()
    @Min(1)
    amountInCents: number;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsEmail()
    @IsNotEmpty()
    customerEmail: string;

    @IsString()
    @IsNotEmpty()
    cardToken: string;

    @IsNumber()
    @Min(1)
    @Max(36)
    installments: number;

    @IsString()
    @IsNotEmpty()
    acceptanceToken: string;

    @ApiProperty({ description: 'ID del producto asociado a la transacción' })
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'ID del cliente asociado a la transacción' })
    @IsNotEmpty()
    customerId: number;

}
