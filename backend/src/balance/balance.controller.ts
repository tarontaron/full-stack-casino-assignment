import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import type { AuthenticatedRequest } from '../common/types';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { BalanceService } from './balance.service';

@Controller({ path: 'balance', version: '1' })
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getBalance(@Req() req: AuthenticatedRequest) {
    const { sub } = req.user;

    return this.balanceService.getBalanceByUserId(+sub);
  }
}
