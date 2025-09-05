import { IsEnum, IsInt, IsNumber, Min } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateDto {
  @IsInt()
  wallet_id: number;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;
}
