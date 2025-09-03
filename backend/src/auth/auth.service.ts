import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';

import { JWT_SECRET } from '../common/constants/env';
import { AUTH_ERRORS } from '../common/constants/errors';

import type { TPublicUser } from '../users/users.types';
import { UsersService } from '../users/users.service';

import { RegisterDto, ValidateDto } from './dto';
import type { TTokenResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(payload: ValidateDto): Promise<User> {
    const { email, password } = payload;

    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    return user;
  }

  async register(payload: RegisterDto): Promise<TTokenResponse> {
    const { email, password, first_name, last_name } = payload;

    const candidate = await this.usersService.getByEmail(email);
    if (candidate) {
      throw new ConflictException(AUTH_ERRORS.USER_EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.usersService.create({
      role: Role.PLAYER,
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
    });

    return this.generateToken(createdUser);
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }
  }

  generateToken(user: TPublicUser): TTokenResponse {
    const payload: JwtPayload = {
      sub: `${user.id}`,
      email: user.email,
      role: user.role,
    };

    const access_token = jwt.sign(payload, JWT_SECRET);

    return { access_token };
  }
}
