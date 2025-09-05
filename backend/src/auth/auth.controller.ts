import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Role } from '@prisma/client';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser({
      ...body,
      role: Role.PLAYER,
    });

    return this.authService.generateToken(user);
  }

  @Post('operator/login')
  @HttpCode(HttpStatus.OK)
  async operatorLogin(@Body() body: LoginDto) {
    const user = await this.authService.validateUser({
      ...body,
      role: Role.OPERATOR,
    });

    return this.authService.generateToken(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
