import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { WsAuthorizedAdapter } from './common/adapters/ws-authorized.adapter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new WsAuthorizedAdapter(app));

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
