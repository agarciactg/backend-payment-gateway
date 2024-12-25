import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Precio del producto', example: 10.99 })
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'Cantidad disponible en stock', example: 100 })
  @IsInt()
  stock: number;
}
