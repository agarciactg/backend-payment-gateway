import { IsOptional, IsIn } from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsIn(['PENDING', 'COMPLETED', 'FAILED'])
  status?: 'PENDING' | 'COMPLETED' | 'FAILED';
}
