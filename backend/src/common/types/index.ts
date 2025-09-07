import { Role } from '@prisma/client';
import type { FastifyRequest } from 'fastify';
import type { JwtPayload } from 'jsonwebtoken';

export interface ApplicationJWT extends JwtPayload {
  sub: string; // user id
  role: Role;
  email: string;
}

export interface AuthenticatedRequest extends FastifyRequest {
  user: ApplicationJWT;
}

export interface AuthenticatedWs extends WebSocket {
  user: ApplicationJWT;
}
