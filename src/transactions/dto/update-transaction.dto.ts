import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn } from 'class-validator';

export class UpdateTransactionDto {
  @ApiPropertyOptional({ description: 'Estado de la transacción', enum: ['PENDING', 'COMPLETED', 'FAILED'] })
  @IsOptional()
  @IsIn(['PENDING', 'COMPLETED', 'FAILED'])
  status?: 'PENDING' | 'COMPLETED' | 'FAILED';
}
