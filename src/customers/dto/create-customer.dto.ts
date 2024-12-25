import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Correo electrónico del cliente' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Número de teléfono del cliente', example: '+1234567890' })
  @IsPhoneNumber()
  phone: string;
}
