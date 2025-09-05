import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { WalletsService } from './wallets.service';

@Module({
  providers: [WalletsService, PrismaService],
  exports: [WalletsService],
})
export class WalletsModule {}
