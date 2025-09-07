import { IsInt, IsNumber } from 'class-validator';

export class CreateDto {
  @IsNumber()
  amount: number;

  @IsInt()
  user_id: number;

  @IsInt()
  game_id: number;
}
