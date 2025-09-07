import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';

import type { AuthenticatedRequest } from '../common/types';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

import { BetsService } from './bets.service';
import { DoBetDto } from './dto';

@Controller({ path: 'bets', version: '1' })
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post('doBet')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PLAYER)
  doBet(@Req() req: AuthenticatedRequest, @Body() body: DoBetDto) {
    return this.betsService.doBet(+req.user.sub, body);
  }
}
