import { Injectable } from '@nestjs/common';
import { Game } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  listAllGames(): Promise<Game[]> {
    return this.prisma.game.findMany();
  }
}
