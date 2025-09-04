import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const users = [
  {
    email: 'testbot6654@gmail.com',
    password: 'Password1*',
    first_name: 'Test',
    last_name: 'Player',
    role: Role.PLAYER,
  },
];

const games = [
  { name: 'Slots', rtp: 96.0 },
  { name: 'Roulette', rtp: 97.3 },
  { name: 'Blackjack', rtp: 99.5 },
];

const main = async () => {
  try {
    // Clear existing users
    await prisma.user.deleteMany();
    await prisma.game.deleteMany();

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await prisma.user.create({
        data: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          password_hash: hashedPassword,
        },
      });
    }

    for (const game of games) {
      await prisma.game.create({
        data: {
          name: game.name,
          rtp: game.rtp,
        },
      });
    }

    console.log('Database has been seeded with multiple users.');
  } catch (error) {
    console.error('Error while seeding the database:\n', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
