import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../../auth/auth.service';

import { AUTH_ERRORS } from '../constants/errors';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException(AUTH_ERRORS.MISSING_TOKEN);

    const [, token] = authHeader.split(' ');
    if (!token) throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);

    const payload = this.authService.verifyToken(token);
    req.user = payload;

    return true;
  }
}
