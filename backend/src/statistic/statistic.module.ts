import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';

@Module({
  providers: [StatisticService, PrismaService],
  controllers: [StatisticController],
})
export class StatisticModule {}
