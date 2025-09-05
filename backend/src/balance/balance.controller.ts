import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { AuthenticatedRequest } from '../common/types';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { DepositDto, WithdrawDto } from './dto';
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

  @Post('deposit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  deposit(@Req() req: AuthenticatedRequest, @Body() body: DepositDto) {
    const { sub } = req.user;

    return this.balanceService.deposit(+sub, body);
  }

  @Post('withdraw')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  withdraw(@Req() req: AuthenticatedRequest, @Body() body: WithdrawDto) {
    const { sub } = req.user;

    return this.balanceService.withdraw(+sub, body);
  }
}
