import { IsInt, IsNumber } from 'class-validator';

export class DoBetDto {
  @IsNumber()
  amount: number;

  @IsInt()
  game_id: number;
}
