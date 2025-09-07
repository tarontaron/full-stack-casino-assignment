import { Controller, Get, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

import { StatisticService } from './statistic.service';

@Controller({ path: 'statistic', version: '1' })
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @Get('playersByRevenue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OPERATOR)
  getPlayersByRevenue() {
    return this.statisticService.getPlayersByCasinoRevenue();
  }

  @Get('totalRevenue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OPERATOR)
  getTotalRevenue() {
    return this.statisticService.getTotalCasinoRevenue();
  }

  @Get('revenueByGame')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OPERATOR)
  getRevenueByGames() {
    return this.statisticService.getCasinoRevenueByGame();
  }
}
