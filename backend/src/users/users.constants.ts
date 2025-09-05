import { User } from '@prisma/client';

export const userResponseFields: Partial<Record<keyof User, boolean>> = {
  id: true,
  email: true,
  first_name: true,
  last_name: true,
  role: true,

  created_at: true,
  updated_at: true,
};
