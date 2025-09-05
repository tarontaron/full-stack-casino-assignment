import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';

import type { AuthenticatedRequest } from '../common/types';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { UsersService } from './users.service';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.OPERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAll() {
    return this.usersService.getAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: AuthenticatedRequest) {
    const { sub } = req.user;

    return this.usersService.getById(+sub);
  }
}
