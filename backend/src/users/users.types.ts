import { User } from '@prisma/client';

export type TPublicUser = Omit<User, 'password_hash' | 'deleted_at'>;
