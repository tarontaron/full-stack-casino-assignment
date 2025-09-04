import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller({ path: 'games', version: '1' })
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('listAll')
  listAllGames() {
    return this.gamesService.listAllGames();
  }
}
