import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { TransactionOutcome, TransactionType } from '@prisma/client';

export class CreateDto {
  @IsInt()
  wallet_id: number;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsInt()
  @IsOptional()
  bet_id?: number;

  @IsOptional()
  @IsEnum(TransactionOutcome)
  outcome?: TransactionOutcome;
}
