import { IsString, IsInt, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsPositive()
  price: number;

  @IsInt()
  stock: number;
}
