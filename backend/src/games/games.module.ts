import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
  providers: [GamesService, PrismaService],
  controllers: [GamesController],
})
export class GamesModule {}
